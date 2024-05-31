import React, { useState } from 'react';

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            id="toggle" 
            type="checkbox" 
            className="hidden"
            checked={isOn}
            onChange={handleToggle} 
          />
          <div className="toggle__line lg:px-5 lg:py-3 py-4 px-6 bg-gray-400 rounded-full shadow-inner"></div>
          <div className={`toggle__dot absolute lg:py-2.5 px-3.5 py-3.5 lg:px-2.5 bg-white rounded-full shadow top-0.5 ${isOn ? 'right-0.5' : 'left-0.5'}`}></div>
        </div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
