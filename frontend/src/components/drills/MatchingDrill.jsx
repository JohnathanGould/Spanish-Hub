import React, { useState } from 'react';
import { DRILLS } from '../data/drillData';
import { motion } from 'framer-motion';

const CARD_STYLES = {
  amber:   { bg: '#FEF3C7', num: '#FDE68A', numText: '#78350F', title: '#451A03', desc: '#92400E' },
  teal:    { bg: '#CCFBF1', num: '#99F6E4', numText: '#134E4A', title: '#042F2E', desc: '#0F766E' },
  coral:   { bg: '#FFEDD5', num: '#FED7AA', numText: '#7C2D12', title: '#431407', desc: '#9A3412' },
  green:   { bg: '#DCFCE7', num: '#BBF7D0', numText: '#14532D', title: '#052E16', desc: '#166534' },
  rose:    { bg: '#FFE4E6', num: '#FECDD3', numText: '#881337', title: '#4C0519', desc: '#9F1239' },
  purple:  { bg: '#EDE9FE', num: '#DDD6FE', numText: '#3B0764', title: '#2E1065', desc: '#4C1D95' },
  stone:   { bg: '#F5F5F4', num: '#E7E5E4', numText: '#44403C', title: '#1C1917', desc: '#57534E' },
  violet:  { bg: '#F5F3FF', num: '#EDE9FE', numText: '#4C1D95', title: '#2E1065', desc: '#5B21B6' },
  fuchsia: { bg: '#FDF4FF', num: '#F5D0FE', numText: '#701A75', title: '#4A044E', desc: '#86198F' },
  blue:    { bg: '#DBEAFE', num: '#BFDBFE', numText: '#1E3A8A', title: '#172554', desc: '#1D4ED8' },
  indigo:  { bg: '#E0E7FF', num: '#C7D2FE', numText: '#3730A3', title: '#1E1B4B', desc: '#4338CA' },
  sky:     { bg: '#E0F2FE', num: '#BAE6FD', numText: '#0C4A6E', title: '#082F49', desc: '#0369A1' },
  orange:  { bg: '#FFF7ED', num: '#FED7AA', numText: '#7C2D12', title: '#431407', desc: '#C2410C' },
  lime:    { bg: '#F7FEE7', num: '#D9F99D', numText: '#365314', title: '#1A2E05', desc: '#3F6212' },
  pink:    { bg: '#FDF2F8', num: '#F5D0E8', numText: '#6D1B4E', title: '#500D38', desc: '#86185E' },
};

export default function DrillsGrid({ words, stats, drillMode, setDrillMode, onStartDrill, completedPaths = [] }) {
  const [pendingId, setPendingId] = useState(null);
  const [drillLength, setDrillLength] = useState(10);

  const notMastered = words.length - stats.mastered;
  const masteredLabel = drillMode === 'mastered' ? 'Review mode' : stats.mastered + ' mastered';
  const weakLabel = drillMode === 'weak' ? 'Focus mode' : notMastered + ' not yet mastered';
  const drillLabel = drillMode === 'weak' ? words.length + ' unmastered words'
    : drillMode === 'mastered' ? words.length + ' mastered words'
    : 'All ' + words.length + ' words';

  const handleCardClick = (drill) => {
    if (drill.id === 'matching' && drillLength > 8) setDrillLength(6);
    setPendingId(pendingId === drill.id ? null : drill.id);
  };

  const handleStart = (drill) => {
    onStartDrill(drill.id, drillLength);
    setPendingId(null);
  };

  return (
    <div>
      {/* Mode filter pills — compact single row */}
      <div className="flex gap-2 mb-2">
        <button
          data-testid="mode-weak-btn"
          onClick={() => setDrillMode(drillMode === 'weak' ? 'all' : 'weak')}
          className="flex-1 rounded-full px-3 py-1.5 border text-xs font-semibold transition-all duration-200"
          style={{
            background: drillMode === 'weak' ? '#FEF4E0' : 'hsl(var(--card))',
            borderColor: drillMode === 'weak' ? '#F6D080' : 'hsl(var(--border))',
            color: drillMode === 'weak' ? '#78350F' : 'hsl(var(--muted-foreground))',
          }}>
          {notMastered} not mastered
        </button>
        <button
          data-testid="mode-mastered-btn"
          onClick={() => setDrillMode(drillMode === 'mastered' ? 'all' : 'mastered')}
          className="flex-1 rounded-full px-3 py-1.5 border text-xs font-semibold transition-all duration-200"
          style={{
            background: drillMode === 'mastered' ? '#DCFCE7' : 'hsl(var(--card))',
            borderColor: drillMode === 'mastered' ? '#86EFAC' : 'hsl(var(--border))',
            color: drillMode === 'mastered' ? '#14532D' : 'hsl(var(--muted-foreground))',
          }}>
          {stats.mastered} mastered
        </button>
      </div>
      <p className="text-xs mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {drillLabel} — tap a pill to filter, tap again to reset
      </p>

      {/* Drill list — single column, compact rows */}
      <div className="flex flex-col gap-1.5">
        {DRILLS.map((drill, i) => {
          const s = CARD_STYLES[drill.color] || CARD_STYLES.amber;
          const isLocked = drill.id === 'past-tense' && !completedPaths.includes('path-5');
          const isExpanded = pendingId === drill.id;

          return (
            <motion.div
              key={drill.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              className={'rounded-2xl overflow-hidden' + (isLocked ? ' opacity-50' : '')}
              style={{ background: s.bg }}
              data-testid={'drill-card-' + drill.id}
            >
              {/* Row — always visible */}
              <div
                className={'flex items-center gap-3 px-4 py-3' + (isLocked ? ' cursor-not-allowed' : ' cursor-pointer')}
                onClick={() => !isLocked && handleCardClick(drill)}
              >
                {/* Number badge */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: s.num, color: s.numText }}
                >
                  {isLocked ? '🔒' : drill.n}
                </div>

                {/* Name + description */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold leading-tight" style={{ color: s.title }}>
                    {drill.name}
                  </div>
                  <div className="text-xs leading-snug mt-0.5 truncate" style={{ color: s.desc }}>
                    {isLocked ? 'Complete Path 5 to unlock' : drill.desc}
                  </div>
                </div>

                {/* Chevron */}
                {!isLocked && (
                  <div
                    className="flex-shrink-0 text-xs transition-transform duration-200"
                    style={{
                      color: s.desc,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▾
                  </div>
                )}
              </div>

              {/* Expanded selector */}
              {isExpanded && (
                <div
                  className="px-4 pb-3"
                  style={{ borderTop: '1px solid ' + s.num }}
                >
                  <div className="text-xs font-medium mb-2 mt-2 text-center" style={{ color: s.desc }}>
                    How many words?
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-2">
                    {(drill.id === 'matching' ? [4, 6, 8] : [10, 20, 30]).map(n => (
                      <button
                        key={n}
                        onClick={(e) => { e.stopPropagation(); setDrillLength(n); }}
                        className="py-1.5 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: drillLength === n ? 'hsl(var(--primary))' : s.num,
                          color: drillLength === n ? 'white' : s.numText,
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStart(drill); }}
                    className="w-full py-2 rounded-lg text-xs font-bold text-white"
                    style={{ background: 'hsl(var(--primary))' }}
                  >
                    Start
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
