import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import { defaultClothingItems } from "../utils/clothingItems";
import "../blocks/App.css";
import { fetchWeatherByCoords } from "../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const fallbackWeatherData = {
    temperature: null,
    isDay: true,
    location: "Unknown",
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setSelectedItem(null);
    setFormErrors({});
    setFormValues({ name: "", imageUrl: "", weather: "" });
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, weather } = formValues;

    const newErrors = {};
    if (name.trim().length < 2 || name.trim().length > 30) {
      newErrors.name = "Name must be between 2 and 30 characters";
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl.trim())) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    if (!weather) {
      newErrors.weather = "Please select a weather type";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const newItem = {
      name: name.trim(),
      weather,
      imageUrl: imageUrl.trim(),
      _id: Date.now().toString(),
    };

    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => setWeatherData(data))
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setWeatherData(fallbackWeatherData);
      });
  }, []);

  return (
    <div className="page">
      <div className="app">
        <div className="app__content">
          <Header onAddClick={handleAddClick} />
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            onCardClick={handleCardClick}
          />
          <Footer />
        </div>

        {selectedItem && isItemModalOpen && (
          <ItemModal item={selectedItem} onClose={handleCloseModal} />
        )}

        {isAddModalOpen && (
          <ModalWithForm
            title="New garment"
            name="new-garment"
            buttonText="Add garment"
            onClose={handleCloseModal}
            onSubmit={handleAddGarmentSubmit}
            formErrors={formErrors}
          >
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="modal__input"
                placeholder="Name"
                required
              />
              {formErrors?.name && (
                <span className="modal__error">{formErrors.name}</span>
              )}
            </label>

            <label className="modal__label">
              Image URL
              <input
                type="url"
                name="imageUrl"
                value={formValues.imageUrl}
                onChange={handleInputChange}
                className="modal__input"
                placeholder="Image URL"
                required
              />
              {formErrors?.imageUrl && (
                <span className="modal__error">{formErrors.imageUrl}</span>
              )}
            </label>

            <label className="modal__label">
              Select weather type
              <select
                name="weather"
                value={formValues.weather}
                onChange={handleInputChange}
                className="modal__input"
                required
              >
                <option value="">Select weather type</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
              {formErrors?.weather && (
                <span className="modal__error">{formErrors.weather}</span>
              )}
            </label>
          </ModalWithForm>
        )}
      </div>
    </div>
  );
}

export default App;
