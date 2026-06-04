import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, Crown, Medal } from 'lucide-react';

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff)).toDateString();
}

export default function Leaderboard({ currentUserId, currentXP, isGuest, user, friends, onAddFriend, onRemoveFriend }) {
  const [tab, setTab] = useState('all');
  const [allTime, setAllTime] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGlobal, setShowGlobal] = useState(false);

  useEffect(() => {
    if (isGuest) { setLoading(false); return; }
    let cancelled = false;
    (async () => {
      setLoading(true); setError(null);
      try {
        const ws = getWeekStart();
        const allQ = query(collection(db, 'leaderboard'), orderBy('xp', 'desc'), limit(20));
        const snap = await getDocs(allQ);
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(e => (e.xp || 0) > 0);
        const weeklyList = all
          .filter(e => e.weekStart === ws)
          .sort((a, b) => (b.weeklyXP || 0) - (a.weeklyXP || 0))
          .slice(0, 20);
        if (!cancelled) {
          setAllTime(all);
          setWeekly(weeklyList);
        }
      } catch (e) {
        console.error('Leaderboard error', e);
        if (!cancelled) setError(e.message || 'Could not load leaderboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [currentXP, isGuest]);

  const list = tab === 'weekly' ? weekly : allTime;
  const xpKey = tab === 'weekly' ? 'weeklyXP' : 'xp';

  return (
    <div data-testid="leaderboard-view">
      <div className="rounded-2xl p-5 mb-4 text-center text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#C60B1E,#F5C518)', boxShadow: '0 8px 24px rgba(198,11,30,0.25)' }}>
        <Trophy size={28} className="mx-auto mb-2 opacity-95" />
        <h2 className="font-serif text-xl font-bold">Leaderboard</h2>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {showGlobal ? 'Competing with everyone worldwide' : 'Competing with your friends'}
          </div>
          <button
            onClick={() => setShowGlobal(g => !g)}
            className="text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              background: showGlobal ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              borderColor: 'hsl(var(--primary))',
              color: showGlobal ? 'white' : 'hsl(var(--primary))',
            }}>
            {showGlobal ? '🌍 Global' : '🐾 Friends'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {[['all', 'All-time'], ['weekly', 'This week']].map(([id, label]) => (
          <button key={id} data-testid={`leaderboard-tab-${id}`} onClick={() => setTab(id)}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all"
            style={{
              background: tab === id ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: tab === id ? 'white' : 'hsl(var(--foreground))',
              borderColor: tab === id ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            }}>{label}</button>
        ))}
      </div>

      <>
      {isGuest && (
        <div className="text-center py-6 px-4 rounded-xl text-sm border mb-3" data-testid="leaderboard-guest-msg"
          style={{ background: 'hsl(47 91% 95%)', color: '#78350F', borderColor: 'hsl(47 91% 60%)' }}>
          Sign in with Google to compete on the leaderboard!
        </div>
      )}

      {loading && (
        <div className="text-center py-10 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</div>
      )}
      {error && (
        <div className="text-center py-6 px-4 rounded-xl text-sm border"
          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}>
          Leaderboard not available yet. Earn XP to appear!
        </div>
      )}
      {!loading && !error && list.length === 0 && (
        <div className="text-center py-10 px-4 rounded-xl text-sm border"
          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}>
          No one has scored {tab === 'weekly' ? 'this week' : ''} yet — be the first!
        </div>
      )}

      <div className="space-y-2">
        {(showGlobal ? list : list.filter(entry =>
          entry.id === currentUserId || (friends || []).includes(entry.id)
        )).map((entry, i) => {
          const rank = i + 1;
          const isMe = entry.id === currentUserId;
          const xp = entry[xpKey] || 0;
          if (xp <= 0) return null;
          const RankIcon = rank === 1 ? Crown : rank <= 3 ? Medal : null;
          const rankColor = rank === 1 ? '#F5C518' : rank === 2 ? '#94A3B8' : rank === 3 ? '#D97706' : 'hsl(var(--muted-foreground))';
          return (
            <div key={entry.id} data-testid={`leaderboard-row-${rank}`}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all"
              style={{
                background: isMe ? 'hsl(47 91% 95%)' : 'hsl(var(--card))',
                borderColor: isMe ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
              }}>
              <div className="w-8 flex-shrink-0 flex items-center justify-center font-bold text-sm tabular-nums"
                style={{ color: rankColor }}>
                {RankIcon ? <RankIcon size={18} /> : `#${rank}`}
              </div>
              {entry.photoURL ? (
                <img src={entry.photoURL} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'hsl(var(--primary))' }}>
                  {(entry.displayName || '?')[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: 'hsl(var(--foreground))' }}>
                  {entry.displayName || 'Anonymous'} {isMe && <span className="text-xs font-normal" style={{ color: 'hsl(var(--primary))' }}>(you)</span>}
                </div>
              </div>
              <div className="font-bold text-sm tabular-nums flex items-center gap-1" style={{ color: '#D97706' }}>
                ⭐ {xp >= 1000 ? `${(xp/1000).toFixed(1)}k` : xp}
              </div>
            </div>
          );
        })}
      </div>
      </>
    </div>
  );
}
