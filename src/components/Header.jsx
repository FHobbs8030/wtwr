import React from "react";
import Logo from "../images/Logo.svg";
import Avatar from "../images/Avatar.png";

function Header({ onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={Logo} alt="Logo" className="header__logo" />
        <p className="header__date-location">{currentDate}, Carson City</p>
      </div>
      <div className="header__right">
        <button className="header__button" onClick={onAddClick}>
          + Add Clothes
        </button>
        <div className="header__profile">
          <p className="header__username">Terrence Tegegne</p>
          <img src={Avatar} alt="User avatar" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
