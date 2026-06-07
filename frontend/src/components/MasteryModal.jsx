import React, { useState, useMemo } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { MASTER } from '../content/es-en/words';

const TIERS = [
  {
    key: 'new',
    label: 'New',
    emoji: '🌱',
    bg: 'hsl(var(--card))',
    border: 'hsl(var(--border))',
    color: 'hsl(var(--muted-foreground))',
    countColor: 'hsl(var(--foreground))',
  },
  {
    key: 'learning',
    label: 'Learning',
    emoji: '📖',
    bg: '#DBEAFE',
    border: '#BFDBFE',
    color: '#1D4ED8',
    countColor: '#1E3A8A',
  },
  {
    key: 'strong',
    label: 'Strong',
    emoji: '💪',
    bg: '#DCFCE7',
    border: '#86EFAC',
    color: '#166534',
    countColor: '#14532D',
  },
  {
    key: 'mastered',
    label: 'Mastered',
    emoji: '⭐',
    bg: '#FEF9C3',
    border: '#FDE047',
    color: '#A16207',
    countColor: '#713F12',
  },
];

const DRILL_OPTIONS = [
  { label: 'Multiple Choice  SP→EN', drillId: 'es-en' },
  { label: 'Multiple Choice  EN→SP', drillId: 'en-es' },
  { label: 'Type It  SP→EN',         drillId: 'type-es-en' },
  { label: 'Type It  EN→SP',         drillId: 'type-en-es' },
];

function getTier(progress) {
  const s  = progress?.stability    || 0;
  const oc = progress?.outputCorrect || 0;
  if (s === 0 && oc === 0)        return 'new';
  if (s >= 30 && oc >= 3)         return 'mastered';
  if (s >= 7  && oc >= 1)         return 'strong';
  return 'learning';
}

export default function MasteryModal({ userData, words, onStartDrill, onClose }) {
  const [activeTier, setActiveTier] = useState(null);

  const tierWords = useMemo(() => {
    const map = { new: [], learning: [], strong: [], mastered: [] };
    MASTER.forEach(word => {
      const tier = getTier(userData.progress?.[word.es]);
      map[tier].push(word);
    });
    return map;
  }, [userData.progress]);

  const activeTierMeta  = TIERS.find(t => t.key === activeTier);
  const activeTierWords = activeTier ? tierWords[activeTier] : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto"
        style={{
          background: 'hsl(var(--card))',
          borderRadius: '24px 24px 0 0',
          maxHeight: '80vh',
        }}
      >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: 'hsl(var(--border))' }}>
        {activeTier ? (
          <button onClick={() => setActiveTier(null)}
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <div className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Your Progress
          </div>
        )}
        <button onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
          <X size={16} />
        </button>
      </div>

      <div className="px-4 py-5">

        {/* Tier grid */}
        {!activeTier && (
          <div className="grid grid-cols-2 gap-3">
            {TIERS.map(tier => (
              <button
                key={tier.key}
                onClick={() => setActiveTier(tier.key)}
                className="rounded-2xl p-4 text-left border transition-all hover:opacity-90 active:scale-95"
                style={{ background: tier.bg, borderColor: tier.border }}
              >
                <div className="text-2xl mb-2">{tier.emoji}</div>
                <div className="text-2xl font-black leading-none mb-1"
                  style={{ color: tier.countColor }}>
                  {tierWords[tier.key].length}
                </div>
                <div className="text-sm font-semibold" style={{ color: tier.color }}>
                  {tier.label}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Mini drill picker */}
        {activeTier && activeTierMeta && (
          <div>
            <div className="mb-4">
              <div className="text-lg font-bold mb-0.5" style={{ color: 'hsl(var(--foreground))' }}>
                Drill {activeTierMeta.label} words
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {activeTierWords.length} word{activeTierWords.length !== 1 ? 's' : ''} in this group
              </div>
            </div>

            {activeTierWords.length === 0 ? (
              <div className="text-center py-10 text-sm"
                style={{ color: 'hsl(var(--muted-foreground))' }}>
                No words in this tier yet.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {DRILL_OPTIONS.map(({ label, drillId }) => (
                  <button
                    key={drillId}
                    onClick={() => { onStartDrill(drillId, 10, activeTierWords); onClose(); }}
                    className="w-full rounded-full border px-4 py-3 font-semibold text-sm text-left transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'hsl(var(--card))',
                      color: 'hsl(var(--foreground))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      </div>
    </>
  );
}
