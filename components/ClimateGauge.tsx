"use client";

import { motion } from "framer-motion";

interface ClimateGaugeProps {
  score: number; // 0-100
  size?: number;
}

function scoreColor(score: number) {
  if (score >= 70) return "#34D399";
  if (score >= 50) return "#22D3EE";
  if (score >= 35) return "#FB923C";
  return "#F43F5E";
}

function scoreLabel(score: number) {
  if (score >= 70) return "STABLE";
  if (score >= 50) return "WATCH";
  if (score >= 35) return "STRESSED";
  return "CRITICAL";
}

export default function ClimateGauge({ score, size = 200 }: ClimateGaugeProps) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,197,255,0.08)"
          strokeWidth={12}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-4xl font-bold text-white"
        >
          {score}
        </motion.span>
        <span className="text-xs text-slate-500">/ 100</span>
        <span
          className="mt-2 telemetry text-[11px] font-semibold tracking-widest"
          style={{ color }}
        >
          {scoreLabel(score)}
        </span>
      </div>
    </div>
  );
}
