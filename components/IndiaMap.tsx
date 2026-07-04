"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_PROFILES, riskWeight } from "@/lib/stateData";
import { StateClimateProfile, RiskLevel } from "@/lib/types";

export type RiskLayer = "heatwave" | "flood" | "drought" | "score";

const LAYER_KEY: Record<RiskLayer, keyof StateClimateProfile> = {
  heatwave: "heatwaveRisk",
  flood: "floodRisk",
  drought: "droughtRisk",
  score: "climateScore",
};

function colorForRisk(level: RiskLevel): string {
  switch (level) {
    case "low":
      return "#34D399";
    case "moderate":
      return "#22D3EE";
    case "high":
      return "#FB923C";
    case "severe":
      return "#F43F5E";
  }
}

function colorForScore(score: number): string {
  if (score >= 65) return "#34D399";
  if (score >= 50) return "#22D3EE";
  if (score >= 40) return "#FB923C";
  return "#F43F5E";
}

function markerColor(state: StateClimateProfile, layer: RiskLayer): string {
  if (layer === "score") return colorForScore(state.climateScore);
  return colorForRisk(state[LAYER_KEY[layer]] as RiskLevel);
}

function markerRadius(state: StateClimateProfile, layer: RiskLayer): number {
  if (layer === "score") return 8 + (100 - state.climateScore) / 12;
  return 6 + riskWeight(state[LAYER_KEY[layer]] as RiskLevel) * 2.2;
}

// Simplified, stylised India outline for HUD-style rendering (viewBox 0 0 1000 1100)
const INDIA_OUTLINE =
  "M430 40 L520 55 L560 95 L610 110 L680 160 L720 190 L760 230 L790 260 L800 300 L770 330 L780 370 L750 410 L760 450 L730 480 L740 520 L710 560 L720 610 L690 650 L695 700 L660 740 L650 790 L610 830 L600 880 L560 910 L540 960 L500 1000 L480 1040 L450 990 L440 940 L400 900 L390 850 L350 820 L330 770 L290 740 L280 690 L250 650 L260 600 L230 560 L240 510 L210 470 L225 420 L200 380 L220 340 L210 300 L240 260 L235 220 L270 190 L270 150 L310 120 L320 80 L370 60 Z";

interface IndiaMapProps {
  activeLayer: RiskLayer;
  selected: StateClimateProfile;
  onSelect: (state: StateClimateProfile) => void;
}

export default function IndiaMap({ activeLayer, selected, onSelect }: IndiaMapProps) {
  const [hovered, setHovered] = useState<StateClimateProfile | null>(null);
  const active = hovered ?? selected;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 1000 1100"
        className="h-full w-full"
        role="img"
        aria-label="Interactive climate risk map of India"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#0B1524" stopOpacity="0" />
            <stop offset="100%" stopColor="#05080F" stopOpacity="0.4" />
          </radialGradient>
          <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outline */}
        <motion.path
          d={INDIA_OUTLINE}
          fill="rgba(34,211,238,0.03)"
          stroke="rgba(148,197,255,0.35)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <path d={INDIA_OUTLINE} fill="url(#mapGlow)" stroke="none" />

        {/* State markers */}
        {STATE_PROFILES.map((s) => {
          const color = markerColor(s, activeLayer);
          const r = markerRadius(s, activeLayer);
          const isActive = active.id === s.id;
          return (
            <g
              key={s.id}
              transform={`translate(${s.x}, ${s.y})`}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(s)}
              className="cursor-pointer"
            >
              {isActive && (
                <circle r={r + 10} fill="none" stroke={color} strokeWidth={1.5} className="animate-pulseRing" />
              )}
              <circle
                r={r}
                fill={color}
                fillOpacity={isActive ? 0.9 : 0.55}
                filter="url(#markerGlow)"
                stroke={isActive ? "#fff" : "none"}
                strokeWidth={isActive ? 1.5 : 0}
              />
              <text
                y={r + 16}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fontSize="13"
                fill={isActive ? "#E6EDF7" : "#94A3B8"}
                fontFamily="var(--font-inter)"
              >
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="glass-panel pointer-events-none absolute left-4 top-4 w-64 p-4 shadow-panel"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-semibold text-white">{hovered.name}</h4>
              <span className="telemetry text-[10px] text-slate-500">{hovered.capital}</span>
            </div>
            <div className="mt-3 space-y-1.5 text-xs">
              <Row label="Climate Score" value={`${hovered.climateScore}/100`} />
              <Row label="Baseline Temp" value={`${hovered.baselineTempC}°C`} />
              <Row label="Baseline Rainfall" value={`${hovered.baselineRainfallMm}mm`} />
              <Row label="Heatwave" value={hovered.heatwaveRisk} color={colorForRisk(hovered.heatwaveRisk)} />
              <Row label="Flood" value={hovered.floodRisk} color={colorForRisk(hovered.floodRisk)} />
              <Row label="Drought" value={hovered.droughtRisk} color={colorForRisk(hovered.droughtRisk)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium" style={{ color: color ?? "#E6EDF7", textTransform: color ? "uppercase" : "none" }}>
        {value}
      </span>
    </div>
  );
}
