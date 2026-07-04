"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start gap-3 rounded-xl border border-red-alert/30 bg-red-alert/10 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-alert" />
        <div>
          <p className="text-sm font-medium text-white">Telemetry link interrupted</p>
          <p className="mt-0.5 text-xs text-slate-400">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-full border border-red-alert/40 px-3 py-1.5 text-xs font-medium text-red-alert transition-colors hover:bg-red-alert/10"
        >
          <RotateCw className="h-3.5 w-3.5" />
          Retry connection
        </button>
      )}
    </motion.div>
  );
}
