import React, { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';

export default function GoalModal({ goal, reminderEnabled, onSave, onClose }) {
  const [val, setVal] = useState(goal);
  const [reminder, setReminder] = useState(reminderEnabled || false);

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

  const toggleReminder = async () => {
    if (!reminder) {
      const ok = await requestPermission();
      setReminder(ok);
    } else {
      setReminder(false);
    }
  };

  const supported = typeof window !== 'undefined' && 'Notification' in window;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-2xl p-6 w-full max-w-xs shadow-2xl" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="font-serif text-lg font-bold mb-4">Daily Goal</h3>
        <p className="text-sm mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          How many correct answers do you want per day?
        </p>
        <input
          data-testid="goal-input"
          type="number" min="1" max="500" value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full p-3 rounded-xl border text-lg text-center mb-4 font-bold"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
        />

        {supported && (
          <button data-testid="goal-reminder-toggle" onClick={toggleReminder}
            className="w-full flex items-center gap-3 p-3 rounded-xl border mb-4 transition-all"
            style={{
              background: reminder ? 'hsl(47 91% 95%)' : 'hsl(var(--muted))',
              borderColor: reminder ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
            }}>
            {reminder ? <Bell size={16} style={{ color: '#D97706' }} /> : <BellOff size={16} style={{ color: 'hsl(var(--muted-foreground))' }} />}
            <div className="flex-1 text-left">
              <div className="text-xs font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                Streak reminder
              </div>
              <div className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {reminder ? 'On — alert if your streak is at risk' : 'Off'}
              </div>
            </div>
          </button>
        )}

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
