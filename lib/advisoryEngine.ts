import { ClimateAdvisory, CurrentWeather, StateClimateProfile } from "./types";

/**
 * Generates AI-style climate advisories by combining live weather telemetry
 * with a state's baseline risk profile. In production this would call an
 * LLM/ML inference endpoint; the deterministic rules here give the demo
 * meaningful, explainable output without a backend dependency.
 */
export function generateAdvisories(
  state: StateClimateProfile,
  current: CurrentWeather
): ClimateAdvisory[] {
  const advisories: ClimateAdvisory[] = [];

  if (current.temperatureC >= 42) {
    advisories.push({
      id: "heat-critical",
      severity: "severe",
      category: "heatwave",
      title: "Extreme heat threshold breached",
      message: `Surface temperature in ${state.name} has crossed 42°C. Advise limiting outdoor exposure between 11:00–16:00 IST, activating cooling shelters, and issuing a public heat alert.`,
    });
  } else if (current.temperatureC >= 38) {
    advisories.push({
      id: "heat-elevated",
      severity: "high",
      category: "heatwave",
      title: "Elevated heat stress detected",
      message: `Ambient temperature is tracking ${current.temperatureC.toFixed(
        1
      )}°C, ${(current.temperatureC - state.baselineTempC).toFixed(
        1
      )}° above the regional baseline. Vulnerable groups should stay hydrated and avoid peak-sun hours.`,
    });
  }

  if (current.precipitationMm >= 15) {
    advisories.push({
      id: "flood-watch",
      severity: current.precipitationMm >= 40 ? "severe" : "high",
      category: "flood",
      title: "Heavy precipitation — flood watch",
      message: `${current.precipitationMm.toFixed(
        1
      )}mm of precipitation recorded in the last observation window. Low-lying districts near ${state.capital} should monitor drainage and river-gauge levels closely.`,
    });
  }

  if (current.humidity < 25 && current.precipitationMm === 0) {
    advisories.push({
      id: "drought-signal",
      severity: state.droughtRisk === "high" ? "high" : "moderate",
      category: "drought",
      title: "Soil-moisture deficit signal",
      message: `Humidity has fallen to ${current.humidity}% with zero recorded precipitation. Combined with ${state.name}'s baseline drought exposure, agricultural irrigation scheduling should be reviewed.`,
    });
  }

  if (current.windSpeedKmh >= 35) {
    advisories.push({
      id: "wind-advisory",
      severity: "moderate",
      category: "general",
      title: "High wind speeds observed",
      message: `Wind speed is at ${current.windSpeedKmh.toFixed(
        0
      )} km/h. Coastal and open-terrain infrastructure should be inspected for loose fixtures.`,
    });
  }

  if (advisories.length === 0) {
    advisories.push({
      id: "nominal",
      severity: "low",
      category: "general",
      title: "Conditions within normal parameters",
      message: `All monitored indicators for ${state.name} are tracking within expected seasonal baselines. No corrective action required at this time.`,
    });
  }

  return advisories;
}

export function severityColor(severity: ClimateAdvisory["severity"]): {
  text: string;
  bg: string;
  ring: string;
} {
  switch (severity) {
    case "severe":
      return { text: "text-red-alert", bg: "bg-red-alert/10", ring: "ring-red-alert/40" };
    case "high":
      return { text: "text-orange-signal", bg: "bg-orange-signal/10", ring: "ring-orange-signal/40" };
    case "moderate":
      return { text: "text-cyan-glow", bg: "bg-cyan-glow/10", ring: "ring-cyan-glow/40" };
    case "low":
    default:
      return { text: "text-green-signal", bg: "bg-green-signal/10", ring: "ring-green-signal/40" };
  }
}
