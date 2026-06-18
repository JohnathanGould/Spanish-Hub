// data/pathTiers.js
// Drives the three-level Paths navigation: Stage → Tier → Path
// To add a new stage (e.g. Intermediate): append one object to PATH_STAGES.
// To add a new tier: append to that stage's tiers array.
// Path IDs must match the id fields in data/paths.js exactly.

export const PATH_STAGES = [
  {
    id: 'beginner',
    label: 'Beginner',
    emoji: '🌱',
    tiers: [
      { id: 'beginner-1', label: 'Beginner I',   pathIds: ['path1', 'path2'] },
      { id: 'beginner-2', label: 'Beginner II',  pathIds: ['path3', 'path4'] },
      { id: 'beginner-3', label: 'Beginner III', pathIds: ['path5', 'path6'] },
    ]
  },
  {
    id: 'advanced-beginner',
    label: 'Advanced Beginner',
    emoji: '🌿',
    tiers: [
      { id: 'adv-beginner-1', label: 'Advanced Beginner I',   pathIds: ['path7',  'path8']  },
      { id: 'adv-beginner-2', label: 'Advanced Beginner II',  pathIds: ['path9',  'path10'] },
      { id: 'adv-beginner-3', label: 'Advanced Beginner III', pathIds: ['path11', 'path12'] },
    ]
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    emoji: '🌳',
    tiers: [
      { id: 'intermediate-1', label: 'Intermediate I', pathIds: ['path13'] },
    ]
  },
]
