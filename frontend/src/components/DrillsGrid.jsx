import React from 'react';
import { motion } from 'framer-motion';
import { DRILLS } from '../data/drillData';
import { masteryLevel } from '../utils/helpers';

const CARD_STYLES = {
  amber: { bg: '#FEF3C7', num: '#FDE68A', numText: '#78350F', title: '#451A03', desc: '#92400E' },
  teal: { bg: '#CCFBF1', num: '#99F6E4', numText: '#134E4A', title: '#042F2E', desc: '#0F766E' },
  coral: { bg: '#FFEDD5', num: '#FED7AA', numText: '#7C2D12', title: '#431407', desc: '#9A3412' },
  green: { bg: '#DCFCE7', num: '#BBF7D0', numText: '#14532D', title: '#052E16', desc: '#166534' },
  rose: { bg: '#FFE4E6', num: '#FECDD3', numText: '#881337', title: '#4C0519', desc: '#9F1239' },
  purple: { bg: '#EDE9FE', num: '#DDD6FE', numText: '#3B0764', title: '#2E1065', desc: '#4C1D95' },
  stone: { bg: '#F5F5F4', num: '#E7E5E4', numText: '#44403C', title: '#1C1917', desc: '#57534E' },
  violet: { bg: '#F5F3FF', num: '#EDE9FE', numText: '#4C1D95', title: '#2E1065', desc: '#5B21B6' },
  fuchsia: { bg: '#FDF4FF', num: '#F5D0FE', numText: '#701A75', title: '#4A044E', desc: '#86198F' },
  blue: { bg: '#DBEAFE', num: '#BFDBFE', numText: '#1E3A8A', title: '#172554', desc: '#1D4ED8' },
  indigo: { bg: '#E0E7FF', num: '#C7D2FE', numText: '#3730A3', title: '#1E1B4B', desc: '#4338CA' },
  sky: { bg: '#E0F2FE', num: '#BAE6FD', numText: '#0C4A6E', title: '#082F49', desc: '#0369A1' },
  orange: { bg: '#FFF7ED', num: '#FED7AA', numText: '#7C2D12', title: '#431407', desc: '#C2410C' },
  lime: { bg: '#F7FEE7', num: '#D9F99D', numText: '#365314', title: '#1A2E05', desc: '#3F6212' },
  pink: { bg: '#FDF2F8', num: '#F5D0E8', numText: '#6D1B4E', title: '#500D38', desc: '#86185E' },
};

const DRILL_LABELS = {
  flashcard: 'Flashcards', 'es-en': 'Sp → En', 'en-es': 'En → Sp',
  'type-es-en': 'Type Sp→En', 'type-en-es': 'Type En→Sp',
  conjugation: 'Conjugation', 'past-tense': 'Preterite', gender: 'Gender',
  matching: 'Matching', 'word-sort': 'Word Sort', 'en-word-sort': 'En Sort',
  'hear-choose': 'Hear', 'listen-type': 'Listen', 'sent-build': 'Sentences', 'fill-blank': 'Fill Blank',
};

export default function DrillsGrid({ words, stats, drillMode, setDrillMode, onStartDrill }) {
  const notMastered = words.length - stats.mastered;
  const masteredLabel = drillMode === 'mastered' ? '✓ Review mode' : `${stats.mastered} mastered`;
  const weakLabel = drillMode === 'weak' ? '✓ Focus mode' : `${notMastered} not yet mastered`;

  const drillLabel = drillMode === 'weak' ? `${words.length} unmastered words`
    : drillMode === 'mastered' ? `${words.length} mastered words`
    : `All ${words.length} words`;

  return (
    <div>
      {/* Mode filter buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button data-testid="mode-weak-btn"
          onClick={() => setDrillMode(drillMode === 'weak' ? 'all' : 'weak')}
          className="rounded-xl px-4 py-3 border text-sm font-medium transition-all duration-200"
          style={{
            background: drillMode === 'weak' ? '#FEF4E0' : 'hsl(var(--card))',
            borderColor: drillMode === 'weak' ? '#F6D080' : 'hsl(var(--border))',
            color: drillMode === 'weak' ? '#78350F' : 'hsl(var(--foreground))',
          }}>
          <div className="text-xl font-bold">{notMastered}</div>
          <div className="text-xs mt-0.5 opacity-75">{weakLabel}</div>
        </button>
        <button data-testid="mode-mastered-btn"
          onClick={() => setDrillMode(drillMode === 'mastered' ? 'all' : 'mastered')}
          className="rounded-xl px-4 py-3 border text-sm font-medium transition-all duration-200"
          style={{
            background: drillMode === 'mastered' ? '#DCFCE7' : 'hsl(var(--card))',
            borderColor: drillMode === 'mastered' ? '#86EFAC' : 'hsl(var(--border))',
            color: drillMode === 'mastered' ? '#14532D' : 'hsl(var(--foreground))',
          }}>
          <div className="text-xl font-bold">{stats.mastered}</div>
          <div className="text-xs mt-0.5 opacity-75">{masteredLabel}</div>
        </button>
      </div>
      <p className="text-xs mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Drilling: {drillLabel} — tap again to reset filter
      </p>

      {/* Drill cards */}
      <div className="grid grid-cols-2 gap-2">
        {DRILLS.map((drill, i) => {
          const s = CARD_STYLES[drill.color] || CARD_STYLES.amber;
          return (
            <motion.div
              key={drill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className={`drill-card${drill.wide ? ' col-span-2' : ''}`}
              style={{ background: s.bg }}
              onClick={() => onStartDrill(drill.id)}
              data-testid={`drill-card-${drill.id}`}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mb-2"
                style={{ background: s.num, color: s.numText }}>
                {drill.n}
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: s.title }}>{drill.name}</div>
              <div className="text-xs leading-relaxed" style={{ color: s.desc }}>{drill.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
