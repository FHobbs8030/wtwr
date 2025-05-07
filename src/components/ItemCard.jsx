import "../blocks/ItemCard.css";
import React from "react";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <div className="item-card__name">{item.name}</div>
      <div className="item-card__weather">{item.weather}</div>
    </li>
  );
}

export default ItemCard;
