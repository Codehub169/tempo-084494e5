import React, { useEffect, useState, useCallback } from 'react';
import { useGameEngine } from '../hooks/useGameEngine';
import GameCanvas from '../components/game/GameCanvas';
import MobileControls from '../components/game/MobileControls';

function GamePage({ onGameOver }) {
  const {
    snake,
    food,
    score,
    isGameOver,
    isRunning,
    gridSize,
    startGame,
    changeDirection,
  } = useGameEngine({ onGameOver });

  const [showMobileControls, setShowMobileControls] = useState(false);

  // Memoize startGame to ensure useEffect dependency is stable
  const memoizedStartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    memoizedStartGame();
  }, [memoizedStartGame]);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) { // Tailwind's md breakpoint
      setShowMobileControls(true);
    } else {
      setShowMobileControls(false);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className="flex flex-col h-screen w-screen bg-theme-background font-sans">
      <header className="py-3 px-5 text-center bg-theme-controls shadow-md z-10">
        <h1 className="text-xl sm:text-2xl text-theme-text-title font-heading font-semibold mb-1">Serpent Dash</h1>
        <div id="scoreBoard" className="text-lg sm:text-xl font-mono text-theme-primary">
          Score: <span id="currentScoreDisplay">{score}</span>
        </div>
      </header>

      <main id="gameArea" className="flex-grow flex justify-center items-center w-full p-1 sm:p-2 overflow-hidden relative">
        <GameCanvas 
          snake={snake}
          food={food}
          gridSize={gridSize}
          isGameOver={isGameOver}
          isRunning={isRunning}
        />
      </main>

      <footer id="controlsArea" className="py-2 bg-theme-controls shadow-top-md flex flex-col items-center justify-center">
        {showMobileControls && (
          <MobileControls 
            onDirectionChange={changeDirection} 
            isVisible={showMobileControls} 
          />
        )}
        <p className={`desktop-controls-hint text-xs sm:text-sm text-theme-text opacity-70 mt-1 ${showMobileControls ? 'hidden' : 'md:block'}`}>
          Use Arrow Keys or WASD
        </p>
      </footer>
    </div>
  );
}

export default GamePage;
