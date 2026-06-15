import React, { useState } from 'react';
import FlashcardDrill from './drills/FlashcardDrill';

const PILL_CLASS = 'rounded-full border px-4 py-2 font-semibold text-sm transition-all hover:opacity-90 active:scale-95';
const PILL_STYLE = {
  background: 'hsl(var(--card))',
  color: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--border))',
};
const FREDOKA = { fontFamily: "'Fredoka', sans-serif" };

function SectionHeader({ title, sub, muted = false }) {
  return (
    <div className="mb-3">
      <div className="text-xl font-bold leading-tight"
        style={{ ...FREDOKA, color: muted ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))' }}>
        {title}
      </div>
      {sub && (
        <div className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function RowLabel({ label }) {
  return (
    <div className="text-xs font-medium mb-1.5 uppercase tracking-wider"
      style={{ color: 'hsl(var(--muted-foreground))' }}>
      {label}
    </div>
  );
}

const TABS = [
  { key: 'warmup',   label: 'Warm Up' },
  { key: 'practice', label: 'Practice' },
  { key: 'review',   label: 'Review' },
];

export default function DrillsGrid({
  words, stats, drillMode, setDrillMode, onStartDrill, completedPaths = [], studyCategory,
}) {
  const [activeSection, setActiveSection] = useState('practice');
  const [activeFlashcard, setActiveFlashcard] = useState(null);

  if (activeFlashcard) {
    return (
      <FlashcardDrill
        words={words}
        progress={{}}
        onAnswer={() => {}}
        onDone={() => setActiveFlashcard(null)}
        onBack={() => setActiveFlashcard(null)}
        initialDirection={activeFlashcard.initialDirection}
        sentence={activeFlashcard.sentence}
        drillLength={10}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">

      {/* Tab bar */}
      <div className="flex gap-1 mb-3">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className="flex-1 rounded-full py-1.5 text-xs font-semibold transition-all duration-200 border"
            style={{
              background: activeSection === tab.key ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: activeSection === tab.key ? 'white' : 'hsl(var(--muted-foreground))',
              borderColor: activeSection === tab.key ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── WARM UP ── */}
      {activeSection === 'warmup' && (
        <>
          <SectionHeader title="Warm Up" sub="No XP · No bones · Low stakes practice" muted />
          <button onClick={() => onStartDrill('matching', 10)}
            className={`w-full ${PILL_CLASS}`} style={PILL_STYLE}>
            Matching
          </button>
          <button onClick={() => onStartDrill('word-sort', 10)}
            className={`w-full ${PILL_CLASS}`} style={PILL_STYLE}>
            Word Sort
          </button>
          <button onClick={() => onStartDrill('gender', 10)}
            className={`w-full ${PILL_CLASS}`} style={PILL_STYLE}>
            Gender el/la
          </button>
        </>
      )}

      {/* ── PRACTICE ── */}
      {activeSection === 'practice' && (
        <>

          <div>
            <RowLabel label="Multiple Choice" />
            <div className="flex gap-2">
              <button onClick={() => onStartDrill('es-en', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => onStartDrill('en-es', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Type It" />
            <div className="flex gap-2">
              <button onClick={() => onStartDrill('type-es-en', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => onStartDrill('type-en-es', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Hear & Choose" />
            <div className="flex gap-2">
              <button onClick={() => onStartDrill('hear-choose', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => onStartDrill('hear-choose-en-es', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Listen & Type — Words" />
            <div className="flex gap-2">
              <button onClick={() => onStartDrill('listen-type', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => onStartDrill('listen-type-en-es', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Listen & Type — Sentences" />
            <div className="flex gap-2">
              <button onClick={() => onStartDrill('listen-type-sentence', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => onStartDrill('listen-type-sentence-en-es', 10)} className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Conjugation" />
            <button onClick={() => onStartDrill('conjugation', 10)}
              className={`w-full ${PILL_CLASS}`} style={PILL_STYLE}>
              Present Tense
            </button>
          </div>

          {completedPaths.includes('path1') ? (
            <button onClick={() => onStartDrill('sent-build', 10)}
              className={`w-full ${PILL_CLASS}`} style={PILL_STYLE}>
              Sentence Builder
            </button>
          ) : (
            <button disabled
              className={`w-full ${PILL_CLASS} opacity-50`} style={PILL_STYLE}>
              Sentence Builder 🔒
            </button>
          )}
        </>
      )}

      {/* ── REVIEW ── */}
      {activeSection === 'review' && (
        <>
          <SectionHeader title="Review" sub="Passive review · No XP · No bones" muted />

          <div>
            <RowLabel label="Flashcards — Words" />
            <div className="flex gap-2">
              <button onClick={() => setActiveFlashcard({ initialDirection: 'es-en', sentence: false })}
                className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => setActiveFlashcard({ initialDirection: 'en-es', sentence: false })}
                className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>

          <div>
            <RowLabel label="Flashcards — Sentences" />
            <div className="flex gap-2">
              <button onClick={() => setActiveFlashcard({ initialDirection: 'es-en', sentence: true })}
                className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>SP→EN</button>
              <button onClick={() => setActiveFlashcard({ initialDirection: 'en-es', sentence: true })}
                className={`flex-1 ${PILL_CLASS}`} style={PILL_STYLE}>EN→SP</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
