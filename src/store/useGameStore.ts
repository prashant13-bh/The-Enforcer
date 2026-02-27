import { create } from "zustand";
import scenarios from "@/data/scenarios.json";

export interface Character {
  name: string;
  role: string;
  location: string;
  avatar: string;
  threat: "low" | "medium" | "high";
}

export interface Scenario {
  id: number;
  day: number;
  character: Character;
  text: string;
  accept: { wealth: number; fear: number; heat: number; loyalty: number };
  reject: { wealth: number; fear: number; heat: number; loyalty: number };
}

interface Stats {
  wealth: number;
  fear: number;
  heat: number;
  loyalty: number;
}

type GamePhase = "playing" | "game_over" | "victory";

interface Reason {
  meter: string;
  cause: string;
}

interface GameState {
  stats: Stats;
  currentCardIndex: number;
  day: number;
  gamePhase: GamePhase;
  lastSwipe: "left" | "right" | null;
  gameOverReason: Reason | null;
  currentScenario: Scenario | null;
  swipe: (direction: "left" | "right") => void;
  resetGame: () => void;
}

const clamp = (val: number) => Math.max(0, Math.min(100, val));

const shuffledScenarios = [...scenarios as Scenario[]].sort(() => Math.random() - 0.5);

const GAME_OVER_REASONS: Record<string, Record<"low" | "high", Reason>> = {
  wealth: {
    low: { meter: "💰 Wealth", cause: "You're bankrupt. The gang abandoned you." },
    high: { meter: "💰 Wealth", cause: "Too rich — a rival cartel had you robbed and killed." },
  },
  fear: {
    low: { meter: "🩸 Fear", cause: "Nobody fears you. A rival don just walked into your territory." },
    high: { meter: "🩸 Fear", cause: "Terror overflowed. The whole city revolted against you." },
  },
  heat: {
    low: { meter: "🚓 Heat", cause: "Police got too comfortable. They raided all your operations." },
    high: { meter: "🚓 Heat", cause: "The military was called in. You're in a black site now." },
  },
  loyalty: {
    low: { meter: "🤝 Loyalty", cause: "Your lieutenants mutinied. You were assassinated at dinner." },
    high: { meter: "🤝 Loyalty", cause: "Your men got sloppy from comfort. A rival caught you off guard." },
  },
};

function checkGameOver(stats: Stats): Reason | null {
  for (const [key, thresholds] of Object.entries(GAME_OVER_REASONS)) {
    const val = stats[key as keyof Stats];
    if (val <= 0) return thresholds.low;
    if (val >= 100) return thresholds.high;
  }
  return null;
}

export const useGameStore = create<GameState>((set, get) => ({
  stats: { wealth: 50, fear: 50, heat: 50, loyalty: 50 },
  currentCardIndex: 0,
  day: 1,
  gamePhase: "playing",
  lastSwipe: null,
  gameOverReason: null,
  currentScenario: shuffledScenarios[0] ?? null,

  swipe: (direction) => {
    const { currentCardIndex, stats } = get();
    const scenario = shuffledScenarios[currentCardIndex];
    if (!scenario) return;

    const deltas = direction === "right" ? scenario.accept : scenario.reject;
    const newStats: Stats = {
      wealth: clamp(stats.wealth + deltas.wealth),
      fear: clamp(stats.fear + deltas.fear),
      heat: clamp(stats.heat + deltas.heat),
      loyalty: clamp(stats.loyalty + deltas.loyalty),
    };

    const reason = checkGameOver(newStats);
    const nextIndex = currentCardIndex + 1;
    const hasMoreCards = nextIndex < shuffledScenarios.length;

    if (reason) {
      set({ stats: newStats, gamePhase: "game_over", gameOverReason: reason, lastSwipe: direction });
    } else if (!hasMoreCards) {
      set({ stats: newStats, gamePhase: "victory", lastSwipe: direction });
    } else {
      set({
        stats: newStats,
        currentCardIndex: nextIndex,
        day: nextIndex + 1,
        currentScenario: shuffledScenarios[nextIndex],
        lastSwipe: direction,
      });
    }
  },

  resetGame: () => {
    shuffledScenarios.sort(() => Math.random() - 0.5);
    set({
      stats: { wealth: 50, fear: 50, heat: 50, loyalty: 50 },
      currentCardIndex: 0,
      day: 1,
      gamePhase: "playing",
      lastSwipe: null,
      gameOverReason: null,
      currentScenario: shuffledScenarios[0],
    });
  },
}));
