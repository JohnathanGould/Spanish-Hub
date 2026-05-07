import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Check, Zap } from 'lucide-react';
import { DAILY_THEMES } from '../data/lessons';

export default function DailyChallenge({ challenges, onStart }) {
  const today = new Date().toDateString();
  const sameDay = challenges?.date === today;
  const weakDone = sameDay && challenges?.weakDone;
  const themeDone = sameDay && challenges?.themeDone;

  const theme = DAILY_THEMES[new Date().getDay()];

  return (
    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5" data-testid="daily-challenges">
      {/* Weak words challenge */}
      <motion.button
        data-testid="daily-weak-card"
        whileHover={!weakDone ? { y: -2 } : {}}
        disabled={weakDone}
        onClick={() => !weakDone && onStart('weak')}
        className="relative overflow-hidden rounded-2xl p-4 text-left border transition-all"
        style={{
          background: weakDone ? '#DCFCE7' : 'linear-gradient(135deg,#C60B1E,#E22034)',
          borderColor: weakDone ? '#86EFAC' : 'transparent',
          color: weakDone ? '#14532D' : '#FFFFFF',
          boxShadow: weakDone ? 'none' : '0 6px 20px rgba(198,11,30,0.25)',
          cursor: weakDone ? 'default' : 'pointer',
        }}>
        <div className="flex items-center gap-2 mb-1">
          <Flame size={16} />
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">Daily challenge</span>
        </div>
        <div className="font-serif text-base font-black mb-0.5">5 weakest words</div>
        <div className="text-xs opacity-90 mb-2">Quick blast — 5 questions, 2× XP</div>
        {weakDone ? (
          <div className="text-xs font-bold flex items-center gap-1"><Check size={13} /> Done today!</div>
        ) : (
          <div className="text-xs font-bold flex items-center gap-1 opacity-95"><Zap size={12} /> Tap to start</div>
        )}
      </motion.button>

      {/* Theme challenge */}
      <motion.button
        data-testid="daily-theme-card"
        whileHover={!themeDone ? { y: -2 } : {}}
        disabled={themeDone}
        onClick={() => !themeDone && onStart('theme')}
        className="relative overflow-hidden rounded-2xl p-4 text-left border transition-all"
        style={{
          background: themeDone ? '#DCFCE7' : 'linear-gradient(135deg,#D97706,#F5C518)',
          borderColor: themeDone ? '#86EFAC' : 'transparent',
          color: themeDone ? '#14532D' : '#451A03',
          boxShadow: themeDone ? 'none' : '0 6px 20px rgba(217,119,6,0.25)',
          cursor: themeDone ? 'default' : 'pointer',
        }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">Theme of the day</span>
        </div>
        <div className="font-serif text-base font-black mb-0.5">{theme.emoji} {theme.label}</div>
        <div className="text-xs opacity-90 mb-2">Flashcard sprint — 1.5× XP</div>
        {themeDone ? (
          <div className="text-xs font-bold flex items-center gap-1"><Check size={13} /> Done today!</div>
        ) : (
          <div className="text-xs font-bold flex items-center gap-1 opacity-95"><Zap size={12} /> Tap to start</div>
        )}
      </motion.button>
    </div>
  );
}
