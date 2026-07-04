"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Map,
  Gauge,
  BrainCircuit,
  CloudRain,
  ShieldAlert,
  Satellite,
  LineChart,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import FeatureCard from "@/components/FeatureCard";
import GlassCard from "@/components/GlassCard";
import { NATIONAL_STATS } from "@/lib/stateData";

const FEATURES = [
  {
    icon: Satellite,
    title: "Live Weather Telemetry",
    description:
      "Continuous ingestion of temperature, humidity, wind, and precipitation across every monitored state via Open-Meteo.",
    accent: "cyan" as const,
  },
  {
    icon: BrainCircuit,
    title: "AI Climate Advisories",
    description:
      "A rules-and-ML advisory engine converts raw telemetry into plain-language, action-ready guidance for responders.",
    accent: "green" as const,
  },
  {
    icon: ShieldAlert,
    title: "Risk Indexing",
    description:
      "Heatwave, flood, and drought exposure scored per state and rolled into a single, comparable Climate Score.",
    accent: "orange" as const,
  },
  {
    icon: Map,
    title: "Interactive Digital Twin",
    description:
      "A living map of India renders live risk overlays, so you can see conditions shift in near real time.",
    accent: "blue" as const,
  },
  {
    icon: LineChart,
    title: "Forecast Analytics",
    description:
      "Seven-day forward-looking charts for temperature, rainfall, and humidity, benchmarked against regional baselines.",
    accent: "cyan" as const,
  },
  {
    icon: CloudRain,
    title: "Downloadable Reports",
    description:
      "Generate a professional climate briefing document for any state in a single click — ready for stakeholders.",
    accent: "green" as const,
  },
];

const STATS = [
  { label: "States & UTs Monitored", value: `${NATIONAL_STATS.statesMonitored}+`, icon: Map },
  { label: "Data Points / Day", value: "2.48M", icon: Satellite },
  { label: "National Climate Score", value: `${NATIONAL_STATS.avgClimateScore}/100`, icon: Gauge },
  { label: "Elevated-Risk States", value: `${NATIONAL_STATS.highRiskStates}`, icon: ShieldAlert },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <Navbar active="/" />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
        <HeroBackground />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-void-panel/70 px-4 py-1.5 telemetry text-xs text-cyan-glow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            SYSTEM STATUS: OPERATIONAL · LIVE TELEMETRY ACTIVE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            AURA<span className="text-cyan-glow">.</span>
            <br />
            <span className="text-gradient-aura">India&apos;s AI Climate</span>
            <br />
            Digital Twin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            A mission-control-grade climate intelligence platform — fusing live
            atmospheric telemetry with AI-generated risk advisories across every
            Indian state, in one unified command view.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-glow to-blue-signal px-7 py-3.5 font-semibold text-void shadow-glow-cyan transition-transform hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/climate-map"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:border-cyan-glow/40 hover:bg-white/10"
            >
              <Map className="h-4 w-4" />
              Explore Climate Map
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="telemetry">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-8 w-[1px] bg-gradient-to-b from-cyan-glow to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="relative border-y border-void-line bg-void-panel/30 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 lg:px-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <s.icon className="mx-auto h-5 w-5 text-cyan-glow" strokeWidth={1.5} />
              <div className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="telemetry text-xs text-cyan-glow">CAPABILITIES</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            One console. Every climate signal.
          </h2>
          <p className="mt-4 text-slate-400">
            AURA brings together the sensors, models, and visualizations a climate
            operations team needs — without stitching together five different tools.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <GlassCard hud glow="cyan" className="flex flex-col items-center gap-6 px-8 py-14 text-center sm:px-16">
          <span className="telemetry text-xs text-cyan-glow">READY WHEN YOU ARE</span>
          <h3 className="max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">
            Step into mission control for India&apos;s climate.
          </h3>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-glow to-green-signal px-7 py-3.5 font-semibold text-void shadow-glow-cyan transition-transform hover:scale-105"
          >
            Enter Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </GlassCard>
      </section>

      <Footer />
    </main>
  );
}
