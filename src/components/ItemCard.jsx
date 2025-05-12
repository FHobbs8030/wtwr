import React from "react";
import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <p className="card__name">{item.name}</p>
      <img src={item.link} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
