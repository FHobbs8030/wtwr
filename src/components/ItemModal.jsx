import React, { useEffect } from "react";
import "../blocks/ItemModal.css";

function ItemModal({ item, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("item-modal")) {
      onClose();
    }
  };

  return (
    <div className="item-modal" onClick={handleOverlayClick}>
      <div className="item-modal__content">
        <button className="item-modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-modal__image"
        />
        <p className="item-modal__caption">{item.name}</p>
        <p className="item-modal__weather">Weather: {item.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
