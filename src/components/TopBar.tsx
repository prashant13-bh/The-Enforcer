"use client";

import { CircleDollarSign, Ghost, ShieldAlert, Users } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: number;
  color: string;
}

function StatBar({ icon: Icon, value, color }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-full relative">
      <div className="flex items-center justify-center p-2 rounded-full bg-brand-dark shadow-md z-10 border border-brand-gray">
        <Icon size={20} className={color} />
      </div>
      <div className="w-full h-2 bg-brand-gray rounded-full overflow-hidden mt-2 relative">
        <div
          className={`h-full transition-all duration-300 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-400 mt-1">{value}%</span>
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
    <div className="w-full px-4 pt-6 pb-2 flex items-center justify-between gap-4 bg-gradient-to-b from-black to-transparent fixed top-0 left-0 z-50">
      <StatBar icon={CircleDollarSign} value={wealth} color="text-yellow-500" />
      <StatBar icon={Ghost} value={fear} color="text-purple-500" />
      <StatBar icon={ShieldAlert} value={heat} color="text-brand-red" />
      <StatBar icon={Users} value={loyalty} color="text-blue-500" />
    </div>
  );
}
