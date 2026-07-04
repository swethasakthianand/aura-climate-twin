"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hud?: boolean;
  glow?: "cyan" | "orange" | "green" | "blue" | "none";
  as?: "div";
  delay?: number;
}

const glowMap: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  cyan: "hover:shadow-glow-cyan",
  orange: "hover:shadow-glow-orange",
  green: "hover:shadow-glow-green",
  blue: "hover:shadow-glow-blue",
  none: "",
};

export default function GlassCard({
  children,
  hud = false,
  glow = "cyan",
  className,
  delay = 0,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={clsx(
        "glass-panel shadow-panel transition-shadow duration-300",
        hud && "hud-frame",
        glowMap[glow],
        className
      )}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}
