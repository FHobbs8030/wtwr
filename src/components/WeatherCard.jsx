import React from 'react';
import '../blocks/WeatherCard.css';

function WeatherCard({ weatherData, isCelsius }) {
  const rawTemp = weatherData?.main?.temp ?? weatherData?.temperature ?? null;

  if (rawTemp === null) {
    return (
      <section className="weather-card">
        <p className="weather-card__temp">--</p>
      </section>
    );
  }

  const displayTemp = isCelsius
    ? Math.round((rawTemp - 32) * 5 / 9)
    : Math.round(rawTemp);

  const unit = isCelsius ? '°C' : '°F';

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{displayTemp}{unit}</p>
    </section>
  );
}

export default WeatherCard;
