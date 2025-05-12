import React from "react";
import "../blocks/Main.css";
import "../blocks/ItemCard.css";
import "../blocks/Cards.css";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";

function Main({ weatherData, clothingItems }) {
  if (!weatherData || !weatherData.main) {
    return <p>Loading weather data...</p>;
  }

  const temperature = weatherData.main.temp;

  const getWeatherType = () => {
    if (temperature >= 75) return "hot";
    if (temperature >= 66) return "warm";
    return "cold";
  };

  const weatherType = getWeatherType();
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__intro">
        Today is {Math.round(temperature)}°F / You may want to wear:
      </p>

      <section className="cards">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </section>
    </main>
  );
}

export default Main;