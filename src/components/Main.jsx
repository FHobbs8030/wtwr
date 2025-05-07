import React from "react";
import "../blocks/Main.css";
import ItemCard from "./ItemCard";

function Main({ weatherData, clothingItems }) {
  console.log("Weather Data:", weatherData);
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
      <section className="mainweather">
        <p className="maintemp">Temperature: {Math.round(temperature)}°F</p>
      </section>

      <section className="cards">
        <div className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
