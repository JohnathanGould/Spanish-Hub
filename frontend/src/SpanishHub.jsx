import React, { useState, useEffect, useCallback, useRef } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { MASTER, DEFAULT_CATEGORIES, PRESET_PACKS } from './data/words';
import { LESSONS, DAILY_THEMES } from './data/lessons';
import { masteryLevel, getStats, initVoice, spacedRepetitionSort, playConfetti } from './utils/helpers';
import { evaluateBadges } from './utils/evaluateBadges';
import BadgeGrid from './components/BadgeGrid';
import Header from './components/Header';
import ProfileSheet from './components/ProfileSheet';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import WordList from './components/WordList';
import DrillsGrid from './components/DrillsGrid';
import DoneScreen from './components/DoneScreen';

import FriendsList from './components/FriendsList';
import Leaderboard from './components/Leaderboard';
import WordDetail from './components/WordDetail';
import CategoryToggles from './components/CategoryToggles';
import DrillRouter from './components/DrillRouter';
import LessonsList from './components/LessonsList';
import LessonView from './components/LessonView';
import LoginScreen from './components/LoginScreen';
import GoalModal from './components/GoalModal';
import StreakModal from './components/StreakModal';
import Certificate from './components/Certificate';
import SharedPacks from './components/SharedPacks';
import Plaza from './components/Plaza';
import MiloChat from './MiloChat';
import SpanishFlag from './components/SpanishFlag';
import { KofiSupport } from './components/KofiSupport';
import confetti from 'canvas-confetti';

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

// Default shape for each word's progress entry.
// Used when a word is first encountered. FSRS fields included.
const DEFAULT_WORD_PROGRESS = {
  c: 0,
  w: 0,
  s: 0,
  outputCorrect: 0,
  stability: 0,
  difficulty: 0,
  due: new Date().toISOString(),
  lastReview: null,
};

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
  activeDays: [],
  categoryEnabled: { ...DEFAULT_CATEGORIES },
  lessonsCompleted: [],
  dailyChallenges: { date: null, weakDone: false, themeDone: false },
  friends: [],
  reminderEnabled: false,
  bones: 0,
  completedPaths: [],
  completedStops: [],
  audioListenEnabled: true,
  audioSpeakEnabled: true,
  earnedBadges: [],
};

function SpanishFlagPulse() { return <SpanishFlag size={88} />; }

function maybeRunStreakReminder(data) {
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (!data?.reminderEnabled) return;
    if (Notification.permission !== 'granted') return;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDate = data?.streak?.lastDate;
    const dailyDate = data?.dailyProgress?.date;
    if (lastDate === yesterday && dailyDate !== today && (data.streak?.count || 0) > 0) {
      if (window.__shStreakNotified) return;
      window.__shStreakNotified = true;
      new Notification('Keep your Spanish streak alive 🇪🇸🔥', {
        body: `${data.streak.count}-day streak — finish a quick drill to keep it going.`,
        icon: '/icon.svg',
        tag: 'streak-reminder',
      });
    }
  } catch (e) { console.error(e); }
}

const TAB_ORDER = ['home', 'learn', 'words', 'study'];

export default function SpanishHub() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(DEFAULT_DATA);
  const [view, setView] = useState({ page: 'home' });
  const [tab, setTab] = useState('home');
  const [drillMode, setDrillMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSharedPacks, setShowSharedPacks] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBadgeGrid, setShowBadgeGrid] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const saveTimerRef = useRef(null);
  const contentRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Scroll to top and open word detail
  const handleWordClick = useCallback((word) => {
    document.querySelector('.app-container')?.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedWord(word);
  }, []);

  useEffect(() => {
    initVoice();
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) { setIsGuest(false); await loadUserData(u); }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (view.page !== 'home') return;
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(deltaX) < 50) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      const currentIndex = TAB_ORDER.indexOf(tab);
      if (deltaX < 0 && currentIndex < TAB_ORDER.length - 1) setTab(TAB_ORDER[currentIndex + 1]);
      if (deltaX > 0 && currentIndex > 0) setTab(TAB_ORDER[currentIndex - 1]);
      touchStartX.current = null;
      touchStartY.current = null;
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [tab, view.page]);

  const startGuest = () => {
    setIsGuest(true);
    try {
      const raw = localStorage.getItem('spanish-hub-guest');
      if (raw) {
        const data = JSON.parse(raw);
        const merged = {
          ...DEFAULT_DATA, ...data,
          categoryEnabled: { ...DEFAULT_DATA.categoryEnabled, ...(data.categoryEnabled || {}) },
        };
        setUserData(merged);
        maybeRunStreakReminder(merged);
      } else {
        setUserData({ ...DEFAULT_DATA, displayName: 'Guest' });
      }
    } catch (e) { console.error(e); }
  };

  const loadUserData = async (u) => {
    try {
      const snap = await getDoc(doc(db, 'users', u.uid));
      let merged;
      if (snap.exists()) {
        const data = snap.data();
        merged = {
          ...DEFAULT_DATA, ...data,
          categoryEnabled: { ...DEFAULT_DATA.categoryEnabled, ...(data.categoryEnabled || {}) },
        };
      } else {
        merged = { ...DEFAULT_DATA, displayName: u.displayName || 'Learner', photoURL: u.photoURL || null, foundingPaw: true };
        await setDoc(doc(db, 'users', u.uid), merged);
      }
      const { updatedBadges } = evaluateBadges({}, merged, 'login', {});
      if (updatedBadges.length !== (merged.earnedBadges || []).length) {
        merged = { ...merged, earnedBadges: updatedBadges };
        setDoc(doc(db, 'users', u.uid), merged).catch(console.error);
      }
      setUserData(merged);
      maybeRunStreakReminder(merged);
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
      let xpGain = 0;
      if (isCorrect) xpGain = wasAboutToMaster ? 11 : 1;
      const today = new Date().toDateString();
      const dp = prev.dailyProgress || { count: 0, date: null };
      const dailyCount = (dp.date === today ? dp.count : 0) + (isCorrect ? 1 : 0);
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      let newData = {
        ...prev,
        progress: { ...prev.progress, [wordEs]: p },
        xp: (prev.xp || 0) + xpGain,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + xpGain,
        weekStart: ws,
        dailyProgress: { count: dailyCount, date: today },
      };
      const { updatedBadges } = evaluateBadges(prev, newData, 'answer', {});
      newData = { ...newData, earnedBadges: updatedBadges };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const recordAnswerNoXP = useCallback((wordEs, isCorrect) => {
    setUserData(prev => {
      const p = { ...(prev.progress[wordEs] || { c: 0, w: 0, s: 0 }) };
      if (isCorrect) { p.c++; p.s = Math.min(p.s + 1, 10); }
      else { p.w++; p.s = Math.max(p.s - 1, 0); }
      const today = new Date().toDateString();
      const dp = prev.dailyProgress || { count: 0, date: null };
      const dailyCount = (dp.date === today ? dp.count : 0) + (isCorrect ? 1 : 0);
      const newData = {
        ...prev,
        progress: { ...prev.progress, [wordEs]: p },
        dailyProgress: { count: dailyCount, date: today },
      };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const onDrillDone = useCallback((drillId, correct, total) => {
    const dailyKind = view.dailyKind;
    const xpMultiplier = view.xpMultiplier || 1;
    const baseBonus = total > 0 ? Math.round((correct / total) * 5) : 0;
    const xpBonus = drillId === 'flashcard' ? 0 : Math.round(baseBonus * xpMultiplier);
    setUserData(prev => {
      const today = new Date().toDateString();
      const streak = prev.streak || { count: 0, lastDate: null };
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let newStreakCount = 1;
      if (streak.lastDate === today) newStreakCount = streak.count;
      else if (streak.lastDate === yesterday) newStreakCount = streak.count + 1;
      let sessionDrillId = drillId;
      if (dailyKind === 'weak') sessionDrillId = 'daily-weak';
      else if (dailyKind === 'theme') sessionDrillId = 'daily-theme';
      const sessions = [{ drillId: sessionDrillId, correct, total, date: today, ts: Date.now() }, ...(prev.sessions || []).slice(0, 49)];
      const todayISO = new Date().toISOString().split('T')[0];
      const updatedActiveDays = prev.activeDays || [];
      const newActiveDays = updatedActiveDays.includes(todayISO)
        ? updatedActiveDays
        : [...updatedActiveDays, todayISO];
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      const dc = prev.dailyChallenges || { date: null, weakDone: false, themeDone: false };
      const sameDay = dc.date === today;
      const updatedChallenges = {
        date: today,
        weakDone: (sameDay && dc.weakDone) || dailyKind === 'weak',
        themeDone: (sameDay && dc.themeDone) || dailyKind === 'theme',
      };
      let newData = {
        ...prev,
        xp: (prev.xp || 0) + xpBonus,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + xpBonus,
        weekStart: ws,
        streak: { count: newStreakCount, lastDate: today },
        sessions,
        activeDays: newActiveDays,
        dailyChallenges: updatedChallenges,
      };
      const { updatedBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
      newData = { ...newData, earnedBadges: updatedBadges };
      if (isGuest) {
        try { localStorage.setItem('spanish-hub-guest', JSON.stringify(newData)); } catch (e) { console.error(e); }
      } else if (user) {
        setDoc(doc(db, 'users', user.uid), newData).catch(console.error);
        syncLeaderboard(user, newData);
      }
      return newData;
    });
    setView({ page: 'done', drillId: dailyKind ? `daily-${dailyKind}` : drillId, correct, total });
    if (drillId !== 'flashcard' || dailyKind) {
      setTimeout(() => {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        playConfetti();
      }, 300);
    }
  }, [user, isGuest, view.dailyKind, view.xpMultiplier]);

  const startDrill = useCallback((drillId, drillLength = 10) => setView({ page: 'drill', drillId, drillLength }), []);
  const goHome = useCallback(() => setView({ page: 'home' }), []);

  const startDailyChallenge = useCallback((kind) => {
    const today = new Date().toDateString();
    if (kind === 'weak') {
      const all = MASTER.filter(w => w.group === 'Core' || userData.categoryEnabled[w.group] !== false);
      const candidates = all.filter(w => masteryLevel(userData.progress, w.es) !== 'mastered');
      const pool = candidates.length >= 5 ? candidates : all;
      const sorted = spacedRepetitionSort(pool, userData.progress);
      const words = sorted.slice(0, 5);
      if (words.length === 0) return;
      setView({ page: 'drill', drillId: 'es-en', overrideWords: words, dailyKind: 'weak', xpMultiplier: 2, today });
    } else {
      const theme = DAILY_THEMES[new Date().getDay()];
      const themeWords = MASTER.filter(w => w.group === theme.group);
      if (themeWords.length === 0) return;
      const words = spacedRepetitionSort(themeWords, userData.progress).slice(0, 5);
      setView({ page: 'drill', drillId: 'flashcard', overrideWords: words, dailyKind: 'theme', xpMultiplier: 1.5, today });
    }
  }, [userData]);

  const openLesson = useCallback((lessonId) => setView({ page: 'lesson', lessonId }), []);

  const completeLesson = useCallback((lessonId, hasNext) => {
    setUserData(prev => {
      const already = (prev.lessonsCompleted || []).includes(lessonId);
      const lessonsCompleted = already ? prev.lessonsCompleted : [...(prev.lessonsCompleted || []), lessonId];
      const xpGain = already ? 0 : 15;
      const newData = { ...prev, lessonsCompleted, xp: (prev.xp || 0) + xpGain };
      persistData(newData);
      return newData;
    });
    if (hasNext) {
      const idx = LESSONS.findIndex(l => l.id === lessonId);
      const next = LESSONS[idx + 1];
      if (next) setView({ page: 'lesson', lessonId: next.id });
    } else {
      setView({ page: 'home' });
      setTab('learn');
    }
  }, [persistData]);

  const practiceLessonWords = useCallback((wordEsList) => {
    const words = wordEsList
      .map(es => MASTER.find(w => w.es === es) || (userData.customWords || []).find(w => w.es === es))
      .filter(Boolean);
    if (words.length === 0) return;
    setView({ page: 'drill', drillId: 'flashcard', overrideWords: words, dailyKind: null, xpMultiplier: 1 });
  }, [userData.customWords]);

  const getActiveWords = useCallback(() => {
    if (view.page === 'drill' && Array.isArray(view.overrideWords) && view.overrideWords.length > 0) {
      return view.overrideWords;
    }
    const filtered = MASTER.filter(w => w.group === 'Core' || userData.categoryEnabled[w.group] !== false);
    const masterSet = new Set(filtered.map(w => w.es));
    const custom = (userData.customWords || []).filter(w => !masterSet.has(w.es));
    const all = [...filtered, ...custom];
    if (drillMode !== 'all') return all.filter(w => masteryLevel(userData.progress, w.es) === drillMode);
    return all;
  }, [userData, drillMode, view]);

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

  const applyPreset = useCallback((presetId) => {
    const preset = PRESET_PACKS.find(p => p.id === presetId);
    if (!preset) return;
    setUserData(prev => {
      const next = { ...DEFAULT_CATEGORIES };
      Object.keys(next).forEach(cat => {
        next[cat] = preset.cats.includes('*') || preset.cats.includes(cat);
      });
      const newData = { ...prev, categoryEnabled: next };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const updateDailyGoal = useCallback((goal, reminderEnabled) => {
    setUserData(prev => {
      const newData = { ...prev, dailyGoal: goal, reminderEnabled: !!reminderEnabled };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const addFriend = useCallback((fid) => {
    setUserData(prev => {
      if ((prev.friends || []).includes(fid)) return prev;
      const newData = { ...prev, friends: [...(prev.friends || []), fid] };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const removeFriend = useCallback((fid) => {
    setUserData(prev => {
      const newData = { ...prev, friends: (prev.friends || []).filter(f => f !== fid) };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const importPackWords = useCallback((words) => {
    setUserData(prev => {
      const existing = new Set((prev.customWords || []).map(w => w.es));
      const fresh = words.filter(w => !existing.has(w.es));
      const newData = { ...prev, customWords: [...(prev.customWords || []), ...fresh] };
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
        <div className="text-center">
          <div className="mb-4 flex justify-center" style={{ animation: 'pulse 1.5s infinite' }}>
            <SpanishFlagPulse />
          </div>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Loading…</p>
        </div>
      </div>
    </div>
  );

  if (!user && !isGuest) return <LoginScreen onGuest={startGuest} />;

  const effectiveUser = user || { uid: 'guest', displayName: 'Guest', photoURL: null };

  const activeWords = getActiveWords();
  const stats = getStats(activeWords, userData.progress);
  const streakRiskLevel = (() => {
    if (!userData.reminderEnabled) return 0;
    const goalMet = (userData.dailyProgress?.count ?? 0) >= userData.dailyGoal &&
      userData.dailyProgress?.date === new Date().toDateString();
    if (goalMet) return 0;
    const hour = new Date().getHours();
    if (hour >= 18) return 3;
    if (hour >= 14) return 2;
    if (hour >= 8) return 1;
    return 0;
  })();

  if (view.page === 'lesson') {
    return (
      <div className="app-outer">
        <div className="app-container">
          <LessonView
            lessonId={view.lessonId}
            lessonsCompleted={userData.lessonsCompleted || []}
            onComplete={completeLesson}
            onPractice={practiceLessonWords}
            onBack={() => { setView({ page: 'home' }); setTab('learn'); }}
          />
        </div>
      </div>
    );
  }

  if (view.page === 'drill') {
    return (
      <div className="app-outer">
        <div className="app-container">
          <DrillRouter
            drillId={view.drillId}
            drillLength={view.drillLength || 10}
            words={activeWords}
            progress={userData.progress}
            onAnswer={view.drillId.includes('flashcard') ? recordAnswerNoXP : recordAnswer}
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
    <>
    <div className="app-outer overflow-visible">
      <div className="app-container overflow-visible">
        <Header
          user={effectiveUser}
          streak={userData.streak}
          xp={userData.xp}
          bones={userData.bones || 0}
          dailyGoal={userData.dailyGoal}
          dailyProgress={userData.dailyProgress}
          onAvatarClick={() => setShowProfile(true)}
          onGoalClick={() => setShowGoalModal(true)}
          onHomeClick={() => setTab('home')}
          onXpClick={() => setTab('leaderboard')}
          onStreakClick={() => setStreakModalOpen(true)}
          streakRiskLevel={streakRiskLevel}
        />
        <div ref={contentRef} className="px-4">
          {tab === 'home' && (
            <div className="pb-20">
            <HomeTab
              onNavigate={setTab}
              userData={userData}
              streak={userData.streak}
              dailyProgress={userData.dailyProgress}
              dailyGoal={userData.dailyGoal}
              onStartDailyChallenge={startDailyChallenge}
              onStartDrill={startDrill}
            />
            </div>
          )}
          {tab === 'study' && (
            <div className="pb-20">
              <DrillsGrid words={activeWords} stats={stats} drillMode={drillMode}
                setDrillMode={setDrillMode} onStartDrill={startDrill}
                completedPaths={userData.completedPaths || []} />
              <KofiSupport />
            </div>
          )}
          {tab === 'learn' && (
            <div className="pb-20">
            <LessonsList lessonsCompleted={userData.lessonsCompleted || []}
              onOpenLesson={openLesson}
              onShowCertificate={() => setShowCertificate(true)} />
            </div>
          )}
          {tab === 'words' && (
            <div className="pb-20">
            <WordList
              words={activeWords} progress={userData.progress}
              customWords={userData.customWords || []}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              onAddWord={addCustomWord} onDeleteWord={deleteCustomWord}
              onWordClick={handleWordClick}
              onCategoryClick={() => setShowCategoryModal(true)}
              onSharedPacksClick={() => setShowSharedPacks(true)}
              categoryEnabled={userData.categoryEnabled}
              drillMode={drillMode} setDrillMode={setDrillMode}
            />
            </div>
          )}

          {tab === 'milo' && (
            <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <MiloChat userUid={effectiveUser.uid} />
            </div>
          )}
          {tab === 'friends' && (
            <div className="pb-20">
              <FriendsList
                user={effectiveUser}
                friends={userData.friends || []}
                onAddFriend={addFriend}
                onRemoveFriend={removeFriend}
                isGuest={isGuest}
              />
            </div>
          )}
          {tab === 'leaderboard' && (
            <div className="pb-20">
              <Leaderboard
                currentUserId={effectiveUser?.uid}
                currentXP={userData.xp || 0}
                isGuest={isGuest}
                user={effectiveUser}
                friends={userData.friends || []}
                onAddFriend={addFriend}
                onRemoveFriend={removeFriend}
              />
            </div>
          )}
          </div>
        {showCertificate && (
          <Certificate
            name={effectiveUser.displayName || userData.displayName || 'Spanish Learner'}
            xp={userData.xp || 0}
            streakCount={userData.streak?.count || 0}
            completedDate={new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            onClose={() => setShowCertificate(false)} />
        )}
        {showSharedPacks && (
          <SharedPacks user={user} isGuest={isGuest}
            customWords={userData.customWords || []}
            onImport={importPackWords}
            onClose={() => setShowSharedPacks(false)} />
        )}
      </div>
      <BottomNav activeTab={tab} onTabChange={setTab} />
      {showBadgeGrid && (
        <BadgeGrid
          earnedBadges={userData.earnedBadges || []}
          onBack={() => setShowBadgeGrid(false)}
        />
      )}
      <ProfileSheet
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={effectiveUser}
        userData={userData}
        totalWords={activeWords.length}
        onSignOut={handleSignOut}
        onViewAllBadges={() => { setShowProfile(false); setShowBadgeGrid(true); }}
        onGoalClick={() => { setShowProfile(false); setShowGoalModal(true); }}
        onNotificationsToggle={(enabled) => updateDailyGoal(userData.dailyGoal, enabled)}
        onAudioListenToggle={(enabled) => {
          setUserData(prev => {
            const newData = { ...prev, audioListenEnabled: enabled };
            persistData(newData);
            return newData;
          });
        }}
        onAudioSpeakToggle={(enabled) => {
          setUserData(prev => {
            const newData = { ...prev, audioSpeakEnabled: enabled };
            persistData(newData);
            return newData;
          });
        }}
      />
      {showCategoryModal && (
        <>
          <div onClick={() => setShowCategoryModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 49 }} />
          <CategoryToggles categoryEnabled={userData.categoryEnabled}
            onToggle={updateCategoryEnabled} onApplyPreset={applyPreset}
            onClose={() => setShowCategoryModal(false)} />
        </>
      )}
      {selectedWord && (
        <WordDetail word={selectedWord} progress={userData.progress[selectedWord.es]} onClose={() => setSelectedWord(null)} />
      )}
    </div>
    {showGoalModal && (
      <GoalModal goal={userData.dailyGoal}
        reminderEnabled={userData.reminderEnabled}
        streakCount={userData.streak?.count ?? 0}
        onSave={(g, r) => { updateDailyGoal(g, r); setShowGoalModal(false); }}
        onClose={() => setShowGoalModal(false)} />
    )}
    {streakModalOpen && (
      <StreakModal
        streak={userData.streak ?? { count: 0, lastDate: null }}
        activeDays={userData.activeDays ?? []}
        reminderEnabled={userData.reminderEnabled ?? false}
        onReminderToggle={async () => {
          if (!userData.reminderEnabled && 'Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return;
          }
          const updated = { ...userData, reminderEnabled: !userData.reminderEnabled };
          setUserData(updated);
          persistData(updated);
        }}
        onClose={() => setStreakModalOpen(false)}
      />
    )}
    </>
  );
}
