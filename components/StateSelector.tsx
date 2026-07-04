"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_PROFILES } from "@/lib/stateData";
import { StateClimateProfile } from "@/lib/types";

export default function StateSelector({
  value,
  onChange,
}: {
  value: StateClimateProfile;
  onChange: (state: StateClimateProfile) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = STATE_PROFILES.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full border border-void-line bg-void-panel/60 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan-glow/40"
      >
        <MapPin className="h-4 w-4 text-cyan-glow" />
        {value.name}
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="glass-panel absolute right-0 z-30 mt-2 w-64 overflow-hidden p-2 shadow-panel"
          >
            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search state…"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <div className="mt-2 max-h-64 space-y-0.5 overflow-y-auto">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    s.id === value.id
                      ? "bg-cyan-glow/10 text-cyan-glow"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {s.name}
                  <span className="text-[10px] text-slate-500">{s.capital}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-center text-xs text-slate-500">No matches</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
