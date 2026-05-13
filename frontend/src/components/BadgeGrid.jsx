interface Badge {
  id: number
  emoji: string
  name: string
  description: string
  current: number
  total: number
  earned: boolean
}

const badges: Badge[] = [
  {
    id: 1,
    emoji: "🔥",
    name: "Streak Master",
    description: "Complete 7 days in a row",
    current: 7,
    total: 7,
    earned: true,
  },
  {
    id: 2,
    emoji: "📚",
    name: "Word Collector",
    description: "Learn 100 new vocabulary words",
    current: 68,
    total: 100,
    earned: false,
  },
  {
    id: 3,
    emoji: "🎯",
    name: "Perfect Score",
    description: "Get 100% on 5 quizzes",
    current: 5,
    total: 5,
    earned: true,
  },
  {
    id: 4,
    emoji: "🗣️",
    name: "Conversationalist",
    description: "Complete 10 speaking exercises",
    current: 4,
    total: 10,
    earned: false,
  },
  {
    id: 5,
    emoji: "⭐",
    name: "Rising Star",
    description: "Earn 500 XP total",
    current: 320,
    total: 500,
    earned: false,
  },
  {
    id: 6,
    emoji: "🏆",
    name: "Grammar Guru",
    description: "Master all verb conjugations",
    current: 12,
    total: 12,
    earned: true,
  },
]

function BadgeCard({ badge }: { badge: Badge }) {
  const progressPercent = (badge.current / badge.total) * 100

  return (
    <div
      className={`rounded-xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md ${
        badge.earned ? "border-2 border-green-500" : "border border-gray-200"
      }`}
    >
      <div className="mb-2 text-4xl">{badge.emoji}</div>
      <h3 className="mb-1 text-sm font-bold text-gray-900 whitespace-nowrap">{badge.name}</h3>
      <p className="mb-3 text-xs text-gray-600 line-clamp-2">{badge.description}</p>

      <div className="mb-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">
          {badge.current}/{badge.total}
        </span>
        {badge.earned && (
          <span className="text-xs text-green-600">Earned</span>
        )}
      </div>
    </div>
  )
}

export default function BadgeGrid() {
  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 overflow-x-hidden">
      <div className="w-full">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Your Badges
        </h1>
        <p className="mb-5 text-center text-gray-600">
          Keep learning Spanish to earn more badges!
        </p>

        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  )
}
