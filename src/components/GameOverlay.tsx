"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";

export function GameOverlay() {
  const { gamePhase, gameOverReason, resetGame } = useGameStore();

  if (gamePhase === "playing") return null;

  const isVictory = gamePhase === "victory";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
      >
        <motion.div
          initial={{ scale: 0.7, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-sm"
        >
          {isVictory ? (
            <div className="bg-linear-to-b from-yellow-950 to-[#111] border border-yellow-600/50 rounded-3xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">👑</div>
              <h1 className="text-3xl font-black text-yellow-400 mb-3">You Survived</h1>
              <p className="text-gray-300 text-base mb-6">
                North Karnataka bows to you. The mines, the politics, the streets — all under your iron grip.
              </p>
              <button
                onClick={resetGame}
                className="w-full py-4 bg-yellow-700 hover:bg-yellow-600 text-white font-bold rounded-2xl text-lg transition-all active:scale-95"
              >
                Rule Again →
              </button>
            </div>
          ) : (
            <div className="bg-linear-to-b from-red-950 to-[#111] border border-red-800/50 rounded-3xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">💀</div>
              <h1 className="text-3xl font-black text-red-400 mb-2">Eliminated</h1>
              {gameOverReason && (
                <>
                  <p className="text-red-300 font-bold text-sm uppercase tracking-widest mb-3">
                    {gameOverReason.meter} Failure
                  </p>
                  <p className="text-gray-300 text-base mb-6">{gameOverReason.cause}</p>
                </>
              )}
              <button
                onClick={resetGame}
                className="w-full py-4 bg-red-800 hover:bg-red-700 text-white font-bold rounded-2xl text-lg transition-all active:scale-95"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
