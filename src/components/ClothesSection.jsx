import React from 'react';
import ItemCard from './ItemCard';
import '../blocks/ClothesSection.css';

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
  return (
    <section className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__title">Your items</h2>
        <button className="clothes__add-button" onClick={onAddClick}>+ Add new</button>
      </div>
      <ul className="clothes__list">
        {clothingItems.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;