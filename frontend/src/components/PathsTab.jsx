import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Lock, Check } from 'lucide-react';
import {
  PATHS,
  getPath,
  getStop,
  getPathIdForStop,
  isPathComplete,
} from '../content/es-en/paths';

// ─────────────────────────────────────────────
// Lock logic
// Path 1 Stop 1 (p1s1) — always unlocked
// Stop N unlocked when Stop N-1 ID is in completedStops[]
// First Stop of Path 2–12 unlocked when final Stop of previous Path is in completedStops[]
// ─────────────────────────────────────────────
function isStopUnlocked(stopId, completedStops) {
  if (stopId === 'p1s1') return true;
  if (completedStops.includes(stopId)) return true;

  const pathId = getPathIdForStop(stopId);
  if (!pathId) return false;
  const path = getPath(pathId);
  if (!path) return false;

  const stopIndex = path.stops.findIndex((s) => s.id === stopId);
  if (stopIndex === -1) return false;

  // First stop of a path (not Path 1) — unlocked when final stop of previous Path is completed
  if (stopIndex === 0) {
    const pathArrayIndex = PATHS.findIndex((p) => p.id === pathId);
    if (pathArrayIndex <= 0) return false;
    const prevPath = PATHS[pathArrayIndex - 1];
    const prevFinalStopId = prevPath.stops[prevPath.stops.length - 1].id;
    return completedStops.includes(prevFinalStopId);
  }

  // Otherwise — unlocked when previous stop in same path is completed
  const prevStopId = path.stops[stopIndex - 1].id;
  return completedStops.includes(prevStopId);
}

function isPathUnlocked(pathId, completedStops) {
  const path = getPath(pathId);
  if (!path) return false;
  return isStopUnlocked(path.stops[0].id, completedStops);
}

// ─────────────────────────────────────────────
// Placeholder StopView (replaced in Session 2)
// ─────────────────────────────────────────────
function StopPlaceholder({ stopId, onBack }) {
  const stop = getStop(stopId);
  const pathId = getPathIdForStop(stopId);
  const path = getPath(pathId);

  if (!stop || !path) {
    return (
      <div className="p-6">
        <button
          type="button"
          data-testid="stop-placeholder-back-btn"
          onClick={onBack}
          className="text-sm font-medium underline"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>
        <p className="mt-6 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Stop not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4" data-testid={`stop-placeholder-${stopId}`}>
      <button
        type="button"
        data-testid="stop-placeholder-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: 'hsl(var(--primary))' }}
      >
        ← Back to Paths
      </button>

      <div
        className="rounded-2xl p-5 mb-4 text-white relative overflow-hidden"
        style={{ background: 'hsl(var(--primary))' }}
      >
        <p className="text-xs uppercase tracking-wider opacity-80">{path.title}</p>
        <h2 className="text-2xl font-semibold mt-1">{stop.title}</h2>
        <p className="text-sm opacity-90 mt-1">{stop.titleEn}</p>
      </div>

      <div
        className="drill-card"
        style={{
          background: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Stop content coming soon 🐾
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main PathsTab component
// ─────────────────────────────────────────────
export default function PathsTab({
  completedStops = [],
  completedPaths = [],
  onSelectStop,
}) {
  const [expandedPathId, setExpandedPathId] = useState(null);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [lockedMessageStopId, setLockedMessageStopId] = useState(null);

  // Render placeholder StopView when a stop is selected
  if (selectedStopId) {
    return (
      <StopPlaceholder
        stopId={selectedStopId}
        onBack={() => setSelectedStopId(null)}
      />
    );
  }

  const togglePath = (pathId, unlocked) => {
    if (!unlocked) return;
    setExpandedPathId((curr) => (curr === pathId ? null : pathId));
  };

  const handleStopTap = (stopId, unlocked) => {
    if (!unlocked) {
      setLockedMessageStopId(stopId);
      // Auto-dismiss the message after 2.5s
      setTimeout(() => {
        setLockedMessageStopId((curr) => (curr === stopId ? null : curr));
      }, 2500);
      return;
    }
    setLockedMessageStopId(null);
    setSelectedStopId(stopId);
    if (typeof onSelectStop === 'function') onSelectStop(stopId);
  };

  return (
    <div className="p-4" data-testid="paths-tab">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          Paths
        </h1>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Work through each Stop to build your Spanish step by step.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PATHS.map((path, pathIndex) => {
          const unlocked = isPathUnlocked(path.id, completedStops);
          const complete = isPathComplete(path.id, completedStops) ||
            completedPaths.includes(path.id);
          const expanded = expandedPathId === path.id;

          const completedStopCount = path.stops.filter((s) =>
            completedStops.includes(s.id)
          ).length;

          return (
            <div key={path.id} data-testid={`path-row-${path.id}`}>
              {/* Path header */}
              <button
                type="button"
                data-testid={`path-header-${path.id}`}
                onClick={() => togglePath(path.id, unlocked)}
                disabled={!unlocked}
                className="rounded-2xl p-5 mb-2 text-white relative overflow-hidden w-full text-left transition-opacity"
                style={{
                  background: unlocked
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted))',
                  color: unlocked ? '#fff' : 'hsl(var(--muted-foreground))',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.75,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider opacity-80">
                      Path {pathIndex + 1} · {path.subLevel}
                    </p>
                    <h2 className="text-lg font-semibold mt-0.5 truncate">
                      {path.title}
                    </h2>
                    <p className="text-xs opacity-90 mt-0.5 truncate">
                      {path.titleEn}
                    </p>
                    <p className="text-[11px] mt-2 opacity-90">
                      {completedStopCount} / {path.stops.length} Stops
                      {complete ? ' · Complete' : ''}
                    </p>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    {!unlocked ? (
                      <Lock className="w-5 h-5" />
                    ) : complete ? (
                      <Check className="w-5 h-5" />
                    ) : expanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Stops list (only when expanded and unlocked) */}
              {unlocked && expanded && (
                <div
                  className="flex flex-col gap-2 mb-2"
                  data-testid={`path-stops-${path.id}`}
                >
                  {path.stops.map((stop, stopIndex) => {
                    const stopUnlocked = isStopUnlocked(stop.id, completedStops);
                    const stopComplete = completedStops.includes(stop.id);
                    const showLockedMsg = lockedMessageStopId === stop.id;

                    return (
                      <div key={stop.id}>
                        <button
                          type="button"
                          data-testid={`stop-node-${stop.id}`}
                          onClick={() => handleStopTap(stop.id, stopUnlocked)}
                          className="drill-card w-full text-left"
                          style={{
                            background: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            opacity: stopUnlocked ? 1 : 0.65,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                              style={{
                                background: stopComplete
                                  ? 'hsl(var(--primary))'
                                  : 'hsl(var(--muted))',
                                color: stopComplete
                                  ? '#fff'
                                  : 'hsl(var(--muted-foreground))',
                              }}
                            >
                              {stopComplete ? (
                                <Check className="w-4 h-4" />
                              ) : !stopUnlocked ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                stopIndex + 1
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-semibold truncate"
                                style={{ color: 'hsl(var(--foreground))' }}
                              >
                                {stop.title}
                              </p>
                              <p
                                className="text-xs truncate"
                                style={{ color: 'hsl(var(--muted-foreground))' }}
                              >
                                {stop.titleEn}
                              </p>
                            </div>
                            <ChevronRight
                              className="w-4 h-4 shrink-0"
                              style={{ color: 'hsl(var(--muted-foreground))' }}
                            />
                          </div>
                        </button>

                        {showLockedMsg && (
                          <div
                            data-testid={`stop-locked-msg-${stop.id}`}
                            className="mt-2 px-3 py-2 rounded-lg text-xs"
                            style={{
                              background: 'hsl(var(--muted))',
                              color: 'hsl(var(--muted-foreground))',
                              border: '1px solid hsl(var(--border))',
                            }}
                          >
                            Complete the previous Stop to unlock this one 🐾
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
