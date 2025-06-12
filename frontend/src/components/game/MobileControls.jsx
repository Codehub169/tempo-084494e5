import React from 'react';

const ControlButton = ({ onClick, children, className, ariaLabel }) => (
  <button
    type="button"
    onTouchStart={(e) => { e.preventDefault(); onClick(); }} // Prevent scroll, use onTouchStart for faster response
    onMouseDown={(e) => { e.preventDefault(); onClick(); }} // For desktop testing if needed
    aria-label={ariaLabel}
    className={`bg-[#2a2a40] text-theme-text rounded-lg text-xl sm:text-2xl font-bold flex justify-center items-center transition-all duration-100 ease-in-out active:bg-theme-accent active:scale-95 select-none focus:outline-none ${className}`}
  >
    {children}
  </button>
);

const MobileControls = ({ onDirectionChange, isVisible }) => {
  if (!onDirectionChange || !isVisible) return null;

  return (
    <div className="w-full flex justify-center items-center py-2 px-1 select-none">
      <div className="grid grid-cols-3 grid-rows-3 gap-1.5 sm:gap-2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]">
        <div className="col-start-2 row-start-1">
          <ControlButton onClick={() => onDirectionChange('UP')} ariaLabel="Move Up" className="w-full h-full">▲</ControlButton>
        </div>
        <div className="col-start-1 row-start-2">
          <ControlButton onClick={() => onDirectionChange('LEFT')} ariaLabel="Move Left" className="w-full h-full">◀</ControlButton>
        </div>
        {/* Central empty space */}
        <div className="col-start-2 row-start-2"></div> 
        <div className="col-start-3 row-start-2">
          <ControlButton onClick={() => onDirectionChange('RIGHT')} ariaLabel="Move Right" className="w-full h-full">▶</ControlButton>
        </div>
        <div className="col-start-2 row-start-3">
          <ControlButton onClick={() => onDirectionChange('DOWN')} ariaLabel="Move Down" className="w-full h-full">▼</ControlButton>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
