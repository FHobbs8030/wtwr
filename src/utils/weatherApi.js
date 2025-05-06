import { latitude, longitude, weatherApiKey } from "./constants";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export function getWeather() {
  return fetch(
    `${baseUrl}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch weather");
    }
    return res.json();
  });
}

export function getWeatherType(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
