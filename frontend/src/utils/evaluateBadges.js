import { languageConfig } from '../config/languageConfig';
import { BADGES } from '../data/badges';
import { MASTER } from '../content/es-en/words';

const PRACTICE_DRILL_IDS = new Set([
  languageConfig.drillDirectionId, languageConfig.reverseDrillDirectionId,
  'type-es-en', 'type-en-es', 'conjugation', 'listen-type', 'listen-type-en-es',
  'listen-type-sentence', 'listen-type-sentence-en-es', 'sent-build',
  'fill-blank', 'fill-blank-typed', 'gender', 'hear-choose', 'hear-choose-en-es',
  'matching', 'shadow',
]);

const ALL_DRILL_TYPES = new Set([
  'es-en', 'en-es', 'type-es-en', 'type-en-es',
  'hear-choose', 'hear-choose-en-es',
  'listen-type', 'listen-type-en-es',
  'listen-type-sentence', 'listen-type-sentence-en-es',
  'conjugation', 'sent-build', 'fill-blank', 'fill-blank-typed',
  'matching', 'gender', 'word-sort', 'shadow',
]);

const BEGINNER_PATHS = ['path1','path2','path3','path4'];
const ADVANCED_BEGINNER_PATHS = ['path5','path6','path7','path8','path9','path10','path11','path12'];

function addOrUpdate(badges, id, now) {
  const def = BADGES.find(b => b.id === id);
  if (!def) return { badges, isNew: false };
  const idx = badges.findIndex(b => b.id === id);
  if (idx === -1) {
    return { badges: [...badges, { id, count: 1, earnedAt: now }], isNew: true };
  }
  if (!def.stackable) return { badges, isNew: false };
  const updated = [...badges];
  updated[idx] = { ...updated[idx], count: updated[idx].count + 1, earnedAt: now };
  return { badges: updated, isNew: true };
}

export function evaluateBadges(prevData, nextData, eventType, eventPayload) {
  const now = new Date().toISOString();
  let badges = [...(nextData.earnedBadges || [])];
  const newlyEarned = [];

  function earn(id) {
    const { badges: next, isNew } = addOrUpdate(badges, id, now);
    badges = next;
    if (isNew) newlyEarned.push(id);
  }

  function has(id) {
    return badges.some(b => b.id === id);
  }

  function stackCount(id) {
    const b = badges.find(b => b.id === id);
    return b ? b.count : 0;
  }

  if (eventType === 'drill_complete') {
    const { drillId, correct, total, ts } = eventPayload;
    const sessions = nextData.sessions || [];
    const totalDrills = nextData.totalDrills || 0;

    if (totalDrills >= 1   && !has('drill_first')) earn('drill_first');
    if (totalDrills >= 10  && !has('drill_10'))    earn('drill_10');
    if (totalDrills >= 50  && !has('drill_50'))    earn('drill_50');
    if (totalDrills >= 100 && !has('drill_100'))   earn('drill_100');
    if (totalDrills >= 250 && !has('drill_250'))   earn('drill_250');
    if (totalDrills >= 500 && !has('drill_500'))   earn('drill_500');

    if (correct === total && total >= 10) {
      earn('drill_perfect');
      const perfCount = stackCount('drill_perfect');
      if (perfCount >= 5  && !has('drill_perfect5'))  earn('drill_perfect5');
      if (perfCount >= 25 && !has('drill_perfect25')) earn('drill_perfect25');
      const newStreak = nextData.perfectStreak || 0;
      if (newStreak >= 3 && !has('drill_perfect_streak_3')) earn('drill_perfect_streak_3');
      if (newStreak >= 5 && !has('drill_perfect_streak_5')) earn('drill_perfect_streak_5');
    }

    const drillFirstMap = {
      'matching':                   'drill_first_match',
      'gender':                     'drill_first_gender',
      'conjugation':                'drill_first_conjugation',
      'sent-build':                 'drill_first_sent_build',
      'shadow':                     'drill_first_shadow',
      'fill-blank':                 'drill_first_fill',
      'fill-blank-typed':           'drill_first_fill',
      'listen-type':                'drill_first_listen',
      'listen-type-en-es':          'drill_first_listen',
      'listen-type-sentence':       'drill_first_listen',
      'listen-type-sentence-en-es': 'drill_first_listen',
      'hear-choose':                'drill_first_hear',
      'hear-choose-en-es':          'drill_first_hear',
    };
    const firstBadge = drillFirstMap[drillId];
    if (firstBadge && !has(firstBadge)) earn(firstBadge);

    const seenDrillIds = new Set(sessions.map(s => s.drillId));
    if ([...ALL_DRILL_TYPES].every(id => seenDrillIds.has(id)) && !has('drill_all_types')) {
      earn('drill_all_types');
    }

    const hour = new Date(ts).getHours();
    if (hour < 8)   earn('early_bird');
    if (hour >= 22) earn('night_owl');

    const prevLastDate = prevData?.streak?.lastDate;
    if (prevLastDate && !has('ghost')) {
      const daysDiff = (Date.now() - new Date(prevLastDate).getTime()) / 86400000;
      if (daysDiff > 7 && (nextData.streak?.count || 0) > 0) earn('ghost');
    }

    if (drillId === 'break-free' && !has('break_free')) earn('break_free');
    if (drillId === 'fetch') {
      const fetchCount = sessions.filter(s => s.drillId === 'fetch').length;
      if (fetchCount >= 1  && !has('fetch_first')) earn('fetch_first');
      if (fetchCount >= 10 && !has('fetch_10'))    earn('fetch_10');
    }
  }

  if (eventType === 'answer') {
    const xp = nextData.xp || 0;
    for (const [threshold, id] of [[500,'xp_500'],[2000,'xp_2000'],[5000,'xp_5000'],[12500,'xp_12500'],[25000,'xp_25000'],[50000,'xp_50000']]) {
      if (xp >= threshold && !has(id)) earn(id);
    }

    const streakCount = nextData.streak?.count || 0;
    for (const [threshold, id] of [[3,'streak_3'],[7,'streak_7'],[30,'streak_30'],[100,'streak_100']]) {
      if (streakCount >= threshold && !has(id)) earn(id);
    }

    const masteredCount = MASTER.filter(w => (nextData.progress?.[w.es]?.s || 0) >= 6).length;
    for (const [threshold, id] of [[1,'mastery_1'],[10,'mastery_10'],[25,'mastery_25'],[50,'mastery_50'],[75,'mastery_75'],[125,'mastery_125'],[200,'mastery_200'],[MASTER.length,'mastery_309']]) {
      if (masteredCount >= threshold && !has(id)) earn(id);
    }

    const totalBones = nextData.totalBonesEarned || 0;
    for (const [threshold, id] of [[50,'bones_50'],[100,'bones_100'],[250,'bones_250'],[500,'bones_500']]) {
      if (totalBones >= threshold && !has(id)) earn(id);
    }

    const dailyGoalStreak = nextData.dailyGoalStreak || 0;
    if (dailyGoalStreak >= 7 && !has('daily_goal_7')) earn('daily_goal_7');
  }

  if (eventType === 'stop_complete') {
    const { stopId } = eventPayload;
    const firstStopMap = {
      'p1s1':'stop_1_1','p2s1':'stop_2_1','p3s1':'stop_3_1','p4s1':'stop_4_1',
      'p5s1':'stop_5_1','p6s1':'stop_6_1','p7s1':'stop_7_1','p8s1':'stop_8_1',
      'p9s1':'stop_9_1','p10s1':'stop_10_1','p11s1':'stop_11_1','p12s1':'stop_12_1','p13s1':'stop_13_1',
    };
    const midStopMap = {
      'p1s3':'stop_1_3','p2s3':'stop_2_3','p3s3':'stop_3_3','p4s3':'stop_4_3',
      'p5s3':'stop_5_3','p6s3':'stop_6_3','p7s3':'stop_7_3','p8s3':'stop_8_3',
      'p9s3':'stop_9_3','p10s3':'stop_10_3','p11s3':'stop_11_3','p12s3':'stop_12_3','p13s3':'stop_13_3',
    };
    const finalStopMap = {
      'p1s5':'stop_1_5','p2s5':'stop_2_5','p3s5':'stop_3_5','p4s5':'stop_4_5',
      'p5s5':'stop_5_5','p6s5':'stop_6_5','p7s5':'stop_7_5','p8s5':'stop_8_5',
      'p9s5':'stop_9_5','p10s5':'stop_10_5','p11s5':'stop_11_5','p12s5':'stop_12_5','p13s5':'stop_13_5',
    };
    const b1 = firstStopMap[stopId]; if (b1 && !has(b1)) earn(b1);
    const b2 = midStopMap[stopId];   if (b2 && !has(b2)) earn(b2);
    const b3 = finalStopMap[stopId]; if (b3 && !has(b3)) earn(b3);
  }

  if (eventType === 'path_complete') {
    const { pathId } = eventPayload;
    const completedPaths = nextData.completedPaths || [];
    const pathBadgeMap = {
      'path1':'path_1','path2':'path_2','path3':'path_3','path4':'path_4',
      'path5':'path_5','path6':'path_6','path7':'path_7','path8':'path_8',
      'path9':'path_9','path10':'path_10','path11':'path_11','path12':'path_12','path13':'path_13',
    };
    const pathBadge = pathBadgeMap[pathId];
    if (pathBadge && !has(pathBadge)) earn(pathBadge);

    if (BEGINNER_PATHS.every(p => completedPaths.includes(p)) && !has('tier_beginner')) earn('tier_beginner');
    if (ADVANCED_BEGINNER_PATHS.every(p => completedPaths.includes(p)) && !has('tier_advanced_beginner')) earn('tier_advanced_beginner');
    if (pathId === 'path13' && !has('tier_intermediate')) earn('tier_intermediate');
  }

  if (eventType === 'login') {
    if (nextData.foundingPaw && !has('founding_paw')) earn('founding_paw');
    if ((nextData.friends || []).length >= 1 && !has('first_friend')) earn('first_friend');
  }

  return { updatedBadges: badges, newlyEarned };
}
