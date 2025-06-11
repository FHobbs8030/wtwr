import React from 'react';
import '../blocks/ToggleSwitch.css';

function ToggleSwitch({ value, onChange }) {
  return (
    <div className="toggle-switch-wrapper">
      <label className="toggle-switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider">
          <span className="unit unit--f">F</span>
          <span className="unit unit--c">C</span>
          <span className="circle" />
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
