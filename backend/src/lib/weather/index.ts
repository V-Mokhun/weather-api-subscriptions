import { env } from "@/config";

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = env.WEATHER_API_KEY;
    this.baseUrl = "https://api.weatherapi.com/v1";

    if (!this.apiKey) {
      console.warn("Warning: WEATHER_API_KEY not set");
    }
  }

  async getWeatherData(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}&aqi=no`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      return {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
      };
    } catch (error) {
      if (error instanceof Error && error.message === "City not found") {
        throw new Error("City not found");
      }

      console.error("Weather API error:", error);

      throw new Error(`Failed to fetch weather data: ${error}`);
    }
  }
}

export const weatherService = new WeatherService();
