import React, { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setName('');
      setImageUrl('');
      setWeather('');
      setFormErrors({});
      setIsFormValid(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors = {};

    if (name.trim().length < 2 || name.trim().length > 30) {
      errors.name = 'Name must be between 2 and 30 characters';
    }

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(imageUrl.trim())) {
      errors.imageUrl = 'Please enter a valid URL';
    }

    if (!weather) {
      errors.weather = 'Please select a weather type';
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [name, imageUrl, weather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newItem = {
      _id: Date.now().toString(), // Ensures the item has a unique ID
      name: name.trim(),
      imageUrl: imageUrl.trim(),
      weather,
    };

    onAddItem(newItem);
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isSubmitDisabled={!isFormValid}
      errors={formErrors}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="modal__input"
          placeholder="Image URL"
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__label">Select weather type</legend>
        {['hot', 'warm', 'cold'].map((type) => (
          <label key={type} className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value={type}
              checked={weather === type}
              onChange={(e) => setWeather(e.target.value)}
              className="modal__radio"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
