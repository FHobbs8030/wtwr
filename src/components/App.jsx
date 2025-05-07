import { useState, useEffect } from "react";
import "../blocks/App.css";
import Main from "./blocks/Main";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = "3d0d531d6ea32e66f08e7e0fa3be4ea0"; // You'll need to get an API key from OpenWeather
    const city = "Carson City";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // This will help us see the data
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, []); // Empty array means this runs once when component mounts

  const clothingItems = {
    hot: ["sunglasses", "tank top", "shorts", "sandals"],
    warm: ["t-shirt", "jeans", "sneakers"],
    cold: ["sweater", "jacket", "boots", "beanie"],
  };

  return (
    <div className="App">
      <Main weatherData={weatherData} clothingItems={clothingItems} />
    </div>
  );
}

export default App;
