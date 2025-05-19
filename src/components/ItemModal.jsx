import React, { useState, useEffect } from "react";
import "../blocks/ItemModal.css";


function ItemModal({ onAddItem, onClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name.trim() !== "" && imageUrl.trim() !== "" && weather !== "");
  }, [name, imageUrl, weather]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    onAddItem({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  }

  return (
    <div className="item-modal">
      <div className="item-modal__content">
        <button className="item-modal__close" onClick={onClose}>×</button>
        <h3 className="item-modal__title">New garment</h3>
        <form className="item-modal__form" onSubmit={handleSubmit}>
          <label className="item-modal__label">Name</label>
          <input
            type="text"
            className="item-modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="item-modal__label">Image URL</label>
          <input
            type="url"
            className="item-modal__input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <fieldset className="item-modal__fieldset">
            <legend className="item-modal__label">Select the weather type:</legend>
            <div className="item-modal__radio-group">
              <label><input type="radio" name="weather" value="hot" onChange={(e) => setWeather(e.target.value)} /> Hot</label>
              <label><input type="radio" name="weather" value="warm" onChange={(e) => setWeather(e.target.value)} /> Warm</label>
              <label><input type="radio" name="weather" value="cold" onChange={(e) => setWeather(e.target.value)} /> Cold</label>
            </div>
          </fieldset>
          <button
            type="submit"
            className="item-modal__submit-button"
            disabled={!isFormValid}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemModal;
