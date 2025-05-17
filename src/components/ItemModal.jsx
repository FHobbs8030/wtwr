import React, { useEffect } from "react";
import "../blocks/ItemModal.css";

function ItemModal({ item, onClose }) {
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
    if (e.target.classList.contains("item-modal")) {
      onClose();
    }
  };

  return (
    <div className="item-modal" onClick={handleOverlayClick}>
      <div className="item-modal__content item-modal__content_type_image">
        <button
          className="item-modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={item.link} alt={item.name} className="item-modal__image" />
        <div className="item-modal__info">
          <h2 className="item-modal__title">{item.name}</h2>
          <p className="item-modal__weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
