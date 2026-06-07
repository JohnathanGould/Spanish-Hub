import React, { useState } from 'react';
import FlashcardDrill from './drills/FlashcardDrill';

const ROWS = [
  {
    label: 'Multiple Choice',
    pills: [
      { label: 'SP→EN', drillId: 'es-en' },
      { label: 'EN→SP', drillId: 'en-es' },
    ],
  },
  {
    label: 'Type It',
    pills: [
      { label: 'SP→EN', drillId: 'type-es-en' },
      { label: 'EN→SP', drillId: 'type-en-es' },
    ],
  },
  {
    label: 'Hear & Choose',
    pills: [
      { label: 'SP→EN', drillId: 'hear-choose' },
      { label: 'EN→SP', drillId: 'hear-choose-en-es' },
    ],
  },
  {
    label: 'Listen & Type — Words',
    pills: [
      { label: 'SP→EN', drillId: 'listen-type' },
      { label: 'EN→SP', drillId: 'listen-type-en-es' },
    ],
  },
  {
    label: 'Listen & Type — Sentences',
    pills: [
      { label: 'SP→EN', drillId: 'listen-type-sentence' },
      { label: 'EN→SP', drillId: 'listen-type-sentence-en-es' },
    ],
  },
];

const FLASHCARD_ROWS = [
  {
    label: 'Flashcards — Words',
    pills: [
      { label: 'SP→EN', initialDirection: 'es-en', sentence: false },
      { label: 'EN→SP', initialDirection: 'en-es', sentence: false },
    ],
  },
  {
    label: 'Flashcards — Sentences',
    pills: [
      { label: 'SP→EN', initialDirection: 'es-en', sentence: true },
      { label: 'EN→SP', initialDirection: 'en-es', sentence: true },
    ],
  },
];

export default function DrillsGrid({
  words, stats, drillMode, setDrillMode, onStartDrill, completedPaths = [], studyCategory,
}) {
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
    <div className="flex flex-col gap-4">
      {ROWS.map(({ label, pills }) => (
        <div key={label}>
          <div className="text-xs font-medium mb-1.5 uppercase tracking-wider"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            {label}
          </div>
          <div className="flex gap-2">
            {pills.map(({ label: pillLabel, drillId }) => (
              <button
                key={pillLabel}
                onClick={() => onStartDrill(drillId, 10)}
                className="flex-1 rounded-full border px-4 py-2 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                {pillLabel}
              </button>
            ))}
          </div>
        </div>
      ))}

      {FLASHCARD_ROWS.map(({ label, pills }) => (
        <div key={label}>
          <div className="text-xs font-medium mb-1.5 uppercase tracking-wider"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            {label}
          </div>
          <div className="flex gap-2">
            {pills.map(({ label: pillLabel, initialDirection, sentence }) => (
              <button
                key={pillLabel}
                onClick={() => setActiveFlashcard({ initialDirection, sentence })}
                className="flex-1 rounded-full border px-4 py-2 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                {pillLabel}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
