import React, { useEffect, useState } from 'react';
import { Copy, Check, UserPlus, Trash2 } from 'lucide-react';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function genFriendCode(uid) {
  // Deterministic 6-char alphanumeric code from uid
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = (hash * 31 + uid.charCodeAt(i)) >>> 0;
  return hash.toString(36).slice(0, 6).toUpperCase().padEnd(6, 'X');
}

export default function FriendsList({ user, friends = [], onAddFriend, onRemoveFriend, isGuest }) {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friendData, setFriendData] = useState({});
  const [copied, setCopied] = useState(false);

  const myCode = user ? genFriendCode(user.uid) : '------';

  useEffect(() => {
    if (isGuest || !user || friends.length === 0) return;
    const load = async () => {
      const data = {};
      for (const fid of friends) {
        try {
          const snap = await getDoc(doc(db, 'leaderboard', fid));
          if (snap.exists()) data[fid] = snap.data();
        } catch (e) { console.error(e); }
      }
      setFriendData(data);
    };
    load();
  }, [user, isGuest, friends]);

  const addFriend = async () => {
    if (!user || !code.trim()) return;
    const target = code.trim().toUpperCase();
    if (target === myCode) {
      setFeedback({ ok: false, msg: "That's your own code." });
      return;
    }
    setLoading(true);
    try {
      // Look up users with this friend code
      const q = query(collection(db, 'leaderboard'));
      const snap = await getDocs(q);
      const matches = snap.docs.filter(d => genFriendCode(d.id) === target);
      if (matches.length === 0) {
        setFeedback({ ok: false, msg: 'No user found with that code.' });
      } else {
        const friendUid = matches[0].id;
        if (friends.includes(friendUid)) {
          setFeedback({ ok: false, msg: 'Already friends!' });
        } else {
          onAddFriend(friendUid);
          setFeedback({ ok: true, msg: `Added ${matches[0].data().displayName || 'friend'}!` });
          setCode('');
        }
      }
    } catch (e) {
      setFeedback({ ok: false, msg: 'Lookup failed: ' + (e.message || 'unknown') });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const copyMyCode = async () => {
    try {
      await navigator.clipboard.writeText(myCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) { console.error(e); }
  };

  if (isGuest) {
    return (
      <div className="text-center py-8 px-4 rounded-xl text-sm" data-testid="friends-guest"
        style={{ background: 'hsl(47 91% 95%)', color: '#78350F' }}>
        Sign in with Google to add friends and compare progress.
      </div>
    );
  }

  return (
    <div data-testid="friends-list">
      {/* My code */}
      <div className="rounded-2xl p-4 mb-3 border" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Your friend code
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 font-mono font-black text-2xl tracking-widest" data-testid="my-friend-code"
            style={{ color: 'hsl(var(--primary))' }}>{myCode}</div>
          <button data-testid="copy-friend-code" onClick={copyMyCode}
            className="p-2 rounded-lg border transition-colors"
            style={{ borderColor: 'hsl(var(--border))', color: copied ? '#16A34A' : 'hsl(var(--muted-foreground))' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Add friend */}
      <div className="rounded-2xl p-4 mb-4 border" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Add a friend
        </div>
        <div className="flex gap-2">
          <input data-testid="friend-code-input" value={code} onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123" maxLength={6}
            className="flex-1 px-3 py-2 rounded-lg border text-base font-mono tracking-widest text-center"
            style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
          <button data-testid="add-friend-btn" onClick={addFriend} disabled={loading || !code.trim()}
            className="px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-1 disabled:opacity-50"
            style={{ background: 'hsl(var(--primary))' }}>
            <UserPlus size={14} /> Add
          </button>
        </div>
        {feedback && (
          <div className="mt-2 text-xs px-3 py-1.5 rounded-lg"
            style={{ background: feedback.ok ? '#DCFCE7' : '#FEE2E2', color: feedback.ok ? '#14532D' : '#991B1B' }}>
            {feedback.msg}
          </div>
        )}
      </div>

      {/* Friends list */}
      {friends.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-xl text-sm" data-testid="friends-empty"
          style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
          No friends yet. Share your code with someone learning Spanish!
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Your friends · ranked by XP
          </div>
          {[...friends].sort((a, b) => (friendData[b]?.xp || 0) - (friendData[a]?.xp || 0)).map((fid, i) => {
            const fd = friendData[fid];
            return (
              <div key={fid} data-testid={`friend-row-${fid}`}
                className="flex items-center gap-3 p-3 rounded-xl border"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                <div className="w-7 text-center text-xs font-bold tabular-nums" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  #{i + 1}
                </div>
                {fd?.photoURL ? (
                  <img src={fd.photoURL} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'hsl(var(--primary))' }}>
                    {(fd?.displayName || '?')[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: 'hsl(var(--foreground))' }}>
                    {fd?.displayName || 'Unknown'}
                  </div>
                </div>
                <div className="text-sm font-bold tabular-nums flex items-center gap-1" style={{ color: '#D97706' }}>
                  ⭐ {(fd?.xp || 0) >= 1000 ? `${((fd?.xp || 0) / 1000).toFixed(1)}k` : (fd?.xp || 0)}
                </div>
                <button onClick={() => onRemoveFriend(fid)} data-testid={`remove-friend-${fid}`}
                  className="p-1 rounded transition-colors" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
