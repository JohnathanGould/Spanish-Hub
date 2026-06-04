import React from 'react';
import SpanishFlag from './SpanishFlag';

export default function Header({ user, streak, xp, bones, dailyGoal, dailyProgress, onAvatarClick, onGoalClick, onHomeClick, onXpClick }) {
  const today = new Date().toDateString();
  const todayCount = dailyProgress?.date === today ? (dailyProgress.count || 0) : 0;
  const goal = dailyGoal || 20;
  const pct = Math.min((todayCount / goal) * 100, 100);
  const goalReached = todayCount >= goal;
  const streakCount = streak?.count || 0;
  const circumference = 2 * Math.PI * 14;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <header className="app-header" data-testid="app-header">
      <div className="spain-flag-bar" />
      <div className="flex items-center justify-between pt-1">

        {/* LEFT: Logo — tap to return home */}
        <button
          type="button"
          onClick={onHomeClick}
          data-testid="header-home-btn"
          className="flex items-center gap-2 text-left transition-opacity hover:opacity-80"
        >
          <SpanishFlag size={28} />
          <div>
            <div className="font-serif font-bold text-base leading-tight" style={{ color: 'hsl(var(--foreground))' }}>
              Milo Speaks Spanish
            </div>
            <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Learn · Practice · Master
            </div>
          </div>
        </button>

        {/* RIGHT: Stats */}
        <div className="flex items-center gap-3">

          {/* Daily Goal Circle — no "goal" label */}
          <button onClick={onGoalClick} data-testid="daily-goal-btn"
            className="flex flex-col items-center cursor-pointer" title={`${todayCount}/${goal} today`}>
            <svg width="34" height="34" viewBox="0 0 34 34">
              <circle cx="17" cy="17" r="14" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle cx="17" cy="17" r="14" fill="none"
                stroke={goalReached ? '#16A34A' : '#F5C518'}
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="goal-circle"
                style={{ transformOrigin: '17px 17px', transform: 'rotate(-90deg)' }}
              />
              <text x="17" y="21" textAnchor="middle" fontSize="9" fontWeight="700"
                fill={goalReached ? '#16A34A' : 'hsl(var(--foreground))'}>
                {todayCount >= 99 ? '99+' : todayCount}
              </text>
            </svg>
          </button>

          {/* Streak — tappable, goes to streak screen (future) */}
          <button className="flex flex-col items-center cursor-pointer" data-testid="streak-display"
            onClick={() => {}} title="Your streak">
            <span className="text-base font-bold" style={{ color: '#F5C518', lineHeight: 1 }}>
              {streakCount > 0 ? '🔥' : '💤'}
            </span>
            <span className="text-xs font-bold" style={{ color: streakCount > 0 ? '#D97706' : 'hsl(var(--muted-foreground))' }}>
              {streakCount}d
            </span>
          </button>

          {/* Bones */}
          <div className="flex flex-col items-center" data-testid="bones-display">
            <span className="text-base font-bold" style={{ lineHeight: 1 }}>🦴</span>
            <span className="text-xs font-bold" style={{ color: '#D97706' }}>{bones}</span>
          </div>

          {/* XP / Star — taps to open weekly leaderboard */}
          <button onClick={onXpClick} className="flex flex-col items-center cursor-pointer" data-testid="xp-display">
            <span className="text-base font-bold" style={{ color: '#F5C518', lineHeight: 1 }}>⭐</span>
            <span className="text-xs font-bold" style={{ color: '#D97706' }}>
              {xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp}
            </span>
          </button>

          {/* User Avatar — taps to open ProfileSheet */}
          <button data-testid="user-menu-btn" onClick={onAvatarClick}
            className="flex items-center justify-center overflow-hidden border-2"
            style={{
              borderColor: 'hsl(var(--border))',
              borderRadius: '50%',
              width: 32,
              height: 32,
              padding: 0,
            }}>
            {user.photoURL
              ? <img src={user.photoURL} alt=""
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
              : <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'hsl(var(--primary))', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                }}>
                  {(user.displayName || 'U')[0]}
                </div>
            }
          </button>

        </div>
      </div>
    </header>
  );
}
