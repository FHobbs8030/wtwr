import { useState, useEffect } from "react";
import "../blocks/App.css";
import "../vendor/normalize.css";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import ItemModal from "../components/ItemModal.jsx";
import { defaultClothingItems } from "../utils/clothingItems.js";
import ModalWithForm from "../components/ModalWithForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

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
      <div className="app__content">
        <Header onAddClick={handleAddClick} />
        <Main weatherData={weatherData} clothingItems={clothingItems} />
        <Footer />
      </div>
      {isAddModalOpen && (
        <ModalWithForm
          title="New Garment"
          name="new-garment"
          buttonText="Add garment"
          onClose={handleCloseModal}
          onSubmit={handleAddGarmentSubmit}
        >
          <div className="modal__input-wrapper">
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                className="modal__input"
                placeholder="Name"
                required
              />
            </label>
          </div>

          <div className="modal__input-wrapper">
            <label className="modal__label">
              Image URL
              <input
                type="url"
                name="imageUrl"
                className="modal__input"
                placeholder="Image URL"
                required
              />
            </label>
          </div>

          <div className="modal__input-wrapper">
            <label className="modal__label">
              Select the weather type:
              <select name="weather" className="modal__input" required>
                <option value="">Select weather type</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
            </label>
          </div>
        </ModalWithForm>
      )}
    </div>
  );
}

export default App;
