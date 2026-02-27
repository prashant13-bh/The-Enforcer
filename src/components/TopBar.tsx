"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, Ghost, ShieldAlert, Users } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: number;
  color: string;
  dangerColor: string;
  label: string;
}

function StatBar({ icon: Icon, value, color, dangerColor, label }: StatProps) {
  const isDanger = value <= 20 || value >= 80;
  const isExtreme = value <= 10 || value >= 90;
  const displayColor = isDanger ? dangerColor : color;

  return (
    <div className="stat-item">
      <motion.div
        className="stat-icon-wrap"
        animate={isExtreme ? { scale: [1, 1.18, 1], opacity: [1, 0.7, 1] } : {}}
        transition={isExtreme ? { duration: 0.7, repeat: Infinity } : {}}
        style={{ borderColor: isDanger ? dangerColor + "60" : "transparent" }}
      >
        <Icon
          size={16}
          style={{ color: displayColor }}
          strokeWidth={2.5}
        />
      </motion.div>
      <div className="stat-bar-col">
        <div className="stat-bar-track">
          <motion.div
            className="stat-bar-fill"
            style={{ background: displayColor }}
            initial={false}
            animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
          {isDanger && (
            <motion.div
              className="stat-danger-pulse"
              style={{ background: dangerColor }}
              animate={{ opacity: [0, 0.35, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </div>
        <div className="stat-bottom">
          <span className="stat-label" style={{ color: isDanger ? dangerColor : undefined }}>{label}</span>
          <span className="stat-val" style={{ color: isDanger ? dangerColor : undefined }}>
            {isExtreme && "⚠ "}{value}
          </span>
        </div>
      </div>
    </div>
  );
}

interface TopBarProps {
  wealth: number;
  fear: number;
  heat: number;
  loyalty: number;
}

export function TopBar({ wealth, fear, heat, loyalty }: TopBarProps) {
  return (
    <div className="topbar">
      <StatBar icon={CircleDollarSign} value={wealth} color="#eab308" dangerColor="#fbbf24" label="Wealth" />
      <StatBar icon={Ghost} value={fear} color="#a855f7" dangerColor="#e879f9" label="Fear" />
      <StatBar icon={ShieldAlert} value={heat} color="#ef4444" dangerColor="#f87171" label="Heat" />
      <StatBar icon={Users} value={loyalty} color="#3b82f6" dangerColor="#60a5fa" label="Loyalty" />
    </div>
  );
}
