# AURA — India's AI Climate Digital Twin

A premium, enterprise-grade climate intelligence platform built as a mission-control
style dashboard: live weather telemetry, AI-generated climate advisories, risk
indexing, and an interactive digital-twin map of India.

## Tech stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — custom design tokens for the glass/HUD visual system
- **Framer Motion** — page, card, and micro-interaction animation
- **Recharts** — temperature & rainfall analytics
- **Lucide React** — iconography
- **Open-Meteo API** — free, key-less live weather data source

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

No environment variables or API keys are required — Open-Meteo is queried
directly from the client.

## Project structure

```
app/
  page.tsx                 Landing page (hero, features, stats, CTA)
  dashboard/page.tsx        Live monitoring dashboard
  climate-map/page.tsx      Full-screen interactive India risk map
  layout.tsx                Root layout, fonts, metadata
  globals.css                Design system: glassmorphism, HUD frames, tokens

components/                 Reusable, typed React components
lib/
  types.ts                  Shared TypeScript types
  stateData.ts               Static baseline climate profile per state
  openMeteo.ts                Live weather API client + error handling
  advisoryEngine.ts          Rule-based AI advisory generator
  reportGenerator.ts          Client-side professional PDF/HTML report export
```

## Design system

- **Palette:** deep space void (`#05080F`) base, cyan (`#22D3EE`), blue (`#3B82F6`),
  green (`#34D399`), and orange (`#FB923C`) signal accents, with a reserved
  red (`#F43F5E`) for severe/critical states only.
- **Typography:** Poppins (display), Inter (UI/body), JetBrains Mono (all live
  telemetry readouts — temperatures, timestamps, coordinates).
- **Signature element:** the "HUD frame" — corner-bracket targeting reticles on
  every glass panel, echoing mission-control tracking displays rather than a
  generic rounded card.

## Notes for production hardening

- Swap `advisoryEngine.ts`'s rule-based generator for a real LLM/ML inference
  call once a backend is available; the current interface (`generateAdvisories`)
  is a drop-in seam for that.
- `stateData.ts` baselines are illustrative; wire to a verified climate dataset
  (IMD/ISRO-NRSC) for production use.
- The India outline in `IndiaMap.tsx` and `HeroBackground.tsx` is a stylised
  projection, not survey-accurate GIS geometry — swap in a proper TopoJSON/GeoJSON
  India layer if geographic precision is required.
