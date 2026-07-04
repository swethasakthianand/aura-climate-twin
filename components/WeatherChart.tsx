"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts";
import GlassCard from "./GlassCard";
import { DailyForecastPoint } from "@/lib/types";

function formatDay(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short" });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-cyan-glow/20 bg-void-panel/95 px-3 py-2 text-xs shadow-panel backdrop-blur-md">
      <div className="mb-1 telemetry text-slate-400">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2" style={{ color: p.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}: {p.value}{p.unit}
        </div>
      ))}
    </div>
  );
}

export function TemperatureChart({ data }: { data: DailyForecastPoint[] }) {
  const chartData = data.map((d) => ({
    day: formatDay(d.date),
    Max: Math.round(d.maxTempC),
    Min: Math.round(d.minTempC),
  }));

  return (
    <GlassCard hud glow="cyan" className="p-6">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
        7-Day Temperature Forecast
      </h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="maxTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB923C" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FB923C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="minTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,197,255,0.08)" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} unit="°" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Max" stroke="#FB923C" fill="url(#maxTemp)" strokeWidth={2} unit="°C" />
            <Area type="monotone" dataKey="Min" stroke="#22D3EE" fill="url(#minTemp)" strokeWidth={2} unit="°C" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export function RainfallChart({ data }: { data: DailyForecastPoint[] }) {
  const chartData = data.map((d) => ({
    day: formatDay(d.date),
    Rainfall: Math.round(d.precipitationMm * 10) / 10,
  }));

  return (
    <GlassCard hud glow="blue" className="p-6">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
        7-Day Rainfall Outlook
      </h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,197,255,0.08)" vertical={false} />
            <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} unit="mm" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Rainfall" fill="#3B82F6" radius={[6, 6, 0, 0]} unit="mm" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
