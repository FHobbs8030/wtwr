import React from "react";
import "../blocks/WeatherCard.css";
import { getBackgroundImage } from "../utils/weatherApi";

function WeatherCard({ weatherData }) {
  console.log("WeatherCard component started:", weatherData);

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

  console.log("Selected background image:", backgroundImg);

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
