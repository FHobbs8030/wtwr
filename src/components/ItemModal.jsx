import React, { useState } from 'react';
import '../blocks/ItemModal.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function ItemModal({ item, onClose, onDeleteItem }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteItem(item.id || item._id);
    setShowConfirm(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

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
            onClick={handleDeleteClick}
          >
            Delete Item
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default ItemModal;
