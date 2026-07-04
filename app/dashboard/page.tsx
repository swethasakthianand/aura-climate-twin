"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  FileDown,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import ClimateGauge from "@/components/ClimateGauge";
import RiskIndicatorPanel from "@/components/RiskIndicatorPanel";
import AIAdvisoryPanel from "@/components/AIAdvisoryPanel";
import { TemperatureChart, RainfallChart } from "@/components/WeatherChart";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorBanner from "@/components/ErrorBanner";
import StateSelector from "@/components/StateSelector";
import GlassCard from "@/components/GlassCard";
import { fetchWeather, weatherCodeLabel, WeatherFetchError } from "@/lib/openMeteo";
import { generateAdvisories } from "@/lib/advisoryEngine";
import { downloadClimateReport } from "@/lib/reportGenerator";
import { STATE_PROFILES } from "@/lib/stateData";
import { CurrentWeather, DailyForecastPoint, StateClimateProfile } from "@/lib/types";

function computeLiveScore(state: StateClimateProfile, current: CurrentWeather): number {
  let score = state.climateScore;
  const heatDelta = current.temperatureC - state.baselineTempC;
  score -= Math.max(0, heatDelta) * 1.4;
  if (current.precipitationMm > 30) score -= 8;
  if (current.humidity < 20) score -= 6;
  return Math.max(5, Math.min(95, Math.round(score)));
}

export default function DashboardPage() {
  const [state, setState] = useState<StateClimateProfile>(STATE_PROFILES[10]); // Karnataka default
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyForecastPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (s: StateClimateProfile) => {
    setLoading(true);
    setError(null);
    try {
      const { current, daily } = await fetchWeather(s.lat, s.lon);
      setCurrent(current);
      setDaily(daily);
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        err instanceof WeatherFetchError
          ? err.message
          : "Unexpected error while retrieving live telemetry."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  const liveScore = current ? computeLiveScore(state, current) : state.climateScore;
  const advisories = current ? generateAdvisories(state, current) : [];

  return (
    <main className="min-h-screen bg-void pb-20">
      <Navbar active="/dashboard" />

      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="telemetry text-xs text-cyan-glow">MISSION CONTROL</span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Climate Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {lastUpdated
                ? `Last sync ${lastUpdated.toLocaleTimeString("en-IN")}`
                : "Synchronising…"}{" "}
              · {state.name}, {state.capital}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StateSelector value={state} onChange={setState} />
            <button
              onClick={() => load(state)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-void-line bg-void-panel/60 text-slate-300 transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
              aria-label="Refresh telemetry"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6">
            <ErrorBanner message={error} onRetry={() => load(state)} />
          </div>
        )}

        {loading && !current ? (
          <LoadingScreen label="Acquiring live weather telemetry" />
        ) : (
          current && (
            <>
              {/* Metric cards */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard
                  icon={Thermometer}
                  label={`Feels like ${current.apparentTemperatureC.toFixed(1)}°C · ${weatherCodeLabel(current.weatherCode)}`}
                  value={current.temperatureC.toFixed(1)}
                  unit="°C"
                  accent="orange"
                  delay={0}
                />
                <StatCard
                  icon={Droplets}
                  label="Relative Humidity"
                  value={current.humidity.toString()}
                  unit="%"
                  accent="cyan"
                  delay={0.05}
                />
                <StatCard
                  icon={CloudRain}
                  label="Current Precipitation"
                  value={current.precipitationMm.toFixed(1)}
                  unit="mm"
                  accent="blue"
                  delay={0.1}
                />
                <StatCard
                  icon={Wind}
                  label="Wind Speed"
                  value={current.windSpeedKmh.toFixed(0)}
                  unit="km/h"
                  accent="green"
                  delay={0.15}
                />
              </div>

              {/* Gauge + Risk + Advisory */}
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <GlassCard hud glow="cyan" className="flex flex-col items-center justify-center p-6">
                  <h3 className="mb-4 self-start font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Climate Score
                  </h3>
                  <ClimateGauge score={liveScore} />
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Composite of temperature deviation, precipitation load, and baseline exposure for {state.name}.
                  </p>
                </GlassCard>

                <RiskIndicatorPanel
                  heatwave={state.heatwaveRisk}
                  flood={state.floodRisk}
                  drought={state.droughtRisk}
                />

                <AIAdvisoryPanel advisories={advisories} stateName={state.name} />
              </div>

              {/* Charts */}
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <TemperatureChart data={daily} />
                <RainfallChart data={daily} />
              </div>

              {/* Report generation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <GlassCard hud glow="green" className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      Generate Climate Report
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Export a professional briefing for {state.name}, ready to print or share as PDF.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      downloadClimateReport(state, current, daily, advisories, liveScore)
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-signal to-cyan-glow px-6 py-3 text-sm font-semibold text-void shadow-glow-green transition-transform hover:scale-105"
                  >
                    <FileDown className="h-4 w-4" />
                    Download Report
                  </button>
                </GlassCard>
              </motion.div>
            </>
          )
        )}
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
