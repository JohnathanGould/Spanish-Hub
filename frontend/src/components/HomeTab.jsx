/**
 * HomeTab.jsx
 * Home screen component for Milo Speaks Spanish.
 *
 * WRAPPER PATTERN — this component receives all data as props from SpanishHub.jsx.
 * It never queries Firestore directly.
 *
 * Props:
 *   userData        {object}  — Firestore user document (xp, bones, streak, earnedBadges, etc.)
 *   progress        {object}  — word progress map keyed by word.es
 *   completedStops  {array}   — array of completed stop IDs
 *   completedPaths  {array}   — array of completed path IDs
 *   onNavigate      {fn}      — (tabId) => void — navigate to a tab
 *   onContinue      {fn}      — () => void — navigate to current stop in Paths
 *   onOpenMyWords   {fn}      — () => void — navigate to My Words
 *   onStartFetch    {fn}      — (config) => void — launch Fetch with config
 *   onStartTheme    {fn}      — (themeId) => void — launch themed session
 *   currentStop     {object}  — { pathName, stopName, stopIndex, pathIndex, progress } | null
 *   wordOfTheDay    {object}  — { es, en, type, gender, contextSentence, emoji } | null
 *   dailyTheme      {object}  — { name, emoji, wordCount, description, themeId } | null
 *   recentBadges    {array}   — last 3 earned badges [{ id, name, description, emoji, bg, earnedAt }]
 *   streakDays      {number}  — current streak
 *   weekBits        {array}   — 7 booleans [Mon..Sun] — true = completed
 */

import { useEffect, useRef } from 'react';

// ─── Colour tokens (mirror CSS variables in index.css) ───────────────────────
const C = {
  bg:          '#1a1a1a',
  cream:       '#F5F0E8',
  hero:        '#C8A96E',
  green:       '#3B6D11',
  greenLight:  '#EAF3DE',
  greenSage:   '#C0DD97',
  terra:       '#D85A30',
  teal:        '#1D9E75',
  navy:        '#26215C',
  grey:        '#888780',
  amber:       '#4A3B00',
  white:       '#ffffff',
};

// ─── Shared style helpers ─────────────────────────────────────────────────────
const card = {
  background: C.white,
  borderRadius: 14,
  padding: '14px 12px',
};

const secLabel = {
  fontSize: 9,
  fontWeight: 700,
  color: C.teal,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  margin: 0,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroCard({ currentStop, streakDays, onContinue }) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  // Capitalise first letter
  const dateStr = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div style={{
      margin: '12px 12px 0',
      borderRadius: 14,
      overflow: 'hidden',
      position: 'relative',
      padding: '18px 16px 16px',
      minHeight: 175,
      background: C.hero,
    }}>
      {/* Warm ochre gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 110%, #8B6914 0%, #C8A96E 45%, #E8C97A 100%)',
      }} />

      {/* Milo circle — vertically centred right */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: 'translateY(-50%)',
        zIndex: 2,
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '3px solid rgba(255,255,255,0.95)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src="/animations/milo_idle.gif"
            alt="Milo"
            style={{ width: 115, height: 115, objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Left content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 190 }}>
        <p style={{
          fontSize: 20,
          fontWeight: 800,
          color: C.navy,
          lineHeight: 1.1,
          marginBottom: 4,
          fontFamily: 'Nunito, sans-serif',
        }}>
          ¡Hola, Estudiante! 🐾
        </p>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          color: C.green,
          marginBottom: 3,
          fontFamily: 'Nunito, sans-serif',
        }}>
          ¡Vamos! ¡Tú puedes!
        </p>
        <p style={{
          fontSize: 10,
          color: C.amber,
          marginBottom: 14,
          fontFamily: 'Nunito, sans-serif',
        }}>
          {dateStr}
        </p>
        <button
          onClick={onContinue}
          style={{
            background: C.green,
            color: C.cream,
            border: 'none',
            borderRadius: 24,
            padding: '10px 18px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          🐾 Continue learning
        </button>
      </div>
    </div>
  );
}

function StreakCard({ streakDays, weekBits }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
      {/* Header row — fixed height */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 24, marginBottom: 8 }}>
        <p style={secLabel}>Streak</p>
        <FlameIcon />
      </div>
      {/* Stat row — fixed height */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, height: 44, marginBottom: 8 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 38, color: C.navy, fontWeight: 700, lineHeight: 1 }}>
          {streakDays}
        </span>
        <span style={{ fontSize: 11, color: C.grey, alignSelf: 'flex-end', paddingBottom: 4, fontFamily: 'Nunito, sans-serif' }}>
          days
        </span>
      </div>
      {/* Week dots */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: weekBits[i] ? C.green : C.greenLight,
            }} />
            <span style={{ fontSize: 7, color: C.grey, fontFamily: 'Nunito, sans-serif' }}>{d}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 9, color: C.terra, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>
        Keep it up!
      </p>
    </div>
  );
}

function FlameIcon() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    let scale = 1;
    let growing = true;
    let frame;
    const animate = () => {
      scale += growing ? 0.012 : -0.012;
      if (scale >= 1.2) growing = false;
      if (scale <= 1.0) growing = true;
      if (ref.current) ref.current.style.transform = `scale(${scale})`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <span ref={ref} style={{ display: 'inline-block', fontSize: 20 }}>🔥</span>;
}

function MyWordsCard({ progress, onOpenMyWords }) {
  // Derive counts from progress map
  const words = Object.values(progress || {});
  const learned   = words.filter(w => w.c > 0).length;
  const needsReview = words.filter(w => {
    if (!w.due) return false;
    return new Date(w.due) <= new Date();
  }).length;
  const mastered  = words.filter(w => w.outputCorrect >= 3 && w.s >= 4).length;

  return (
    <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
      {/* Header row — fixed height */}
      <div style={{ display: 'flex', alignItems: 'center', height: 24, marginBottom: 8 }}>
        <p style={secLabel}>📚 My Words</p>
      </div>
      {/* Stat row — fixed height, baseline-aligned */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 44, marginBottom: 8 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 24, color: C.green, lineHeight: 1, fontWeight: 700 }}>{learned}</p>
          <p style={{ fontSize: 9, color: C.grey, marginTop: 3, fontFamily: 'Nunito, sans-serif' }}>learned</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 24, color: C.terra, lineHeight: 1, fontWeight: 700 }}>{needsReview}</p>
          <p style={{ fontSize: 9, color: C.terra, marginTop: 3, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>needs review</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 24, color: C.teal, lineHeight: 1, fontWeight: 700 }}>{mastered}</p>
          <p style={{ fontSize: 9, color: C.grey, marginTop: 3, fontFamily: 'Nunito, sans-serif' }}>mastered</p>
        </div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={onOpenMyWords}
          style={{
            background: C.greenLight,
            color: C.green,
            border: 'none',
            borderRadius: 20,
            padding: '7px 12px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          View all words →
        </button>
      </div>
    </div>
  );
}

function WordOfTheDayCard({ wordOfTheDay, onPractice }) {
  if (!wordOfTheDay) return null;
  const { es, en, type, gender, contextSentence, emoji } = wordOfTheDay;
  const typeLabel = [type, gender].filter(Boolean).join(' · ');

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 100%)`,
      borderRadius: 14,
      padding: 16,
    }}>
      <p style={{ ...secLabel, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>⭐ Word of the day</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 32, color: C.white, marginBottom: 2, fontWeight: 700 }}>{es}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 6, fontFamily: 'Nunito, sans-serif' }}>
            {en}{typeLabel ? ` · ${typeLabel}` : ''}
          </p>
          {contextSentence && (
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', fontFamily: 'Nunito, sans-serif' }}>
              {contextSentence}
            </p>
          )}
        </div>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0,
          marginLeft: 12,
        }}>
          {emoji || '📖'}
        </div>
      </div>
      <button
        onClick={() => onPractice(wordOfTheDay)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: C.white,
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 20,
          padding: '7px 14px',
          fontFamily: 'Nunito, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: 12,
        }}
      >
        Practice this word →
      </button>
    </div>
  );
}

function DailyChallengesCard({ onStartFetch, dailyTheme, onStartTheme }) {
  return (
    <div style={card}>
      <p style={{ ...secLabel, marginBottom: 10 }}>🎯 Daily challenges</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>

        {/* Fetch — weakest 5 */}
        <div style={{
          background: C.cream,
          borderRadius: 12,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#FAECE7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>🐕</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 2, fontFamily: 'Nunito, sans-serif' }}>
              Fetch — weakest 5 words
            </p>
            <p style={{ fontSize: 10, color: C.grey, fontFamily: 'Nunito, sans-serif' }}>
              Milo's found the words that need the most work.
            </p>
          </div>
          <button
            onClick={() => onStartFetch({ mode: 'weakest5' })}
            style={{
              background: C.terra,
              color: C.white,
              border: 'none',
              borderRadius: 20,
              padding: '7px 12px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Go 🐾
          </button>
        </div>

        {/* Today's theme */}
        {dailyTheme && (
          <div style={{
            background: C.cream,
            borderRadius: 12,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: '#E1F5EE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>
              {dailyTheme.emoji || '🗂️'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 2, fontFamily: 'Nunito, sans-serif' }}>
                Today's theme — {dailyTheme.name}
              </p>
              <p style={{ fontSize: 10, color: C.grey, fontFamily: 'Nunito, sans-serif' }}>
                {dailyTheme.wordCount} words · {dailyTheme.description}
              </p>
            </div>
            <button
              onClick={() => onStartTheme(dailyTheme.themeId)}
              style={{
                background: C.teal,
                color: C.white,
                border: 'none',
                borderRadius: 20,
                padding: '7px 12px',
                fontFamily: 'Nunito, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Go 🐾
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function KofiCard() {
  return (
    <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: 8 }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#FAECE7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>🐾</div>
      <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, fontFamily: 'Nunito, sans-serif' }}>
        Milo learns free.
      </p>
      <p style={{ fontSize: 10, color: C.grey, lineHeight: 1.4, fontFamily: 'Nunito, sans-serif' }}>
        Enjoy the app? Support Milo on Ko-fi.
      </p>
      <a
        href="https://ko-fi.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: C.terra,
          color: C.white,
          border: 'none',
          borderRadius: 20,
          padding: '7px 12px',
          fontFamily: 'Nunito, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ☕ Buy a treat
      </a>
    </div>
  );
}

function AchievementsCard({ recentBadges }) {
  if (!recentBadges || recentBadges.length === 0) return null;
  return (
    <div style={card}>
      <p style={{ ...secLabel, marginBottom: 10 }}>🏆 Achievements</p>
      {recentBadges.map((badge, i) => (
        <div
          key={badge.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: i < recentBadges.length - 1 ? 8 : 0,
          }}
        >
          <div style={{
            width: 28, height: 28,
            borderRadius: 8,
            background: badge.bg || C.greenLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, flexShrink: 0,
          }}>
            {badge.emoji}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.navy, fontFamily: 'Nunito, sans-serif' }}>{badge.name}</p>
            <p style={{ fontSize: 9, color: C.grey, fontFamily: 'Nunito, sans-serif' }}>{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function HomeTab({
  userData = {},
  progress = {},
  completedStops = [],
  completedPaths = [],
  onNavigate = () => {},
  onContinue = () => {},
  onOpenMyWords = () => {},
  onStartFetch = () => {},
  onStartTheme = () => {},
  currentStop = null,
  wordOfTheDay = null,
  dailyTheme = null,
  recentBadges = [],
  streakDays = 0,
  weekBits = [false, false, false, false, false, false, false],
}) {
  const gutter = { padding: '8px 12px 0' };
  const twoCol = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 8,
    alignItems: 'stretch',
  };

  return (
    <div style={{
      background: C.bg,
      fontFamily: 'Nunito, sans-serif',
      maxWidth: 390,
      minHeight: '100vh',
      paddingBottom: 80, // BottomNav clearance
    }}>

      <HeroCard
        currentStop={currentStop}
        streakDays={streakDays}
        onContinue={onContinue}
      />

      {/* My Words + Achievements */}
      <div style={{ ...gutter }}>
        <div style={twoCol}>
          <MyWordsCard progress={progress} onOpenMyWords={onOpenMyWords} />
          <AchievementsCard recentBadges={recentBadges} />
        </div>
      </div>

      {/* Word of the day */}
      {wordOfTheDay && (
        <div style={gutter}>
          <WordOfTheDayCard
            wordOfTheDay={wordOfTheDay}
            onPractice={(word) => onStartFetch({ mode: 'single', word })}
          />
        </div>
      )}

      {/* Daily challenges */}
      <div style={gutter}>
        <DailyChallengesCard
          onStartFetch={onStartFetch}
          dailyTheme={dailyTheme}
          onStartTheme={onStartTheme}
        />
      </div>

      {/* Ko-fi */}
      <div style={gutter}>
        <KofiCard />
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 12px', textAlign: 'center' }}>
        <p style={{
          fontSize: 12,
          color: C.grey,
          fontStyle: 'italic',
          lineHeight: 1.6,
          fontFamily: 'Nunito, sans-serif',
        }}>
          🐾 Every word you learn is an adventure we share together. 🐾
        </p>
      </div>

    </div>
  );
}
