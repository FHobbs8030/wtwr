import React, { useState, useEffect } from "react";
import "../blocks/App.css";
import "../vendor/normalize.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import { defaultClothingItems } from "../utils/clothingItems";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setFormErrors({});
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseItemModal = () => {
    setSelectedItem(null);
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, weather } = e.target.elements;

    const newErrors = {};

    if (name.value.trim().length < 2 || name.value.trim().length > 30) {
      newErrors.name = "Name must be between 2 and 30 characters";
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl.value.trim())) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    if (!weather.value) {
      newErrors.weather = "Please select a weather type";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    const newItem = {
      name: name.value.trim(),
      weather: weather.value,
      imageUrl: imageUrl.value.trim(), 
      _id: Date.now().toString(),
    };
    
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
    const city = "Carson City";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">Sprint 10: WTWR</h1>
      <div className="app__content">
        <Header onAddClick={handleAddClick} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseItemModal} />
      )}

      {isAddModalOpen && (
        <ModalWithForm
          title="New garment"
          name="new-garment"
          buttonText="Add garment"
          onClose={handleCloseModal}
          onSubmit={handleAddGarmentSubmit}
          formErrors={formErrors}
        />
      )}
    </div>
  );
}

export default App;
