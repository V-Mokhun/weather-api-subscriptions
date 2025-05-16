import { QUEUE_TYPES } from "../../constants";
import { createQueue } from "../queue-factory";

export const WeatherUpdateQueue = createQueue(QUEUE_TYPES.WEATHER_UPDATE);
