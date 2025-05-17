// App.jsx
import { useState, useEffect } from "react";
import "../blocks/App.css";
import "../vendor/normalize.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import ItemModal from "../components/ItemModal.jsx";
import ModalWithForm from "../components/ModalWithForm.jsx";
import { defaultClothingItems } from "../utils/clothingItems.js";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleAddClick = () => setIsAddModalOpen(true);
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

    if (name.value.length < 2 || name.value.length > 30) {
      newErrors.name = "Name must be between 2 and 30 characters";
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl.value)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    const validWeatherTypes = ["hot", "warm", "cold"];
    if (!validWeatherTypes.includes(weather.value)) {
      newErrors.weather = "Please select a valid weather type";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const newGarment = {
      name: name.value,
      weather: weather.value,
      link: imageUrl.value,
      _id: Date.now(),
    };

    setClothingItems([...clothingItems, newGarment]);
    handleCloseModal();
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;
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
