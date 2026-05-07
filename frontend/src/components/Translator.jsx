import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Volume2, Copy, Check, Eraser, Languages } from 'lucide-react';
import { speak } from '../utils/helpers';

const MAX_CHARS = 500;
const STORAGE_KEY = 'spanish-hub-translator-history';
const HISTORY_LIMIT = 5;

async function translate(text, from, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translator returned ${res.status}`);
  const data = await res.json();
  if (data.responseStatus !== 200 && data.responseStatus !== '200') {
    throw new Error(data.responseDetails || 'Translation failed');
  }
  return data.responseData?.translatedText || '';
}

export default function Translator() {
  const [direction, setDirection] = useState('en-es'); // 'en-es' or 'es-en'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const debounceRef = useRef(null);

  const fromLang = direction === 'en-es' ? 'en' : 'es';
  const toLang = direction === 'en-es' ? 'es' : 'en';
  const fromLabel = direction === 'en-es' ? 'English' : 'Español';
  const toLabel = direction === 'en-es' ? 'Español' : 'English';

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
        // Save to history if both ends non-empty
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
    // Swap input/output too if there's content
    if (output) {
      setInput(output);
      setOutput(input);
    }
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

  const clear = () => { setInput(''); setOutput(''); setError(null); };

  return (
    <div data-testid="translator">
      {/* Header banner */}
      <div className="rounded-2xl p-4 mb-3 text-white"
        style={{ background: 'linear-gradient(135deg,#1E3A8A,#0EA5E9)', boxShadow: '0 6px 20px rgba(14,165,233,0.25)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Languages size={18} />
          <h2 className="font-serif text-lg font-bold">Translator</h2>
        </div>
        <p className="text-xs opacity-90">Translate any sentence between English and Spanish — with audio playback.</p>
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
          placeholder={direction === 'en-es' ? 'Type any English text…' : 'Escribe cualquier texto en español…'}
          rows={4}
          className="w-full p-4 pr-12 rounded-2xl border text-base resize-none"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
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
        </div>
        <div className="absolute top-2 right-3 text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {input.length}/{MAX_CHARS}
        </div>
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
        Powered by MyMemory · free machine translation. Quality varies for idioms & slang.
      </div>
    </div>
  );
}
