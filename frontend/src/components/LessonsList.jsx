import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Clock, BookOpen, Award } from 'lucide-react';
import { LESSONS } from '../data/lessons';

export default function LessonsList({ lessonsCompleted = [], onOpenLesson, onShowCertificate }) {
  const completedSet = new Set(lessonsCompleted);
  const completedCount = LESSONS.filter(l => completedSet.has(l.id)).length;
  const pct = Math.round((completedCount / LESSONS.length) * 100);
  const allDone = completedCount === LESSONS.length;

  return (
    <div data-testid="lessons-list" className="relative z-0">
      {/* Header banner */}
      <div className="rounded-2xl p-5 mb-4 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#7C2D12,#C9745E)', boxShadow: '0 8px 24px rgba(124,45,18,0.25)' }}>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={22} />
          <h2 className="font-serif text-xl font-bold">The Spanish Course</h2>
        </div>
        <p className="text-xs opacity-90 mb-3">12 hand-crafted lessons · taught the way a real tutor would teach you.</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.25)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: '#F5C518' }} />
          </div>
          <div className="text-xs font-bold tabular-nums" data-testid="lessons-progress">{completedCount}/{LESSONS.length}</div>
        </div>
      </div>

      {/* Mastery certificate banner */}
      {allDone && onShowCertificate && (
        <motion.button
          data-testid="certificate-banner"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onClick={onShowCertificate}
          className="w-full rounded-2xl p-4 mb-4 text-left flex items-center gap-3 transition-all hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg,#F5C518,#FBBF24)',
            color: '#451A03',
            boxShadow: '0 8px 24px rgba(245,197,24,0.3)',
          }}>
          <Award size={28} className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base font-black">¡Felicidades! Course mastered.</div>
            <div className="text-xs opacity-90">Tap to view & download your certificate</div>
          </div>
        </motion.button>
      )}

      {/* Lesson cards */}
      <div className="space-y-2">
        {LESSONS.map((lesson, i) => {
          const isCompleted = completedSet.has(lesson.id);
          const prevCompleted = i === 0 || completedSet.has(LESSONS[i - 1].id);
          // Allow opening any lesson (no hard locks) but visually indicate prerequisite
          const isLocked = !prevCompleted && !isCompleted;
          return (
            <motion.button
              key={lesson.id}
              data-testid={`lesson-card-${lesson.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              onClick={() => onOpenLesson(lesson.id)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all hover:-translate-y-0.5"
              style={{
                background: isCompleted ? 'hsl(142 76% 96%)' : 'hsl(var(--card))',
                borderColor: isCompleted ? 'hsl(142 76% 60%)' : 'hsl(var(--border))',
                opacity: isLocked ? 0.7 : 1,
              }}>
              <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{ background: isCompleted ? '#16A34A' : 'hsl(var(--muted))' }}>
                {isCompleted ? <CheckCircle2 size={22} className="text-white" /> : <span>{lesson.emoji}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Level {lesson.level}
                  </span>
                  {isLocked && <Lock size={11} style={{ color: 'hsl(var(--muted-foreground))' }} />}
                </div>
                <div className="font-serif font-bold text-sm leading-tight truncate" style={{ color: 'hsl(var(--foreground))' }}>
                  {lesson.title}
                </div>
                <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Clock size={11} /> {lesson.duration}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
