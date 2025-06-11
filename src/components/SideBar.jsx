import React from 'react';
import '../blocks/SideBar.css';

function SideBar({ onLogout }) {
  return (
    <div className="sidebar">
      <p className="sidebar__username">Hello, Terrence</p>
      <button className="sidebar__logout" onClick={onLogout}>Log out</button>
    </div>
  );
}

export default SideBar;