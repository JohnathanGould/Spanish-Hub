// === MASTERY ===
export function masteryLevel(progress, es) {
  const p = progress?.[es];
  if (!p || p.c === 0) return 'new';
  if (p.s >= 6) return 'mastered';
  if (p.s >= 3) return 'strong';
  return 'learning';
}

export function getStats(words, progress) {
  const s = { new: 0, learning: 0, strong: 0, mastered: 0 };
  words.forEach(w => { s[masteryLevel(progress, w.es)]++; });
  return s;
}

export function dotColor(lvl) {
  return { new: '#D4D4D4', learning: '#FBBF24', strong: '#34D399', mastered: '#16A34A' }[lvl] || '#D4D4D4';
}

// === SPACED REPETITION ===
export function spacedRepetitionSort(words, progress) {
  const getWeight = (w) => {
    const p = progress?.[w.es];
    if (!p || p.c === 0) return 3;
    if (p.s >= 6) return 0.5;
    if (p.s >= 3) return 1.5;
    if (p.w > p.c * 0.5) return 5;
    return 2.5;
  };
  return [...words]
    .map(w => ({ w, score: getWeight(w) * Math.random() }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.w);
}

// === RANDOM UTILS ===
export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function pick(arr, n, exclude = []) {
  return shuffle(arr.filter(x => !exclude.includes(x))).slice(0, n);
}

// === LEVENSHTEIN ===
export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

// === SPEECH ===
let esVoice = null;

export function initVoice() {
  const load = () => {
    const vs = window.speechSynthesis?.getVoices() || [];
    esVoice = vs.find(v => v.lang === 'es-ES') || vs.find(v => v.lang.startsWith('es')) || null;
  };
  if (window.speechSynthesis?.getVoices().length) load();
  else if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = load;
}

export function speak(text, lang = 'es') {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (lang === 'es') {
    u.lang = esVoice ? esVoice.lang : 'es-ES';
    if (esVoice) u.voice = esVoice;
    u.rate = 0.85;
  } else {
    u.lang = 'en-US';
    u.rate = 0.9;
  }
  window.speechSynthesis.speak(u);
}
