import React, { useState } from 'react';
import { Bell, BellOff, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function StreakModal({ streak, activeDays, reminderEnabled, onReminderToggle, onClose }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  const activeDaySet = new Set(activeDays);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isToday = (d) => {
    return viewYear === today.getFullYear() &&
      viewMonth === today.getMonth() &&
      d === today.getDate();
  };

  const isActive = (d) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    return activeDaySet.has(iso);
  };

  const isFuture = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    date.setHours(0,0,0,0);
    const todayMidnight = new Date();
    todayMidnight.setHours(0,0,0,0);
    return date > todayMidnight;
  };

  const goBack = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const goForward = () => {
    const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-5 shadow-xl"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Your Streak
          </h2>
          <button onClick={onClose}>
            <X size={20} style={{ color: 'hsl(var(--muted-foreground))' }} />
          </button>
        </div>

        {/* Streak count */}
        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl"
          style={{ background: 'hsl(var(--muted))' }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#D97706' }}>
              {streak.count} {streak.count === 1 ? 'day' : 'days'}
            </div>
            <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {streak.count === 0
                ? 'Complete your daily goal to start a streak'
                : 'Current streak — keep going!'}
            </div>
          </div>
        </div>

        {/* Reminder toggle */}
        <button
          data-testid="streak-reminder-toggle"
          onClick={onReminderToggle}
          className="w-full flex items-center gap-3 p-3 rounded-xl border mb-5 transition-all"
          style={{
            background: reminderEnabled ? 'hsl(47 91% 95%)' : 'hsl(var(--muted))',
            borderColor: reminderEnabled ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
          }}
        >
          {reminderEnabled
            ? <Bell size={16} style={{ color: '#D97706' }} />
            : <BellOff size={16} style={{ color: 'hsl(var(--muted-foreground))' }} />
          }
          <div className="flex-1 text-left">
            <div className="text-xs font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Streak reminder
            </div>
            <div className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {reminderEnabled ? 'On — alert if your streak is at risk after 6pm' : 'Off'}
            </div>
          </div>
        </button>

        {/* Calendar header */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={goBack}>
            <ChevronLeft size={18} style={{ color: 'hsl(var(--foreground))' }} />
          </button>
          <span className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button
            onClick={goForward}
            style={{ opacity: isCurrentMonth ? 0.2 : 1, pointerEvents: isCurrentMonth ? 'none' : 'auto' }}
          >
            <ChevronRight size={18} style={{ color: 'hsl(var(--foreground))' }} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-1">
          {['S','M','T','W','T','F','S'].map((d,i) => (
            <div key={i} className="text-center text-[10px] font-bold"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const active = isActive(d);
            const today_ = isToday(d);
            const future = isFuture(d);
            return (
              <div key={i} className="flex items-center justify-center">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: active ? '#D97706' : today_ ? 'hsl(var(--muted))' : 'transparent',
                    color: active ? '#fff' : future ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))',
                    opacity: future ? 0.3 : 1,
                    border: today_ && !active ? '2px solid #D97706' : 'none',
                  }}
                >
                  {d}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
