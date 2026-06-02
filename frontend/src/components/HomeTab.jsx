import React from 'react';
import { MASTER } from '../data/words';
import { speak } from '../utils/helpers';
import DailyChallenge from './DailyChallenge';
import { KofiSupport } from './KofiSupport';

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function drillLabel(drillId) {
  return capitalize(drillId.replace(/-/g, ' '));
}

function getWeekDates() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toDateString();
  });
}

export default function HomeTab({ onNavigate, userData, streak, dailyProgress, dailyGoal, onStartDailyChallenge, onStartDrill }) {
  const today = new Date().toDateString();
  const firstName = userData?.displayName?.split(' ')[0] || 'Amigo';
  const todayCount = dailyProgress?.date === today ? (dailyProgress.count || 0) : 0;
  const goal = dailyGoal || 20;

  const dateStr = capitalize(
    new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  );

  // Daily goal SVG ring
  const ringRadius = 20;
  const ringStroke = 4;
  const ringSize = ringRadius * 2 + ringStroke * 2;
  const ringCenter = ringSize / 2;
  const circumference = 2 * Math.PI * ringRadius;
  const dashOffset = circumference - Math.min(todayCount / goal, 1) * circumference;
  const ringColor = todayCount >= goal ? '#16A34A' : '#F59E0B';

  // Word of the day — seeded by date hash, from unmastered words
  const hashSeed = [...today].reduce((a, c) => a + c.charCodeAt(0), 0);
  const unmastered = MASTER.filter(w => {
    const p = userData?.progress?.[w.es];
    return !p || (p.s || 0) < 6;
  });
  const wotdPool = unmastered.length > 0 ? unmastered : MASTER;
  const wotd = wotdPool[hashSeed % wotdPool.length];

  const lastSession = userData?.sessions?.[0];

  return (
    <div className="flex flex-col gap-3 pt-1 pb-20">

      {/* Section 1 — Milo hero */}
      <div
        className="rounded-3xl p-5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="font-serif font-bold text-2xl leading-tight" style={{ color: '#78350F' }}>
            ¡Hola, {firstName}! 🐾
          </div>
          <div className="text-sm font-medium mt-0.5" style={{ color: '#92400E' }}>
            ¡Vamos! ¡Tú puedes!
          </div>
          <div className="text-xs mt-1.5 font-medium" style={{ color: '#92400E' }}>
            {dateStr}
          </div>
        </div>
        <img
          src="/images/milo-icon.jpg"
          alt="Milo"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: '50%',
            border: '3px solid #FCD34D',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Section 2 — Three stat cards */}
      <div className="grid grid-cols-3 gap-2">

        {/* Card 1 — Continue */}
        <button
          onClick={() => onNavigate('study')}
          className="rounded-2xl border p-4 text-left flex flex-col gap-1"
          style={{ background: '#DCFCE7', borderColor: '#86EFAC' }}
        >
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#14532D' }}>
            {lastSession ? 'Continue' : 'Start'}
          </span>
          {lastSession ? (
            <>
              <span className="text-xs font-bold leading-snug" style={{ color: '#14532D' }}>
                {drillLabel(lastSession.drillId)}
              </span>
              <span className="text-xs" style={{ color: '#166534' }}>
                {lastSession.correct}/{lastSession.total}
              </span>
            </>
          ) : (
            <span className="text-xs leading-snug" style={{ color: '#166534' }}>
              Start your first drill 🐾
            </span>
          )}
        </button>

        {/* Card 2 — Daily goal */}
        <div
          className="rounded-2xl border p-4 flex flex-col items-center justify-center"
          style={{ background: '#FEF3C7', borderColor: '#FCD34D' }}
        >
          <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
            <circle
              cx={ringCenter} cy={ringCenter} r={ringRadius}
              fill="none" stroke="hsl(var(--muted))" strokeWidth={ringStroke}
            />
            <circle
              cx={ringCenter} cy={ringCenter} r={ringRadius}
              fill="none" stroke={ringColor} strokeWidth={ringStroke}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transformOrigin: `${ringCenter}px ${ringCenter}px`, transform: 'rotate(-90deg)' }}
            />
            <text
              x={ringCenter} y={ringCenter + 4}
              textAnchor="middle" fontSize="10" fontWeight="700"
              fill={ringColor}
            >
              {todayCount >= 99 ? '99+' : todayCount}
            </text>
          </svg>
          <span className="text-xs mt-1" style={{ color: '#92400E' }}>/ {goal}</span>
        </div>

        {/* Card 3 — Words Mastered */}
        <div
          className="rounded-2xl border p-4 flex flex-col items-center justify-center"
          style={{ background: '#EDE9FE', borderColor: '#DDD6FE' }}
        >
          <span className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Words
          </span>
          <span className="text-2xl font-bold leading-none" style={{ color: '#4C1D95' }}>
            {MASTER.filter(w => (userData?.progress?.[w.es]?.s || 0) >= 6).length}
          </span>
          <span className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>mastered</span>
          <span className="text-base mt-2" style={{ lineHeight: 1 }}>🐾</span>
        </div>

      </div>

      {/* Section 3 — Daily challenges */}
      <DailyChallenge challenges={userData?.dailyChallenges} onStart={onStartDailyChallenge} />

      {/* Section 4 — Word of the day */}
      {wotd && (
        <div className="rounded-2xl border p-4" style={{ background: '#F0FDF4', borderColor: '#86EFAC' }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'hsl(var(--muted-foreground))', letterSpacing: '0.08em' }}>
            Palabra del día
          </div>
          <div className="font-serif font-bold text-2xl leading-tight" style={{ color: '#14532D' }}>
            {wotd.es}
          </div>
          <div className="text-sm mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {wotd.en}
          </div>
          {wotd.contextSentence && (
            <div className="text-xs italic mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {wotd.contextSentence}
            </div>
          )}
          <button
            onClick={() => speak(wotd.es, 'es')}
            className="rounded-full flex items-center justify-center mt-3"
            style={{
              width: 36,
              height: 36,
              background: '#DCFCE7',
              border: '1px solid #86EFAC',
              fontSize: 18,
            }}
            aria-label="Pronounce"
          >
            🔊
          </button>
          {/* TODO: wire to Fetch mechanic when built — launch Fetch session scoped to this word */}
          <button
            disabled
            className="rounded-full text-xs font-bold px-4 py-1.5 mt-2 opacity-50 cursor-not-allowed"
            style={{ background: '#F0FDF4', border: '1px solid #86EFAC', color: '#166634' }}
          >
            Fetch this word 🐾
          </button>
        </div>
      )}

      {/* Section 5 — Ko-fi */}
      <KofiSupport />

    </div>
  );
}
