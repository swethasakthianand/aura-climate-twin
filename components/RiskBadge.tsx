import clsx from "clsx";
import { RiskLevel } from "@/lib/types";

const CONFIG: Record<RiskLevel, { label: string; text: string; bg: string; dot: string }> = {
  low: { label: "LOW", text: "text-green-signal", bg: "bg-green-signal/10 ring-green-signal/30", dot: "bg-green-signal" },
  moderate: { label: "MODERATE", text: "text-cyan-glow", bg: "bg-cyan-glow/10 ring-cyan-glow/30", dot: "bg-cyan-glow" },
  high: { label: "HIGH", text: "text-orange-signal", bg: "bg-orange-signal/10 ring-orange-signal/30", dot: "bg-orange-signal" },
  severe: { label: "SEVERE", text: "text-red-alert", bg: "bg-red-alert/10 ring-red-alert/30", dot: "bg-red-alert" },
};

export default function RiskBadge({ level, size = "sm" }: { level: RiskLevel; size?: "sm" | "md" }) {
  const c = CONFIG[level];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full ring-1 font-mono tracking-wide",
        c.text,
        c.bg,
        size === "sm" ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full animate-pulse", c.dot)} />
      {c.label}
    </span>
  );
}
