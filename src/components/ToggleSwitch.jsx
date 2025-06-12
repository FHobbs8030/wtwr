import React, { useContext } from 'react';
import '../blocks/ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../contextStore/CurrentTemperatureUnitContext';

function ToggleSwitch({ debugUnit }) {
  const { isCelsius, setIsCelsius } = useContext(CurrentTemperatureUnitContext);

  const handleToggle = () => {
    setIsCelsius((prev) => !prev);
  };

  return (
    <div className="toggle-switch-wrapper">
      <label className="toggle-switch">
        <input type="checkbox" checked={isCelsius} onChange={handleToggle} />
        <span className="slider" data-unit={isCelsius ? 'C' : 'F'}>
          <span className="unit unit--f">F</span>
          <span className="unit unit--c">C</span>
          <span className="circle" />
        </span>
      </label>
      {debugUnit && (
        <div className="toggle-switch-debug">
          Debug Unit: {isCelsius ? 'Celsius' : 'Fahrenheit'}
        </div>
      )}
    </div>
  );
}

export default ToggleSwitch;
