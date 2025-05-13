
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

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseItemModal = () => {
    setSelectedItem(null);
  };

  const validateForm = (name, imageUrl, weather) => {
    if (name.length < 2 || name.length > 30) {
      return "Name must be between 2 and 30 characters";
    }
    try {
      new URL(imageUrl);
    } catch (e) {
      return "Please enter a valid URL";
    }
    const validWeatherTypes = ["hot", "warm", "cold"];
    if (!validWeatherTypes.includes(weather)) {
      return "Please select a valid weather type";
    }
    return null;
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, weather } = e.target.elements;

    const validationError = validateForm(
      name.value,
      imageUrl.value,
      weather.value
    );

    if (validationError) {
      alert(validationError);
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
        >
          <div className="modal__input-wrapper">
            <label className="modal__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="modal__input"
              placeholder="Name"
              required
            />
          </div>
          <div className="modal__input-wrapper">
            <label className="modal__label" htmlFor="imageUrl">
              Image
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              className="modal__input"
              placeholder="Image URL"
              required
            />
          </div>
          <div className="modal__input-wrapper">
            <label className="modal__label">
              <div className="modal__input-wrapper">
                
  <p className="modal__weather-title">Select the weather type:</p>
  <div className="modal__radio-container">
    <div>
      <input
        type="radio"
        id="hot"
        value="hot"
        name="weather"
        className="modal__radio"
        required
      />
      <label htmlFor="hot">Hot</label>
    </div>
    </div>

                <div>
                  <input
                    type="radio"
                    id="warm"
                    value="warm"
                    name="weather"
                    className="modal__radio"
                    required
                  />
                  <label htmlFor="warm">Warm</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="cold"
                    value="cold"
                    name="weather"
                    className="modal__radio"
                    required
                  />
                  <label htmlFor="cold">Cold</label>
                </div>
              </div>
            </label>
          </div>
        </ModalWithForm>
      )}
    </div>
  );
}

export default App;
