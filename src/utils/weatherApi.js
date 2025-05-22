const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function fetchWeatherByCoords(lat, lon) {
  return fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch weather: ${res.status}`);
      }
      return res.json();
    });
}
