"use client";

import { LucideIcon } from "lucide-react";
import GlassCard from "./GlassCard";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "cyan" | "orange" | "green" | "blue";
  delay?: number;
}

const accentMap = {
  cyan: { icon: "text-cyan-glow", ring: "ring-cyan-glow/30", bg: "bg-cyan-glow/10" },
  orange: { icon: "text-orange-signal", ring: "ring-orange-signal/30", bg: "bg-orange-signal/10" },
  green: { icon: "text-green-signal", ring: "ring-green-signal/30", bg: "bg-green-signal/10" },
  blue: { icon: "text-blue-signal", ring: "ring-blue-signal/30", bg: "bg-blue-signal/10" },
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "cyan",
  delay = 0,
}: FeatureCardProps) {
  const a = accentMap[accent];
  return (
    <GlassCard hud glow={accent} delay={delay} className="p-6 sm:p-7">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${a.ring} ${a.bg}`}>
        <Icon className={`h-5 w-5 ${a.icon}`} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </GlassCard>
  );
}
