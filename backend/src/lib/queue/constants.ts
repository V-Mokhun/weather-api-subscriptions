export const QUEUE_TYPES = {
  EMAIL: "email",
  WEATHER_UPDATE: "weather_update",
} as const;

export const JOB_TYPES = {
  CONFIRM_EMAIL: "confirm_email",
  SEND_WEATHER_UPDATE_EMAIL: "send_weather_update_email",
  UPDATE_WEATHER_DATA: "update_weather_data",
} as const;
