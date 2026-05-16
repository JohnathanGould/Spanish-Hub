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

// === ACCENT STRIPPING ===
// Accents are never penalised — strip before comparison in all drill modes
export function stripAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

// === TAP SOUND ===
export function playTap() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 1200;
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(1.0, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.04);
  } catch (e) {}
}

// === CONFETTI SOUND ===
let confettiBuffer = null;
let audioCtx = null;
let activeConfettiSource = null;

function getAudioContext() {
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  } catch (e) { return null; }
}

// Preload the fanfare buffer on first user tap
document.addEventListener('click', async () => {
  try {
    if (confettiBuffer) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();
    const response = await fetch('/audio/fanfare.mp3');
    if (!response.ok) return;
    const arrayBuffer = await response.arrayBuffer();
    confettiBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (e) {}
}, { once: false });

export function playConfetti() {
  try {
    const ctx = getAudioContext();
    if (!ctx || !confettiBuffer) return;
    if (ctx.state === 'suspended') ctx.resume();
    const source = ctx.createBufferSource();
    source.buffer = confettiBuffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    activeConfettiSource = source;
    setTimeout(() => {
      try { source.stop(); activeConfettiSource = null; } catch (e) {}
    }, 6600);
  } catch (e) {}
}

export function stopConfetti() {
  try {
    if (activeConfettiSource) {
      activeConfettiSource.stop();
      activeConfettiSource = null;
    }
  } catch (e) {}
}