import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Flag, Globe, AlertCircle } from 'lucide-react';
import {
  collection, query, orderBy, limit, onSnapshot, addDoc,
  doc, updateDoc, arrayUnion, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { checkMessage } from '../utils/moderation';

const MAX_MESSAGES = 50;
const HIDE_AFTER_REPORTS = 3;

function relativeTime(ts) {
  if (!ts) return '';
  const ms = ts.toMillis ? ts.toMillis() : ts;
  const diff = Math.floor((Date.now() - ms) / 1000);
  if (diff < 5) return 'now';
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export default function Plaza({ user, isGuest }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [reported, setReported] = useState(new Set());
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isGuest || !user) return;
    const q = query(collection(db, 'plazaMessages'), orderBy('ts', 'desc'), limit(MAX_MESSAGES));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        .filter(m => !m.hidden && (m.reports || []).length < HIDE_AFTER_REPORTS)
        .reverse();
      setMessages(list);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    }, (err) => {
      console.error('Plaza listener error', err);
      setError(err.message || 'Could not load chat');
    });
    return unsub;
  }, [user, isGuest]);

  const send = async (e) => {
    e?.preventDefault();
    if (!user || !text.trim() || sending) return;
    const check = checkMessage(text);
    if (!check.ok) {
      setError(check.reason);
      setTimeout(() => setError(null), 3500);
      return;
    }
    setSending(true);
    setError(null);
    try {
      await addDoc(collection(db, 'plazaMessages'), {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || null,
        text: text.trim().slice(0, 280),
        ts: serverTimestamp(),
        reports: [],
        hidden: false,
      });
      setText('');
    } catch (err) {
      setError('Send failed: ' + (err.message || 'unknown'));
    } finally {
      setSending(false);
    }
  };

  const reportMessage = async (msg) => {
    if (!user || msg.uid === user.uid || reported.has(msg.id)) return;
    setReported(prev => new Set([...prev, msg.id]));
    try {
      await updateDoc(doc(db, 'plazaMessages', msg.id), {
        reports: arrayUnion(user.uid),
      });
    } catch (e) { console.error(e); }
  };

  if (isGuest) {
    return (
      <div data-testid="plaza-guest"
        className="text-center py-10 px-4 rounded-2xl text-sm border"
        style={{ background: 'hsl(47 91% 95%)', color: '#78350F', borderColor: 'hsl(47 91% 60%)' }}>
        <Globe size={28} className="mx-auto mb-3" style={{ color: '#D97706' }} />
        <div className="font-bold mb-1">Sign in to join the Plaza</div>
        <div className="text-xs">Real-time Spanish chat with other learners. Sign in with Google to participate.</div>
      </div>
    );
  }

  return (
    <div data-testid="plaza" className="flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: 400 }}>
      {/* Header banner */}
      <div className="rounded-2xl p-4 mb-3 text-white"
        style={{ background: 'linear-gradient(135deg,#7C2D12,#C9745E)', boxShadow: '0 6px 20px rgba(124,45,18,0.25)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Globe size={18} />
          <h2 className="font-serif text-lg font-bold">La Plaza</h2>
        </div>
        <p className="text-xs opacity-90">Practice Spanish with other learners. Be kind. Be patient. <em>Solo en español, por favor.</em></p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} data-testid="plaza-messages"
        className="flex-1 overflow-y-auto rounded-2xl border p-3 mb-3 space-y-2"
        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        {messages.length === 0 ? (
          <div className="text-center py-10 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            No messages yet — be the first to say <em>¡hola!</em>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map(m => {
              const isMine = m.uid === user.uid;
              const isOther = !isMine;
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} layout
                  className={`flex gap-2 ${isMine ? 'flex-row-reverse' : ''}`}
                  data-testid={`plaza-msg-${m.id}`}>
                  {m.photoURL ? (
                    <img src={m.photoURL} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ background: 'hsl(var(--primary))' }}>
                      {(m.displayName || '?')[0]}
                    </div>
                  )}
                  <div className={`max-w-[75%] ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-1.5 mb-0.5 px-1">
                      <span className="text-[11px] font-bold" style={{ color: isMine ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}>
                        {isMine ? 'You' : m.displayName}
                      </span>
                      <span className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {relativeTime(m.ts)}
                      </span>
                    </div>
                    <div className="px-3 py-2 rounded-2xl text-sm break-words"
                      style={{
                        background: isMine ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                        color: isMine ? 'white' : 'hsl(var(--foreground))',
                        borderTopRightRadius: isMine ? 4 : undefined,
                        borderTopLeftRadius: isOther ? 4 : undefined,
                      }}>
                      {m.text}
                    </div>
                    {!isMine && (
                      <button data-testid={`report-msg-${m.id}`} onClick={() => reportMessage(m)}
                        disabled={reported.has(m.id)}
                        className="mt-1 px-1.5 text-[10px] flex items-center gap-1 transition-opacity"
                        style={{ color: 'hsl(var(--muted-foreground))', opacity: reported.has(m.id) ? 1 : 0.5 }}>
                        <Flag size={9} /> {reported.has(m.id) ? 'Reported' : 'Report'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Compose */}
      {error && (
        <div data-testid="plaza-error" className="mb-2 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
          style={{ background: '#FEE2E2', color: '#991B1B' }}>
          <AlertCircle size={12} /> {error}
        </div>
      )}
      <form onSubmit={send} className="flex gap-2">
        <input data-testid="plaza-input" value={text} onChange={e => setText(e.target.value)}
          maxLength={280} placeholder="Escribe un mensaje en español…"
          className="flex-1 px-4 py-2.5 rounded-xl border text-sm"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
        <button data-testid="plaza-send-btn" type="submit" disabled={sending || !text.trim()}
          className="px-4 py-2.5 rounded-xl text-white font-bold flex items-center gap-1.5 disabled:opacity-50"
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.25)' }}>
          <Send size={14} />
        </button>
      </form>
      <div className="text-[10px] mt-1.5 px-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {text.length}/280 · Be kind. Hateful or spam messages can be reported.
      </div>
    </div>
  );
}
