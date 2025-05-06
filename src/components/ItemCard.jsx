import "../blocks/ItemCard.css";
import React from "react";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <div className="item-card__name">{item.name}</div>
    </li>
  );
}

export default ItemCard;
