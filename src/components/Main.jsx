import React from "react";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems }) {
  return (
    <div>
      <h2>Main component is working</h2>
      <p>Temperature: {weatherData.temperature}°F</p>
      <p>Weather Type: {weatherData.type}</p>
      <ul>
        {clothingItems.map((item) => (
          <li key={item._id}>
            {item.name} - {item.weather}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
