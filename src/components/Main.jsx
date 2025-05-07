import React from "react";
import "../blocks/Main.css";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard"; 

function Main({ weatherData, clothingItems }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <div className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
