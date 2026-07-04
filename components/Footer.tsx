import Link from "next/link";
import { Satellite, Github, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-void-line bg-void-panel/40">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-void-raised ring-1 ring-cyan-glow/40">
                <Satellite className="h-4.5 w-4.5 text-cyan-glow" strokeWidth={1.75} />
              </div>
              <span className="font-display text-base font-bold text-white">AURA</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              India&apos;s AI Climate Digital Twin — fusing live atmospheric telemetry,
              satellite-derived risk models, and generative advisories into a single
              mission-control view of the nation&apos;s climate.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-green-signal" />
              Built for the ISRO / NASA-class climate resilience hackathon track
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/dashboard" className="hover:text-cyan-glow transition-colors">Dashboard</Link></li>
              <li><Link href="/climate-map" className="hover:text-cyan-glow transition-colors">Climate Map</Link></li>
              <li><Link href="/" className="hover:text-cyan-glow transition-colors">Digital Twin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Data & Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> ops@aura-climate.in</li>
              <li className="flex items-center gap-2"><Github className="h-3.5 w-3.5" /> github.com/aura-climate</li>
              <li>Weather data: Open-Meteo</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-void-line pt-6 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} AURA Climate Intelligence. All systems nominal.</span>
          <span className="telemetry">BUILD 2026.07.04 · REGION: IN-SOUTH</span>
        </div>
      </div>
    </footer>
  );
}
