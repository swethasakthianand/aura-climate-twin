import { ClimateAdvisory, CurrentWeather, DailyForecastPoint, StateClimateProfile } from "./types";

/**
 * Builds a self-contained, print-ready HTML climate briefing and opens it in
 * a new tab so the user can save/print it as a PDF. Kept dependency-free so
 * it works without a server-side PDF renderer.
 */
export function downloadClimateReport(
  state: StateClimateProfile,
  current: CurrentWeather,
  daily: DailyForecastPoint[],
  advisories: ClimateAdvisory[],
  climateScore: number
) {
  const generatedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const rows = daily
    .map(
      (d) => `
      <tr>
        <td>${new Date(d.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</td>
        <td>${d.maxTempC.toFixed(1)}°C</td>
        <td>${d.minTempC.toFixed(1)}°C</td>
        <td>${d.precipitationMm.toFixed(1)} mm</td>
        <td>${Math.round(d.humidity)}%</td>
      </tr>`
    )
    .join("");

  const advisoryHtml = advisories
    .map(
      (a) => `
      <div class="advisory ${a.severity}">
        <div class="advisory-title">${a.title} <span class="tag">${a.severity.toUpperCase()}</span></div>
        <p>${a.message}</p>
      </div>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>AURA Climate Briefing — ${state.name}</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 48px;
    background: #ffffff;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid #0891b2;
    padding-bottom: 20px;
    margin-bottom: 28px;
  }
  .brand { font-size: 26px; font-weight: 800; color: #0891b2; letter-spacing: 0.02em; }
  .brand span { color: #0f172a; }
  .meta { text-align: right; font-size: 12px; color: #64748b; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #0891b2; margin: 32px 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
  .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 16px; }
  .metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; text-align: center; }
  .metric .value { font-size: 22px; font-weight: 800; color: #0f172a; }
  .metric .label { font-size: 11px; color: #64748b; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
  th { color: #64748b; font-weight: 600; font-size: 11px; text-transform: uppercase; }
  .advisory { border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; border: 1px solid #e2e8f0; }
  .advisory.severe { background: #fef2f2; border-color: #fecaca; }
  .advisory.high { background: #fff7ed; border-color: #fed7aa; }
  .advisory.moderate { background: #ecfeff; border-color: #a5f3fc; }
  .advisory.low { background: #ecfdf5; border-color: #a7f3d0; }
  .advisory-title { font-weight: 700; font-size: 13px; display: flex; justify-content: space-between; }
  .tag { font-size: 10px; letter-spacing: 0.05em; color: #64748b; }
  .advisory p { margin: 6px 0 0; font-size: 12.5px; color: #334155; line-height: 1.5; }
  footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; }
  @media print { body { padding: 24px; } }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">AURA<span>.</span></div>
      <div style="font-size:11px;color:#64748b;margin-top:2px;">India's AI Climate Digital Twin</div>
    </div>
    <div class="meta">
      Generated ${generatedAt}<br/>
      Report ID: AURA-${state.id.toUpperCase()}-${Date.now().toString().slice(-6)}
    </div>
  </div>

  <h1>Climate Briefing — ${state.name}</h1>
  <div style="font-size:13px;color:#64748b;">Capital: ${state.capital} · Coordinates: ${state.lat.toFixed(2)}°N, ${state.lon.toFixed(2)}°E</div>

  <h2>Current Conditions Summary</h2>
  <div class="summary-grid">
    <div class="metric"><div class="value">${current.temperatureC.toFixed(1)}°C</div><div class="label">Temperature</div></div>
    <div class="metric"><div class="value">${current.humidity}%</div><div class="label">Humidity</div></div>
    <div class="metric"><div class="value">${current.precipitationMm.toFixed(1)}mm</div><div class="label">Precipitation</div></div>
    <div class="metric"><div class="value">${climateScore}/100</div><div class="label">Climate Score</div></div>
  </div>

  <h2>AI-Generated Climate Advisory</h2>
  ${advisoryHtml}

  <h2>7-Day Forecast Outlook</h2>
  <table>
    <thead><tr><th>Day</th><th>Max Temp</th><th>Min Temp</th><th>Precipitation</th><th>Humidity</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <footer>
    <span>AURA Climate Intelligence Platform</span>
    <span>Weather data sourced from Open-Meteo · This report is auto-generated and advisory in nature.</span>
  </footer>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      setTimeout(() => win.print(), 400);
    };
  } else {
    // Popup blocked — fall back to direct download.
    const a = document.createElement("a");
    a.href = url;
    a.download = `AURA-Climate-Report-${state.name.replace(/\s+/g, "-")}.html`;
    a.click();
  }
}
