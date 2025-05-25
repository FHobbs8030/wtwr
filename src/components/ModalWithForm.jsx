import React, { useState } from 'react';
import useEscapeKey from '../hooks/useEscapeKey';
import '../blocks/ModalWithForm.css';

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  children,
  isOpen,
  formErrors = {},
}) {
  useEscapeKey(onClose);

  const [formValues, setFormValues] = useState({
    name: '',
    imageUrl: '',
    weather: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return (
      formValues.name.length >= 2 &&
      formValues.name.length <= 30 &&
      formValues.imageUrl.length > 0 &&
      formValues.weather !== ''
    );
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains('modal')) onClose();
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div
      className={`modal ${isOpen ? 'modal_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={handleSubmit}>
          {children}

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

          <button
            type="submit"
            className="modal__submit-button"
            disabled={!isFormValid()}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
