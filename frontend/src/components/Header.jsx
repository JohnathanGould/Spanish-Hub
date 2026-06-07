import React from 'react';

export default function Header({ user, streak, xp, bones, dailyGoal, dailyProgress, onAvatarClick, onGoalClick, onHomeClick, onXpClick, onStreakClick, streakRiskLevel }) {
  const today = new Date().toDateString();
  const todayCount = dailyProgress?.date === today ? (dailyProgress.count || 0) : 0;
  const goal = dailyGoal || 20;
  const pct = Math.min((todayCount / goal) * 100, 100);
  const goalReached = todayCount >= goal;
  const streakCount = streak?.count || 0;
  const circumference = 2 * Math.PI * 14;
  const dashOffset = circumference - (pct / 100) * circumference;
  const flameClassName = streakRiskLevel > 0
    ? `text-base font-bold flame-risk-${streakRiskLevel}`
    : 'text-base font-bold';

  return (
    <>
    <style>{`
      @keyframes flamePulse1 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.85; }
      }
      @keyframes flamePulse2 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.25); opacity: 0.7; }
      }
      @keyframes flamePulse3 {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.35); opacity: 0.55; }
      }
      .flame-risk-1 { display: inline-block; animation: flamePulse1 2s ease-in-out infinite; }
      .flame-risk-2 { display: inline-block; animation: flamePulse2 1.2s ease-in-out infinite; }
      .flame-risk-3 { display: inline-block; animation: flamePulse3 0.7s ease-in-out infinite; }
    `}</style>
    <header className="app-header" data-testid="app-header">
      <div className="spain-flag-bar" />
      <div className="flex items-center justify-between pt-1">

        {/* LEFT: Milo icon — tap to return home */}
        <button
          type="button"
          onClick={onHomeClick}
          data-testid="header-home-btn"
          className="flex-shrink-0 transition-opacity hover:opacity-80"
          style={{ padding: 0, border: 'none', background: 'none' }}
        >
          <img
            src="/animations/milo_idle.gif"
            alt="Milo"
            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
          />
        </button>

        {/* CENTER: Title, stats row, tagline */}
        <div className="flex flex-col items-center flex-1 mx-3">
          <div className="font-serif font-bold text-lg leading-tight" style={{ color: 'hsl(var(--primary))' }}>
            Milo Speaks Spanish
          </div>

          <div className="flex items-center gap-3 my-1 w-full justify-center md:justify-between md:px-4">

            {/* Daily Goal Circle */}
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

            {/* Streak */}
            <button className="flex flex-col items-center cursor-pointer" data-testid="streak-display"
              onClick={onStreakClick} title="Your streak">
              <span
                className={flameClassName}
                style={{ color: '#F5C518', lineHeight: 1 }}
              >
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

          </div>

          <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Learn · Practice · Master
          </div>
        </div>

        {/* RIGHT: Avatar — taps to open ProfileSheet */}
        <button data-testid="user-menu-btn" onClick={onAvatarClick}
          className="flex-shrink-0 flex items-center justify-center overflow-hidden border-2"
          style={{
            borderColor: 'hsl(var(--border))',
            borderRadius: '50%',
            width: 48,
            height: 48,
            padding: 0,
          }}>
          {user.photoURL
            ? <img src={user.photoURL} alt=""
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
            : <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'hsl(var(--primary))', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700,
              }}>
                {(user.displayName || 'U')[0]}
              </div>
          }
        </button>

      </div>
    </header>
    </>
  );
}
