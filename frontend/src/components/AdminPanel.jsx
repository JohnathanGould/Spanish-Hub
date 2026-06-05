import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_UID = 'BEeiVtpSVWZuHYbo97InnqmI1DC2';

export default function AdminPanel({ user }) {
  const navigate = useNavigate();
  const [pendingPacks, setPendingPacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmations, setConfirmations] = useState({});

  useEffect(() => {
    if (!user || user.uid !== ADMIN_UID) navigate('/');
  }, [user, navigate]);

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

  useEffect(() => {
    if (user?.uid === ADMIN_UID) fetchPending();
  }, [user]);

  const approve = async (pack) => {
    try {
      await updateDoc(doc(db, 'sharedPacks', pack.id), { status: 'approved' });
      await updateDoc(doc(db, 'users', pack.authorId), {
        earnedBadges: arrayUnion({ id: 'pack_pioneer', earnedAt: new Date().toISOString() }),
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

  if (!user || user.uid !== ADMIN_UID) return null;

  return (
    <div className="app-outer">
      <div className="app-container px-4 py-6">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>🔑 Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm font-semibold px-3 py-1.5 rounded-xl"
            style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}>
            ← Back
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wide"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            Pending Packs
          </h2>
          <button onClick={fetchPending}
            className="text-xs px-2 py-1 rounded-lg font-semibold"
            style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</p>
        ) : pendingPacks.length === 0 ? (
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>No pending packs 🎉</p>
        ) : (
          <div className="space-y-3">
            {pendingPacks.map(pack => (
              <div key={pack.id} className="rounded-2xl border p-4"
                style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                <div className="font-bold text-sm mb-0.5" style={{ color: 'hsl(var(--foreground))' }}>
                  {pack.title}
                </div>
                <div className="text-xs mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  by {pack.authorName} · {pack.wordCount} words
                </div>
                <div className="mb-3 space-y-0.5">
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
                      className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
                      style={{ background: '#16A34A' }}>
                      Approve
                    </button>
                    <button onClick={() => reject(pack)}
                      className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
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
