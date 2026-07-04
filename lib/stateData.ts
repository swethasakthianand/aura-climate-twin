import { StateClimateProfile } from "./types";

/**
 * Baseline climate risk profile for a representative set of Indian states.
 * Coordinates (x, y) are placed on a 1000x1100 stylised India outline viewBox
 * used by <IndiaMap />. Risk classifications are illustrative baselines meant
 * to be blended with live Open-Meteo data on the client.
 */
export const STATE_PROFILES: StateClimateProfile[] = [
  { id: "rj", name: "Rajasthan", capital: "Jaipur", lat: 27.02, lon: 74.22, x: 250, y: 330, heatwaveRisk: "severe", floodRisk: "low", droughtRisk: "high", climateScore: 42, baselineTempC: 38, baselineRainfallMm: 20 },
  { id: "gj", name: "Gujarat", capital: "Gandhinagar", lat: 22.26, lon: 71.19, x: 210, y: 470, heatwaveRisk: "high", floodRisk: "moderate", droughtRisk: "high", climateScore: 48, baselineTempC: 35, baselineRainfallMm: 40 },
  { id: "mh", name: "Maharashtra", capital: "Mumbai", lat: 19.75, lon: 75.71, x: 300, y: 560, heatwaveRisk: "moderate", floodRisk: "moderate", droughtRisk: "moderate", climateScore: 58, baselineTempC: 32, baselineRainfallMm: 65 },
  { id: "mp", name: "Madhya Pradesh", capital: "Bhopal", lat: 23.47, lon: 77.95, x: 380, y: 440, heatwaveRisk: "high", floodRisk: "low", droughtRisk: "moderate", climateScore: 52, baselineTempC: 36, baselineRainfallMm: 35 },
  { id: "up", name: "Uttar Pradesh", capital: "Lucknow", lat: 26.85, lon: 80.95, x: 460, y: 330, heatwaveRisk: "severe", floodRisk: "high", droughtRisk: "moderate", climateScore: 40, baselineTempC: 39, baselineRainfallMm: 30 },
  { id: "br", name: "Bihar", capital: "Patna", lat: 25.6, lon: 85.13, x: 560, y: 340, heatwaveRisk: "high", floodRisk: "severe", droughtRisk: "low", climateScore: 39, baselineTempC: 37, baselineRainfallMm: 55 },
  { id: "wb", name: "West Bengal", capital: "Kolkata", lat: 22.57, lon: 88.36, x: 620, y: 430, heatwaveRisk: "moderate", floodRisk: "severe", droughtRisk: "low", climateScore: 46, baselineTempC: 33, baselineRainfallMm: 90 },
  { id: "or", name: "Odisha", capital: "Bhubaneswar", lat: 20.27, lon: 85.84, x: 560, y: 520, heatwaveRisk: "high", floodRisk: "severe", droughtRisk: "moderate", climateScore: 44, baselineTempC: 34, baselineRainfallMm: 80 },
  { id: "ap", name: "Andhra Pradesh", capital: "Amaravati", lat: 16.51, lon: 80.65, x: 470, y: 660, heatwaveRisk: "high", floodRisk: "moderate", droughtRisk: "moderate", climateScore: 50, baselineTempC: 34, baselineRainfallMm: 55 },
  { id: "tg", name: "Telangana", capital: "Hyderabad", lat: 17.39, lon: 78.49, x: 420, y: 610, heatwaveRisk: "high", floodRisk: "low", droughtRisk: "moderate", climateScore: 53, baselineTempC: 33, baselineRainfallMm: 45 },
  { id: "ka", name: "Karnataka", capital: "Bengaluru", lat: 12.97, lon: 77.59, x: 370, y: 730, heatwaveRisk: "low", floodRisk: "low", droughtRisk: "moderate", climateScore: 66, baselineTempC: 28, baselineRainfallMm: 60 },
  { id: "kl", name: "Kerala", capital: "Thiruvananthapuram", lat: 8.52, lon: 76.94, x: 350, y: 860, heatwaveRisk: "low", floodRisk: "high", droughtRisk: "low", climateScore: 62, baselineTempC: 29, baselineRainfallMm: 140 },
  { id: "tn", name: "Tamil Nadu", capital: "Chennai", lat: 13.08, lon: 80.27, x: 440, y: 800, heatwaveRisk: "moderate", floodRisk: "moderate", droughtRisk: "moderate", climateScore: 56, baselineTempC: 31, baselineRainfallMm: 70 },
  { id: "pb", name: "Punjab", capital: "Chandigarh", lat: 31.15, lon: 75.7, x: 330, y: 190, heatwaveRisk: "high", floodRisk: "low", droughtRisk: "moderate", climateScore: 55, baselineTempC: 35, baselineRainfallMm: 25 },
  { id: "hr", name: "Haryana", capital: "Chandigarh", lat: 29.06, lon: 76.09, x: 340, y: 240, heatwaveRisk: "severe", floodRisk: "low", droughtRisk: "moderate", climateScore: 47, baselineTempC: 38, baselineRainfallMm: 22 },
  { id: "ct", name: "Chhattisgarh", capital: "Raipur", lat: 21.28, lon: 81.63, x: 470, y: 500, heatwaveRisk: "high", floodRisk: "moderate", droughtRisk: "moderate", climateScore: 49, baselineTempC: 35, baselineRainfallMm: 60 },
  { id: "jh", name: "Jharkhand", capital: "Ranchi", lat: 23.34, lon: 85.31, x: 560, y: 400, heatwaveRisk: "moderate", floodRisk: "moderate", droughtRisk: "moderate", climateScore: 51, baselineTempC: 33, baselineRainfallMm: 55 },
  { id: "as", name: "Assam", capital: "Dispur", lat: 26.14, lon: 91.77, x: 720, y: 330, heatwaveRisk: "low", floodRisk: "severe", droughtRisk: "low", climateScore: 57, baselineTempC: 29, baselineRainfallMm: 150 },
  { id: "uk", name: "Uttarakhand", capital: "Dehradun", lat: 30.32, lon: 78.03, x: 400, y: 190, heatwaveRisk: "low", floodRisk: "high", droughtRisk: "low", climateScore: 64, baselineTempC: 24, baselineRainfallMm: 75 },
  { id: "jk", name: "Jammu & Kashmir", capital: "Srinagar", lat: 34.08, lon: 74.79, x: 300, y: 70, heatwaveRisk: "low", floodRisk: "moderate", droughtRisk: "low", climateScore: 70, baselineTempC: 15, baselineRainfallMm: 45 },
];

export function riskWeight(level: StateClimateProfile["heatwaveRisk"]): number {
  switch (level) {
    case "low":
      return 1;
    case "moderate":
      return 2;
    case "high":
      return 3;
    case "severe":
      return 4;
  }
}

export const NATIONAL_STATS = {
  statesMonitored: STATE_PROFILES.length,
  dataPointsPerDay: 2_480_000,
  avgClimateScore: Math.round(
    STATE_PROFILES.reduce((s, p) => s + p.climateScore, 0) / STATE_PROFILES.length
  ),
  highRiskStates: STATE_PROFILES.filter(
    (p) => riskWeight(p.heatwaveRisk) >= 3 || riskWeight(p.floodRisk) >= 3 || riskWeight(p.droughtRisk) >= 3
  ).length,
};
