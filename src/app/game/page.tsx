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
    <main className="game-root">
      {/* Ambient background grid */}
      <div className="game-grid-bg" />

      {/* Ambient bottom glow */}
      <motion.div
        className="game-bottom-glow"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top Stats Bar */}
      <div className="game-topbar-wrap">
        <TopBar
          wealth={stats.wealth}
          fear={stats.fear}
          heat={stats.heat}
          loyalty={stats.loyalty}
        />
      </div>

      {/* Game Title + Logo */}
      <motion.div
        className="game-title-area"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Image src="/logo.png" alt="The Enforcer" width={44} height={44} className="game-logo" unoptimized />
        <div>
          <h1 className="game-title">THE ENFORCER</h1>
          <p className="game-subtitle">North Karnataka Underworld</p>
        </div>
      </motion.div>

      {/* Day Progress */}
      <div className="day-progress-wrap">
        <div className="day-progress-labels">
          <span className="day-text">DAY {day}</span>
          <span className="day-text">/ 15</span>
        </div>
        <div className="day-progress-track">
          <motion.div
            className="day-progress-fill"
            initial={false}
            animate={{ width: `${(day / 15) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`day-pip ${i < day ? "day-pip-done" : ""}`}
              style={{ left: `${(i / 14) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Card Area */}
      <div className="game-card-area">
        <AnimatePresence mode="wait">
          {currentScenario && gamePhase === "playing" && (
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, y: 60, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="game-card-motion"
            >
              <SwipeCard
                scenario={currentScenario}
                onSwipe={swipe}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back link */}
      <div className="game-footer">
        <Link href="/landing" className="game-back-link">← Back to Home</Link>
      </div>

      {/* Game Over / Victory Overlay */}
      <GameOverlay />
    </main>
  );
}
