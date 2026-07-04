"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  accent?: "cyan" | "orange" | "green" | "blue";
  delay?: number;
}

const accentMap = {
  cyan: { icon: "text-cyan-glow", bg: "bg-cyan-glow/10", ring: "ring-cyan-glow/25" },
  orange: { icon: "text-orange-signal", bg: "bg-orange-signal/10", ring: "ring-orange-signal/25" },
  green: { icon: "text-green-signal", bg: "bg-green-signal/10", ring: "ring-green-signal/25" },
  blue: { icon: "text-blue-signal", bg: "bg-blue-signal/10", ring: "ring-blue-signal/25" },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  delta,
  accent = "cyan",
  delay = 0,
}: StatCardProps) {
  const a = accentMap[accent];
  return (
    <GlassCard hud glow={accent} delay={delay} className="p-5">
      <div className="flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${a.ring} ${a.bg}`}>
          <Icon className={`h-5 w-5 ${a.icon}`} strokeWidth={1.75} />
        </span>
        {delta && (
          <span className="telemetry text-[11px] text-slate-500">{delta}</span>
        )}
      </div>
      <div className="mt-4">
        <motion.div
          key={value}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="flex items-baseline gap-1"
        >
          <span className="font-display text-3xl font-bold text-white">{value}</span>
          {unit && <span className="text-sm text-slate-400">{unit}</span>}
        </motion.div>
        <div className="mt-1 text-xs text-slate-500">{label}</div>
      </div>
    </GlassCard>
  );
}
