import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Volume2, Copy, Check, Eraser, Languages, BookmarkPlus, Mic, MicOff } from 'lucide-react';
import { speak } from '../utils/helpers';

const MAX_CHARS = 500;
const STORAGE_KEY = 'spanish-hub-translator-history';
const HISTORY_LIMIT = 5;

async function translate(text, from, to) {
  const targetLang = to === 'es' ? 'ES' : 'EN';
  const res = await fetch('/api/translate-deepl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  });
  if (!res.ok) throw new Error(`Translator returned ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.translatedText || '';
}

export default function Translator({ onSaveWord, savedWords = [] }) {
  const [direction, setDirection] = useState('en-es'); // 'en-es' or 'es-en'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);
  const [listening, setListening] = useState(false);
  const debounceRef = useRef(null);
  const recRef = useRef(null);

  const fromLang = direction === 'en-es' ? 'en' : 'es';
  const toLang = direction === 'en-es' ? 'es' : 'en';
  const fromLabel = direction === 'en-es' ? 'English' : 'Español';
  const toLabel = direction === 'en-es' ? 'Español' : 'English';

  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw).slice(0, HISTORY_LIMIT));
    } catch (e) { /* ignore */ }
  }, []);

  // Debounced auto-translate
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!input.trim()) { setOutput(''); setError(null); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true); setError(null);
      try {
        const result = await translate(input.trim().slice(0, MAX_CHARS), fromLang, toLang);
        setOutput(result);
        const entry = { from: fromLang, to: toLang, input: input.trim(), output: result, ts: Date.now() };
        setHistory(prev => {
          const next = [entry, ...prev.filter(e => !(e.input === entry.input && e.from === entry.from))].slice(0, HISTORY_LIMIT);
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { /* ignore */ }
          return next;
        });
      } catch (e) {
        setError(e.message || 'Translation failed. Try again.');
        setOutput('');
      } finally { setLoading(false); }
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [input, fromLang, toLang]);

  const swap = () => {
    setDirection(direction === 'en-es' ? 'es-en' : 'en-es');
    if (output) { setInput(output); setOutput(input); }
  };

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) { /* ignore */ }
  };

  const applyHistory = (entry) => {
    setDirection(entry.from === 'en' ? 'en-es' : 'es-en');
    setInput(entry.input);
    setOutput(entry.output);
  };

  const clear = () => { setInput(''); setOutput(''); setError(null); setSaved(false); };

  useEffect(() => { setSaved(false); }, [output]);

  // Speech to text — mic button
  const startListening = () => {
    if (!SR || listening) return;
    const rec = new SR();
    recRef.current = rec;
    rec.lang = fromLang === 'es' ? 'es-MX' : 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    rec.onresult = (ev) => {
      const heard = ev.results[0][0].transcript.trim();
      setInput(prev => prev ? `${prev} ${heard}` : heard);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    try { rec.start(); } catch (e) { setListening(false); }
  };

  const stopListening = () => {
    if (recRef.current) { recRef.current.stop(); recRef.current = null; }
    setListening(false);
  };

  const trimmedIn = input.trim();
  const trimmedOut = output.trim();
  const isSaveable = trimmedIn && trimmedOut && trimmedIn.length <= 60 && trimmedOut.length <= 60;
  const es = direction === 'en-es' ? trimmedOut : trimmedIn;
  const en = direction === 'en-es' ? trimmedIn : trimmedOut;
  const alreadySaved = isSaveable && (savedWords || []).some(w => w.es?.toLowerCase() === es.toLowerCase());

  const saveAsWord = () => {
    if (!isSaveable || !onSaveWord || alreadySaved) return;
    onSaveWord({
      es: es.replace(/[¡¿]/g, '').trim(),
      en: en.replace(/[!?.]/g, '').trim(),
      type: es.includes(' ') ? 'phrase' : 'other',
      gender: '',
      group: 'Custom',
    });
    setSaved(true);
  };

  return (
    <div data-testid="translator">
      {/* Header banner */}
      <div className="rounded-2xl p-4 mb-3 text-white"
        style={{ background: 'linear-gradient(135deg,#1E3A8A,#0EA5E9)', boxShadow: '0 6px 20px rgba(14,165,233,0.25)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Languages size={18} />
          <h2 className="font-serif text-lg font-bold">Translator</h2>
        </div>
        <p className="text-xs opacity-90">Translate between English and Spanish — type or speak, hear the result.</p>
      </div>

      {/* Direction toggle */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="flex-1 text-center text-xs font-bold uppercase tracking-wider py-2 rounded-lg" data-testid="translator-from"
          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}>
          {fromLabel}
        </div>
        <button data-testid="translator-swap" onClick={swap}
          className="p-2 rounded-full transition-all hover:rotate-180"
          style={{ background: 'hsl(var(--primary))', color: 'white', transition: 'transform 0.4s ease' }}>
          <ArrowRightLeft size={14} />
        </button>
        <div className="flex-1 text-center text-xs font-bold uppercase tracking-wider py-2 rounded-lg" data-testid="translator-to"
          style={{ background: 'hsl(var(--primary))', color: 'white' }}>
          {toLabel}
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-2">
        <textarea data-testid="translator-input"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
          placeholder={direction === 'en-es' ? 'Type or speak any English text…' : 'Escribe o habla cualquier texto en español…'}
          rows={4}
          className="w-full p-4 pr-12 rounded-2xl border text-base resize-none"
          style={{ background: 'hsl(var(--card))', borderColor: listening ? 'hsl(var(--primary))' : 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
        <div className="absolute bottom-2 right-3 flex items-center gap-2">
          {input && (
            <button onClick={clear} data-testid="translator-clear"
              className="p-1 rounded transition-colors hover:bg-black/5"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Eraser size={14} />
            </button>
          )}
          {input && (
            <button onClick={() => speak(input.trim(), fromLang)} data-testid="translator-speak-input"
              className="p-1 rounded transition-colors hover:bg-black/5"
              style={{ color: 'hsl(var(--primary))' }}>
              <Volume2 size={14} />
            </button>
          )}
          {SR && (
            <button
              onClick={listening ? stopListening : startListening}
              data-testid="translator-mic"
              className="p-1.5 rounded-lg transition-all"
              style={{
                background: listening ? '#FEE2E2' : 'hsl(var(--primary))',
                color: listening ? '#991B1B' : 'white',
              }}
              title={listening ? 'Stop listening' : `Speak in ${fromLabel}`}>
              {listening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          )}
        </div>
        <div className="absolute top-2 right-3 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {input.length}/{MAX_CHARS}
        </div>
        {listening && (
          <div className="mt-1 text-xs text-center font-medium" style={{ color: 'hsl(var(--primary))' }}>
            🎤 Listening… speak now
          </div>
        )}
      </div>

      {/* Output */}
      <motion.div data-testid="translator-output-box"
        animate={{ opacity: loading ? 0.6 : 1 }}
        className="rounded-2xl border p-4 mb-3 min-h-[110px] relative"
        style={{
          background: output ? 'linear-gradient(135deg, hsl(var(--primary)/0.06), hsl(47 91% 53% / 0.08))' : 'hsl(var(--muted))',
          borderColor: output ? 'hsl(var(--primary)/0.4)' : 'hsl(var(--border))',
        }}>
        {loading && (
          <div className="absolute top-3 right-3 text-xs italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Translating…
          </div>
        )}
        {output ? (
          <>
            <div className="font-serif text-lg leading-relaxed pr-20" data-testid="translator-output"
              style={{ color: 'hsl(var(--foreground))' }}>
              {output}
            </div>
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {isSaveable && onSaveWord && (
                <button onClick={saveAsWord} disabled={alreadySaved || saved} data-testid="translator-save"
                  className="p-2 rounded-lg border transition-all"
                  style={{
                    background: (alreadySaved || saved) ? '#DCFCE7' : 'hsl(var(--card))',
                    borderColor: (alreadySaved || saved) ? '#86EFAC' : 'hsl(var(--border))',
                    color: (alreadySaved || saved) ? '#14532D' : 'hsl(var(--muted-foreground))',
                  }}
                  title={alreadySaved ? 'Already in your words' : 'Save to your words'}>
                  {(alreadySaved || saved) ? <Check size={14} /> : <BookmarkPlus size={14} />}
                </button>
              )}
              <button onClick={copy} data-testid="translator-copy"
                className="p-2 rounded-lg border transition-all"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: copied ? '#16A34A' : 'hsl(var(--muted-foreground))' }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button onClick={() => speak(output, toLang)} data-testid="translator-speak-output"
                className="p-2 rounded-lg text-white"
                style={{ background: 'hsl(var(--primary))', boxShadow: '0 2px 8px rgba(198,11,30,0.3)' }}>
                <Volume2 size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-sm italic flex items-center justify-center h-full" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {error || 'Translation will appear here…'}
          </div>
        )}
      </motion.div>

      {error && output && (
        <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{ background: '#FEE2E2', color: '#991B1B' }}>
          {error}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-5">
          <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Recent translations
          </div>
          <div className="space-y-1.5">
            {history.map((h, i) => (
              <button key={i} data-testid={`translator-history-${i}`} onClick={() => applyHistory(h)}
                className="w-full text-left p-2.5 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {h.from === 'en' ? 'EN → ES' : 'ES → EN'}
                  </span>
                </div>
                <div className="text-xs truncate" style={{ color: 'hsl(var(--foreground))' }}>
                  {h.input}
                </div>
                <div className="text-xs italic truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  → {h.output}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-[10px] text-center mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Powered by DeepL · accurate machine translation.
      </div>
    </div>
  );
}
