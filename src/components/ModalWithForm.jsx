import React, { useState, useEffect } from "react";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  formErrors,
}) {
  const [formState, setFormState] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Update validity
  useEffect(() => {
    const { name, imageUrl, weather } = formState;
    setIsFormValid(name.trim() && imageUrl.trim() && weather);
  }, [formState]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSubmit(e);
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              type="text"
              name="name"
              className="modal__input"
              value={formState.name}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="30"
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
              className="modal__input"
              value={formState.imageUrl}
              onChange={handleChange}
              required
            />
            {formErrors?.imageUrl && (
              <span className="modal__error">{formErrors.imageUrl}</span>
            )}
          </label>

          <fieldset className="modal__fieldset">
            {" "}
            <legend className="modal__label">
              Select the weather type:
            </legend>{" "}
            <div className="modal__radio-group">
              {" "}
              <label>
                {" "}
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  onChange={handleChange}
                />{" "}
                Hot{" "}
              </label>{" "}
              <label>
                {" "}
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  onChange={handleChange}
                />{" "}
                Warm{" "}
              </label>{" "}
              <label>
                {" "}
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  onChange={handleChange}
                />{" "}
                Cold{" "}
              </label>{" "}
            </div>{" "}
          </fieldset>

          <button
            type="submit"
            className="modal__submit-button"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
