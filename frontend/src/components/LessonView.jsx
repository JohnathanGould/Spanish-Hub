import React from 'react';
import { ArrowLeft, Volume2, CheckCircle2, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { speak } from '../utils/helpers';

export default function LessonView({ lessonId, lessonsCompleted, onComplete, onPractice, onBack }) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return null;
  const isCompleted = lessonsCompleted.includes(lesson.id);
  const lessonIdx = LESSONS.findIndex(l => l.id === lessonId);
  const nextLesson = LESSONS[lessonIdx + 1];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-xl flex items-center gap-2"
        style={{ background: 'hsl(var(--background) / 0.92)', borderColor: 'hsl(var(--border))' }}>
        <button data-testid="lesson-back-btn" onClick={onBack}
          className="p-1.5 rounded-lg transition-colors hover:bg-muted"
          style={{ color: 'hsl(var(--muted-foreground))' }}>
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wider font-bold" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Level {lesson.level} · {lesson.duration}
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 pb-10 max-w-prose mx-auto w-full">
        {/* Title block */}
        <div className="mb-7">
          <div className="text-5xl mb-3">{lesson.emoji}</div>
          <h1 className="font-serif text-3xl font-black mb-2" data-testid="lesson-title" style={{ color: 'hsl(var(--foreground))' }}>
            {lesson.title}
          </h1>
          <p className="text-base italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {lesson.subtitle}
          </p>
        </div>

        {/* Body blocks */}
        <div className="space-y-5">
          {lesson.body.map((block, i) => {
            if (block.kind === 'p') {
              return (
                <p key={i} className="text-base leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                  {block.text}
                </p>
              );
            }
            if (block.kind === 'h') {
              return (
                <h3 key={i} className="font-serif text-xl font-bold mt-6 mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                  {block.text}
                </h3>
              );
            }
            if (block.kind === 'examples') {
              return (
                <div key={i} className="rounded-2xl border divide-y"
                  style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                  {block.items.map((ex, j) => (
                    <div key={j} className="px-4 py-3" style={{ borderColor: 'hsl(var(--border))' }}>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base" style={{ color: 'hsl(var(--primary))' }}>
                          {ex.es}
                        </span>
                        <button onClick={() => speak(ex.es, 'es')} data-testid={`lesson-example-speak-${i}-${j}`}
                          className="p-1 rounded-full hover:bg-black/5 transition-colors"
                          style={{ color: 'hsl(var(--muted-foreground))' }}>
                          <Volume2 size={13} />
                        </button>
                      </div>
                      <div className="text-sm" style={{ color: 'hsl(var(--foreground))' }}>{ex.en}</div>
                      {ex.note && (
                        <div className="text-xs italic mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {ex.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            }
            if (block.kind === 'rules') {
              return (
                <ul key={i} className="space-y-2.5">
                  {block.items.map((r, j) => (
                    <li key={j} className="flex gap-3 text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                      <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))', minWidth: 110 }}>
                        {r.label}
                      </span>
                      <span style={{ color: 'hsl(var(--foreground))' }}>{r.text}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.kind === 'tip') {
              return (
                <div key={i} className="rounded-2xl p-4 flex gap-3 border-l-4"
                  style={{ background: 'hsl(47 91% 95%)', borderColor: '#D97706' }}>
                  <Lightbulb size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                  <div className="text-sm" style={{ color: '#78350F' }}>
                    <div className="font-bold uppercase tracking-wider text-xs mb-1">Pro tip</div>
                    {block.text}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Action bar */}
        <div className="mt-10 space-y-3">
          {lesson.practice && lesson.practice.length > 0 && (
            <button data-testid="lesson-practice-btn" onClick={() => onPractice(lesson.practice)}
              className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all hover:-translate-y-0.5"
              style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}>
              <BookOpen size={16} /> Practice these {lesson.practice.length} words
            </button>
          )}
          <button data-testid="lesson-complete-btn" onClick={() => onComplete(lesson.id, !!nextLesson)}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
            style={{
              background: isCompleted ? '#16A34A' : 'hsl(var(--primary))',
              boxShadow: isCompleted ? '0 4px 14px rgba(22,163,74,0.3)' : '0 4px 14px rgba(198,11,30,0.3)',
            }}>
            {isCompleted ? (
              <><CheckCircle2 size={16} /> Completed{nextLesson ? ' — Next lesson' : ' — All done!'}</>
            ) : (
              <>Mark complete <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
