import React from "react";
import { getBackgroundImage } from "../utils/weatherApi";
import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.weather || !weatherData.sys) return null;

  const { main: weatherMain } = weatherData.weather[0];
  const { sunrise, sunset } = weatherData.sys;
  const timestamp = weatherData.dt;
  const temperature = Math.round(weatherData.main.temp);

  const backgroundImg = getBackgroundImage(
    weatherMain,
    timestamp,
    sunrise,
    sunset
  );

  return (
    <section
      className="weather-card"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <p className="weather-card__temp">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
