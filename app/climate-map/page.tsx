"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Waves, Sprout, Gauge, MapPin, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import IndiaMap, { RiskLayer } from "@/components/IndiaMap";
import GlassCard from "@/components/GlassCard";
import RiskBadge from "@/components/RiskBadge";
import { STATE_PROFILES, NATIONAL_STATS } from "@/lib/stateData";
import { StateClimateProfile } from "@/lib/types";
import Link from "next/link";

const LAYERS: { id: RiskLayer; label: string; icon: typeof Flame; color: string }[] = [
  { id: "score", label: "Climate Score", icon: Gauge, color: "#22D3EE" },
  { id: "heatwave", label: "Heatwave", icon: Flame, color: "#FB923C" },
  { id: "flood", label: "Flood", icon: Waves, color: "#3B82F6" },
  { id: "drought", label: "Drought", icon: Sprout, color: "#34D399" },
];

export default function ClimateMapPage() {
  const [layer, setLayer] = useState<RiskLayer>("score");
  const [selected, setSelected] = useState<StateClimateProfile>(STATE_PROFILES[10]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-void">
      <Navbar active="/climate-map" />

      {/* Full-screen map */}
      <div className="absolute inset-0 pt-20">
        <IndiaMap activeLayer={layer} selected={selected} onSelect={setSelected} />
      </div>

      {/* Layer toggle - top center */}
      <div className="absolute left-1/2 top-24 z-20 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-void-line bg-void-panel/80 p-1.5 backdrop-blur-xl">
          {LAYERS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLayer(l.id)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                layer === l.id ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              }`}
              style={layer === l.id ? { boxShadow: `0 0 0 1px ${l.color}55, 0 0 16px ${l.color}33` } : {}}
            >
              <l.icon className="h-3.5 w-3.5" style={{ color: l.color }} />
              <span className="hidden sm:inline">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating national stats - top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-6 top-28 z-10 hidden w-56 space-y-3 lg:block"
      >
        <GlassCard hud glow="cyan" className="p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-glow" />
            <span className="text-xs text-slate-400">States Monitored</span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-white">
            {NATIONAL_STATS.statesMonitored}
          </div>
        </GlassCard>
        <GlassCard hud glow="orange" className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-signal" />
            <span className="text-xs text-slate-400">Elevated-Risk States</span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-white">
            {NATIONAL_STATS.highRiskStates}
          </div>
        </GlassCard>
      </motion.div>

      {/* Selected state detail panel - bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-6 right-6 z-10 w-full max-w-sm px-6 sm:px-0"
      >
        <GlassCard hud glow="green" className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-white">{selected.name}</h3>
              <p className="text-xs text-slate-500">{selected.capital}</p>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-bold text-cyan-glow">
                {selected.climateScore}
              </div>
              <div className="text-[10px] text-slate-500">CLIMATE SCORE</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/5 p-2 text-center">
              <Flame className="mx-auto h-3.5 w-3.5 text-orange-signal" />
              <div className="mt-1"><RiskBadge level={selected.heatwaveRisk} /></div>
            </div>
            <div className="rounded-lg bg-white/5 p-2 text-center">
              <Waves className="mx-auto h-3.5 w-3.5 text-blue-signal" />
              <div className="mt-1"><RiskBadge level={selected.floodRisk} /></div>
            </div>
            <div className="rounded-lg bg-white/5 p-2 text-center">
              <Sprout className="mx-auto h-3.5 w-3.5 text-green-signal" />
              <div className="mt-1"><RiskBadge level={selected.droughtRisk} /></div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-glow to-blue-signal px-4 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-105"
          >
            Open in Dashboard
          </Link>
        </GlassCard>
      </motion.div>

      {/* Legend - bottom left */}
      <div className="absolute bottom-6 left-6 z-10 hidden telemetry text-[10px] text-slate-500 lg:block">
        DIGITAL TWIN v2.4 · RENDER: STYLISED PROJECTION · {STATE_PROFILES.length} NODES ACTIVE
      </div>
    </main>
  );
}
