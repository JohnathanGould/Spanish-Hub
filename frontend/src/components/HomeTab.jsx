import React from 'react';
import DailyChallenge from './DailyChallenge';

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

      <a
        href="https://ko-fi.com/milospeaksspanish"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-3.5 text-sm font-medium transition-all active:scale-[0.98] mt-1"
        style={{
          background: '#FFF7ED',
          color: '#92400E',
          border: '1px solid #FDE68A',
        }}
      >
        ☕ Buy Milo a treat
      </a>
    </div>
  );
}
