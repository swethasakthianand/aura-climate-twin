"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Satellite } from "lucide-react";
import clsx from "clsx";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/climate-map", label: "Climate Map" },
];

export default function Navbar({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-void/80 backdrop-blur-xl border-b border-void-line" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-void-raised ring-1 ring-cyan-glow/40">
            <Satellite className="h-5 w-5 text-cyan-glow" strokeWidth={1.75} />
            <span className="absolute inset-0 rounded-lg scan-ring opacity-60" style={{ WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 56%)", maskImage: "radial-gradient(circle, transparent 55%, black 56%)" }} />
          </div>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            AURA<span className="text-cyan-glow">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-void-line bg-void-panel/60 p-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === link.href
                  ? "bg-cyan-glow/15 text-cyan-glow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="hidden rounded-full bg-gradient-to-r from-cyan-glow to-blue-signal px-5 py-2.5 text-sm font-semibold text-void shadow-glow-cyan transition-transform hover:scale-105 md:inline-block"
        >
          Launch Console
        </Link>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-void-line bg-void/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    active === link.href
                      ? "bg-cyan-glow/10 text-cyan-glow"
                      : "text-slate-300"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-cyan-glow to-blue-signal px-4 py-3 text-center text-sm font-semibold text-void"
              >
                Launch Console
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
