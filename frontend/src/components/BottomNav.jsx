import { Map, Dumbbell, Home, Bot, Users, PawPrint } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const tabs = [
  { id: 'home',    label: 'Home',    icon: Home },
  { id: 'paths',   label: 'Paths',   icon: Map },
  { id: 'study',   label: 'Study',   icon: Dumbbell },
  { id: 'fetch',   label: 'Fetch',   icon: PawPrint },
  { id: 'milo',    label: 'Milo',    icon: Bot },
  { id: 'friends', label: 'Friends', icon: Users },
];

export default function BottomNav({ activeTab, onTabChange, breakFreeReady = false }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] h-[60px] w-full bg-white border-t border-gray-100">
      <div className="flex h-full items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const showDot = breakFreeReady && tab.id === 'fetch';

          return (
            <button
              key={tab.id}
              type="button"
              data-testid={`tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-0.5 h-full transition-all duration-150 active:scale-95',
                isActive ? 'text-[#7c3aed]' : 'text-gray-400'
              )}
            >
              <span className="relative">
                <Icon
                  className="h-5 w-5 transition-all duration-150"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {showDot && (
                  <span
                    data-testid="break-free-dot"
                    className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white animate-ping"
                  />
                )}
                {showDot && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
