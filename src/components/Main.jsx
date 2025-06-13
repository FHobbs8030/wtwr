import React from 'react';
import '../blocks/ItemCard.css';
import ItemCard from './ItemCard';
import WeatherCard from './WeatherCard';
import '../blocks/Cards.css';
import '../blocks/Main.css';

function Main({ weatherData, clothingItems, onCardClick, isCelsius }) {
  const rawTemperature = weatherData?.temp ?? null;

  const convertedTemperature =
    typeof rawTemperature === 'number'
      ? isCelsius
        ? Math.round(((rawTemperature - 32) * 5) / 9)
        : Math.round(rawTemperature)
      : null;

  const weatherType = weatherData?.type ?? null;

  const filteredItems =
    weatherType === null
      ? clothingItems
      : clothingItems.filter(item => item.weather === weatherType);

  const unit = isCelsius ? '°C' : '°F';

  // ✅ Debug logs
  console.log('Raw Temperature:', rawTemperature);
  console.log('Converted Temperature:', convertedTemperature);
  console.log('Weather Type:', weatherType);
  console.log('All Clothing Items:', clothingItems);
  console.log('Filtered Clothing Items:', filteredItems);

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
            <ItemCard key={item.id || item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
