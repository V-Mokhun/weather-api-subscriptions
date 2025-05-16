import { NextFunction, Response } from "express";
import { GetWeatherRequest } from "./weather.route";
import { db } from "@/db";
import { weatherService } from "@/lib/weather";
import { CACHE_THRESHOLD } from "@/constants";

export async function getWeather(
  req: GetWeatherRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { city } = req.parsedQuery;

    const cachedWeather = await db.weatherCache.findUnique({
      where: { city },
    });

    if (
      cachedWeather &&
      new Date().getTime() - cachedWeather.fetchedAt.getTime() < CACHE_THRESHOLD
    ) {
      res.status(200).json({
        temperature: cachedWeather.temperature,
        humidity: cachedWeather.humidity,
        description: cachedWeather.description,
      });
      return;
    }

    const weatherData = await weatherService.getWeatherData(city);

    await db.weatherCache.upsert({
      where: { city },
      update: {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        description: weatherData.description,
        fetchedAt: new Date(),
      },
      create: {
        city,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        description: weatherData.description,
      },
    });

    res.status(200).json({
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      description: weatherData.description,
    });
  } catch (error) {
    next(error);
  }
}
