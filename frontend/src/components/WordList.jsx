import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, CheckCircle2, Mic, MicOff } from 'lucide-react';
import { speak, levenshtein } from '../utils/helpers';
import WordImage from './WordImage';

const TYPE_LABELS = {
  noun: 'Noun', verb: 'Verb', adj: 'Adjective', adv: 'Adverb',
  phrase: 'Phrase', pronoun: 'Pronoun', article: 'Article', other: 'Word',
};

export default function WordDetail({ word, progress, onClose }) {
  const p = progress || { c: 0, w: 0, s: 0 };
  const total = (p.c || 0) + (p.w || 0);
  const acc = total > 0 ? Math.round((p.c / total) * 100) : 0;
  const article = word?.gender === 'm' ? 'el ' : word?.gender === 'f' ? 'la ' : '';

  const [pronCheck, setPronCheck] = useState(null);
  const [listening, setListening] = useState(false);
  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  if (!word) return null;

  const startPronCheck = () => {
    if (!SR) return;
    setListening(true); setPronCheck(null);
    const rec = new SR();
    rec.lang = 'es-ES';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (ev) => {
      const heard = ev.results[0][0].transcript.trim().toLowerCase();
      const target = word.es.toLowerCase();
      const dist = levenshtein(heard, target);
      const ok = dist <= Math.max(1, Math.floor(target.length / 5));
      setPronCheck({ ok, heard });
    };
    rec.onerror = () => { setListening(false); setPronCheck({ ok: false, heard: '(no audio)' }); };
    rec.onend = () => setListening(false);
    try { rec.start(); } catch (e) { setListening(false); }
  };

  return (
    <div data-testid="word-detail-modal" onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.55)' }}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="rounded-t-3xl w-full shadow-2xl flex flex-col"
        style={{ background: 'hsl(var(--card))', height: '75vh' }}>

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: 'hsl(var(--border))' }} />
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="p-6 pb-4 relative"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(47 91% 53% / 0.12))' }}>
            <button data-testid="word-detail-close" onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 transition-colors z-10"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              <X size={18} />
            </button>
            {(word.type === 'noun' || word.type === 'phrase') && (
              <div className="mb-4">
                <WordImage word={word} variant="modal" />
              </div>
            )}
            <div className="text-xs uppercase tracking-wider font-bold mb-2"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              {TYPE_LABELS[word.type] || 'Word'}{word.group && word.group !== 'Core' && ` · ${word.group}`}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-serif text-3xl font-black" data-testid="word-detail-es"
                style={{ color: 'hsl(var(--foreground))' }}>
                {article}{word.es}
              </h3>
              <button data-testid="word-detail-speak" onClick={() => speak(word.es, 'es')}
                className="p-2 rounded-full transition-colors hover:bg-black/5"
                style={{ color: 'hsl(var(--primary))' }}>
                <Volume2 size={20} />
              </button>
            </div>
            <p className="text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>{word.en}</p>
          </div>

          {word.sentence && (
            <div className="px-6 py-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'hsl(var(--muted-foreground))' }}>
                Example
              </div>
              <p className="font-semibold text-base mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                {word.sentence.es}
              </p>
              <p className="text-sm italic mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {word.sentence.en}
              </p>
              <button data-testid="word-detail-sentence-speak"
                onClick={() => speak(word.sentence.es, 'es')}
                className="w-full py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}>
                <Volume2 size={14} /> Hear example sentence
              </button>
            </div>
          )}

          <div className="px-6 py-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              Pronunciation practice
            </div>
            {SR ? (
              <>
                <button data-testid="word-detail-pron-btn" onClick={startPronCheck} disabled={listening}
                  className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all"
                  style={{
                    background: listening ? '#FEE2E2' : 'hsl(var(--card))',
                    borderColor: listening ? '#FCA5A5' : 'hsl(var(--primary))',
                    color: listening ? '#991B1B' : 'hsl(var(--primary))',
                  }}>
                  {listening
                    ? <><MicOff size={14} /> Listening…</>
                    : <><Mic size={14} /> Try saying "{word.es}"</>}
                </button>
                {pronCheck && (
                  <div className="mt-2 p-2.5 rounded-lg text-xs" data-testid="pron-result"
                    style={{
                      background: pronCheck.ok ? '#DCFCE7' : '#FEE2E2',
                      color: pronCheck.ok ? '#14532D' : '#991B1B',
                    }}>
                    <strong>{pronCheck.ok ? 'Well said!' : 'Try again'}</strong> — heard: <em>"{pronCheck.heard}"</em>
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Pronunciation practice not supported in this browser. Try Chrome or Edge.
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t pb-8" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              Your progress
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Stat label="Correct" value={p.c || 0} color="#16A34A" icon={<CheckCircle2 size={12} />} />
              <Stat label="Wrong" value={p.w || 0} color="#DC2626" />
              <Stat label="Accuracy" value={`${acc}%`} color="#D97706" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value, color, icon }) {
  return (
    <div className="rounded-xl py-3 text-center" style={{ background: 'hsl(var(--muted))' }}>
      <div className="text-xl font-black tabular-nums flex items-center justify-center gap-1" style={{ color }}>
        {icon} {value}
      </div>
      <div className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</div>
    </div>
  );
}
