"use client";

import { Flame, Waves, Sprout } from "lucide-react";
import { RiskLevel } from "@/lib/types";
import RiskBadge from "./RiskBadge";
import GlassCard from "./GlassCard";
import { riskWeight } from "@/lib/stateData";

interface RiskIndicatorPanelProps {
  heatwave: RiskLevel;
  flood: RiskLevel;
  drought: RiskLevel;
}

const ROWS = (props: RiskIndicatorPanelProps) => [
  { icon: Flame, label: "Heatwave Risk", level: props.heatwave, color: "#FB923C" },
  { icon: Waves, label: "Flood Risk", level: props.flood, color: "#22D3EE" },
  { icon: Sprout, label: "Drought Risk", level: props.drought, color: "#34D399" },
];

export default function RiskIndicatorPanel(props: RiskIndicatorPanelProps) {
  return (
    <GlassCard hud glow="orange" className="p-6">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
        Risk Indicators
      </h3>
      <div className="mt-5 space-y-5">
        {ROWS(props).map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <row.icon className="h-4 w-4" style={{ color: row.color }} strokeWidth={1.75} />
                <span className="text-sm text-slate-300">{row.label}</span>
              </div>
              <RiskBadge level={row.level} />
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(riskWeight(row.level) / 4) * 100}%`,
                  backgroundColor: row.color,
                  boxShadow: `0 0 8px ${row.color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
