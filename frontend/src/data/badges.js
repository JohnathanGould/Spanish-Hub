export const BADGES = [
  // XP Milestones
  { id: 'xp_500',    emoji: '🐾', name: 'First Steps',      description: 'Earn 500 XP',              category: 'xp',         hidden: false, stackable: false },
  { id: 'xp_2000',   emoji: '🦴', name: 'Finding My Paws',  description: 'Earn 2,000 XP',             category: 'xp',         hidden: false, stackable: false },
  { id: 'xp_5000',   emoji: '🐕', name: 'On the Trail',     description: 'Earn 5,000 XP',             category: 'xp',         hidden: false, stackable: false },
  { id: 'xp_12500',  emoji: '🐾', name: 'Running Free',     description: 'Earn 12,500 XP',            category: 'xp',         hidden: false, stackable: false },
  { id: 'xp_25000',  emoji: '🏆', name: 'Champion',         description: 'Earn 25,000 XP',            category: 'xp',         hidden: false, stackable: false },
  { id: 'xp_50000',  emoji: '⭐', name: 'Legend',           description: 'Earn 50,000 XP',            category: 'xp',         hidden: false, stackable: false },

  // Streak
  { id: 'streak_3',   emoji: '🔥', name: 'First Flame',      description: '3-day streak',              category: 'streak',     hidden: false, stackable: false },
  { id: 'streak_7',   emoji: '🔥', name: 'Week Warrior',     description: '7-day streak',              category: 'streak',     hidden: false, stackable: false },
  { id: 'streak_30',  emoji: '🔥', name: 'Unstoppable',      description: '30-day streak',             category: 'streak',     hidden: false, stackable: false },
  { id: 'streak_100', emoji: '🔥', name: 'Legendary Streak', description: '100-day streak',            category: 'streak',     hidden: false, stackable: false },

  // Paths & Stops
  { id: 'stop_1_1', emoji: '🗺️', name: 'First Steps on the Trail', description: 'Complete Path 1 Stop 1',           category: 'path', hidden: false, stackable: false },
  { id: 'path_1',   emoji: '🗺️', name: '¡Camino Uno!',             description: 'Complete Path 1',                  category: 'path', hidden: false, stackable: false },
  { id: 'path_2',   emoji: '🗺️', name: '¡Camino Dos!',             description: 'Complete Path 2',                  category: 'path', hidden: false, stackable: false },
  { id: 'path_3',   emoji: '🗺️', name: '¡Camino Tres!',            description: 'Complete Path 3',                  category: 'path', hidden: false, stackable: false },
  { id: 'path_4',   emoji: '🗺️', name: '¡Camino Cuatro!',          description: 'Complete Path 4',                  category: 'path', hidden: false, stackable: false },
  { id: 'path_5',   emoji: '🗺️', name: '¡Camino Cinco!',           description: 'Complete Path 5 — A1 done',        category: 'path', hidden: false, stackable: false },

  // Mastery
  { id: 'mastery_1',   emoji: '📚', name: 'First Word Mastered',   description: 'Master your first word', category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_10',  emoji: '📚', name: '10 Words Mastered',     description: 'Master 10 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_25',  emoji: '📚', name: '25 Words Mastered',     description: 'Master 25 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_50',  emoji: '📚', name: '50 Words Mastered',     description: 'Master 50 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_75',  emoji: '📚', name: '75 Words Mastered',     description: 'Master 75 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_125', emoji: '📚', name: '125 Words Mastered',    description: 'Master 125 words',       category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_309', emoji: '📚', name: 'Full Vocabulary Master', description: 'Master all words',      category: 'mastery', hidden: true,  stackable: false },

  // Drills
  { id: 'drill_first',     emoji: '🎯', name: 'First Drill',      description: 'Complete your first drill',   category: 'drill', hidden: false, stackable: false },
  { id: 'drill_10',        emoji: '🎯', name: '10 Drills',         description: 'Complete 10 drills',          category: 'drill', hidden: false, stackable: false },
  { id: 'drill_50',        emoji: '🎯', name: '50 Drills',         description: 'Complete 50 drills',          category: 'drill', hidden: false, stackable: false },
  { id: 'drill_perfect',   emoji: '🎯', name: 'Perfect Score',     description: '10/10 on any drill',          category: 'drill', hidden: false, stackable: true  },
  { id: 'drill_perfect5',  emoji: '🎯', name: '5 Perfect Scores',  description: 'Get 5 perfect scores',        category: 'drill', hidden: false, stackable: false },
  { id: 'drill_perfect25', emoji: '🎯', name: '25 Perfect Scores', description: 'Get 25 perfect scores',       category: 'drill', hidden: true,  stackable: false },

  // Break Free & Fetch
  { id: 'break_free',  emoji: '🔗', name: 'Unchained',         description: 'Complete your first Break Free', category: 'drill', hidden: false, stackable: false },
  { id: 'fetch_first', emoji: '🐕', name: 'First Fetch',       description: 'Complete your first Fetch',      category: 'drill', hidden: false, stackable: false },
  { id: 'fetch_10',    emoji: '🐕', name: '10 Fetch Sessions', description: 'Complete 10 Fetch sessions',     category: 'drill', hidden: false, stackable: false },

  // Engagement
  { id: 'early_bird', emoji: '🌅', name: 'Early Bird', description: 'Complete a drill before 8am',  category: 'engagement', hidden: false, stackable: true },
  { id: 'night_owl',  emoji: '🌙', name: 'Night Owl',  description: 'Complete a drill after 10pm',  category: 'engagement', hidden: false, stackable: true },

  // Special / Hidden
  { id: 'ghost',            emoji: '💀', name: 'Ghost',                description: 'Missed 7 days then returned',            category: 'special', hidden: true,  stackable: false },
  { id: 'founding_paw',     emoji: '🐾', name: 'Founding Paw',         description: 'Joined before 1,000 users',              category: 'special', hidden: false, stackable: false },
  { id: 'milo_monday_2026', emoji: '🐾', name: 'Milo Monday 2026',     description: 'Celebrated the first Milo Monday',       category: 'special', hidden: false, stackable: false },
  { id: 'molly',            emoji: '❤️', name: 'In Memory of Molly',   description: 'Unlock Molly companion',                 category: 'special', hidden: true,  stackable: false },
];
