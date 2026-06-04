import React, { useState } from 'react';
import { Search, Plus, Trash2, ChevronRight, Globe, Package } from 'lucide-react';
import { VERB_TABLE, NOUN_GROUPS, TOGGLEABLE_CATEGORIES, PRESET_PACKS } from '../data/words';

function getActivePreset(categoryEnabled) {
  return PRESET_PACKS.find(p =>
    TOGGLEABLE_CATEGORIES.every(cat => {
      const shouldBeOn = p.cats.includes('*') || p.cats.includes(cat);
      return shouldBeOn === (categoryEnabled?.[cat] !== false);
    })
  ) ?? null;
}
import { masteryLevel, dotColor, getStats } from '../utils/helpers';

function MasteryDot({ es, progress }) {
  const lvl = masteryLevel(progress, es);
  return <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor(lvl) }} />;
}

const STAT_TIERS = [
  ['new',      '#A8A29E', 'New'],
  ['learning', '#D97706', 'Learning'],
  ['strong',   '#10B981', 'Strong'],
  ['mastered', '#16A34A', 'Mastered'],
];

function ProgressPanel({ words, progress, tierFilter, setTierFilter }) {
  const stats = getStats(words, progress);
  const total = words.length;
  const pct = total > 0 ? Math.round((stats.mastered / total) * 100) : 0;
  return (
    <div className="rounded-2xl p-4 mb-4 border" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>Mastery Progress</span>
        <span className="text-sm font-bold" style={{ color: '#16A34A' }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full mb-3" style={{ background: 'hsl(var(--muted))' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#16A34A,#22C55E)' }} />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {STAT_TIERS.map(([key, color, label]) => {
          const active = tierFilter === key;
          return (
            <button key={key} onClick={() => setTierFilter(active ? null : key)}
              className="rounded-lg py-2 text-center transition-all"
              style={{
                background: active ? `${color}20` : 'hsl(var(--muted))',
                border: `2px solid ${active ? color : 'transparent'}`,
              }}>
              <div className="text-lg font-bold" style={{ color }}>{stats[key]}</div>
              <div className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</div>
            </button>
          );
        })}
      </div>
      <button onClick={() => setTierFilter(null)}
        className="w-full py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={tierFilter === null
          ? { background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }
          : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
        All · {stats.new + stats.learning + stats.strong + stats.mastered}
      </button>
    </div>
  );
}

function AddWordForm({ onAdd }) {
  const [es, setEs] = useState(''); const [en, setEn] = useState('');
  const [type, setType] = useState('noun'); const [gender, setGender] = useState('');
  const [theme, setTheme] = useState('');
  const handleAdd = () => {
    if (!es.trim() || !en.trim()) return;
    onAdd({ es: es.trim().toLowerCase(), en: en.trim().toLowerCase(), type, gender: gender || null, theme: theme || null, group: 'Custom' });
    setEs(''); setEn(''); setTheme('');
  };
  const inp = { background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' };
  return (
    <div className="rounded-2xl p-4 mb-4 border" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
      <div className="font-semibold text-sm mb-3 flex items-center gap-2">
        <Plus size={14} style={{ color: 'hsl(var(--primary))' }} /> Add a word
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input data-testid="add-word-es" value={es} onChange={e => setEs(e.target.value)}
          placeholder="Spanish" className="px-3 py-2 rounded-lg border text-sm" style={inp} />
        <input data-testid="add-word-en" value={en} onChange={e => setEn(e.target.value)}
          placeholder="English" className="px-3 py-2 rounded-lg border text-sm" style={inp}
          onKeyDown={e => e.key === 'Enter' && handleAdd()} />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <select data-testid="add-word-type" value={type} onChange={e => setType(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm" style={inp}>
          {['noun','verb','adj','adv','phrase','pronoun','article','other'].map(t => <option key={t}>{t}</option>)}
        </select>
        <select data-testid="add-word-gender" value={gender} onChange={e => setGender(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm" style={inp}>
          <option value="">no gender</option>
          <option value="m">masculine (el)</option>
          <option value="f">feminine (la)</option>
        </select>
      </div>
      <select data-testid="add-word-theme" value={theme} onChange={e => setTheme(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border text-sm mb-3" style={inp}>
        <option value="">Select theme (optional)</option>
<option value="adjectives">adjectives</option>
<option value="animals">animals</option>
<option value="body">body</option>
<option value="clothing">clothing</option>
<option value="colours">colours</option>
<option value="connectors">connectors</option>
<option value="days">days</option>
<option value="descriptions">descriptions</option>
<option value="emotions">emotions</option>
<option value="family">family</option>
<option value="food & drink">food & drink</option>
<option value="greetings">greetings</option>
<option value="health">health</option>
<option value="home">home</option>
<option value="months">months</option>
<option value="nature">nature</option>
<option value="numbers">numbers</option>
<option value="people">people</option>
<option value="phrases">phrases</option>
<option value="places">places</option>
<option value="questions">questions</option>
<option value="restaurant">restaurant</option>
<option value="shopping">shopping</option>
<option value="social">social</option>
<option value="time">time</option>
<option value="travel">travel</option>
<option value="weather">weather</option>
      </select>
      <button data-testid="add-word-btn" onClick={handleAdd}
        className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
        style={{ background: 'hsl(var(--primary))' }}>
        Add word
      </button>
    </div>
  );
}

export default function WordList({ words, progress, customWords, searchQuery, setSearchQuery, onAddWord, onDeleteWord, onWordClick, onCategoryClick, onSharedPacksClick, categoryEnabled }) {
  const [tierFilter, setTierFilter] = useState(null);
  const activePreset = getActivePreset(categoryEnabled);
  const isNonDefault = activePreset && activePreset.id !== 'all';
  const q = searchQuery.toLowerCase();
  const matchesTier = (es) => !tierFilter || masteryLevel(progress, es) === tierFilter;
  const filtered = q ? words.filter(w => (w.es.includes(q) || w.en.includes(q)) && matchesTier(w.es)) : null;
  const phrases = words.filter(w => w.type === 'phrase');
  const others = words.filter(w => ['pronoun', 'article', 'adj', 'adv', 'other'].includes(w.type));

  return (
    <div>
      <ProgressPanel words={words} progress={progress} tierFilter={tierFilter} setTierFilter={setTierFilter} />

      {/* Search + Community button */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input data-testid="word-search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search words…" className="w-full pl-8 pr-3 py-2 rounded-xl border text-sm"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
        </div>
        {onSharedPacksClick && (
          <button data-testid="shared-packs-btn" onClick={onSharedPacksClick}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            <Globe size={13} /> Community
          </button>
        )}
      </div>

      {/* Word pack selector — shows active pack name, amber when non-default */}
      <button data-testid="category-toggle-btn" onClick={onCategoryClick}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border mb-4 text-sm font-semibold transition-all hover:-translate-y-0.5"
        style={{
          background: isNonDefault ? 'hsl(47 91% 95%)' : 'hsl(var(--card))',
          borderColor: isNonDefault ? 'hsl(47 91% 60%)' : 'hsl(var(--border))',
          color: 'hsl(var(--foreground))',
        }}>
        {activePreset
          ? <>{activePreset.emoji} {activePreset.name}</>
          : <><Package size={14} /> Custom pack</>}
        <span style={{ fontWeight: 400, fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>· Change</span>
      </button>

      <AddWordForm onAdd={onAddWord} />

      {/* Search results */}
      {filtered && (
        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
          {filtered.map(w => (
            <WordRow key={w.es} word={w} progress={progress} onClick={() => onWordClick(w)} />
          ))}
        </div>
      )}

      {!filtered && (
        <>
          {/* Custom words */}
          {customWords.filter(w => matchesTier(w.es)).length > 0 && (
            <Section title="Your Added Words">
              {customWords.filter(w => matchesTier(w.es)).map(w => (
                <div key={w.es} className="flex items-center justify-between px-3 py-2 rounded-lg border mb-1 text-sm"
                  style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}>
                  <span className="flex items-center gap-2">
                    <MasteryDot es={w.es} progress={progress} />
                    <strong>{w.es}</strong> = {w.en}
                    <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{w.type}</span>
                  </span>
                  <button data-testid={`delete-word-${w.es}`} onClick={() => onDeleteWord(w.es)}
                    className="p-1 rounded transition-colors hover:text-red-500" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </Section>
          )}

          {/* Verbs */}
          {VERB_TABLE.filter(v => matchesTier(v.inf) || v.conj.some(c => matchesTier(c.es))).length > 0 && (
            <Section title="Verbs & Conjugations">
              {VERB_TABLE.filter(v => matchesTier(v.inf) || v.conj.some(c => matchesTier(c.es))).map(v => (
                <div key={v.inf} className="rounded-xl border p-3 mb-2" style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                  <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={() => onWordClick(words.find(w => w.es === v.inf) || { es: v.inf, en: v.en, type: 'verb' })}>
                    <MasteryDot es={v.inf} progress={progress} />
                    <span className="font-bold text-sm">{v.inf}</span>
                    <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>= {v.en}</span>
                  </div>
                  {v.conj.filter(c => matchesTier(c.es)).map(c => (
                    <div key={c.es} className="flex items-center gap-2 text-xs pl-2 mb-1">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'hsl(var(--muted-foreground))' }} />
                      <span className="font-medium w-16" style={{ color: 'hsl(var(--muted-foreground))' }}>{c.subj}</span>
                      <MasteryDot es={c.es} progress={progress} />
                      <span className="font-bold">{c.es}</span>
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>= {c.en}</span>
                    </div>
                  ))}
                </div>
              ))}
            </Section>
          )}

          {/* Noun groups */}
          {NOUN_GROUPS.map(g => {
            const visibleWords = g.words.filter(w => matchesTier(w.es));
            if (visibleWords.length === 0) return null;
            return (
              <Section key={g.title} title={g.title}>
                <div className="grid grid-cols-2 gap-1.5">
                  {visibleWords.map(w => (
                    <div key={w.es} onClick={() => onWordClick(words.find(x => x.es === w.es) || w)}
                      className="flex items-center gap-2 rounded-lg border p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                      <MasteryDot es={w.es} progress={progress} />
                      {w.g && <span className="text-xs font-bold" style={{ color: 'hsl(var(--muted-foreground))' }}>{w.g === 'm' ? 'el' : 'la'}</span>}
                      <span className="text-xs font-bold flex-1">{w.es}</span>
                      <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{w.en}</span>
                    </div>
                  ))}
                </div>
              </Section>
            );
          })}

          {/* Phrases */}
          {phrases.filter(w => matchesTier(w.es)).length > 0 && (
            <Section title="Phrases">
              {phrases.filter(w => matchesTier(w.es)).map(w => (
                <WordRow key={w.es} word={w} progress={progress} onClick={() => onWordClick(w)} />
              ))}
            </Section>
          )}

          {/* Other words */}
          {others.filter(w => matchesTier(w.es)).length > 0 && (
            <Section title="Other Words">
              <div className="flex flex-wrap gap-1.5">
                {others.filter(w => matchesTier(w.es)).map(w => (
                  <div key={w.es} onClick={() => onWordClick(w)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border cursor-pointer transition-colors hover:bg-muted/50 text-xs"
                    style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                    <MasteryDot es={w.es} progress={progress} />
                    <span className="font-bold">{w.es}</span>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>{w.en}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b"
        style={{ color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function WordRow({ word, progress, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-2 px-3 py-2 rounded-lg border mb-1 cursor-pointer transition-colors hover:bg-muted/50 text-sm"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor(masteryLevel(progress, word.es)) }} />
      {word.gender && <span className="text-xs font-bold" style={{ color: 'hsl(var(--muted-foreground))' }}>{word.gender === 'm' ? 'el' : 'la'}</span>}
      <span className="font-bold">{word.es}</span>
      <span className="flex-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{word.en}</span>
      <ChevronRight size={12} style={{ color: 'hsl(var(--muted-foreground))' }} />
    </div>
  );
}
