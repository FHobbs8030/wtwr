import React from 'react';
import '../blocks/ItemCard.css';
import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';
import '../blocks/Cards.css';
import '../blocks/Main.css';

function Main({ weatherData, clothingItems, onCardClick, isCelsius }) {
  const rawTemperature =
    weatherData?.main?.temp ?? weatherData?.temperature ?? null;

  const convertedTemperature =
    typeof rawTemperature === 'number'
      ? isCelsius
        ? Math.round(((rawTemperature - 32) * 5) / 9)
        : Math.round(rawTemperature)
      : null;

  const getWeatherType = () => {
    if (typeof rawTemperature !== 'number') return null;
    if (rawTemperature >= 75) return 'hot';
    if (rawTemperature >= 66) return 'warm';
    return 'cold';
  };

  const weatherType = getWeatherType();

  const filteredItems =
    weatherType === null
      ? clothingItems
      : clothingItems.filter(item => item.weather === weatherType);

  const unit = isCelsius ? '°C' : '°F';

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} isCelsius={isCelsius} />
      <p className="main__intro">
        {typeof convertedTemperature === 'number'
          ? `Today is ${convertedTemperature}${unit} / You may want to wear:`
          : `Can't fetch weather / Showing all items:`}
      </p>
      <section className="cards">
        <ul className="cards__list">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
