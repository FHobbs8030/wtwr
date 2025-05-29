import React from 'react';
import '../blocks/ItemCard.css';
import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';
import '../blocks/Cards.css';
import '../blocks/Main.css';

function Main({ weatherData, clothingItems, onCardClick }) {
  const temperature =
    weatherData?.main?.temp ?? weatherData?.temperature ?? null;

  const getWeatherType = () => {
    if (typeof temperature !== 'number') return null;
    if (temperature >= 75) return 'hot';
    if (temperature >= 66) return 'warm';
    return 'cold';
  };

  const weatherType = getWeatherType();

  const filteredItems =
    weatherType === null
      ? clothingItems
      : clothingItems.filter(item => item.weather === weatherType);

  return (
    <main className="main">
      {weatherData && <WeatherCard weatherData={weatherData} />}
      <p className="main__intro">
        {typeof temperature === 'number'
          ? `Today is ${Math.round(temperature)}°F / You may want to wear:`
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
