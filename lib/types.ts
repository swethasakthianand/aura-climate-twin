export type RiskLevel = "low" | "moderate" | "high" | "severe";

export interface StateClimateProfile {
  id: string;
  name: string;
  capital: string;
  lat: number;
  lon: number;
  /** position on the stylised India SVG map, 0-1000 viewBox units */
  x: number;
  y: number;
  heatwaveRisk: RiskLevel;
  floodRisk: RiskLevel;
  droughtRisk: RiskLevel;
  climateScore: number; // 0-100, higher is healthier
  baselineTempC: number;
  baselineRainfallMm: number;
}

export interface CurrentWeather {
  temperatureC: number;
  apparentTemperatureC: number;
  humidity: number;
  windSpeedKmh: number;
  precipitationMm: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

export interface DailyForecastPoint {
  date: string;
  maxTempC: number;
  minTempC: number;
  precipitationMm: number;
  humidity: number;
}

export interface ClimateAdvisory {
  id: string;
  severity: RiskLevel;
  title: string;
  message: string;
  category: "heatwave" | "flood" | "drought" | "air-quality" | "general";
}
