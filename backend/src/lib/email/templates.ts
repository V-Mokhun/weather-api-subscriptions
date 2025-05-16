import { env } from "@/config";
import { WeatherData } from "../weather";

export function confirmEmailTemplate(
  city: string,
  confirmToken: string
): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #0077cc; }
          .button { display: inline-block; background: #0077cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Confirm Your Weather Subscription</h1>
        <p>Hello,</p>
        <p>Thank you for subscribing to weather updates for <strong>${city}</strong>.</p>
        <p>Please click the button below to confirm your subscription:</p>
        <p>
          <a href="${env.API_URL}/confirm/${confirmToken}" class="button">Confirm Subscription</a>
        </p>
        <p>If you didn't request this subscription, you can safely ignore this email.</p>
        <div class="footer">
          <p>Weather Forecast API Service</p>
        </div>
      </body>
    </html>
  `;
}

export function weatherUpdateTemplate(
  city: string,
  weatherData: WeatherData,
  unsubscribeToken: string
): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #0077cc; }
          .weather-box { background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .weather-property { margin: 10px 0; }
          .weather-value { font-weight: bold; }
          .button { display: inline-block; background: #0077cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          .unsubscribe { margin-top: 30px; font-size: 12px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Weather Update for ${city}</h1>
        <p>Hello,</p>
        <p>Here is your latest weather update for <strong>${city}</strong>:</p>
        
        <div class="weather-box">
          <div class="weather-property">
            Temperature: <span class="weather-value">${weatherData.temperature}°C</span>
          </div>
          <div class="weather-property">
            Humidity: <span class="weather-value">${weatherData.humidity}%</span>
          </div>
          <div class="weather-property">
            Conditions: <span class="weather-value">${weatherData.description}</span>
          </div>
        </div>
        
        <p class="unsubscribe">
          If you no longer wish to receive weather updates, 
          <a href="${env.API_URL}/unsubscribe/${unsubscribeToken}">unsubscribe here</a>.
        </p>
        
        <div class="footer">
          <p>Weather Forecast API Service</p>
        </div>
      </body>
    </html>
  `;
}
