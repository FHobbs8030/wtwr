import React from 'react';
import useEscapeKey from '../hooks/useEscapeKey';
import '../blocks/ModalWithForm.css';

function ModalWithForm({ title, name, buttonText, onClose, onSubmit, isOpen, children }) {
  useEscapeKey(onClose);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal')) onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
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
