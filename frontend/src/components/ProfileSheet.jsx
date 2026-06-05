import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { BADGES } from '../data/badges';
import { collection, query, where, orderBy, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_UID = 'BEeiVtpSVWZuHYbo97InnqmI1DC2';

function AdminPanel() {
  const [pendingPacks, setPendingPacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmations, setConfirmations] = useState({});

  const fetchPending = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'sharedPacks'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'asc')
      );
      const snap = await getDocs(q);
      setPendingPacks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPending(); }, []);

  const approve = async (pack) => {
    try {
      await updateDoc(doc(db, 'sharedPacks', pack.id), { status: 'approved' });
      await updateDoc(doc(db, 'users', pack.authorId), {
        earnedBadges: arrayUnion({ id: 'pack_pioneer', earnedAt: Date.now() }),
      });
      setConfirmations(prev => ({ ...prev, [pack.id]: { ok: true, msg: '✓ Approved — Pack Pioneer badge awarded' } }));
      setTimeout(() => setPendingPacks(prev => prev.filter(p => p.id !== pack.id)), 2000);
    } catch (e) { console.error(e); }
  };

  const reject = async (pack) => {
    try {
      await updateDoc(doc(db, 'sharedPacks', pack.id), { status: 'rejected' });
      setConfirmations(prev => ({ ...prev, [pack.id]: { ok: false, msg: '✗ Rejected' } }));
      setTimeout(() => setPendingPacks(prev => prev.filter(p => p.id !== pack.id)), 2000);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="w-full mt-5">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>🔑 Admin</span>
      </div>
      <div className="rounded-xl border p-3" style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Pending Packs
          </span>
          <button onClick={fetchPending}
            className="text-xs px-2 py-1 rounded-lg font-semibold"
            style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}>
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</p>
        ) : pendingPacks.length === 0 ? (
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>No pending packs 🎉</p>
        ) : (
          <div className="space-y-3">
            {pendingPacks.map(pack => (
              <div key={pack.id} className="rounded-lg border p-3"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                <div className="font-bold text-sm mb-0.5" style={{ color: 'hsl(var(--foreground))' }}>{pack.title}</div>
                <div className="text-xs mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  by {pack.authorName} · {pack.wordCount} words
                </div>
                <div className="mb-2 space-y-0.5">
                  {(pack.words || []).map((w, i) => (
                    <div key={i} className="text-xs" style={{ color: 'hsl(var(--foreground))' }}>
                      {w.es} — {w.en}
                    </div>
                  ))}
                </div>
                {confirmations[pack.id] ? (
                  <div className="text-xs font-semibold py-1"
                    style={{ color: confirmations[pack.id].ok ? '#14532D' : '#991B1B' }}>
                    {confirmations[pack.id].msg}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => approve(pack)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white"
                      style={{ background: '#16A34A' }}>
                      Approve
                    </button>
                    <button onClick={() => reject(pack)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white"
                      style={{ background: '#DC2626' }}>
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileSheet({ open, onClose, user, userData, masteredCount, totalWords, onSignOut, onGoalClick, onNotificationsToggle, onAudioListenToggle, onAudioSpeakToggle, onViewAllBadges }) {
  const memberSince = (() => {
    try {
      const t = user?.metadata?.creationTime;
      return t ? new Date(t).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';
    } catch { return ''; }
  })();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        />
      )}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto"
        style={{
          background: 'hsl(var(--card))',
          borderRadius: '24px 24px 0 0',
          maxHeight: '90vh',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms ease',
        }}
      >
        {/* Drag handle */}
        <div className="h-1.5 w-12 rounded-full bg-muted mx-auto mt-3 mb-4" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center rounded-full"
          style={{ width: 32, height: 32, background: 'hsl(var(--muted))' }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="px-5 pb-24 flex flex-col items-center">

          {/* Avatar */}
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            border: '4px solid #7C3AED',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'hsl(var(--primary))', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700,
              }}>
                {(user?.displayName || userData?.displayName || 'U')[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* Display name */}
          <div className="text-xl font-bold mt-3" style={{ color: 'hsl(var(--foreground))' }}>
            {user?.displayName || userData?.displayName || 'Learner'}
          </div>

          {/* Member since */}
          {memberSince && (
            <div className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Member since {memberSince}
            </div>
          )}

          {/* Learning Spanish */}
          <div className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            🇪🇸 Learning Spanish
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 w-full mt-5">
            {[
              { emoji: '🔥', value: userData?.streak?.count || 0, label: 'Streak' },
              { emoji: '⭐', value: userData?.xp || 0, label: 'XP' },
              { emoji: '📚', value: totalWords != null ? `${masteredCount}/${totalWords}` : masteredCount, label: 'Mastered' },
              { emoji: '🦴', value: userData?.bones || 0, label: 'Bones' },
            ].map(({ emoji, value, label }) => (
              <div key={label} className="rounded-xl p-3 flex flex-col items-center gap-0.5"
                style={{ background: 'hsl(var(--muted))' }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{emoji}</span>
                <span className="font-bold text-sm mt-1" style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>My Badges</span>
              {userData?.earnedBadges?.length > 0 && (
                <button
                  onClick={onViewAllBadges}
                  className="text-xs font-semibold"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  View All
                </button>
              )}
            </div>
            {userData?.earnedBadges?.length > 0 ? (
              <div className="flex gap-2">
                {userData.earnedBadges.slice(0, 5).map((earnedBadge, i) => {
                  const def = BADGES.find(b => b.id === earnedBadge.id);
                  return (
                    <div key={i}
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{ width: 48, height: 48, background: 'hsl(var(--muted))', fontSize: 24 }}>
                      {def?.emoji || '🏅'}
                    </div>
                  );
                })}
                {userData.earnedBadges.length > 5 && (
                  <button
                    onClick={onViewAllBadges}
                    className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                    style={{ width: 48, height: 48, background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}
                  >
                    +{userData.earnedBadges.length - 5}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                No badges yet — keep learning! 🐾
              </p>
            )}
          </div>

          {/* Settings */}
          <div className="w-full mt-5 rounded-xl overflow-hidden border" style={{ borderColor: 'hsl(var(--border))' }}>
            {/* Daily Goal */}
            <button
              onClick={onGoalClick}
              className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted"
              style={{ borderBottom: '1px solid hsl(var(--border))' }}
            >
              <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Daily Goal</span>
              <div className="flex items-center gap-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span className="text-sm">{userData?.dailyGoal || 20} words/day</span>
                <ChevronRight size={16} />
              </div>
            </button>

            {/* Notifications */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
              <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Notifications</span>
              <button
                onClick={() => onNotificationsToggle(!userData?.reminderEnabled)}
                aria-label="Toggle notifications"
                style={{
                  width: 44, height: 24,
                  borderRadius: 12,
                  background: userData?.reminderEnabled ? '#7C3AED' : 'hsl(var(--muted))',
                  position: 'relative',
                  transition: 'background 200ms',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 2,
                  left: userData?.reminderEnabled ? 22 : 2,
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 200ms',
                  display: 'block',
                }} />
              </button>
            </div>

            {/* Play audio on reveal */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
              <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>🔊 Play audio on reveal</span>
              <button
                onClick={() => onAudioListenToggle(!userData?.audioListenEnabled)}
                aria-label="Toggle listen audio"
                style={{
                  width: 44, height: 24,
                  borderRadius: 12,
                  background: userData?.audioListenEnabled !== false ? '#7C3AED' : 'hsl(var(--muted))',
                  position: 'relative',
                  transition: 'background 200ms',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 2,
                  left: userData?.audioListenEnabled !== false ? 22 : 2,
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 200ms',
                  display: 'block',
                }} />
              </button>
            </div>

            {/* Text-to-speech */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>🎤 Text-to-speech</span>
              <button
                onClick={() => onAudioSpeakToggle(!userData?.audioSpeakEnabled)}
                aria-label="Toggle speak audio"
                style={{
                  width: 44, height: 24,
                  borderRadius: 12,
                  background: userData?.audioSpeakEnabled !== false ? '#7C3AED' : 'hsl(var(--muted))',
                  position: 'relative',
                  transition: 'background 200ms',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 2,
                  left: userData?.audioSpeakEnabled !== false ? 22 : 2,
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 200ms',
                  display: 'block',
                }} />
              </button>
            </div>
          </div>

          {/* Admin panel — only for admin uid */}
          {user?.uid === ADMIN_UID && <AdminPanel />}

          {/* Sign Out */}
          <button
            onClick={onSignOut}
            className="w-full rounded-xl py-3 mt-4 text-sm font-bold transition-colors hover:bg-muted"
            style={{ color: 'hsl(var(--destructive))' }}
          >
            Sign Out
          </button>

        </div>
      </div>
    </>
  );
}
