import React from 'react';
import '../blocks/ItemModal.css';

function ItemModal({ item, onClose, onDeleteItem }) {
  return (
    <div className="item-modal" onClick={onClose}>
      <div className="item-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="item-modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-modal__image"
        />

        <div className="item-modal__footer">
          <div>
            <p className="item-modal__caption">{item.name}</p>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>
          <button
            className="item-modal__delete-button"
            onClick={() => onDeleteItem(item)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
