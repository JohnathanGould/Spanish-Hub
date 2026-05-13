"use client"

import { cn } from "@/lib/utils"

interface Player {
  id: string
  displayName: string
  initials: string
  xp: number
  rank: number
}

interface LeaderboardProps {
  players: Player[]
  currentUserId: string
  activeTab: "week" | "allTime"
  onTabChange?: (tab: "week" | "allTime") => void
}

export function Leaderboard({
  players,
  currentUserId,
  activeTab,
  onTabChange,
}: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank)
  const topThree = sortedPlayers.slice(0, 3)
  const first = topThree.find((p) => p.rank === 1)
  const second = topThree.find((p) => p.rank === 2)
  const third = topThree.find((p) => p.rank === 3)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Leaderboard
        </h1>
      </div>

      {/* Toggle Section */}
      <div className="px-4 pb-6">
        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => onTabChange?.("week")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all",
              activeTab === "week"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            This Week
          </button>
          <button
            onClick={() => onTabChange?.("allTime")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all",
              activeTab === "allTime"
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Podium Section */}
      <div className="px-4 pb-8">
        <div className="flex items-end justify-center gap-3">
          {/* 2nd Place - Left */}
          {second && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-2xl">🥈</div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-700">
                {second.initials}
              </div>
              <p className="mt-2 max-w-[80px] truncate text-center text-sm font-medium text-gray-900">
                {second.displayName}
              </p>
              <p className="text-sm font-semibold text-violet-600">
                {second.xp.toLocaleString()} XP
              </p>
              <div className="mt-2 flex h-20 w-20 items-center justify-center rounded-t-lg bg-gradient-to-b from-gray-300 to-gray-400">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
            </div>
          )}

          {/* 1st Place - Center */}
          {first && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-3xl">👑</div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-xl font-bold text-white shadow-lg">
                {first.initials}
              </div>
              <p className="mt-2 max-w-[90px] truncate text-center text-base font-semibold text-gray-900">
                {first.displayName}
              </p>
              <p className="text-sm font-bold text-violet-600">
                {first.xp.toLocaleString()} XP
              </p>
              <div className="mt-2 flex h-28 w-24 items-center justify-center rounded-t-lg bg-gradient-to-b from-amber-400 to-amber-500">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
            </div>
          )}

          {/* 3rd Place - Right */}
          {third && (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-2xl">🥉</div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-800">
                {third.initials}
              </div>
              <p className="mt-2 max-w-[80px] truncate text-center text-sm font-medium text-gray-900">
                {third.displayName}
              </p>
              <p className="text-sm font-semibold text-violet-600">
                {third.xp.toLocaleString()} XP
              </p>
              <div className="mt-2 flex h-16 w-20 items-center justify-center rounded-t-lg bg-gradient-to-b from-amber-600 to-amber-700">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rankings List */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="rounded-2xl bg-gray-50 p-2">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3",
                player.id === currentUserId
                  ? "bg-violet-600 text-white"
                  : "bg-transparent",
                index !== sortedPlayers.length - 1 &&
                  player.id !== currentUserId &&
                  "border-b border-gray-200"
              )}
            >
              {/* Rank */}
              <span
                className={cn(
                  "w-8 text-center text-lg font-bold",
                  player.id === currentUserId
                    ? "text-white"
                    : player.rank === 1
                      ? "text-amber-500"
                      : player.rank === 2
                        ? "text-gray-400"
                        : player.rank === 3
                          ? "text-amber-700"
                          : "text-gray-500"
                )}
              >
                {player.rank}
              </span>

              {/* Avatar */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                  player.id === currentUserId
                    ? "bg-violet-400 text-white"
                    : "bg-violet-100 text-violet-700"
                )}
              >
                {player.initials}
              </div>

              {/* Name */}
              <span
                className={cn(
                  "flex-1 truncate font-medium",
                  player.id === currentUserId ? "text-white" : "text-gray-900"
                )}
              >
                {player.displayName}
              </span>

              {/* XP */}
              <span
                className={cn(
                  "font-semibold",
                  player.id === currentUserId
                    ? "text-violet-200"
                    : "text-violet-600"
                )}
              >
                {player.xp.toLocaleString()} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
