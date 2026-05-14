"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Volume2 } from "lucide-react"
import { KofiSupport } from "./KofiSupport"

export function HomeTab({
  weakWordsCompleted = false,
  themeOfDayCompleted = false,
  onWeakWordsClick,
  onThemeOfDayClick,
  wordOfWeek,
  phraseOfWeek,
  onWordSpeakerClick,
  onPhraseSpeakerClick,
  onAddWordToList,
  onAddPhraseToList,
  currentStreak,
  totalXP,
  wordsMastered,
  onStartDrilling,
}) {
  return (
    <div className="w-full h-[527px] bg-white px-3 py-3 flex flex-col gap-3">
      {/* Section 1 — Daily Challenge Card */}
      <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md flex-shrink-0">
        <CardContent className="px-2.5 py-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm">⚡</span>
            <h2 className="text-xs font-bold">Daily Challenge</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Weak Words Button */}
            <button
              onClick={onWeakWordsClick}
              className="relative flex flex-col items-center justify-center py-1.5 px-2 bg-red-500/90 hover:bg-red-500 rounded-lg transition-colors"
            >
              <Badge className="absolute -top-1.5 -right-1 bg-yellow-400 text-yellow-900 border-0 text-[10px] font-bold px-1.5 py-0">
                2x XP
              </Badge>
              <span className="font-semibold text-xs">Weak Words</span>
              {weakWordsCompleted && (
                <div className="mt-0.5 bg-white/20 rounded-full p-0.5">
                  <Check className="size-3" />
                </div>
              )}
            </button>

            {/* Theme of the Day Button */}
            <button
              onClick={onThemeOfDayClick}
              className="relative flex flex-col items-center justify-center py-1.5 px-2 bg-orange-500/90 hover:bg-orange-500 rounded-lg transition-colors"
            >
              <Badge className="absolute -top-1.5 -right-1 bg-yellow-400 text-yellow-900 border-0 text-[10px] font-bold px-1.5 py-0">
                1.5x XP
              </Badge>
              <span className="font-semibold text-xs leading-tight text-center">Theme of Day</span>
              {themeOfDayCompleted && (
                <div className="mt-0.5 bg-white/20 rounded-full p-0.5">
                  <Check className="size-3" />
                </div>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 — Word & Phrase of the Week */}
      <div className="grid grid-cols-2 gap-2 flex-shrink-0">
        {/* Word of the Week */}
        <Card className="shadow-sm">
          <CardContent className="p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-violet-600 uppercase tracking-wide">
                Word of Week
              </span>
              <button
                onClick={onWordSpeakerClick}
                className="text-violet-500 hover:text-violet-700 transition-colors"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="size-3" />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{wordOfWeek.spanish}</p>
            <p className="text-xs text-gray-500 leading-tight">{wordOfWeek.english}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddWordToList}
              className="mt-1.5 w-full h-6 text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-[10px] font-medium p-0"
            >
              Add to List +
            </Button>
          </CardContent>
        </Card>

        {/* Phrase of the Week */}
        <Card className="shadow-sm">
          <CardContent className="p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-violet-600 uppercase tracking-wide">
                Phrase of Week
              </span>
              <button
                onClick={onPhraseSpeakerClick}
                className="text-violet-500 hover:text-violet-700 transition-colors"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="size-3" />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-tight">{phraseOfWeek.spanish}</p>
            <p className="text-xs text-gray-500 leading-tight">{phraseOfWeek.english}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddPhraseToList}
              className="mt-1.5 w-full h-6 text-violet-600 hover:text-violet-700 hover:bg-violet-50 text-[10px] font-medium p-0"
            >
              Add to List +
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Section 3 — Streak & Stats */}
      <div className="flex justify-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1 bg-orange-50 text-orange-700 px-2.5 py-1.5 rounded-full">
          <span className="text-sm">🔥</span>
          <span className="font-bold text-xs">{currentStreak}</span>
          <span className="text-[10px] text-orange-600">days</span>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-1.5 rounded-full">
          <span className="text-sm">⭐</span>
          <span className="font-bold text-xs">{totalXP.toLocaleString()}</span>
          <span className="text-[10px] text-yellow-600">XP</span>
        </div>
        <div className="flex items-center gap-1 bg-violet-50 text-violet-700 px-2.5 py-1.5 rounded-full">
          <span className="text-sm">📚</span>
          <span className="font-bold text-xs">{wordsMastered}</span>
          <span className="text-[10px] text-violet-600">words</span>
        </div>
      </div>

      {/* Section 4 — Quick Start */}
      <Button
        onClick={onStartDrilling}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg text-sm shadow-md flex-shrink-0"
      >
        Start Drilling →
      </Button>

      {/* Ko-fi Support */}
      <KofiSupport />
    </div>
  )
}
