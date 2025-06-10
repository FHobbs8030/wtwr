import React from 'react';
import '../blocks/ToggleSwitch.css';

function ToggleSwitch({ value, onChange }) {
  return (
    <div className="toggle-switch-wrapper">
      <span className="unit-label">{value ? '°C' : '°F'}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
