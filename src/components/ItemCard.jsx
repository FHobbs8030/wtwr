import React from "react";
import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
      <p className="card__name">{item.name}</p>
    </div>
  );
}

export default ItemCard;