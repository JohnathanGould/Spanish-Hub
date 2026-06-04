import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { X } from 'lucide-react';

function getWeekStartStr() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

export default function LeaderboardModal({ user, friends, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const ws = getWeekStartStr();
    const uids = [user.uid, ...friends];
    const load = async () => {
      const results = [];
      for (const uid of uids) {
        try {
          const snap = await getDoc(doc(db, 'leaderboard', uid));
          if (snap.exists()) {
            const d = snap.data();
            results.push({
              uid,
              displayName: d.displayName || 'Unknown',
              photoURL: d.photoURL || null,
              weeklyXP: d.weekStart === ws ? (d.weeklyXP || 0) : 0,
            });
          } else if (uid === user.uid) {
            results.push({
              uid,
              displayName: user.displayName || 'You',
              photoURL: user.photoURL || null,
              weeklyXP: 0,
            });
          }
        } catch (e) { console.error(e); }
      }
      results.sort((a, b) => b.weeklyXP - a.weeklyXP);
      setRows(results);
      setLoading(false);
    };
    load();
  }, [user, friends]);

  const noFriends = friends.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}>
      <div className="w-full max-w-md rounded-t-2xl shadow-2xl pb-8"
        style={{ background: 'hsl(var(--card))' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b"
          style={{ borderColor: 'hsl(var(--border))' }}>
          <div>
            <div className="font-serif font-bold text-base" style={{ color: 'hsl(var(--foreground))' }}>
              ⭐ Weekly Leaderboard
            </div>
            <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Resets Monday · friends only
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 pt-3">
          {loading ? (
            <div className="text-center py-8 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Loading…
            </div>
          ) : noFriends ? (
            <div className="text-center py-8 px-4 rounded-xl text-sm"
              style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
              Add friends in the Friends tab to start competing
            </div>
          ) : (
            <div className="space-y-2">
              {rows.map((row, i) => {
                const isMe = row.uid === user.uid;
                return (
                  <div key={row.uid}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border"
                    style={{
                      background: isMe ? 'hsl(47 91% 95%)' : 'hsl(var(--card))',
                      borderColor: isMe ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
                    }}>
                    <div className="w-6 text-center text-xs font-bold tabular-nums"
                      style={{ color: i === 0 ? '#D97706' : 'hsl(var(--muted-foreground))' }}>
                      #{i + 1}
                    </div>
                    {row.photoURL ? (
                      <img src={row.photoURL} alt=""
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'hsl(var(--primary))' }}>
                        {(row.displayName || '?')[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: 'hsl(var(--foreground))' }}>
                        {row.displayName}{isMe ? ' (you)' : ''}
                      </div>
                    </div>
                    <div className="text-sm font-bold tabular-nums" style={{ color: '#D97706' }}>
                      ⭐ {row.weeklyXP}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
