import React from 'react';
import DailyChallenge from './DailyChallenge';

const NAV_CARDS = [
  { id: 'learn', title: 'Learn', bg: '#EDE9FE', titleColor: '#2E1065', descColor: '#4C1D95' },
  { id: 'words', title: 'My Words', bg: '#CCFBF1', titleColor: '#042F2E', descColor: '#0F766E' },
  { id: 'study', title: 'Study', bg: '#FEF3C7', titleColor: '#451A03', descColor: '#92400E' },
  { id: 'sofia', title: 'Talk to Milo', bg: '#E0F2FE', titleColor: '#0C4A6E', descColor: '#0369A1' },
];

export default function HomeTab({
  onNavigate,
  userData,
  streak,
  dailyProgress,
  dailyGoal,
  onStartDailyChallenge,
}) {
  const today = new Date().toDateString();
  const todayCount = dailyProgress?.date === today ? (dailyProgress.count || 0) : 0;
  const goal = dailyGoal || 20;
  const streakCount = streak?.count || 0;

  return (
    <div className="flex flex-col gap-3 pt-1">
      <DailyChallenge
        challenges={userData?.dailyChallenges}
        onStart={onStartDailyChallenge}
      />

      <div className="flex flex-col gap-3">
        {NAV_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            data-testid={`home-nav-${card.id}`}
            onClick={() => onNavigate(card.id)}
            className="w-full rounded-2xl px-5 py-5 text-left transition-all active:scale-[0.98]"
            style={{ background: card.bg }}
          >
            <div className="text-lg font-bold leading-tight" style={{ color: card.titleColor }}>
              {card.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
