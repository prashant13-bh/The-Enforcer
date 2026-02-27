"use client";

import { motion, useAnimation, PanInfo } from "framer-motion";
import { useRef } from "react";
import { Scenario } from "@/store/useGameStore";

interface SwipeCardProps {
  scenario: Scenario;
  onSwipe: (direction: "left" | "right") => void;
}

export function SwipeCard({ scenario, onSwipe }: SwipeCardProps) {
  const controls = useAnimation();
  const isDragging = useRef(false);

  const triggerSwipe = async (direction: "left" | "right") => {
    const x = direction === "right" ? 1000 : -1000;
    await controls.start({ x, opacity: 0, transition: { duration: 0.3 } });
    onSwipe(direction);
    await controls.set({ x: 0, opacity: 1 });
  };

  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await triggerSwipe("right");
    } else if (info.offset.x < -threshold) {
      await triggerSwipe("left");
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full select-none">
      {/* Hint labels */}
      <div className="flex justify-between w-full px-8 absolute top-1/3 pointer-events-none z-10">
        <div className="text-green-400 font-black text-2xl border-4 border-green-400 rounded-lg px-3 py-1 opacity-60 -rotate-15">
          YES ✓
        </div>
        <div className="text-red-500 font-black text-2xl border-4 border-red-500 rounded-lg px-3 py-1 opacity-60 rotate-15">
          NO ✗
        </div>
      </div>

      {/* Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        animate={controls}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
        style={{ cursor: "grab" }}
        className="relative w-full max-w-sm mx-auto"
      >
        {/* Card glow */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-red-900/30 to-transparent blur-xl opacity-60 pointer-events-none" />

        {/* Card body */}
        <div className="relative bg-[#1c1c1e] border border-red-900/40 rounded-3xl p-8 shadow-2xl min-h-[350px] flex flex-col justify-between">
          {/* Day badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-red-900/50 text-red-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-800/50">
              Day {scenario.day}
            </span>
          </div>

          {/* Scenario text */}
          <p className="text-lg text-gray-100 font-medium leading-relaxed flex-1">
            {scenario.text}
          </p>

          {/* Swipe directions */}
          <div className="flex justify-between mt-8 text-sm text-gray-500">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">←</span>
              <span className="text-red-500 font-bold">REFUSE</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-gray-600 text-xs">Drag to decide</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">→</span>
              <span className="text-green-500 font-bold">ACCEPT</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tap Buttons for non-swipe */}
      <div className="flex gap-6 mt-2">
        <button
          onClick={() => triggerSwipe("left")}
          className="w-16 h-16 rounded-full bg-red-900/40 border border-red-700 flex items-center justify-center text-2xl hover:bg-red-800/60 active:scale-95 transition-all"
        >
          ✗
        </button>
        <button
          onClick={() => triggerSwipe("right")}
          className="w-16 h-16 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center text-2xl hover:bg-green-800/60 active:scale-95 transition-all"
        >
          ✓
        </button>
      </div>
    </div>
  );
}
