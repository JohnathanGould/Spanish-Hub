import { languageConfig } from './config/languageConfig';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { MASTER, DEFAULT_CATEGORIES, PRESET_PACKS } from './content/es-en/words';
import { LESSONS, DAILY_THEMES } from './content/es-en/lessons';
import { PATHS, getStopWords } from './content/es-en/paths';
import { masteryLevel, getStats, initVoice, initAudio, spacedRepetitionSort, playConfetti } from './utils/helpers';
import { DEFAULT_PATTERN_PROGRESS, computePatternMastery } from './utils/cognateQueue';
import { evaluateBadges } from './utils/evaluateBadges';
import BadgeGrid from './components/BadgeGrid';
import MasteryModal from './components/MasteryModal';
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
import PathsTab from './components/PathsTab';
import FetchTab from './components/FetchTab';
import BreakFreeDrill from './components/BreakFreeDrill';
import { Toaster } from './components/ui/toaster';
import { toast } from './hooks/use-toast';
import { BADGES } from './data/badges';
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
import { fsrs, Rating, generatorParameters } from 'ts-fsrs';

function getWeekStartStr() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

function getWeekBits(activeDays = []) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  return [1,2,3,4,5,6,0].map(d => {
    const diff = (dayOfWeek - d + 7) % 7;
    const date = new Date(now);
    date.setDate(now.getDate() - diff);
    const key = date.toISOString().slice(0, 10);
    return activeDays.includes(key);
  });
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

const DEFAULT_WORD_PROGRESS = {
  // Legacy — do not remove, existing data depends on these
  c: 0,
  w: 0,
  s: 0,
  drillStats: {},

  // 4D mastery dimensions
  read: {
    stability: 0, difficulty: 0,
    due: new Date().toISOString(),
    lastReview: null, correct: 0, wrong: 0
  },
  hear: {
    stability: 0, difficulty: 0,
    due: new Date().toISOString(),
    lastReview: null, correct: 0, wrong: 0
  },
  produce: {
    stability: 0, difficulty: 0,
    due: new Date().toISOString(),
    lastReview: null, correct: 0, wrong: 0
  },
  speak: {
    stability: 0, difficulty: 0,
    due: new Date().toISOString(),
    lastReview: null, correct: 0, wrong: 0
  }
};

const DEFAULT_DATA = {
  displayName: '',
  photoURL: null,
  customWords: [],
  importedPacks: [],
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
  strictTyping: false,
  completedPaths: [],
  completedStops: [],
  stopProgress: {},
  fetchHistory: { totalSessions: 0, totalCorrect: 0, totalQuestions: 0 },
  audioListenEnabled: true,
  audioSpeakEnabled: true,
  earnedBadges: [],
  totalDrills: 0,
  totalBonesEarned: 0,
  perfectStreak: 0,
  dailyGoalStreak: 0,
  dailyGoalStreakDate: null,
  patternProgress: { ...DEFAULT_PATTERN_PROGRESS },
  breakFreeXP: 0,
  streakShieldActive: false,   // user's toggle state — persists across sessions
  shieldEventPending: null,    // { bonesSpent, daysCovered, daysTotal } — read on next open, cleared after toast
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
      new Notification(`Keep your ${languageConfig.sourceLanguageName} streak alive 🔥`, {
        body: `${data.streak.count}-day streak — finish a quick drill to keep it going.`,
        icon: '/icon.svg',
        tag: 'streak-reminder',
      });
    }
  } catch (e) { console.error(e); }
}

// ── Streak Shield: intercept missed days on app open, spend 20 bones/day ──
function maybeApplyStreakShield(data, uid) {
  if (!data?.streakShieldActive) return data;
  if (!data?.streak?.lastDate) return data;
  if ((data.streak?.count || 0) === 0) return data;

  const today = new Date().toDateString();
  const lastDate = new Date(data.streak.lastDate);
  const now = new Date();
  const daysDiff = Math.floor((now - lastDate) / 86400000);

  // Already played today or only missed yesterday (streak logic handles this) — no shield needed
  if (daysDiff <= 1) return data;

  // Gone more than 7 days — shield gives up, reset streak
  if (daysDiff > 7) {
    return {
      ...data,
      streak: { count: 0, lastDate: null },
      shieldEventPending: { bonesSpent: 0, daysCovered: 0, daysTotal: daysDiff - 1, shieldFailed: true },
    };
  }

  const daysMissed = daysDiff - 1;
  const costPerDay = 20;
  const availableBones = data.bones || 0;
  const daysCovered = Math.min(daysMissed, Math.floor(availableBones / costPerDay));
  const bonesSpent = daysCovered * costPerDay;
  const daysNotCovered = daysMissed - daysCovered;

  const newStreakCount = Math.max(0, (data.streak?.count || 0) - daysNotCovered);
  const newBones = availableBones - bonesSpent;

  return {
    ...data,
    bones: newBones,
    streak: { count: newStreakCount, lastDate: today },
    shieldEventPending: {
      bonesSpent,
      daysCovered,
      daysTotal: daysMissed,
      daysNotCovered,
      shieldFailed: bonesSpent === 0,
    },
  };
}

function fireShieldToast(pending) {
  if (!pending) return;
  const { bonesSpent, daysCovered, daysTotal, daysNotCovered, shieldFailed } = pending;
  if (shieldFailed && daysTotal > 7) {
    toast({ title: '💔 Streak Lost', description: "You were gone too long — even the Shield couldn't help." });
  } else if (shieldFailed) {
    toast({ title: '💔 Not enough bones', description: `Streak Shield couldn't cover ${daysTotal} missed day${daysTotal > 1 ? 's' : ''}. Streak reset.` });
  } else if (daysNotCovered > 0) {
    toast({ title: '🦴 Partial Shield', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} covered (${bonesSpent} bones). Streak reduced by ${daysNotCovered}.` });
  } else {
    toast({ title: '🦴 Streak Shield Used', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} protected — ${bonesSpent} bones spent.` });
  }
}

const TAB_ORDER = ['home', 'paths', 'study', 'fetch'];

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
  const [sharedPacksAnchorY, setSharedPacksAnchorY] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showBadgeGrid, setShowBadgeGrid] = useState(false);
  const [showMasteryModal, setShowMasteryModal] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const [activeStop, setActiveStop] = useState(null);
  const [showPathCertificate, setShowPathCertificate] = useState(null); // stores pathId or null
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
    initAudio();
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
      const raw = localStorage.getItem(`${languageConfig.appId}-guest`);
      if (raw) {
        const data = JSON.parse(raw);
        let merged = {
          ...DEFAULT_DATA, ...data,
          categoryEnabled: { ...DEFAULT_DATA.categoryEnabled, ...(data.categoryEnabled || {}) },
          patternProgress: { ...DEFAULT_PATTERN_PROGRESS, ...(data.patternProgress || {}) },
        };
        merged = maybeApplyStreakShield(merged, null);
        setUserData(merged);
        maybeRunStreakReminder(merged);
        if (merged.shieldEventPending) {
          fireShieldToast(merged.shieldEventPending);
          const cleared = { ...merged, shieldEventPending: null };
          setUserData(cleared);
          try { localStorage.setItem(`${languageConfig.appId}-guest`, JSON.stringify(cleared)); } catch (e) { console.error(e); }
        }
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
          patternProgress: { ...DEFAULT_PATTERN_PROGRESS, ...(data.patternProgress || {}) },
        };
      } else {
        merged = { ...DEFAULT_DATA, displayName: u.displayName || 'Learner', photoURL: u.photoURL || null, foundingPaw: true };
        await setDoc(doc(db, 'users', u.uid), merged);
      }
      const { updatedBadges, newlyEarned: loginBadges } = evaluateBadges({}, merged, 'login', {});
      if (updatedBadges.length !== (merged.earnedBadges || []).length) {
        merged = { ...merged, earnedBadges: updatedBadges };
        setDoc(doc(db, 'users', u.uid), merged).catch(console.error);
      }
      loginBadges.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
      // ── Streak Shield: intercept missed days on open ──
      merged = maybeApplyStreakShield(merged, u.uid);
      setUserData(merged);
      maybeRunStreakReminder(merged);
      if (merged.shieldEventPending) {
        setDoc(doc(db, 'users', u.uid), merged).catch(console.error);
        fireShieldToast(merged.shieldEventPending);
        const cleared = { ...merged, shieldEventPending: null };
        setUserData(cleared);
        setDoc(doc(db, 'users', u.uid), cleared).catch(console.error);
      }
    } catch (e) { console.error('Load error:', e); }
  };

  const persistData = useCallback((data) => {
    if (isGuest) {
      try { localStorage.setItem(`${languageConfig.appId}-guest`, JSON.stringify(data)); } catch (e) { console.error(e); }
      return;
    }
    if (!user) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setDoc(doc(db, 'users', user.uid), data).catch(console.error);
      syncLeaderboard(user, data);
    }, 1500);
  }, [user, isGuest]);

  // ── Paths bones reward (Phase 3 only) ──
  const awardBones = useCallback((n) => {
    setUserData(prev => {
      const newData = { ...prev, bones: (prev.bones || 0) + n, totalBonesEarned: (prev.totalBonesEarned || 0) + n };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  // ── Guarded bones spend — returns true on success, false if insufficient balance ──
  const spendBones = useCallback((n) => {
    let success = false;
    setUserData(prev => {
      if ((prev.bones || 0) < n) return prev;
      const newData = { ...prev, bones: (prev.bones || 0) - n };
      persistData(newData);
      success = true;
      return newData;
    });
    return success;
  }, [persistData]);

  // ── Cognate pattern progress (batched update at end of a session) ──
  const onUpdatePatternProgress = useCallback((pattern, seenDelta, correctDelta) => {
    if (!pattern) return;
    setUserData(prev => {
      const prevPatterns = { ...DEFAULT_PATTERN_PROGRESS, ...(prev.patternProgress || {}) };
      const cur = prevPatterns[pattern] || { seen: 0, correct: 0, mastery: 'new' };
      const seen = (cur.seen || 0) + (seenDelta || 0);
      const correct = (cur.correct || 0) + (correctDelta || 0);
      const mastery = computePatternMastery(seen, correct);
      const newData = {
        ...prev,
        patternProgress: { ...prevPatterns, [pattern]: { seen, correct, mastery } },
      };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  // ── Award XP (+ accumulate breakFreeXP) — used by recognition drills ──
  const onAwardXp = useCallback((n) => {
    if (!n) return;
    setUserData(prev => {
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      const newData = {
        ...prev,
        xp: (prev.xp || 0) + n,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + n,
        weekStart: ws,
        breakFreeXP: (prev.breakFreeXP || 0) + n,
      };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  // ── Fetch Standalone session completion ──
  // Awards bones on 80%+, records a 'fetch' session (drives fetch badges),
  // updates fetchHistory, evaluates badges. Returns { passed, bonesAward }.
  const onFetchComplete = useCallback((correct, total, sessionLength) => {
    const score = total > 0 ? correct / total : 0;
    const passed = score >= 0.80;
    const bonesAward = passed ? (sessionLength === 10 ? 1 : sessionLength === 40 ? 3 : 2) : 0;
    setUserData(prev => {
      const today = new Date().toDateString();
      const sessions = [{ drillId: 'fetch', correct, total, date: today, ts: Date.now() }, ...(prev.sessions || []).slice(0, 49)];
      let newData = {
        ...prev,
        bones: (prev.bones || 0) + bonesAward,
        totalBonesEarned: (prev.totalBonesEarned || 0) + bonesAward,
        sessions,
        fetchHistory: {
          totalSessions: (prev.fetchHistory?.totalSessions || 0) + 1,
          totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
          totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + total,
        },
      };
      const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'drill_complete', { drillId: 'fetch', correct, total, ts: Date.now() });
      newData = { ...newData, earnedBadges: updatedBadges };
      persistData(newData);
      if (newlyEarned.length > 0) {
        newlyEarned.forEach(id => {
          const def = BADGES.find(b => b.id === id);
          if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
        });
      }
      return newData;
    });
    if (bonesAward > 0) {
      toast({ title: 'Fetch complete 🐾', description: `+${bonesAward} bones earned!` });
    }
    return { passed, bonesAward, correct, total };
  }, [persistData]);

  // ── Break Free (Session F) — open overlay (no reset until attempt happens) ──
  const startBreakFree = useCallback(() => {
    setView({ page: 'break-free' });
  }, []);

  const exitBreakFree = useCallback(() => {
    setView({ page: 'home' });
    setTab('fetch');
  }, []);

  const onBreakFreeSuccess = useCallback(() => {
    setUserData(prev => {
      let newData = {
        ...prev,
        bones: (prev.bones || 0) + 10,
        totalBonesEarned: (prev.totalBonesEarned || 0) + 10,
        breakFreeXP: 0,
      };
      const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'drill_complete', { drillId: 'break-free', correct: 10, total: 10, ts: Date.now() });
      newData = { ...newData, earnedBadges: updatedBadges };
      persistData(newData);
      if (newlyEarned.length > 0) {
        newlyEarned.forEach(id => {
          const def = BADGES.find(b => b.id === id);
          if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
        });
      }
      return newData;
    });
    toast({ title: '¡Libre! 🔗', description: 'Milo broke free — +10 bones earned!' });
  }, [persistData]);

  const onBreakFreeFail = useCallback(() => {
    setUserData(prev => {
      const newData = { ...prev, breakFreeXP: 0 };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  const setStrictTyping = useCallback((value) => {
    setUserData(prev => {
      const newData = { ...prev, strictTyping: value };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  // ── Paths drill answer — increments dailyProgress so gauntlet answers count toward daily goal ──
  const onDrillAnswer = useCallback((isCorrect) => {
    if (!isCorrect) return;
    setUserData(prev => {
      const today = new Date().toDateString();
      const dp = prev.dailyProgress || { count: 0, date: null };
      const dailyCount = (dp.date === today ? dp.count : 0) + 1;
      const newData = { ...prev, dailyProgress: { count: dailyCount, date: today } };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

  // ── Paths Stop completion (writes Stop to completedStops only) ──
  // Path completion is gated by completePathFetch below, not by stop count
  const completeStop = useCallback((stopId) => {
    setUserData(prev => {
      const already = (prev.completedStops || []).includes(stopId);
      if (already) return prev;
      const completedStops = [...(prev.completedStops || []), stopId];
      let newData = { ...prev, completedStops };
      const { updatedBadges: stopBadges, newlyEarned: stopEarned } = evaluateBadges(prev, newData, 'stop_complete', { stopId });
      newData = { ...newData, earnedBadges: stopBadges };
      persistData(newData);
      stopEarned.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
      return newData;
    });
  }, [persistData]);

  // ── Path Fetch completion — writes completedPaths[], awards 75 XP + 15 bones ──
  const completePathFetch = useCallback((pathId, passed) => {
    if (!passed) return;
    setUserData(prev => {
      const already = (prev.completedPaths || []).includes(pathId);
      if (already) return prev;
      const completedPaths = [...(prev.completedPaths || []), pathId];
      const ws = getWeekStartStr();
      const sameWeek = prev.weekStart === ws;
      let newData = {
        ...prev,
        completedPaths,
        bones: (prev.bones || 0) + 15,
        xp: (prev.xp || 0) + 75,
        weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + 75,
        weekStart: ws,
      };
      const { updatedBadges: pathBadges, newlyEarned: pathEarned } = evaluateBadges(prev, newData, 'path_complete', { pathId });
      newData = { ...newData, earnedBadges: pathBadges };
      persistData(newData);
      pathEarned.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
      return newData;
    });
  }, [persistData]);

  // ── Fetch: returns Stop word objects sorted by FSRS weakness (weakest first) ──
  const fetchStopWords = useCallback((stopId) => {
    const wordStrings = getStopWords(stopId);
    const wordObjects = wordStrings
      .map(es => MASTER.find(w => w.es === es))
      .filter(Boolean);

    return wordObjects.sort((a, b) => {
      const progA = userData.progress[a.es] || { stability: 0, outputCorrect: 0 };
      const progB = userData.progress[b.es] || { stability: 0, outputCorrect: 0 };
      // Sort by stability ascending — lowest stability (weakest) first
      // Break ties by outputCorrect ascending
      if (progA.stability !== progB.stability) {
        return progA.stability - progB.stability;
      }
      return (progA.outputCorrect || 0) - (progB.outputCorrect || 0);
    });
  }, [userData.progress]);

  // ── Returns the first incomplete Stop ID across all Paths (null if all complete) ──
  const getCurrentStop = useCallback(() => {
    for (const path of PATHS) {
      for (const stop of path.stops) {
        if (!(userData.completedStops || []).includes(stop.id)) {
          return stop.id;
        }
      }
    }
    return null;
  }, [userData.completedStops]);

  // ── Continue button handler: jump straight into current Stop's StopView ──
  const continueToCurrentStop = useCallback(() => {
    const stopId = getCurrentStop();
    if (stopId) {
      setActiveStop(stopId);
      setTab('paths');
    } else {
      setTab('paths');
    }
  }, [getCurrentStop]);
  const updateWordProgress = useCallback((wordEs, isCorrect, wasFirstAttempt, drillType = null) => {
    const DRILL_DIMENSION = {
      'es-en':                    'read',
      'hear-choose-es':           'hear',
      'hear-choose-en':           'hear',
      'listen-type-es':           'hear',
      'listen-type-sentence-es':  'hear',
      'en-es':                    'produce',
      'type-en-es':               'produce',
      'listen-type-en':           'produce',
      'listen-type-sentence-en':  'produce',
      'gender':                   'produce',
    };

    setUserData(prev => {
      const currentProgress = prev.progress[wordEs] || { ...DEFAULT_WORD_PROGRESS };
      const dim = DRILL_DIMENSION[drillType] || 'produce';
      const dimData = currentProgress[dim] || { stability: 0, difficulty: 0, due: new Date().toISOString(), lastReview: null, correct: 0, wrong: 0 };
      const card = {
        stability: dimData.stability || 0,
        difficulty: dimData.difficulty || 0,
        due: dimData.due ? new Date(dimData.due) : new Date(),
        last_review: dimData.lastReview ? new Date(dimData.lastReview) : null,
        reps: currentProgress.c || 0,
        lapses: currentProgress.w || 0,
        state: dimData.stability > 0 ? 2 : 0,
      };
      const f = fsrs(generatorParameters());
      const rating = isCorrect
        ? (wasFirstAttempt ? Rating.Good : Rating.Hard)
        : Rating.Again;
      const result = f.next(card, new Date(), rating);
      // ── drillStats: only written when a drillType is provided (Fetch sessions only) ──
      const existingDrillStats = currentProgress.drillStats || {};
      const updatedDrillStats = drillType ? {
        ...existingDrillStats,
        [drillType]: {
          c: (existingDrillStats[drillType]?.c || 0) + (isCorrect ? 1 : 0),
          w: (existingDrillStats[drillType]?.w || 0) + (isCorrect ? 0 : 1),
        },
      } : existingDrillStats;
      const updatedProgress = {
        ...currentProgress,
        [dim]: {
          ...dimData,
          stability: result.card.stability,
          difficulty: result.card.difficulty,
          due: result.card.due.toISOString(),
          lastReview: new Date().toISOString(),
          correct: isCorrect ? (dimData.correct || 0) + 1 : (dimData.correct || 0),
          wrong: isCorrect ? (dimData.wrong || 0) : (dimData.wrong || 0) + 1,
        },
        c: isCorrect ? currentProgress.c + 1 : currentProgress.c,
        w: isCorrect ? currentProgress.w : currentProgress.w + 1,
        drillStats: updatedDrillStats,
      };
      const newData = {
        ...prev,
        progress: { ...prev.progress, [wordEs]: updatedProgress },
        breakFreeXP: (prev.breakFreeXP || 0) + (isCorrect ? 1 : 0),
      };
      persistData(newData);
      return newData;
    });
  }, [persistData]);

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
      const { updatedBadges, newlyEarned: answerBadges } = evaluateBadges(prev, newData, 'answer', {});
      newData = { ...newData, earnedBadges: updatedBadges };
      persistData(newData);
      answerBadges.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
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
      const totalDrills = (prev.totalDrills || 0) + 1;
      const isPerfect = total > 0 && correct === total;
      const perfectStreak = isPerfect ? (prev.perfectStreak || 0) + 1 : 0;

      // Daily goal streak — increment if user hit their daily goal today, reset if they missed yesterday
      const today2 = new Date().toDateString();
      const yesterday2 = new Date(Date.now() - 86400000).toDateString();
      const dailyCount = (prev.dailyProgress?.date === today2 ? prev.dailyProgress.count : 0) + 1;
      const dailyGoal = prev.dailyGoal || 10;
      const hitGoalToday = dailyCount >= dailyGoal;
      const prevGoalDate = prev.dailyGoalStreakDate;
      const dailyGoalStreak = hitGoalToday
        ? (prevGoalDate === yesterday2 ? (prev.dailyGoalStreak || 0) + 1 : prevGoalDate === today2 ? (prev.dailyGoalStreak || 0) : 1)
        : (prev.dailyGoalStreak || 0);
      const dailyGoalStreakDate = hitGoalToday ? today2 : (prev.dailyGoalStreakDate || null);
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
        totalDrills,
        perfectStreak,
        dailyGoalStreak,
        dailyGoalStreakDate,
      };
      const { updatedBadges, newlyEarned: drillBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
      newData = { ...newData, earnedBadges: updatedBadges };
      drillBadges.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
      if (isGuest) {
        try { localStorage.setItem(`${languageConfig.appId}-guest`, JSON.stringify(newData)); } catch (e) { console.error(e); }
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

  const startDrill = useCallback((drillId, drillLength = 10, filteredWords = null) =>
    setView({ page: 'drill', drillId, drillLength, ...(filteredWords ? { overrideWords: filteredWords } : {}) }), []);
  const goHome = useCallback(() => setView({ page: 'home' }), []);

  const allWords = useMemo(() => {
    const filtered = MASTER.filter(w => w.group === 'Core' || userData.categoryEnabled[w.group] !== false);
    const filteredSet = new Set(filtered.map(w => w.es));
    const custom = (userData.customWords || []).filter(w => !filteredSet.has(w.es));
    const all = [...filtered, ...custom];
    const masterSet = new Set(MASTER.map(w => w.es));
    const customSet = new Set((userData.customWords || []).map(w => w.es));
    const importedPackWords = (userData.importedPacks || [])
      .flatMap(p => p.words)
      .filter(w => !masterSet.has(w.es) && !customSet.has(w.es));
    return [...all, ...importedPackWords];
  }, [userData]);
  const pathWords = useMemo(() => {
    const esKeys = new Set(
      (userData.completedStops || []).flatMap(sid => getStopWords(sid))
    );
    return MASTER.filter(w => esKeys.has(w.es));
  }, [userData.completedStops]);

  const wordOfTheDay = useMemo(() => {
    if (!MASTER || MASTER.length === 0) return null;
    const seed = new Date().toISOString().slice(0, 10);
    const index = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % MASTER.length;
    return MASTER[index];
  }, []);

  const dailyTheme = null;

  const startDailyChallenge = useCallback((kind) => {
    const today = new Date().toDateString();
    if (kind === 'weak') {
      const all = pathWords.filter(w => w.group === 'Core' || userData.categoryEnabled[w.group] !== false);
      const candidates = all.filter(w => masteryLevel(userData.progress, w.es) !== 'mastered');
      const pool = candidates.length >= 5 ? candidates : all;
      const sorted = spacedRepetitionSort(pool, userData.progress);
      const words = sorted.slice(0, 5);
      if (words.length === 0) return;
      setView({ page: 'drill', drillId: languageConfig.drillDirectionId, overrideWords: words, dailyKind: 'weak', xpMultiplier: 2, today });
    } else {
      const theme = DAILY_THEMES[new Date().getDay()];
      const themeWords = MASTER.filter(w => w.group === theme.group);
      if (themeWords.length === 0) return;
      const words = spacedRepetitionSort(themeWords, userData.progress).slice(0, 5);
      setView({ page: 'drill', drillId: 'flashcard', overrideWords: words, dailyKind: 'theme', xpMultiplier: 1.5, today });
    }
  }, [userData, pathWords]);

  const handleStartFetch = useCallback((config = {}) => {
    if (config.mode === 'weakest5') startDailyChallenge('weak');
  }, [startDailyChallenge]);

  function handleStartTheme(themeId) {
    console.log('Theme session not yet implemented:', themeId);
  }

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
      setTab('paths');
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
    const filteredSet = new Set(filtered.map(w => w.es));
    const custom = (userData.customWords || []).filter(w => !filteredSet.has(w.es));
    const all = [...filtered, ...custom];
    const masterSet = new Set(MASTER.map(w => w.es));
    const customSet = new Set((userData.customWords || []).map(w => w.es));
    const importedPackWords = (userData.importedPacks || [])
      .flatMap(p => p.words)
      .filter(w => !masterSet.has(w.es) && !customSet.has(w.es));

    // Build the set of words from completed Stops only
    const completedStopWords = new Set(
      (userData.completedStops || []).flatMap(stopId => getStopWords(stopId))
    );

    // Filter to learned words only — exclude articles, particles, conjunctions
    const EXCLUDED_TYPES = ['article', 'particle', 'conjunction', 'preposition'];
    const learnedWords = all.filter(w =>
      completedStopWords.has(w.es) && !EXCLUDED_TYPES.includes(w.type)
    );

    const baseWords = learnedWords.length > 0 ? learnedWords : all;

    if (drillMode !== 'all') return [...baseWords.filter(w => masteryLevel(userData.progress, w.es) === drillMode), ...importedPackWords];
    return [...baseWords, ...importedPackWords];
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
      let newData = { ...prev, friends: [...(prev.friends || []), fid] };
      const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'login', {});
      newData = { ...newData, earnedBadges: updatedBadges };
      persistData(newData);
      toast({ title: '🐾 Friend Added', description: 'Your pack is growing!' });
      newlyEarned.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
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

  const importPackWords = useCallback((pack) => {
    setUserData(prev => {
      const already = (prev.importedPacks || []).some(p => p.id === pack.id);
      if (already) return prev;
      const newData = {
        ...prev,
        importedPacks: [...(prev.importedPacks || []), {
          id: pack.id,
          title: pack.title,
          authorName: pack.authorName,
          words: pack.words,
          importedAt: new Date().toISOString()
        }]
      };
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
  const masteredCount = pathWords.filter(w => masteryLevel(userData.progress, w.es) === 'mastered').length;
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

  if (view.page === 'break-free') {
    return (
      <BreakFreeDrill
        words={pathWords}
        progress={userData.progress}
        strictTyping={userData.strictTyping}
        onSuccess={onBreakFreeSuccess}
        onFail={onBreakFreeFail}
        onExit={exitBreakFree}
      />
    );
  }

  if (view.page === 'lesson') {
    return (
      <div className="app-outer">
        <div className="app-container">
          <LessonView
            lessonId={view.lessonId}
            lessonsCompleted={userData.lessonsCompleted || []}
            onComplete={completeLesson}
            onPractice={practiceLessonWords}
            onBack={() => { setView({ page: 'home' }); setTab('paths'); }}
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
            words={pathWords}
            progress={userData.progress}
            onAnswer={view.drillId.includes('flashcard') ? recordAnswerNoXP : recordAnswer}
            onDone={(c, t) => onDrillDone(view.drillId, c, t)}
            onBack={goHome}
            strictMode={userData.strictTyping}
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
            <div className="pb-[76px]">
            <HomeTab
              userData={userData}
              progress={userData.progress}
              completedStops={userData.completedStops || []}
              completedPaths={userData.completedPaths || []}
              onContinue={continueToCurrentStop}
              onOpenMyWords={() => setTab('words')}
              onStartFetch={handleStartFetch}
              onStartTheme={handleStartTheme}
              currentStop={getCurrentStop()}
              wordOfTheDay={wordOfTheDay}
              dailyTheme={dailyTheme}
              dailyChallenges={userData.dailyChallenges}
              onStartDailyChallenge={startDailyChallenge}
              recentBadges={(userData.earnedBadges || []).slice(-3).reverse()}
              streakDays={typeof userData.streak === 'object' ? (userData.streak?.count || 0) : (userData.streak || 0)}
              weekBits={getWeekBits(userData.activeDays || [])}
            />
            </div>
          )}
          {tab === 'study' && (
            <div className="pb-[76px]">
              <DrillsGrid words={pathWords} stats={stats} drillMode={drillMode}
                setDrillMode={setDrillMode} onStartDrill={startDrill}
                completedPaths={userData.completedPaths || []}
                allWords={allWords}
                patternProgress={userData.patternProgress || {}}
                onUpdatePatternProgress={onUpdatePatternProgress}
                onAwardXp={onAwardXp}
                strictTyping={userData.strictTyping} />
              <KofiSupport />
            </div>
          )}
          {tab === 'fetch' && (
            <div className="pb-[76px]">
              <FetchTab
                userData={userData}
                progress={userData.progress}
                completedPaths={userData.completedPaths || []}
                customWords={userData.customWords || []}
                importedPacks={userData.importedPacks || []}
                onDrillAnswer={updateWordProgress}
                onFetchComplete={onFetchComplete}
                strictTyping={userData.strictTyping}
                {/* TODO: AND with real XP gate when restored (see known bug: breakFreeXP hardcode) */}
                breakFreeAvailable={pathWords.length >= 5}
                onStartBreakFree={startBreakFree}
              />
            </div>
          )}
          {tab === 'learn' && (
            <div className="pb-[76px]">
            <LessonsList lessonsCompleted={userData.lessonsCompleted || []}
              onOpenLesson={openLesson}
              onShowCertificate={() => setShowCertificate(true)} />
            </div>
          )}
          {tab === 'paths' && (
            <div>
              <PathsTab
                completedStops={userData.completedStops || []}
                completedPaths={userData.completedPaths || []}
                progress={userData.progress}
                initialStopId={activeStop}
                onSelectStop={(stopId) => setActiveStop(stopId)}
                onUpdateWordProgress={updateWordProgress}
                onAwardBones={awardBones}
                onSpendBones={spendBones}
                bones={userData.bones || 0}
                onCompleteStop={completeStop}
                onCompletePathFetch={completePathFetch}
                fetchStopWords={fetchStopWords}
                onShowCertificate={(pathId) => setShowPathCertificate(pathId)}
                onDrillAnswer={onDrillAnswer}
                strictTyping={userData.strictTyping}
              />
            </div>
          )}
          {/* Words tab — entry point removed from BottomNav. WordList preserved here pending Fetch tab build in Session E. Do not delete. */}
          {tab === 'words' && (
            <div className="pb-[76px]">
            <WordList
              words={activeWords} allWords={allWords} progress={userData.progress}
              customWords={userData.customWords || []}
              importedPacks={userData.importedPacks || []}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              onAddWord={addCustomWord} onDeleteWord={deleteCustomWord}
              onWordClick={handleWordClick}
              onCategoryClick={() => setShowCategoryModal(true)}
              onSharedPacksClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSharedPacksAnchorY(rect.top);
                setShowSharedPacks(true);
              }}
              categoryEnabled={userData.categoryEnabled}
              drillMode={drillMode} setDrillMode={setDrillMode}
            />
            </div>
          )}

          {tab === 'milo' && (() => {
            const learnedWords = MASTER
              .filter(w => (userData.progress?.[w.es]?.c || 0) > 0)
              .map(w => ({
                es: w.es,
                en: w.en,
                level: masteryLevel(userData.progress, w.es),
              }));

            const weakestWords = [...learnedWords]
              .filter(w => w.level === 'learning' || w.level === 'new')
              .sort((a, b) => {
                const sA = userData.progress?.[a.es]?.s || 0;
                const sB = userData.progress?.[b.es]?.s || 0;
                return sA - sB;
              })
              .slice(0, 10)
              .map(w => ({ es: w.es, en: w.en }));

            const masteredWords = learnedWords
              .filter(w => w.level === 'mastered')
              .sort((a, b) => {
                const sA = userData.progress?.[a.es]?.s || 0;
                const sB = userData.progress?.[b.es]?.s || 0;
                return sB - sA;
              })
              .slice(0, 50)
              .map(w => ({ es: w.es, en: w.en }));

            const learnerContext = {
              displayName: userData.displayName || 'Estudiante',
              streak: userData.streak?.count || 0,
              xp: userData.xp || 0,
              completedPaths: userData.completedPaths || [],
              totalWordsLearned: learnedWords.length,
              masteredWords,
              weakestWords,
            };

            return (
              <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <MiloChat userUid={effectiveUser.uid} learnerContext={learnerContext} />
              </div>
            );
          })()}
          {tab === 'friends' && (
            <div className="pb-[76px]">
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
            <div className="pb-[76px]">
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
        {showPathCertificate && (
          <Certificate
            name={userData.displayName || 'Estudiante'}
            xp={0}
            streakCount={userData.streak?.count || 0}
            completedDate={new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            onClose={() => setShowPathCertificate(null)}
          />
        )}
        {showSharedPacks && (
          <SharedPacks user={user} isGuest={isGuest}
            customWords={userData.customWords || []}
            importedPacks={userData.importedPacks || []}
            onImport={importPackWords}
            anchorY={sharedPacksAnchorY}
            onClose={() => { setShowSharedPacks(false); setSharedPacksAnchorY(null); }} />
        )}
      </div>
      <BottomNav activeTab={tab} onTabChange={setTab} breakFreeReady={true} />
      {showBadgeGrid && (
        <BadgeGrid
          earnedBadges={userData.earnedBadges || []}
          onBack={() => setShowBadgeGrid(false)}
        />
      )}
      {showMasteryModal && (
        <MasteryModal
          userData={userData}
          words={pathWords}
          onStartDrill={startDrill}
          onClose={() => setShowMasteryModal(false)}
        />
      )}
      <ProfileSheet
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={effectiveUser}
        userData={userData}
        masteredCount={masteredCount}
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
        onStrictTypingToggle={setStrictTyping}
        streakShieldActive={userData.streakShieldActive || false}
        onStreakShieldToggle={(val) => setUserData(prev => {
          const newData = { ...prev, streakShieldActive: val };
          persistData(newData);
          return newData;
        })}
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
    <Toaster />
    </>
  );
}
