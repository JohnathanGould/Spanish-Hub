import React, { useState } from 'react';

export default function GoalModal({ goal, reminderEnabled, streakCount, onSave, onClose }) {
  const [val, setVal] = useState(goal);
  const reminder = reminderEnabled || false;

  const requestPermission = async () => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  };

  const handleSave = async () => {
    let nextReminder = reminder;
    if (reminder && !reminderEnabled) {
      const ok = await requestPermission();
      if (!ok) nextReminder = false;
    }
    onSave(Math.max(1, val), nextReminder);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-2xl p-6 w-full max-w-xs shadow-2xl" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="font-serif text-lg font-bold mb-4">Daily Goal</h3>
        <p className="text-sm mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          How many correct answers do you want per day?
        </p>
        <input
          data-testid="goal-input"
          type="number" min={10} max="500" value={val}
          onChange={e => setVal(Number(e.target.value))}
          onBlur={() => { if (val < 10) setVal(10); }}
          className="w-full p-3 rounded-xl border text-lg text-center mb-4 font-bold"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
        />

        <div className="flex items-center gap-2 mb-4 px-1">
          <span style={{ fontSize: 14 }}>🔥</span>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Your streak grows every day you reach your goal.
            {streakCount > 0 && ` You're on a ${streakCount}-day streak — keep it going!`}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border text-sm font-medium"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            Cancel
          </button>
          <button data-testid="goal-save-btn" onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'hsl(var(--primary))' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
