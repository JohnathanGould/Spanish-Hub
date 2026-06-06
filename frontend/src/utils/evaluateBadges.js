import { languageConfig } from '../config/languageConfig';
import { BADGES } from '../data/badges';
import { MASTER } from '../content/es-en/words';

const PRACTICE_DRILL_IDS = new Set([
  languageConfig.drillDirectionId, languageConfig.reverseDrillDirectionId, 'type-es-en', 'type-en-es',
  'conjugation', 'listen-type', 'sent-build', 'fill-blank', 'gender',
]);

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
    const practiceCount = sessions.filter(s =>
      PRACTICE_DRILL_IDS.has(s.drillId) && !s.drillId.includes('flashcard')
    ).length;

    if (practiceCount >= 1  && !has('drill_first'))  earn('drill_first');
    if (practiceCount >= 10 && !has('drill_10'))     earn('drill_10');
    if (practiceCount >= 50 && !has('drill_50'))     earn('drill_50');

    if (correct === total && total >= 10) {
      earn('drill_perfect');
      const perfCount = stackCount('drill_perfect');
      if (perfCount >= 5  && !has('drill_perfect5'))  earn('drill_perfect5');
      if (perfCount >= 25 && !has('drill_perfect25')) earn('drill_perfect25');
    }

    const hour = new Date(ts).getHours();
    if (hour < 8)  earn('early_bird');
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
    const xpThresholds = [[500, 'xp_500'], [2000, 'xp_2000'], [5000, 'xp_5000'], [12500, 'xp_12500'], [25000, 'xp_25000'], [50000, 'xp_50000']];
    for (const [threshold, id] of xpThresholds) {
      if (xp >= threshold && !has(id)) earn(id);
    }

    const streakCount = nextData.streak?.count || 0;
    const streakThresholds = [[3, 'streak_3'], [7, 'streak_7'], [30, 'streak_30'], [100, 'streak_100']];
    for (const [threshold, id] of streakThresholds) {
      if (streakCount >= threshold && !has(id)) earn(id);
    }

    const masteredCount = MASTER.filter(w =>
      (nextData.progress?.[w.es]?.s || 0) >= 6
    ).length;
    const masteryThresholds = [[1, 'mastery_1'], [10, 'mastery_10'], [25, 'mastery_25'], [50, 'mastery_50'], [75, 'mastery_75'], [125, 'mastery_125'], [MASTER.length, 'mastery_309']];
    for (const [threshold, id] of masteryThresholds) {
      if (masteredCount >= threshold && !has(id)) earn(id);
    }
  }

  if (eventType === 'login') {
    if (nextData.foundingPaw && !has('founding_paw')) earn('founding_paw');
  }

  if (eventType === 'stop_complete') {
    if (eventPayload.stopId === 'p1s1' && !has('stop_1_1')) earn('stop_1_1');
  }

  if (eventType === 'path_complete') {
    const pathBadges = {
      path1: 'path_1', path2: 'path_2', path3: 'path_3', path4: 'path_4',
      path5: 'path_5', path6: 'path_6', path7: 'path_7', path8: 'path_8',
      path9: 'path_9', path10: 'path_10', path11: 'path_11', path12: 'path_12'
    };
    const badgeId = pathBadges[eventPayload.pathId];
    if (badgeId && !has(badgeId)) earn(badgeId);
  }

  return { updatedBadges: badges, newlyEarned };
}
