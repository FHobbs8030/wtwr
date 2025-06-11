import React from 'react';
import '../blocks/ItemCard.css';

function ItemCard({ item, onCardClick, onDelete }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <button
        className="card__delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
      >
        &times;
      </button>
      <p className="card__name">{item.name}</p>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
