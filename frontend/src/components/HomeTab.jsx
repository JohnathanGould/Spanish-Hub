import { languageConfig } from '../config/languageConfig';
import React from 'react';
import { MASTER } from '../content/es-en/words';
import { getStop } from '../content/es-en/paths';
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

export default function HomeTab({ onNavigate, userData, streak, dailyProgress, dailyGoal, masteredCount, onStartDailyChallenge, onStartDrill, onShowMastery, onContinue, currentStopId }) {
  const today = new Date().toDateString();
  const firstName = userData?.displayName?.split(' ')[0] || 'Estudiante';
  const dateStr = capitalize(
    new Date().toLocaleDateString(languageConfig.dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  );

  // Word of the day — seeded by date hash, from unmastered words
  const hashSeed = [...today].reduce((a, c) => a + c.charCodeAt(0), 0);
  const wotd = MASTER[hashSeed % MASTER.length];

  const lastSession = userData?.sessions?.[0];

  return (
    <div className="flex flex-col gap-2 pt-1 pb-20">

      {/* Section 1 — Milo hero */}
      <div
        className="rounded-3xl p-5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #7a6000, #a07c00)' }}
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="font-serif font-bold text-2xl leading-tight" style={{ color: '#F5C518' }}>
            ¡Hola, {firstName}! 🐾
          </div>
          <div className="text-sm font-medium mt-0.5" style={{ color: '#FDE68A' }}>
            ¡Vamos! ¡Tú puedes!
          </div>
          <div className="text-xs mt-1.5 font-medium" style={{ color: '#FDE68A' }}>
            {dateStr}
          </div>
        </div>
        <img
          src="/animations/milo_idle.gif"
          alt="Milo"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: '50%',
            border: '3px solid #F5C518',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Section 2 — Two stat cards */}
      <div className="grid grid-cols-2 gap-2">

        {/* Card 1 — Continue */}
        <button
          data-testid="home-continue-btn"
          onClick={() => (onContinue ? onContinue() : onNavigate('study'))}
          className="rounded-2xl border px-3 py-2.5 text-left flex items-center gap-2"
          style={{ background: '#DCFCE7', borderColor: '#86EFAC' }}
        >
          <span className="text-lg" style={{ lineHeight: 1 }}>▶️</span>
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: '#14532D' }}>
              {currentStopId ? 'Continue' : (lastSession ? 'Continue' : 'Start')}
            </div>
            <div className="text-xs font-bold truncate" style={{ color: '#166534' }}>
              {currentStopId
                ? (getStop(currentStopId)?.title || 'Next Stop 🐾')
                : (lastSession ? drillLabel(lastSession.drillId) : 'First drill 🐾')}
            </div>
          </div>
        </button>

        {/* Card 2 — Words Mastered */}
        <div
          onClick={() => onShowMastery()}
          className="rounded-2xl border px-3 py-2.5 flex items-center gap-2 cursor-pointer"
          style={{ background: '#EDE9FE', borderColor: '#DDD6FE' }}
        >
          <span className="text-xl font-bold leading-none" style={{ color: '#4C1D95' }}>
            {masteredCount}
          </span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>Words</div>
            <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>mastered 🐾</div>
          </div>
        </div>

      </div>

      {/* Section 3 — Daily challenges */}
      <DailyChallenge challenges={userData?.dailyChallenges} onStart={onStartDailyChallenge} />

      {/* Section 4 — Word of the day */}
      {wotd && (
        <div className="rounded-2xl border px-3 py-2.5" style={{ background: '#F0FDF4', borderColor: '#86EFAC' }}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))', letterSpacing: '0.08em' }}>
                Palabra del día
              </div>
              <div className="font-serif font-bold text-xl leading-tight" style={{ color: '#14532D' }}>
                {wotd.es}
              </div>
              <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {wotd.en}
              </div>
              {wotd.contextSentence && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {wotd.contextSentence}
                  </span>
                  <button
                    onClick={() => speak(wotd.contextSentence, languageConfig.sourceLanguage)}
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ width: 18, height: 18, background: '#DCFCE7', border: '1px solid #86EFAC', fontSize: 10 }}
                    aria-label="Pronounce sentence"
                  >
                    🔊
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => speak(wotd.es, languageConfig.sourceLanguage)}
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{ width: 26, height: 26, background: '#DCFCE7', border: '1px solid #86EFAC', fontSize: 13 }}
              aria-label="Pronounce"
            >
              🔊
            </button>
          </div>
        </div>
      )}

      {/* Section 5 — Ko-fi */}
      <KofiSupport />

    </div>
  );
}
