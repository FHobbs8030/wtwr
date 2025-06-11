import React, { useState, useEffect } from 'react';
import { getClothingItems, addClothingItem } from '../utils/clothingApi';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ItemModal from './ItemModal.jsx';
import ToggleSwitch from './ToggleSwitch.jsx';
import '../blocks/App.css';
import { fetchWeatherByCoords } from '../utils/weatherApi';
import AddItemModal from './AddItemModal';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleAddGarmentSubmit = async (newItem) => {
    try {
      const savedItem = await addClothingItem(newItem);
      setClothingItems([savedItem, ...clothingItems]);
      handleCloseModal();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  useEffect(() => {
    const latitude = 39.1638;
    const longitude = -119.7674;

    fetchWeatherByCoords(latitude, longitude)
      .then((data) => setWeatherData(data))
      .catch((err) => {
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
          <AddItemModal
            isOpen={isAddModalOpen}
            onCloseModal={handleCloseModal}
            onAddItem={handleAddGarmentSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
