const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temp) => {
  if (temp > 86) {
    return 'hot';
  } else if (temp >= 65 && temp <= 85) {
    return 'warm';
  } else {
    return 'cold';
  }
};

const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = Math.round(data.main.temp);
  result.type = getWeatherType(result.temp);
  result.isDay = isDay(data.sys, Date.now());
  result.condition = data.weather[0].main.toLowerCase();
  return result;
};


export function fetchWeatherByCoords(lat, lon) {
  return fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch weather: ${res.status}`);
      }
      return res.json();
    });
}


export { getWeatherType, filterWeatherData };
