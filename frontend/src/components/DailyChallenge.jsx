import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Check, Zap } from 'lucide-react';
import { DAILY_THEMES } from '../data/lessons';

export default function DailyChallenge({ challenges, onStart }) {
  const today = new Date().toDateString();
  const sameDay = challenges?.date === today;
  const weakDone = sameDay && challenges?.weakDone;
  const themeDone = sameDay && challenges?.themeDone;
  const weakActive = weakActive;
  const themeActive = themeActive;

  const theme = DAILY_THEMES[new Date().getDay()];

  return (
    <div className="mb-3 flex gap-2" data-testid="daily-challenges">

      {/* Weak words challenge */}
      <motion.button
        data-testid="daily-weak-card"
        whileHover={weakActive ? { y: -1 } : {}}
        disabled={weakDone}
        onClick={() => weakActive && onStart('weak')}
        className="flex-1 relative overflow-hidden rounded-2xl px-3 py-2.5 text-left border transition-all"
        style={{
          background: weakDone ? '#DCFCE7' : 'linear-gradient(135deg,#C60B1E,#E22034)',
          borderColor: weakDone ? '#86EFAC' : 'transparent',
          color: weakDone ? '#14532D' : '#FFFFFF',
          boxShadow: weakDone ? 'none' : '0 4px 12px rgba(198,11,30,0.25)',
          cursor: weakDone ? 'default' : 'pointer',
        }}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <Flame size={12} />
          <span className="text-xs font-bold uppercase tracking-wide opacity-90">Daily</span>
          {weakDone
            ? <Check size={11} className="ml-auto" />
            : <Zap size={11} className="ml-auto opacity-80" />}
        </div>
        <div className="text-xs font-black leading-tight">5 weakest words</div>
        <div className="text-xs opacity-75 mt-0.5">{weakDone ? 'Done today!' : '2× XP'}</div>
      </motion.button>

      {/* Theme challenge */}
      <motion.button
        data-testid="daily-theme-card"
        whileHover={themeActive ? { y: -1 } : {}}
        disabled={themeDone}
        onClick={() => themeActive && onStart('theme')}
        className="flex-1 relative overflow-hidden rounded-2xl px-3 py-2.5 text-left border transition-all"
        style={{
          background: themeDone ? '#DCFCE7' : 'linear-gradient(135deg,#D97706,#F5C518)',
          borderColor: themeDone ? '#86EFAC' : 'transparent',
          color: themeDone ? '#14532D' : '#451A03',
          boxShadow: themeDone ? 'none' : '0 4px 12px rgba(217,119,6,0.25)',
          cursor: themeDone ? 'default' : 'pointer',
        }}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <Sparkles size={12} />
          <span className="text-xs font-bold uppercase tracking-wide opacity-90">Theme</span>
          {themeDone
            ? <Check size={11} className="ml-auto" />
            : <Zap size={11} className="ml-auto opacity-80" />}
        </div>
        <div className="text-xs font-black leading-tight">{theme.emoji} {theme.label}</div>
        <div className="text-xs opacity-75 mt-0.5">{themeDone ? 'Done today!' : '1.5× XP'}</div>
      </motion.button>

    </div>
  );
}
