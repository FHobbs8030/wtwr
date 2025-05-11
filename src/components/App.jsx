import { useState, useEffect } from "react";
import "../blocks/App.css";
import "../vendor/normalize.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import { defaultClothingItems } from "../utils/clothingItems.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = "3d0d531d6ea32e66f08e7e0fa3be4ea0";
    const city = "Carson City";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, []);

  const [clothingItems] = useState(defaultClothingItems);

  return (
    <div className="app">
      <Header />
      <Main weatherData={weatherData} clothingItems={clothingItems} />
      <Footer />
    </div>
  );
}

export default App;
