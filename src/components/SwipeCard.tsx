"use client";

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Scenario } from "@/store/useGameStore";

interface SwipeCardProps {
  scenario: Scenario;
  nextScenario?: Scenario | null;
  onSwipe: (direction: "left" | "right") => void;
}

const THREAT_COLORS: Record<string, string> = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

const THREAT_LABELS: Record<string, string> = {
  low: "Low Threat",
  medium: "Caution",
  high: "Dangerous",
};

export function SwipeCard({ scenario, nextScenario, onSwipe }: SwipeCardProps) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const [decision, setDecision] = useState<"accept" | "reject" | null>(null);

  // Rotation: tilt card as it drags
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);

  // Color overlays
  const acceptOpacity = useTransform(x, [0, 100], [0, 1]);
  const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);

  const triggerSwipe = async (direction: "left" | "right") => {
    const targetX = direction === "right" ? 1200 : -1200;
    setDecision(direction === "right" ? "accept" : "reject");
    await controls.start({
      x: targetX,
      rotate: direction === "right" ? 25 : -25,
      opacity: 0,
      transition: { duration: 0.38, ease: "easeIn" },
    });
    onSwipe(direction);
    x.set(0);
    setDecision(null);
    await controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const threshold = 90;
    if (info.offset.x > threshold) {
      await triggerSwipe("right");
    } else if (info.offset.x < -threshold) {
      await triggerSwipe("left");
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
      setDecision(null);
    }
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 30) setDecision("accept");
    else if (info.offset.x < -30) setDecision("reject");
    else setDecision(null);
  };

  const threatColor = THREAT_COLORS[scenario.character.threat];
  const threatLabel = THREAT_LABELS[scenario.character.threat];

  return (
    <div className="card-stack-root">
      {/* Ghost card 2 (furthest back) */}
      {nextScenario && (
        <div className="ghost-card ghost-card-2">
          <Image
            src={nextScenario.character.avatar}
            alt=""
            fill
            className="ghost-portrait"
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className="ghost-overlay" />
        </div>
      )}

      {/* Ghost card 1 (one behind) */}
      {nextScenario && (
        <div className="ghost-card ghost-card-1">
          <Image
            src={nextScenario.character.avatar}
            alt=""
            fill
            className="ghost-portrait"
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className="ghost-overlay" />
        </div>
      )}

      {/* ── MAIN CARD ── */}
      <motion.div
        className="main-card"
        style={{ x, rotate }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.85}
        onDragStart={() => { isDragging.current = true; }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.03, cursor: "grabbing" }}
        initial={{ scale: 1, opacity: 1 }}
      >
        {/* ── PORTRAIT AREA ── */}
        <div className="card-portrait-wrap">
          <Image
            src={scenario.character.avatar}
            alt={scenario.character.name}
            fill
            className="card-portrait-img"
            style={{ objectFit: "cover", objectPosition: "top center" }}
            unoptimized
            priority
          />

          {/* Cinematic gradient fade over portrait */}
          <div className="portrait-gradient" />

          {/* Threat badge */}
          <div className="threat-badge" style={{ borderColor: threatColor, color: threatColor }}>
            <span className="threat-dot" style={{ background: threatColor }} />
            {threatLabel}
          </div>

          {/* Day badge */}
          <div className="day-badge">DAY {scenario.day}</div>

          {/* ACCEPT stamp */}
          <motion.div
            className="stamp stamp-accept"
            style={{ opacity: acceptOpacity }}
          >
            ✓ ACCEPT
          </motion.div>

          {/* REJECT stamp */}
          <motion.div
            className="stamp stamp-reject"
            style={{ opacity: rejectOpacity }}
          >
            ✗ REFUSE
          </motion.div>

          {/* Character name overlay at bottom of portrait */}
          <div className="portrait-name-area">
            <h2 className="char-name">{scenario.character.name}</h2>
            <div className="char-meta">
              <span className="char-role">{scenario.character.role}</span>
              <span className="char-sep">·</span>
              <span className="char-location">📍 {scenario.character.location}</span>
            </div>
          </div>
        </div>

        {/* ── SCENARIO TEXT AREA ── */}
        <div className="card-text-area">
          <p className="scenario-text">&ldquo;{scenario.text}&rdquo;</p>

          {/* Stat preview hints */}
          <div className="stat-hints">
            <div className="hint-side hint-left">
              <span className="hint-label">IF REFUSED</span>
              <div className="hint-deltas">
                {Object.entries(scenario.reject).map(([k, v]) => v !== 0 && (
                  <span key={k} className={`delta ${v > 0 ? "delta-up" : "delta-down"}`}>
                    {v > 0 ? "+" : ""}{v} {k === "wealth" ? "💰" : k === "fear" ? "🩸" : k === "heat" ? "🚓" : "🤝"}
                  </span>
                ))}
              </div>
            </div>
            <div className="hint-side hint-right">
              <span className="hint-label">IF ACCEPTED</span>
              <div className="hint-deltas">
                {Object.entries(scenario.accept).map(([k, v]) => v !== 0 && (
                  <span key={k} className={`delta ${v > 0 ? "delta-up" : "delta-down"}`}>
                    {v > 0 ? "+" : ""}{v} {k === "wealth" ? "💰" : k === "fear" ? "🩸" : k === "heat" ? "🚓" : "🤝"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision color-wash overlay */}
        {decision === "accept" && <div className="decision-wash accept-wash" />}
        {decision === "reject" && <div className="decision-wash reject-wash" />}
      </motion.div>

      {/* ── SWIPE BUTTONS ── */}
      <div className="swipe-buttons">
        <motion.button
          className="swipe-btn refuse-btn"
          onClick={() => triggerSwipe("left")}
          whileHover={{ scale: 1.12, boxShadow: "0 0 24px rgba(239,68,68,0.6)" }}
          whileTap={{ scale: 0.92 }}
        >
          <span>✗</span>
          <span className="btn-label">REFUSE</span>
        </motion.button>

        <motion.button
          className="swipe-btn accept-btn"
          onClick={() => triggerSwipe("right")}
          whileHover={{ scale: 1.12, boxShadow: "0 0 24px rgba(34,197,94,0.6)" }}
          whileTap={{ scale: 0.92 }}
        >
          <span>✓</span>
          <span className="btn-label">ACCEPT</span>
        </motion.button>
      </div>

      {/* Drag hint */}
      <p className="drag-hint">← Drag to decide →</p>
    </div>
  );
}
