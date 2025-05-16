import { app } from "@/app";
import { WeatherData } from "@/lib/weather";
import { GetWeatherQuery } from "@/modules/weather/weather.schema";
import * as weatherService from "@/modules/weather/weather.service";
import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";

jest.mock("@/modules/weather/weather.service", () => ({
  upsertWeatherCache: jest.fn(),
}));

describe("Weather Endpoints", () => {
  describe("GET /weather", () => {
    it("should return weather data for a valid city", async () => {
      const mockWeatherData: WeatherData = {
        temperature: 20,
        description: "Sunny",
        humidity: 50,
      };

      const query: GetWeatherQuery = { city: "London" };
      (
        weatherService.upsertWeatherCache as jest.Mock<
          (city: string, weatherData: WeatherData) => Promise<void>
        >
      ).mockResolvedValue(undefined);

      const response = await request(app).get("/weather").query(query);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("temperature");
      expect(response.body).toHaveProperty("humidity");
      expect(response.body).toHaveProperty("description");
      expect(response.body.temperature).toEqual(mockWeatherData.temperature);
      expect(response.body.humidity).toEqual(mockWeatherData.humidity);
      expect(response.body.description).toEqual(mockWeatherData.description);
    });

    it("should return 400 for missing city parameter", async () => {
      const response = await request(app).get("/weather").query({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("city");
    });

    it("should return 404 for non-existent city", async () => {
      const query: GetWeatherQuery = { city: "NonexistentCity" };
      (
        weatherService.upsertWeatherCache as jest.Mock<
          (city: string, weatherData: WeatherData) => Promise<void>
        >
      ).mockRejectedValue(new Error("City not found"));

      const response = await request(app).get("/weather").query(query);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("City not found");
    });

    it("should return 500 for weather service error", async () => {
      const query: GetWeatherQuery = { city: "London" };
      (
        weatherService.upsertWeatherCache as jest.Mock<
          (city: string, weatherData: WeatherData) => Promise<void>
        >
      ).mockRejectedValue(new Error("Weather service unavailable"));

      const response = await request(app).get("/weather").query(query);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Weather service unavailable");
    });
  });
});
