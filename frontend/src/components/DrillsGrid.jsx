import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DRILLS } from '../data/drillData';

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

const DRILL_META = DRILLS.reduce((acc, d) => { acc[d.id] = d; return acc; }, {});

const SUB_TABS = [
  { key: 'warmup', label: 'Warm Up' },
  { key: 'practice', label: 'Practice' },
  { key: 'review', label: 'Review' },
];

const TAB_DRILLS = {
  warmup: [
    { key: 'matching',    drillId: 'warmup-matching',    metaId: 'matching',    name: 'Matching' },
    { key: 'hear-choose', drillId: 'warmup-hear-choose', metaId: 'hear-choose', name: 'Hear & Choose' },
    { key: 'gender',      drillId: 'warmup-gender',      metaId: 'gender',      name: 'Gender Drill' },
  ],
  practice: [
    { key: 'fill-blank',   drillId: 'fill-blank',  metaId: 'fill-blank',  name: 'Fill in the Blank' },
    { key: 'type-it',                               metaId: 'type-en-es',  name: 'Type It',
      toggle: { options: [{ label: 'EN→SP', drillId: 'type-en-es' }, { label: 'SP→EN', drillId: 'type-es-en' }], defaultIdx: 0 },
    },
    { key: 'listen-type',                           metaId: 'listen-type', name: 'Listen & Type',
      toggle: { options: [{ label: 'word', drillId: 'listen-type' }, { label: 'sentence', drillId: 'listen-type-sentence' }], defaultIdx: 0 },
    },
    { key: 'sent-build',   drillId: 'sent-build',  metaId: 'sent-build',  name: 'Sentence Builder' },
    { key: 'conjugation',  drillId: 'conjugation', metaId: 'conjugation', name: 'Conjugation' },
    { key: 'multi-choice',                          metaId: 'en-es',       name: 'Multiple Choice',
      toggle: { options: [{ label: 'EN→SP', drillId: 'en-es' }, { label: 'SP→EN', drillId: 'es-en' }], defaultIdx: 0 },
    },
  ],
  review: [
    { key: 'flashcard', metaId: 'flashcard', name: 'Flashcard',
      toggle: { options: [{ label: 'words', drillId: 'review-flashcard' }, { label: 'sentences', drillId: 'review-flashcard-sentence' }], defaultIdx: 0 },
    },
  ],
};

export default function DrillsGrid({
  words, stats, drillMode, setDrillMode, onStartDrill, completedPaths = [], studyCategory,
}) {
  const [activeTab, setActiveTab] = useState('practice');
  const [pendingId, setPendingId] = useState(null);
  const [toggleStates, setToggleStates] = useState({});
  const [lockedMsg, setLockedMsg] = useState(null);
  const [drillLength, setDrillLength] = useState(10);
  const [sentenceLockedMsg, setSentenceLockedMsg] = useState(null);

  const handleToggle = (drillKey, idx) => {
    setToggleStates(prev => ({ ...prev, [drillKey]: idx }));
  };

  const getActiveDrillId = (drill) => {
    if (drill.toggle) {
      const idx = toggleStates[drill.key] ?? drill.toggle.defaultIdx;
      return drill.toggle.options[idx].drillId;
    }
    return drill.drillId;
  };

  const handleCardClick = (drill) => {
    if (drill.locked) {
      setLockedMsg(prev => prev === drill.key ? null : drill.key);
      return;
    }
    if (drill.metaId === 'matching' && drillLength > 10) setDrillLength(6);
    setPendingId(prev => prev === drill.key ? null : drill.key);
  };

  const handleStart = (drill) => {
    onStartDrill(getActiveDrillId(drill), drillLength);
    setPendingId(null);
  };

  const renderDrillCard = (drill, i) => {
    const drillMeta = drill.metaId ? (DRILL_META[drill.metaId] || {}) : {};
    const color = drill.color || drillMeta.color || 'amber';
    const s = CARD_STYLES[color] || CARD_STYLES.amber;
    const name = drill.name || drillMeta.name || drill.key;
    const desc = drill.toggle && getActiveDrillId(drill).includes('sentence')
      ? 'Tap to flip · mark each sentence as known or still learning.'
      : (drillMeta.desc || '');
    const activeIdx = drill.toggle ? (toggleStates[drill.key] ?? drill.toggle.defaultIdx) : null;
    const isExpanded = pendingId === drill.key;
    const showLockedMsg = drill.locked && lockedMsg === drill.key;
    const lengthOptions = drill.metaId === 'matching' ? [4, 6, 8, 10] : [10, 20, 30];

    return (
      <motion.div
        key={drill.key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.03, duration: 0.25 }}
        className={'rounded-2xl overflow-hidden' + (drill.locked ? ' opacity-50' : '')}
        style={{ background: s.bg }}
        data-testid={'drill-card-' + drill.key}
      >
        {/* Always-visible row */}
        <div
          className={'flex items-center gap-3 px-4 py-3' + (drill.locked ? ' cursor-not-allowed' : ' cursor-pointer')}
          onClick={drill.locked ? undefined : () => handleCardClick(drill)}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: s.num, color: s.numText }}
          >
            {drill.locked ? '🔒' : i + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-tight" style={{ color: s.title }}>
              {name}
            </div>
            {!drill.locked && desc && (
              <div className="text-xs leading-snug mt-0.5 truncate" style={{ color: s.desc }}>
                {desc}
              </div>
            )}
            {drill.toggle && (
              <div className="flex gap-1 mt-1.5">
                {drill.toggle.options.map((opt, idx) => {
                  const isLocked = opt.drillId === 'listen-type-sentence' && completedPaths.length === 0;
                  return (
                    <button
                      key={opt.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isLocked) { setSentenceLockedMsg(prev => prev === drill.key ? null : drill.key); return; }
                        handleToggle(drill.key, idx);
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold transition-all"
                      style={{
                        background: activeIdx === idx ? 'hsl(var(--primary))' : s.num,
                        color: activeIdx === idx ? 'white' : s.numText,
                        opacity: isLocked ? 0.4 : 1,
                        cursor: isLocked ? 'default' : 'pointer',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {!drill.locked && (
            <div
              className="flex-shrink-0 text-xs transition-transform duration-200"
              style={{ color: s.desc, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▾
            </div>
          )}
        </div>

        {/* Length selector — shown when card is expanded */}
        {isExpanded && (
          <div className="px-4 pb-3" style={{ borderTop: '1px solid ' + s.num }}>
            <div className="text-xs font-medium mb-2 mt-2 text-center" style={{ color: s.desc }}>
              {getActiveDrillId(drill).includes('sentence') ? 'How many sentences?' : 'How many words?'}
            </div>
            <div className={`grid gap-1.5 mb-2 ${drill.metaId === 'matching' ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {lengthOptions.map(n => (
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

        {/* Locked message */}
        {showLockedMsg && (
          <div
            className="px-4 pb-3 text-xs text-center"
            style={{ color: s.desc, borderTop: '1px solid ' + s.num }}
          >
            {drill.lockedMsg}
          </div>
        )}

        {/* Sentence option locked message */}
        {sentenceLockedMsg === drill.key && (
          <div
            className="px-4 pb-3 text-xs text-center"
            style={{ color: s.desc, borderTop: '1px solid ' + s.num }}
          >
            Complete Path 1 to unlock Sentences 🐾
          </div>
        )}
      </motion.div>
    );
  };

  const currentDrills = TAB_DRILLS[activeTab] || [];

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-3">
        {SUB_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setLockedMsg(null); setPendingId(null); setSentenceLockedMsg(null); }}
            className="flex-1 rounded-full py-1.5 text-xs font-semibold transition-all duration-200 border"
            style={{
              background: activeTab === tab.key ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: activeTab === tab.key ? 'white' : 'hsl(var(--muted-foreground))',
              borderColor: activeTab === tab.key ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Drill list */}
      <div className="flex flex-col gap-1.5">
        {currentDrills.map((drill, i) => renderDrillCard(drill, i))}
      </div>
    </div>
  );
}
