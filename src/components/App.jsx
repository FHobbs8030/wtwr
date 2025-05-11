import { useState, useEffect } from "react";
import "../blocks/App.css";
import "../vendor/normalize.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import ItemModal from "../components/ItemModal.jsx";
import { defaultClothingItems } from "../utils/clothingItems.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  useEffect(() => {
    const apiKey = "3d0d531d6ea32e66f08e7e0fa3be4ea0";
    const city = "Carson City";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  }, []);

  return (
    <div className="app">
      <Header onAddClick={handleAddClick} />
      <Main weatherData={weatherData} clothingItems={clothingItems} />
      <Footer />
      {isAddModalOpen && (
        <ItemModal
          onClose={handleCloseModal}
          item={{ name: "Add New Garment", link: "" }}
        />
      )}
    </div>
  );
}

export default App;
