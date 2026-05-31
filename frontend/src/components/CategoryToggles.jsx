import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Zap } from 'lucide-react';
import { TOGGLEABLE_CATEGORIES, PRESET_PACKS } from '../data/words';

const CATEGORY_EMOJI = {
  'Food & Drink': '🥖', 'Family': '👨‍👩‍👧', 'Travel': '🧳', 'Places': '🏛️',
  'Numbers': '🔢', 'Days': '📅', 'Months': '🗓️', 'Colours': '🎨',
  'Body': '👤', 'Adjectives': '✨', 'Time': '⏰', 'Questions': '❓', 'Connectors': '🔗',
  'Weather': '☀️', 'Animals': '🐾', 'Clothing': '👕',
};

export default function CategoryToggles({ categoryEnabled, onToggle, onApplyPreset, onClose }) {
  return (
    <div data-testid="category-toggle-modal" onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3">
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
        style={{ background: 'hsl(var(--card))', maxHeight: '85vh' }}>
        <div className="p-6 pb-4 flex items-start justify-between border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div>
            <h3 className="font-serif text-xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>Word Packs</h3>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Toggle off categories you want to skip. Core words are always on.
            </p>
          </div>
          <button data-testid="category-toggle-close" onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-4">
          {/* Presets */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={12} style={{ color: '#D97706' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Quick Presets
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PACKS.map(p => (
                <button key={p.id} data-testid={`preset-${p.id}`}
                  onClick={() => onApplyPreset(p.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all hover:-translate-y-0.5"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}>
                  <span className="text-lg flex-shrink-0">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs leading-tight" style={{ color: 'hsl(var(--foreground))' }}>{p.name}</div>
                    <div className="text-[10px] truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              All Categories
            </div>
            <div className="space-y-2">
              {TOGGLEABLE_CATEGORIES.map(cat => {
                const enabled = categoryEnabled?.[cat] !== false;
                return (
                  <button key={cat} data-testid={`category-toggle-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                    onClick={() => onToggle(cat, !enabled)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all hover:-translate-y-0.5"
                    style={{
                      background: enabled ? 'hsl(47 91% 95%)' : 'hsl(var(--muted))',
                      borderColor: enabled ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
                    }}>
                    <span className="text-xl flex-shrink-0">{CATEGORY_EMOJI[cat] || '📚'}</span>
                    <span className="flex-1 text-left font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{cat}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: enabled ? '#16A34A' : 'transparent', border: enabled ? 'none' : '1.5px solid hsl(var(--border))' }}>
                      {enabled && <Check size={14} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <button data-testid="category-toggle-done" onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
