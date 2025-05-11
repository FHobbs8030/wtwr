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
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <p className="modal__caption">{item.name}</p>
      </div>
    </div>
  );
}

export default ItemModal;
