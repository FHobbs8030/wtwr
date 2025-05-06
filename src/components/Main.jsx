import React from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <ul className="main__clothing-items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
