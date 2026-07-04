"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Flame, Waves, Sprout, Wind, Info } from "lucide-react";
import GlassCard from "./GlassCard";
import { ClimateAdvisory } from "@/lib/types";
import { severityColor } from "@/lib/advisoryEngine";

const CATEGORY_ICON = {
  heatwave: Flame,
  flood: Waves,
  drought: Sprout,
  "air-quality": Wind,
  general: Info,
};

export default function AIAdvisoryPanel({
  advisories,
  stateName,
}: {
  advisories: ClimateAdvisory[];
  stateName: string;
}) {
  return (
    <GlassCard hud glow="green" className="p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-signal/10 ring-1 ring-green-signal/25">
          <BrainCircuit className="h-4.5 w-4.5 text-green-signal" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
            AI Climate Advisory
          </h3>
          <p className="text-[11px] text-slate-500">Generated for {stateName}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {advisories.map((adv, i) => {
          const Icon = CATEGORY_ICON[adv.category];
          const c = severityColor(adv.severity);
          return (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border border-white/5 p-4 ring-1 ${c.ring} ${c.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${c.text}`} strokeWidth={1.75} />
                <div>
                  <h4 className="text-sm font-semibold text-white">{adv.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {adv.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
