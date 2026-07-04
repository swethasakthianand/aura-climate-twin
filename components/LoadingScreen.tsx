"use client";

import { motion } from "framer-motion";
import { Satellite } from "lucide-react";

export default function LoadingScreen({ label = "Establishing telemetry link…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <motion.div
          className="absolute h-full w-full rounded-full border-2 border-cyan-glow/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ borderTopColor: "#22D3EE" }}
        />
        <motion.div
          className="absolute h-12 w-12 rounded-full border-2 border-green-signal/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ borderTopColor: "#34D399" }}
        />
        <Satellite className="h-6 w-6 text-cyan-glow" />
      </div>
      <div className="telemetry text-xs tracking-widest text-slate-400">
        {label.toUpperCase()}
      </div>
    </div>
  );
}
