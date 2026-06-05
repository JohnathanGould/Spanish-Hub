import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Download, Globe, Trash2, Check, Plus } from 'lucide-react';
import { collection, query, orderBy, where, limit, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function SharedPacks({ user, isGuest, customWords, importedPacks, onImport, onClose, anchorY }) {
  const [tab, setTab] = useState('browse');
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishTitle, setPublishTitle] = useState('');
  const [publishDesc, setPublishDesc] = useState('');
  const [wordPairs, setWordPairs] = useState([{ es: '', en: '' }]);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [imported, setImported] = useState(new Set());
  const [dupWarnings, setDupWarnings] = useState({});

  useEffect(() => {
    if (isGuest || !user) return;
    const load = async () => {
      setLoading(true);
      try {
        const allQ = query(collection(db, 'sharedPacks'), where('status', '==', 'approved'), orderBy('createdAt', 'desc'), limit(40));
        const snap = await getDocs(allQ);
        setPacks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [user, isGuest, tab]);

  const addWordPair = () => {
    if (wordPairs.length >= 15) return;
    setWordPairs(prev => [...prev, { es: '', en: '' }]);
  };

  const removeWordPair = (index) => {
    setWordPairs(prev => prev.filter((_, i) => i !== index));
  };

  const updateWordPair = (index, field, value) => {
    setWordPairs(prev => prev.map((pair, i) => i === index ? { ...pair, [field]: value } : pair));
  };

  const publish = async () => {
    if (!user || !publishTitle.trim()) return;
    const validPairs = wordPairs.filter(p => p.es.trim() && p.en.trim());
    if (validPairs.length === 0) return;
    setPublishing(true);
    try {
      const words = validPairs.map(p => ({
        es: p.es.trim(),
        en: p.en.trim(),
        type: 'vocabulary',
        group: 'Custom',
      }));
      await addDoc(collection(db, 'sharedPacks'), {
        title: publishTitle.trim().slice(0, 40),
        description: publishDesc.trim().slice(0, 100) || '',
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        words,
        wordCount: words.length,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setPublishTitle('');
      setPublishDesc('');
      setWordPairs([{ es: '', en: '' }]);
      setFeedback({ ok: true, msg: 'Pack published!' });
      setTimeout(() => { setFeedback(null); setTab('browse'); }, 3000);
    } catch (e) {
      setFeedback({ ok: false, msg: 'Publish failed: ' + (e.message || 'unknown') });
    } finally { setPublishing(false); }
  };

  const importPack = (pack) => {
    if (!pack.words || !Array.isArray(pack.words) || pack.words.length === 0) {
      console.error('Pack has no words:', pack.id);
      return;
    }
    onImport(pack);
    setImported(prev => new Set([...prev, pack.id]));
    const existingEs = new Set((customWords || []).map(w => w.es));
    const dupCount = pack.words.filter(w => existingEs.has(w.es)).length;
    if (dupCount > 0) setDupWarnings(prev => ({ ...prev, [pack.id]: dupCount }));
  };

  const isImported = (pack) =>
    imported.has(pack.id) || (importedPacks || []).some(p => p.id === pack.id);

  const deleteMyPack = async (packId) => {
    try {
      await deleteDoc(doc(db, 'sharedPacks', packId));
      setPacks(prev => prev.filter(p => p.id !== packId));
    } catch (e) { console.error(e); }
  };

  const canPublish = publishTitle.trim() && wordPairs.some(p => p.es.trim() && p.en.trim());
  const validPairCount = wordPairs.filter(p => p.es.trim() && p.en.trim()).length;
  const feedbackBg    = feedback?.ok ? '#DCFCE7' : '#FEE2E2';
  const feedbackColor = feedback?.ok ? '#14532D' : '#991B1B';
  const inp = { background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' };

  return (
    <div data-testid="shared-packs-modal" onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.55)', alignItems: anchorY != null ? 'flex-start' : 'center' }}>
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
        style={{
          background: 'hsl(var(--card))',
          maxHeight: '85vh',
          marginTop: anchorY != null ? Math.min(anchorY, window.innerHeight * 0.15) : 0,
        }}>

        <div className="p-5 pb-3 flex items-start justify-between border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center gap-2">
            <Globe size={18} style={{ color: 'hsl(var(--primary))' }} />
            <h3 className="font-serif text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>Community Packs</h3>
          </div>
          <button data-testid="shared-packs-close" onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pt-3 flex gap-2">
          <button data-testid="shared-tab-browse" onClick={() => setTab('browse')}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: tab === 'browse' ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              color: tab === 'browse' ? 'white' : 'hsl(var(--foreground))',
            }}>Browse</button>
          <button data-testid="shared-tab-publish" onClick={() => setTab('publish')}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: tab === 'publish' ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
              color: tab === 'publish' ? 'white' : 'hsl(var(--foreground))',
            }}>Publish</button>
        </div>

        <div className="overflow-y-auto p-4">
          {isGuest ? (
            <div className="text-center py-10 px-4 rounded-xl text-sm" data-testid="shared-packs-guest"
              style={{ background: 'hsl(47 91% 95%)', color: '#78350F' }}>
              Sign in with Google to browse, publish, and import community packs.
            </div>
          ) : tab === 'browse' ? (
            loading ? (
              <div className="text-center py-10 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</div>
            ) : packs.length === 0 ? (
              <div className="text-center py-10 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                No community packs yet. Be the first to publish!
              </div>
            ) : (
              <div className="space-y-2">
                {packs.map(p => (
                  <div key={p.id} className="rounded-xl border p-3" data-testid={`shared-pack-${p.id}`}
                    style={{ background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{p.title}</div>
                        <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          by {p.authorName} · {p.wordCount} words
                        </div>
                      </div>
                      {p.authorId === user?.uid && (
                        <button onClick={() => deleteMyPack(p.id)} data-testid={`delete-pack-${p.id}`}
                          className="p-1 rounded transition-colors hover:bg-red-50"
                          style={{ color: '#DC2626' }}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    {p.description && (
                      <p className="text-xs italic mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.description}</p>
                    )}
                    <button data-testid={`import-pack-${p.id}`} onClick={() => importPack(p)} disabled={isImported(p)}
                      className="w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all disabled:cursor-default"
                      style={{
                        background: isImported(p) ? '#DCFCE7' : 'hsl(var(--primary))',
                        color: isImported(p) ? '#14532D' : 'white',
                      }}>
                      {isImported(p) ? <><Check size={12} /> Imported ✓</> : <><Download size={12} /> Import</>}
                    </button>
                    {dupWarnings[p.id] && (
                      <div className="mt-2 flex items-center justify-between px-2 py-1.5 rounded-lg text-xs"
                        style={{ background: 'hsl(47 91% 95%)', color: '#78350F' }}>
                        <span>{dupWarnings[p.id]} word{dupWarnings[p.id] === 1 ? '' : 's'} already in your list — skipped in drills</span>
                        <button onClick={() => setDupWarnings(prev => { const n = { ...prev }; delete n[p.id]; return n; })}
                          className="ml-2 font-bold leading-none" style={{ color: '#78350F' }}>×</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-3">
              <input data-testid="publish-title" value={publishTitle}
                onChange={e => setPublishTitle(e.target.value.slice(0, 40))}
                placeholder="Pack title (required)" maxLength={40}
                className="w-full p-2.5 rounded-xl border text-sm"
                style={inp} />
              <input data-testid="publish-desc" value={publishDesc}
                onChange={e => setPublishDesc(e.target.value.slice(0, 100))}
                placeholder="Description (optional)" maxLength={100}
                className="w-full p-2.5 rounded-xl border text-sm"
                style={inp} />

              <div className="space-y-2">
                {wordPairs.map((pair, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={pair.es}
                      onChange={e => updateWordPair(i, 'es', e.target.value)}
                      placeholder="Spanish"
                      className="flex-1 p-2 rounded-lg border text-sm"
                      style={inp} />
                    <input
                      value={pair.en}
                      onChange={e => updateWordPair(i, 'en', e.target.value)}
                      placeholder="English"
                      className="flex-1 p-2 rounded-lg border text-sm"
                      style={inp} />
                    {wordPairs.length > 1 && (
                      <button onClick={() => removeWordPair(i)}
                        className="p-1.5 rounded-lg text-sm font-bold flex-shrink-0 leading-none"
                        style={{ color: '#DC2626', background: '#FEE2E2' }}>
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={addWordPair} disabled={wordPairs.length >= 15}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
                  style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}>
                  <Plus size={12} /> Add Word
                </button>
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {validPairCount} / 15 words
                </span>
              </div>

              <button data-testid="publish-btn" onClick={publish}
                disabled={publishing || !canPublish}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: 'hsl(var(--primary))' }}>
                <Upload size={14} /> {publishing ? 'Publishing…' : 'Publish pack'}
              </button>

              {feedback && (
                <div className="text-center py-2 rounded-lg text-xs font-semibold"
                  style={{ background: feedbackBg, color: feedbackColor }}>
                  {feedback.msg}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
