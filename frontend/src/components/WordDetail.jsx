import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, CheckCircle2 } from 'lucide-react';
import { speak } from '../utils/helpers';

const TYPE_LABELS = {
  noun: 'Noun', verb: 'Verb', adj: 'Adjective', adv: 'Adverb',
  phrase: 'Phrase', pronoun: 'Pronoun', article: 'Article', other: 'Word',
};

export default function WordDetail({ word, progress, onClose }) {
  const p = progress || { c: 0, w: 0, s: 0 };
  const total = (p.c || 0) + (p.w || 0);
  const acc = total > 0 ? Math.round((p.c / total) * 100) : 0;
  const article = word.gender === 'm' ? 'el ' : word.gender === 'f' ? 'la ' : '';

  return (
    <div data-testid="word-detail-modal" onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.55)' }}>
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        style={{ background: 'hsl(var(--card))' }}>
        <div className="p-6 pb-4 relative" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(47 91% 53% / 0.12))' }}>
          <button data-testid="word-detail-close" onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
          <div className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {TYPE_LABELS[word.type] || 'Word'}{word.group && word.group !== 'Core' && ` · ${word.group}`}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-serif text-3xl font-black" data-testid="word-detail-es" style={{ color: 'hsl(var(--foreground))' }}>
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
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Example
            </div>
            <div className="flex items-start gap-2 mb-1">
              <p className="flex-1 font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>{word.sentence.es}</p>
              <button data-testid="word-detail-sentence-speak" onClick={() => speak(word.sentence.es, 'es')}
                className="p-1.5 rounded-full transition-colors hover:bg-black/5 flex-shrink-0"
                style={{ color: 'hsl(var(--primary))' }}>
                <Volume2 size={14} />
              </button>
            </div>
            <p className="text-sm italic" style={{ color: 'hsl(var(--muted-foreground))' }}>{word.sentence.en}</p>
          </div>
        )}

        <div className="px-6 py-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Your progress
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Correct" value={p.c || 0} color="#16A34A" icon={<CheckCircle2 size={12} />} />
            <Stat label="Wrong" value={p.w || 0} color="#DC2626" />
            <Stat label="Accuracy" value={`${acc}%`} color="#D97706" />
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
