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

const SYSTEM_PROMPT = "You are a friendly, encouraging Spanish conversation tutor named Sofia. " +
  "Your job is to have natural conversations in Spanish with learners. " +
  "Rules: " +
  "Always reply primarily in Spanish. " +
  "Keep replies SHORT (2-4 sentences max) so the learner can respond. " +
  "If the user makes a grammar or vocabulary mistake, gently correct it ONCE in your reply like this: " +
  "(*Correccion: deberias decir quiero en vez de querer*) then continue the conversation naturally. " +
  "If the user writes in English, respond in Spanish but acknowledge what they said. " +
  "Ask follow-up questions to keep the conversation going. " +
  "Be warm, patient, and encouraging. " +
  "Adjust your vocabulary to the learners apparent level. " +
  "Never give long explanations, keep it conversational.";

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
      { role: "model", parts: [{ text: "Hola! Soy Sofia, tu tutora de espanol. Como estas hoy?" }] },
      ...history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const geminiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error("Gemini error:", err);
      return res.status(500).json({ error: "Sofia is unavailable right now. Try again in a moment." });
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