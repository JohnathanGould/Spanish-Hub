import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BADGES } from '../data/badges';

const CATEGORY_ORDER = ['xp', 'streak', 'path', 'mastery', 'drill', 'engagement', 'special'];
const CATEGORY_LABELS = { xp: 'XP', streak: 'Streak', path: 'Path', mastery: 'Mastery', drill: 'Drills', engagement: 'Engagement', special: 'Special' };

export default function BadgeGrid({ earnedBadges = [], onBack }) {
  const earnedMap = Object.fromEntries((earnedBadges || []).map(b => [b.id, b]));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'hsl(var(--background))' }}>
      <div className="sticky top-0 z-10 flex items-center px-4 py-3" style={{ background: 'hsl(var(--background))', borderBottom: '1px solid hsl(var(--border))' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-medium"
          style={{ color: 'hsl(var(--primary))' }}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <span className="flex-1 text-center font-bold text-base" style={{ color: 'hsl(var(--foreground))' }}>
          My Badges
        </span>
        <div style={{ width: 60 }} />
      </div>

      <div className="px-4 pb-10">
        {CATEGORY_ORDER.map(category => {
          const categoryBadges = BADGES.filter(b => b.category === category);
          if (categoryBadges.length === 0) return null;
          return (
            <div key={category} className="mt-6">
              <div
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {CATEGORY_LABELS[category]}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {categoryBadges.map(badge => {
                  const earned = earnedMap[badge.id];
                  if (earned) {
                    return (
                      <div
                        key={badge.id}
                        className="rounded-2xl p-3 flex flex-col items-center relative"
                        style={{ background: 'hsl(var(--card))', border: '2px solid hsl(var(--primary))', minHeight: 88 }}
                      >
                        <span style={{ fontSize: 28, lineHeight: 1 }}>{badge.emoji}</span>
                        <span
                          className="text-xs font-bold text-center mt-1.5 leading-tight"
                          style={{ color: 'hsl(var(--foreground))' }}
                        >
                          {badge.name}
                        </span>
                        {badge.stackable && earned.count > 1 && (
                          <span
                            className="absolute bottom-2 right-2 text-xs font-bold"
                            style={{ color: 'hsl(var(--primary))' }}
                          >
                            ×{earned.count}
                          </span>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={badge.id}
                      className="rounded-2xl p-3 flex items-center justify-center"
                      style={{
                        background: 'hsl(var(--muted))',
                        border: '1px solid hsl(var(--border))',
                        opacity: 0.5,
                        minHeight: 88,
                      }}
                    >
                      <span style={{ fontSize: 28, lineHeight: 1 }}>🔒</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
