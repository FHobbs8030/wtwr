import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import ModalWithForm from './ModalWithForm.jsx';
import { defaultClothingItems } from '../utils/clothingItems';
import '../blocks/App.css';
import { fetchWeatherByCoords } from '../utils/weatherApi';
import { getBackgroundImage } from '../utils/weatherImages';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    imageUrl: '',
    weather: '',
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setSelectedItem(null);
    setFormErrors({});
  };

  const handleCardClick = item => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = e => {
    e.preventDefault();
    const { name, imageUrl, weather } = e.target.elements;

    const newErrors = {};

    if (name.value.trim().length < 2 || name.value.trim().length > 30) {
      newErrors.name = 'Name must be between 2 and 30 characters';
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl.value.trim())) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!weather.value) {
      newErrors.weather = 'Please select a weather type';
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
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then(data => setWeatherData(data))
      .catch(err => console.error('Weather fetch error:', err));
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
          />
        )}
      </div>
    </div>
  );
}

export default App;
