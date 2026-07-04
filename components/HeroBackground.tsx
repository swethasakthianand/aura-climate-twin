"use client";

import { motion } from "framer-motion";

/**
 * Signature hero visual: a stylised India outline rendered as a scanning
 * "digital twin" node-graph, orbited by telemetry rings — evokes ISRO
 * mission-control tracking displays rather than a generic gradient blob.
 */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-aura-radial" />

      {/* Orbiting rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[420, 560, 700].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-cyan-glow/10"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute h-2 w-2 rounded-full bg-cyan-glow shadow-glow-cyan"
              style={{ left: -4, top: size / 2 - 4 }}
            />
          </motion.div>
        ))}
      </div>

      {/* India outline made of scanning nodes */}
      <svg
        viewBox="0 0 400 460"
        className="absolute left-1/2 top-1/2 h-[85vh] max-h-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
        fill="none"
      >
        <defs>
          <linearGradient id="indiaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          d="M180 20 L230 15 L245 45 L280 55 L310 90 L300 120 L330 150 L340 190 L320 230 L330 270 L300 300 L310 340 L280 380 L260 400 L250 440 L220 420 L210 380 L180 360 L170 320 L140 300 L130 260 L110 220 L120 180 L100 150 L120 110 L150 90 L140 55 L170 40 Z"
          stroke="url(#indiaGrad)"
          strokeWidth="1.4"
          fill="rgba(34,211,238,0.02)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        {/* scanning nodes at approx state locations */}
        {[
          [190, 90], [150, 130], [230, 130], [200, 180], [160, 220],
          [240, 240], [190, 280], [220, 330], [180, 370], [270, 200],
          [130, 190], [260, 300],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="#22D3EE"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>

      {/* horizontal scan line sweep */}
      <motion.div
        className="absolute inset-x-0 h-32 bg-gradient-to-b from-cyan-glow/0 via-cyan-glow/[0.06] to-cyan-glow/0"
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-grid-fade" />
    </div>
  );
}
