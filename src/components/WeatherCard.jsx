import React from "react";
import "../blocks/WeatherCard.css";

import sunnyDay from "../images/sunny-day.jpg";
import clearNight from "../images/clear-night.jpg";
import rainyDay from "../images/rainy-day.jpg";
import rainyNight from "../images/rainy-night.jpg";
import snowyDay from "../images/snowy-day.jpg";
import snowyNight from "../images/snowy-night.jpg";
import defaultBackground from "../images/default.jpg";

import { getBackgroundImage } from "../utils/weatherApi";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.weather || !weatherData.sys) return null;

  const { main: weatherMain, id: weatherId } = weatherData.weather[0];
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


