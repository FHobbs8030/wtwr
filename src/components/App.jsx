import React, { useState, useEffect } from 'react';
import { getClothingItems } from '../utils/clothingApi';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import ModalWithForm from './ModalWithForm.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';
import '../blocks/App.css';
import { fetchWeatherByCoords } from '../utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', imageUrl: '', weather: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCelsius, setIsCelsius] = useState(false);

  const fallbackWeatherData = {
    temperature: null,
    isDay: true,
    location: 'Unknown',
  };

  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsItemModalOpen(false);
    setSelectedItem(null);
    setFormErrors({});
    setFormValues({ name: '', imageUrl: '', weather: '' });
    setIsFormValid(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    const newErrors = {};
    if (updatedValues.name.trim().length < 2 || updatedValues.name.trim().length > 30) {
      newErrors.name = 'Name must be between 2 and 30 characters';
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(updatedValues.imageUrl.trim())) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!updatedValues.weather) {
      newErrors.weather = 'Please select a weather type';
    }

    setFormErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newItem = {
      name: formValues.name.trim(),
      weather: formValues.weather,
      imageUrl: formValues.imageUrl.trim(),
      _id: Date.now().toString(),
    };

    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then(data => setWeatherData(data))
      .catch(err => {
        console.error('Weather fetch error:', err);
        setWeatherData(fallbackWeatherData);
      });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getClothingItems();
        setClothingItems(items);
      } catch (err) {
        console.error('Error loading clothing items:', err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="page">
      <div className="app">
        <div className="app__content">
          <Header onAddClick={handleAddClick}>
            <ToggleSwitch value={isCelsius} onChange={handleToggleUnit} />
          </Header>
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            onCardClick={handleCardClick}
            isCelsius={isCelsius}
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
            isOpen={isAddModalOpen}
            isSubmitDisabled={!isFormValid}
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
              {formErrors?.name && <span className="modal__error">{formErrors.name}</span>}
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

            <fieldset className="modal__fieldset">
              <legend className="modal__label">Select weather type</legend>
              {['hot', 'warm', 'cold'].map((weatherType) => (
                <label key={weatherType} className="modal__radio-label">
                  <input
                    type="radio"
                    name="weather"
                    value={weatherType}
                    checked={formValues.weather === weatherType}
                    onChange={handleInputChange}
                    className="modal__radio"
                  />
                  {weatherType.charAt(0).toUpperCase() + weatherType.slice(1)}
                </label>
              ))}
              {formErrors?.weather && <span className="modal__error">{formErrors.weather}</span>}
            </fieldset>
          </ModalWithForm>
        )}
      </div>
    </div>
  );
}

export default App;
