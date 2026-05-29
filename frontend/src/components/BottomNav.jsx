"use client"

import { BookOpen, Dumbbell, Home, Bot, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "study", label: "Study", icon: Dumbbell },
  { id: "milo", label: "Talk to Milo", icon: Bot },
  { id: "more", label: "More", icon: Trophy },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[60px] w-full bg-white border-t border-gray-100">
      <div className="flex h-full items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 h-full transition-all duration-150 active:scale-95",
                isActive ? "text-[#7c3aed]" : "text-gray-400"
              )}
            >
              <Icon
                className={cn(
                  "transition-all duration-150",
                  tab.isCenter ? "h-7 w-7" : "h-5 w-5"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
