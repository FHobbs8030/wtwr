
import React, { useState, useEffect } from "react";

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
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>×</button>
        <h3 className="modal__title">New garment</h3>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">Name</label>
          <input
            type="text"
            className="modal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="modal__label">Image URL</label>
          <input
            type="url"
            className="modal__input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <fieldset className="modal__fieldset">
            <legend className="modal__label">Select the weather type:</legend>
            <div className="modal__radio-group">
              <label><input type="radio" name="weather" value="hot" onChange={(e) => setWeather(e.target.value)} /> Hot</label>
              <label><input type="radio" name="weather" value="warm" onChange={(e) => setWeather(e.target.value)} /> Warm</label>
              <label><input type="radio" name="weather" value="cold" onChange={(e) => setWeather(e.target.value)} /> Cold</label>
            </div>
          </fieldset>
          <button
            type="submit"
            className="modal__submit-button"
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
