import React, { useEffect } from "react";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  children,
  onSubmit,
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
        <button className="modal__close" type="button" onClick={onClose}>×
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
