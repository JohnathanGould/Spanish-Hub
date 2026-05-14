module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: [text], target_lang: targetLang }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'DeepL error');
    return res.status(200).json({ translatedText: data.translations[0].text });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Translation failed' });
  }
};