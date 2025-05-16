import { WeatherData, WeatherService } from "@/lib/weather";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("@/lib/weather", () => ({
  WeatherService: jest.fn().mockImplementation(() => ({
    getWeatherData: jest.fn<(city: string) => Promise<WeatherData>>(),
  })),
}));

describe("WeatherService", () => {
  it("should fetch weather data for a city", async () => {
    const weatherService = new WeatherService();
    const mockWeatherData: WeatherData = {
      temperature: 20,
      description: "Sunny",
      humidity: 50,
    };
    (
      weatherService.getWeatherData as jest.Mock<
        (city: string) => Promise<WeatherData>
      >
    ).mockResolvedValue(mockWeatherData);

    const result = await weatherService.getWeatherData("London");
    expect(result).toEqual(mockWeatherData);
  });

  it("should throw an error if the city is not found", async () => {
    const weatherService = new WeatherService();
    (
      weatherService.getWeatherData as jest.Mock<
        (city: string) => Promise<WeatherData>
      >
    ).mockRejectedValue(new Error("City not found"));

    await expect(weatherService.getWeatherData("London")).rejects.toThrow(
      "City not found"
    );
  });
});
