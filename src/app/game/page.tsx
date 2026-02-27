"use client";

import { useGameStore } from "@/store/useGameStore";
import { TopBar } from "@/components/TopBar";
import { SwipeCard } from "@/components/SwipeCard";
import { GameOverlay } from "@/components/GameOverlay";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function GamePage() {
  const { stats, currentScenario, day, swipe, gamePhase } = useGameStore();

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,20,20,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,20,20,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow from bottom */}
      <div className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-900/20 blur-3xl" />

      {/* Top Stats Bar */}
      <div className="w-full max-w-md px-4 pt-safe-top">
        <TopBar
          wealth={stats.wealth}
          fear={stats.fear}
          heat={stats.heat}
          loyalty={stats.loyalty}
        />
      </div>

      {/* Game Title + Logo */}
      <div className="mt-28 mb-4 text-center px-4 flex flex-col items-center gap-2">
        <Image src="/logo.png" alt="The Enforcer Logo" width={52} height={52} className="rounded-xl opacity-90" />
        <h1 className="text-2xl font-black tracking-widest text-red-600 uppercase">
          THE ENFORCER
        </h1>
        <p className="text-gray-500 text-xs mt-1 tracking-widest">North Karnataka Underworld</p>
      </div>

      {/* Day counter + Progress */}
      <div className="mb-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-red-900/50" />
          <span className="text-gray-400 text-sm font-bold">DAY {day} / 15</span>
          <div className="h-px w-12 bg-red-900/50" />
        </div>
        {/* Progress bar */}
        <div className="w-40 h-1 bg-gray-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-red-700 rounded-full transition-all duration-500"
            style={{ width: `${(day / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 w-full max-w-md px-4 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentScenario && gamePhase === "playing" && (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full"
            >
              <SwipeCard scenario={currentScenario} onSwipe={swipe} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pb-6 mt-4 text-center flex flex-col items-center gap-2">
        <p className="text-gray-700 text-xs tracking-widest uppercase">Balance is power</p>
        <Link
          href="/"
          className="text-gray-600 text-xs hover:text-red-500 transition-colors underline underline-offset-2"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Game Over / Victory Overlay */}
      <GameOverlay />
    </main>
  );
}
