import React, { useState, useEffect } from 'react';

function GamePage({ onGameOver }) {
  // Placeholder for score - will be managed by useGameEngine hook
  const [currentScore, setCurrentScore] = useState(0);

  // Temporary: Simulates game ending to test navigation.
  // Replace with actual game logic from useGameEngine.
  // useEffect(() => {
  //   const gameEndTimer = setTimeout(() => {
  //     onGameOver(currentScore); 
  //   }, 300000); // 5 minutes, long enough for dev
  //   return () => clearTimeout(gameEndTimer);
  // }, [onGameOver, currentScore]);

  return (
    <div className="flex flex-col h-screen w-screen bg-theme-primary-bg font-inter">
      <header className="py-3 px-5 text-center bg-theme-controls-bg shadow-md z-10">
        <h1 className="text-xl sm:text-2xl text-theme-title font-poppins font-semibold mb-1">Serpent Dash</h1>
        <div id="scoreBoard" className="text-lg sm:text-xl font-roboto-mono text-theme-accent">
          Score: <span id="currentScoreDisplay">{currentScore}</span>
        </div>
      </header>

      <main id="gameArea" className="flex-grow flex justify-center items-center w-full p-2 sm:p-2.5 overflow-hidden">
        {/* GameCanvas.jsx will be rendered here. */}
        <div 
          id="gameCanvasPlaceholder" 
          className="bg-theme-game-bg rounded-lg shadow-lg w-full h-full max-w-[calc(100vh-160px)] sm:max-w-[calc(100vh-180px)] md:max-w-[calc(100vh-200px)] max-h-[calc(100vh-160px)] sm:max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-200px)] aspect-square flex items-center justify-center text-theme-text opacity-50"
          aria-label="Game Canvas Area"
        >
          <p>Game Canvas Placeholder</p>
        </div>
      </main>

      <footer id="controlsArea" className="py-2.5 bg-theme-controls-bg shadow-top-md flex flex-col items-center justify-center">
        {/* MobileControls.jsx will be rendered here. Visible on smaller screens. */}
        <div 
          id="mobileControlsPlaceholder" 
          className="grid md:hidden w-[clamp(120px,30vw,150px)] h-[clamp(120px,30vw,150px)] place-items-center text-theme-text opacity-50"
          aria-label="Mobile Controls Area"
        >
           <p className="text-center text-xs">Mobile D-Pad Placeholder</p>
        </div>
        <p className="desktop-controls-hint text-xs sm:text-sm text-theme-text opacity-70 mt-2.5 hidden md:block">
          Use Arrow Keys or WASD
        </p>
      </footer>
    </div>
  );
}

export default GamePage;
