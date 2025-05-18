import React, { useEffect } from "react";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  formErrors = {},
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          ×
        </button>
        <h3 className="modal__title">{title}</h3>
        <form
          className="modal__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="modal__input-wrapper">
            <label className="modal__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={`modal__input ${
                formErrors.name ? "modal__input--error" : ""
              }`}
              placeholder="Name"
            />
            {formErrors.name && (
              <span className="modal__error">{formErrors.name}</span>
            )}
          </div>

          <div className="modal__input-wrapper">
            <label className="modal__label" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              className={`modal__input ${
                formErrors.imageUrl ? "modal__input--error" : ""
              }`}
              placeholder="Image URL"
            />
            {formErrors.imageUrl && (
              <span className="modal__error">{formErrors.imageUrl}</span>
            )}
          </div>

          <div className="modal__input-wrapper">
            <p className="modal__weather-title">Select the weather type:</p>
            <div className="modal__radio-container">
              {["hot", "warm", "cold"].map((type) => (
                <div key={type}>
                  <input
                    type="radio"
                    id={type}
                    value={type}
                    name="weather"
                    className="modal__radio"
                  />
                  <label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {formErrors.weather && (
              <span className="modal__error">{formErrors.weather}</span>
            )}
          </div>

          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
