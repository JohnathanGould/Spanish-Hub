import React, { useState, useEffect, useCallback, useRef } from 'react';
import { auth, db, googleProvider } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function getWeekStartStr() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

async function syncLeaderboard(user, data) {
  if (!user) return;
  try {
    const ws = getWeekStartStr();
    const weeklyXP = data.weekStart === ws ? (data.weeklyXP || 0) : 0;
    await setDoc(doc(db, 'leaderboard', user.uid), {
      displayName: user.displayName || data.displayName || 'Anonymous',
      photoURL: user.photoURL || null,
      xp: data.xp || 0,
      weeklyXP,
      weekStart: ws,
      updatedAt: Date.now(),
    });
  } catch (e) { console.error('LB sync error', e); }
}
import { MASTER, DEFAULT_CATEGORIES } from './data/words';
import { masteryLevel, getStats, initVoice } from './utils/helpers';
import Header from './components/Header';
import WordList from './components/WordList';
import DrillsGrid from './components/DrillsGrid';
import DoneScreen from './components/DoneScreen';
import Leaderboard from './components/Leaderboard';
import WordDetail from './components/WordDetail';
import CategoryToggles from './components/CategoryToggles';
import DrillRouter from './components/DrillRouter';

const DEFAULT_DATA = {
  displayName: '',
  photoURL: null,
  customWords: [],
  progress: {},
  xp: 0,
  weeklyXP: 0,
  weekStart: null,
  streak: { count: 0, lastDate: null },
  dailyGoal: 20,
  dailyProgress: { count: 0, date: null },
  sessions: [],
  categoryEnabled: { ...DEFAULT_CATEGORIES },
};

function LoginScreen({ onGuest }) {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try { await signInWithPopup(auth, googleProvider); }
    catch (e) { console.error(e); setLoading(false); }
  };
  return (
    <div className="app-outer">
      <div className="app-container flex items-center justify-center p-6">
        <div className="login-glass p-10 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">🇪🇸</div>
          <h1 className="font-serif text-3xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
            Spanish Hub
          </h1>
          <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Vocabulary &amp; grammar drills
          </p>
          <p className="text-sm mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Sign in to track your mastery, unlock streaks, and save your progress.
          </p>
          <button
            data-testid="google-signin-btn"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 mb-3"
            style={{ background: 'hsl(var(--primary))', color: 'white', boxShadow: '0 4px 14px rgba(198,11,30,0.35)' }}
          >
            {loading ? 'Signing in…' : 'Sign in with Google'}
          </button>
          <button
            data-testid="guest-continue-btn"
            onClick={onGuest}
            className="w-full py-2.5 px-6 rounded-xl font-medium text-sm transition-all border"
            style={{ background: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
          >
            Continue as guest
          </button>
          <p className="text-xs mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            15 drills · 200+ words · mastery tracking
          </p>
        </div>
      </div>
    </div>
  );
}

function GoalModal({ goal, onSave, onClose }) {
  const [val, setVal] = useState(goal);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-2xl p-6 w-full max-w-xs shadow-2xl" style={{ background: 'hsl(var(--card))' }}>
        <h3 className="font-serif text-lg font-bold mb-4">Set Daily Goal</h3>
        <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
          How many correct answers do you want per day?
        </p>
        <input
          data-testid="goal-input"
          type="number" min="1" max="500" value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full p-3 rounded-xl border text-lg text-center mb-4 font-bold"
          style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border text-sm font-medium"
            style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            Cancel
          </button>
          <button data-testid="goal-save-btn" onClick={() => onSave(Math.max(1, val))}
            className="flex-1 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'hsl(var(--primary))' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SpanishHub() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(DEFAULT_DATA);
  const [view, setView] = useState({ page: 'home' });
  const [tab, setTab] = useState('drills');
  const [drillMode, setDrillMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    initVoice();
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) { setIsGuest(false); await loadUserData(u); }
      setLoading(false);
    });
    return unsub;
  }, []);

  const startGuest = () => {
    setIsGuest(true);
    try {
      const raw = localStorage.getItem('spanish-hub-guest');
      if (raw) {
        const data = JSON.parse(raw);
        setUserData({
          ...DEFAULT_DATA, ...data,
          categoryEnabled: { ...DEFAULT_DATA.categoryEnabled, ...(data.categoryEnabled || {}) },
        });
      } else {
        setUserData({ ...DEFAULT_DATA, displayName: 'Guest' });
      }
    } catch (e) { console.error(e); }
  };

  const loadUserData = async (u) => {
    try {
      const snap = await getDoc(doc(db, 'users', u.uid));
      if (snap.exists()) {
        const data = snap.data();
        setUserData({
          ...DEFAULT_DATA, ...data,
          categoryEnabled: { ...DEFAULT_DATA.categoryEnabled, ...(data.categoryEnabled || {}) },
        });
      } else {
        const fresh = { ...DEFAULT_DATA, displayName: u.displayName || 'Learner', photoURL: u.photoURL || null };
        setUserData(fresh);
        await setDoc(doc(db, 'users', u.uid), fresh);
      }
    } catch (e) { console.error('Load error:', e); }
  };

  const persistData = useCallback((data) => {
    if (isGuest) {
      try { localStorage.setItem('spanish-hub-guest', JSON.stringify(data)); } catch (e) { console.error(e); }
      return;
    }
    if (!user) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setDoc(doc(db, 'users', user.uid), data).catch(console.error);
      syncLeaderboard(user, data);
    }, 1500);
  }, [user, isGuest]);

  const recordAnswer = useCallback((wordEs, isCorrect) => {
    setUserData(prev => {
      const p = { ...(prev.progress[wordEs] || { c: 0, w: 0, s: 0 }) };
      const wasAboutToMaster = p.s === 5 && isCorrect;
      if (isCorrect) { p.c++; p.s = Math.min(p.s + 1, 10); }
      else { p.w++; p.s = Math.max(p.s - 1, 0); }
      const xpGain = isCorrect ? 1 + (wasAboutToMaster ? 10 : 0) : 0;
      const today = new Date().toDateString();
      const dp = prev.dailyProgress || { count: 0, date: null };
      const dailyCount = (dp.date === today ? dp.count : 0) + (isCorrect ? 1 : 0);
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      const newData = {
        ...prev,
        progress: { ...prev.progress, [wordEs]: p },
        xp: (prev.xp || 0) + xpGain,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + xpGain,
        weekStart: ws,
        dailyProgress: { count: dailyCount, date: today },
      };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const onDrillDone = useCallback((drillId, correct, total) => {
    const xpBonus = total > 0 ? Math.round((correct / total) * 5) : 0;
    setUserData(prev => {
      const today = new Date().toDateString();
      const streak = prev.streak || { count: 0, lastDate: null };
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreakCount = streak.lastDate === today ? streak.count
        : streak.lastDate === yesterday ? streak.count + 1 : 1;
      const sessions = [{ drillId, correct, total, date: today, ts: Date.now() }, ...(prev.sessions || []).slice(0, 49)];
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      const newData = {
        ...prev,
        xp: (prev.xp || 0) + xpBonus,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + xpBonus,
        weekStart: ws,
        streak: { count: newStreakCount, lastDate: today },
        sessions,
      };
      if (isGuest) {
        try { localStorage.setItem('spanish-hub-guest', JSON.stringify(newData)); } catch (e) { console.error(e); }
      } else if (user) {
        setDoc(doc(db, 'users', user.uid), newData).catch(console.error);
        syncLeaderboard(user, newData);
      }
      return newData;
    });
    setView({ page: 'done', drillId, correct, total });
  }, [user, isGuest]);

  const startDrill = useCallback((drillId) => setView({ page: 'drill', drillId }), []);
  const goHome = useCallback(() => setView({ page: 'home' }), []);

  const getActiveWords = useCallback(() => {
    const filtered = MASTER.filter(w => w.group === 'Core' || userData.categoryEnabled[w.group] !== false);
    const masterSet = new Set(filtered.map(w => w.es));
    const custom = (userData.customWords || []).filter(w => !masterSet.has(w.es));
    const all = [...filtered, ...custom];
    if (drillMode === 'weak') return all.filter(w => masteryLevel(userData.progress, w.es) !== 'mastered');
    if (drillMode === 'mastered') return all.filter(w => masteryLevel(userData.progress, w.es) === 'mastered');
    return all;
  }, [userData, drillMode]);

  const addCustomWord = useCallback((wordData) => {
    setUserData(prev => {
      const newData = { ...prev, customWords: [...(prev.customWords || []), wordData] };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const deleteCustomWord = useCallback((es) => {
    setUserData(prev => {
      const newData = { ...prev, customWords: (prev.customWords || []).filter(w => w.es !== es) };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const updateCategoryEnabled = useCallback((category, enabled) => {
    setUserData(prev => {
      const newData = { ...prev, categoryEnabled: { ...prev.categoryEnabled, [category]: enabled } };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const updateDailyGoal = useCallback((goal) => {
    setUserData(prev => {
      const newData = { ...prev, dailyGoal: goal };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const handleSignOut = async () => {
    if (isGuest) {
      setIsGuest(false);
      setUserData(DEFAULT_DATA);
      setView({ page: 'home' });
      return;
    }
    await signOut(auth);
    setUser(null);
    setUserData(DEFAULT_DATA);
    setView({ page: 'home' });
  };

  if (loading) return (
    <div className="app-outer">
      <div className="app-container flex items-center justify-center">
        <div className="text-center"><div className="text-5xl mb-4" style={{ animation: 'pulse 1.5s infinite' }}>🇪🇸</div>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</p></div>
      </div>
    </div>
  );

  if (!user && !isGuest) return <LoginScreen onGuest={startGuest} />;

  const effectiveUser = user || { uid: 'guest', displayName: 'Guest', photoURL: null };

  const activeWords = getActiveWords();
  const stats = getStats(activeWords, userData.progress);

  if (view.page === 'drill') {
    return (
      <div className="app-outer">
        <div className="app-container">
          <DrillRouter
            drillId={view.drillId}
            words={activeWords}
            progress={userData.progress}
            onAnswer={recordAnswer}
            onDone={(c, t) => onDrillDone(view.drillId, c, t)}
            onBack={goHome}
          />
        </div>
      </div>
    );
  }

  if (view.page === 'done') {
    return (
      <div className="app-outer">
        <div className="app-container">
          <DoneScreen
            drillId={view.drillId}
            correct={view.correct}
            total={view.total}
            sessions={userData.sessions}
            onRetry={() => startDrill(view.drillId)}
            onHome={goHome}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app-outer">
      <div className="app-container">
        <Header
          user={effectiveUser}
          streak={userData.streak}
          xp={userData.xp}
          dailyGoal={userData.dailyGoal}
          dailyProgress={userData.dailyProgress}
          onSignOut={handleSignOut}
          onGoalClick={() => setShowGoalModal(true)}
        />
        <div className="tab-bar">
          {[['drills', 'Drills'], ['words', 'My Words'], ['leaderboard', 'Leaderboard']].map(([id, label]) => (
            <button key={id} className={`tab-btn${tab === id ? ' active' : ''}`}
              onClick={() => setTab(id)} data-testid={`tab-${id}`}>{label}</button>
          ))}
        </div>
        <div className="px-4 pb-16">
          {tab === 'drills' && (
            <DrillsGrid words={activeWords} stats={stats} drillMode={drillMode}
              setDrillMode={setDrillMode} onStartDrill={startDrill} />
          )}
          {tab === 'words' && (
            <WordList
              words={activeWords} progress={userData.progress}
              customWords={userData.customWords || []}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              onAddWord={addCustomWord} onDeleteWord={deleteCustomWord}
              onWordClick={setSelectedWord} onCategoryClick={() => setShowCategoryModal(true)}
              categoryEnabled={userData.categoryEnabled}
            />
          )}
          {tab === 'leaderboard' && (
            <Leaderboard currentUserId={effectiveUser.uid} currentXP={userData.xp} sessions={userData.sessions} isGuest={isGuest} />
          )}
        </div>

        {selectedWord && (
          <WordDetail word={selectedWord} progress={userData.progress[selectedWord.es]} onClose={() => setSelectedWord(null)} />
        )}
        {showCategoryModal && (
          <CategoryToggles categoryEnabled={userData.categoryEnabled}
            onToggle={updateCategoryEnabled} onClose={() => setShowCategoryModal(false)} />
        )}
        {showGoalModal && (
          <GoalModal goal={userData.dailyGoal}
            onSave={(g) => { updateDailyGoal(g); setShowGoalModal(false); }}
            onClose={() => setShowGoalModal(false)} />
        )}
      </div>
    </div>
  );
}
