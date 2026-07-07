import { languageConfig } from '../config/languageConfig';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { BADGES } from '../data/badges';

const ADMIN_UID = 'BEeiVtpSVWZuHYbo97InnqmI1DC2';

export default function ProfileSheet({ open, onClose, user, userData, masteredCount, totalWords, onSignOut, onGoalClick, onNotificationsToggle, onAudioListenToggle, onAudioSpeakToggle, onStrictTypingToggle, onViewAllBadges, streakShieldActive = false, onStreakShieldToggle }) {
  const navigate = useNavigate();

  const memberSince = (() => {
    try {
      const t = user?.metadata?.creationTime;
      return t ? new Date(t).toLocaleDateString(languageConfig.targetLanguageCode, { month: 'long', year: 'numeric' }) : '';
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

          {/* Milo Speaks link */}
          <a
            href="https://milo-speaks.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#F5C518',
              color: '#3D2B1F',
              fontWeight: 700,
              borderRadius: '50px',
              padding: '0.3rem 1rem',
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            🐾 milo-speaks.com
          </a>

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

            {/* Streak Shield */}
            <div className="flex items-center justify-between px-4 py-3 gap-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Streak Shield 🦴</span>
                {(userData?.bones || 0) < 20 ? (
                  <span className="text-xs mt-0.5" style={{ color: '#d97706' }}>Not enough bones to activate</span>
                ) : (
                  <span className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Spends 20 bones per missed day to protect your streak</span>
                )}
              </div>
              <button
                onClick={() => onStreakShieldToggle && onStreakShieldToggle(!streakShieldActive)}
                aria-label="Toggle streak shield"
                style={{
                  width: 44, height: 24,
                  borderRadius: 12,
                  background: streakShieldActive ? '#7C3AED' : 'hsl(var(--muted))',
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
                  left: streakShieldActive ? 22 : 2,
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
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
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

            {/* Typing mode */}
            <div className="px-4 py-3">
              <div className="text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>⌨️ Typing mode</div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => onStrictTypingToggle(false)}
                  className="flex flex-col items-center px-4 py-1.5 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: !userData?.strictTyping ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                    background: !userData?.strictTyping ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--card))',
                    color: !userData?.strictTyping ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  }}>
                  <span className="text-sm font-bold">😌 Relaxed</span>
                  <span className="text-xs font-normal opacity-70">typos forgiven</span>
                </button>
                <button
                  onClick={() => onStrictTypingToggle(true)}
                  className="flex flex-col items-center px-4 py-1.5 rounded-xl border-2 transition-all"
                  style={{
                    borderColor: userData?.strictTyping ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                    background: userData?.strictTyping ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--card))',
                    color: userData?.strictTyping ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  }}>
                  <span className="text-sm font-bold">🎯 Strict</span>
                  <span className="text-xs font-normal opacity-70">exact spelling</span>
                </button>
              </div>
            </div>
          </div>

          {/* Admin Panel link */}
          {user?.uid === ADMIN_UID && (
            <button
              onClick={() => { onClose(); navigate('/admin'); }}
              className="w-full rounded-xl py-3 mt-4 text-sm font-bold transition-colors hover:bg-muted"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              🔑 Admin Panel →
            </button>
          )}

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
