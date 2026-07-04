import { CurrentWeather, DailyForecastPoint } from "./types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    relative_humidity_2m_max: number[];
  };
}

export class WeatherFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WeatherFetchError";
  }
}

/**
 * Fetches live current + 7-day daily forecast data for a given lat/lon
 * from the free, no-key-required Open-Meteo API.
 */
export async function fetchWeather(
  lat: number,
  lon: number
): Promise<{ current: CurrentWeather; daily: DailyForecastPoint[] }> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,is_day",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max",
    timezone: "Asia/Kolkata",
    forecast_days: "7",
  });

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}?${params.toString()}`, {
      cache: "no-store",
    });
  } catch (err) {
    throw new WeatherFetchError(
      "Unable to reach the weather network. Check your connection and retry."
    );
  }

  if (!res.ok) {
    throw new WeatherFetchError(
      `Weather service responded with status ${res.status}.`
    );
  }

  const data = (await res.json()) as OpenMeteoResponse;

  const current: CurrentWeather = {
    temperatureC: data.current.temperature_2m,
    apparentTemperatureC: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeedKmh: data.current.wind_speed_10m,
    precipitationMm: data.current.precipitation,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    time: data.current.time,
  };

  const daily: DailyForecastPoint[] = data.daily.time.map((date, i) => ({
    date,
    maxTempC: data.daily.temperature_2m_max[i],
    minTempC: data.daily.temperature_2m_min[i],
    precipitationMm: data.daily.precipitation_sum[i],
    humidity: data.daily.relative_humidity_2m_max[i],
  }));

  return { current, daily };
}

/** Maps Open-Meteo WMO weather codes to a short human label. */
export function weatherCodeLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Monitoring";
}
