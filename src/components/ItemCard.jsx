import "../blocks/ItemCard.css";
import React from "react";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <img src={item.link} className="item-card__image" alt={item.name} />
      <div className="item-card__name">{item.name}</div>
      <div className="item-card__weather">{item.weather}</div>
    </li>
  );
}

export default ItemCard;
