import React from "react";
import "../blocks/Main.css";
import ItemCard from "./ItemCard"; // Add this import

function Main({ weatherData, clothingItems }) {
  return (
    <main className="main">
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
