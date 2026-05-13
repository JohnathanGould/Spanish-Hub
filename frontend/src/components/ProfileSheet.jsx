"use client"

import { X, ChevronRight } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface ProfileStats {
  streak: number
  totalXp: number
  wordsMastered: number
  bones: number
}

export interface Badge {
  id: string
  emoji: string
  name: string
}

export interface ProfileSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  displayName: string
  avatarUrl?: string
  initials: string
  memberSince: string
  stats: ProfileStats
  badges: Badge[]
  dailyGoal: number
  notificationsEnabled: boolean
  onDailyGoalEdit?: () => void
  onNotificationsToggle?: (enabled: boolean) => void
  onViewAllBadges?: () => void
  onSignOut?: () => void
}

export function ProfileSheet({
  open,
  onOpenChange,
  displayName,
  avatarUrl,
  initials,
  memberSince,
  stats,
  badges,
  dailyGoal,
  notificationsEnabled,
  onDailyGoalEdit,
  onNotificationsToggle,
  onViewAllBadges,
  onSignOut,
}: ProfileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[90vh] rounded-t-3xl px-0 pb-8 pt-0 [&>button]:hidden"
      >
        {/* Custom close button */}
        <SheetClose asChild>
          <button
            className="absolute right-4 top-4 z-10 rounded-full bg-muted p-2 transition-colors hover:bg-muted/80"
            aria-label="Close"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
        </SheetClose>

        {/* Drag handle indicator */}
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-muted" />
        </div>

        <div className="flex flex-col items-center px-6">
          {/* Avatar */}
          <Avatar className="size-20 border-4 border-violet-600">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-violet-600 text-2xl font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Display name */}
          <h2 className="mt-3 text-xl font-bold text-foreground">{displayName}</h2>

          {/* Member since */}
          <p className="mt-1 text-sm text-muted-foreground">
            Member since {memberSince}
          </p>

          {/* Learning Spanish */}
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>🇪🇸</span>
            <span>Learning Spanish</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-4 gap-2 px-4">
          <StatItem emoji="🔥" value={stats.streak} label="Streak" />
          <StatItem emoji="⭐" value={stats.totalXp.toLocaleString()} label="XP" />
          <StatItem emoji="📚" value={stats.wordsMastered} label="Words" />
          <StatItem emoji="🦴" value={stats.bones} label="Bones" />
        </div>

        {/* Badges section */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">My Badges</h3>
            <button
              onClick={onViewAllBadges}
              className="flex items-center gap-0.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700"
            >
              View All
              <ChevronRight className="size-4" />
            </button>
          </div>
          <ScrollArea className="mt-3 w-full whitespace-nowrap">
            <div className="flex gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-xl"
                  title={badge.name}
                >
                  {badge.emoji}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Settings section */}
        <div className="mt-6 space-y-1 px-4">
          {/* Daily Goal */}
          <button
            onClick={onDailyGoalEdit}
            className="flex w-full items-center justify-between rounded-xl bg-muted/50 px-4 py-3.5 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🎯</span>
              <span className="font-medium text-foreground">Daily Goal</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{dailyGoal} XP</span>
              <ChevronRight className="size-4" />
            </div>
          </button>

          {/* Notifications */}
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔔</span>
              <span className="font-medium text-foreground">Notifications</span>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={onNotificationsToggle}
              className="data-[state=checked]:bg-violet-600"
            />
          </div>
        </div>

        {/* Sign Out */}
        <div className="mt-6 px-4">
          <Button
            variant="ghost"
            onClick={onSignOut}
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function StatItem({
  emoji,
  value,
  label,
}: {
  emoji: string
  value: string | number
  label: string
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-muted/50 px-2 py-3">
      <span className="text-lg">{emoji}</span>
      <span className="mt-1 text-lg font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
