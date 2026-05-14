const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

const SYSTEM_PROMPT = "You are Milo, a friendly Spanish tutor for English speakers. " +
  "You MUST follow these strict language rules based on the learner's level: " +
  "BEGINNER (default): Use ONLY simple present tense. Maximum 8 words per sentence. " +
  "After each sentence, put the full English translation in brackets on the same line. " +
  "Example: ¡Hola! [Hello!] Mucho gusto. [Nice to meet you.] ¿De dónde eres tú? [Where are you from?] " +
  "Never translate word by word. Use common words only. Never use subjunctive, conditional, or complex grammar. " +
  "INTERMEDIATE: Use present and past tense only. No translations needed. " +
  "Sentences up to 12 words. Introduce new vocabulary with context clues. " +
  "ADVANCED: Speak naturally but still keep replies SHORT (3-4 sentences max). " +
  "The learner is a BEGINNER unless told otherwise. " +
  "If the user makes a grammar mistake, gently correct it once like this: " +
  "(*Correccion: deberias decir X en vez de Y*) then continue naturally. " +
  "If the user writes in English, respond mostly in Spanish with key words translated. " +
  "Always ask ONE follow-up question to keep the conversation going. " +
  "Be warm, patient, and encouraging like a good teacher.";

const DAILY_LIMIT = 30;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, conversationHistory, userUid } = req.body;

  if (!message || !userUid) {
    return res.status(400).json({ error: "Missing message or userUid" });
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const usageRef = db.collection("chatUsage").doc(userUid);
    const usageDoc = await usageRef.get();
    const usage = usageDoc.exists ? usageDoc.data() : null;

    if (usage && usage.date === today && usage.count >= DAILY_LIMIT) {
      return res.status(429).json({
        error: "Daily limit reached",
        message: "You've used all 30 messages for today. Come back tomorrow!",
      });
    }

    const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-10) : [];

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Hola! Soy Milo, tu tutor de espanol. Como estas hoy?" }] },
      ...history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error("Gemini error:", err);
      const isQuota = err.includes("429") || err.includes("RESOURCE_EXHAUSTED");
      return res.status(500).json({
        error: isQuota ? "quota_exceeded" : "Sofia is unavailable right now. Try again in a moment."
      });
    }

    const geminiData = await geminiRes.json();
    const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no entendi eso. Puedes repetirlo?";

    if (usage && usage.date === today) {
      await usageRef.update({ count: admin.firestore.FieldValue.increment(1) });
    } else {
      await usageRef.set({ date: today, count: 1 });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};