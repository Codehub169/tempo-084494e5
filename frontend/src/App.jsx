import React, { useState, useCallback } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import GameOverPage from './pages/GameOverPage';

function App() {
  const [currentPage, setCurrentPage] = useState('start'); // 'start', 'game', 'gameOver'
  const [score, setScore] = useState(0);

  const navigateToGame = useCallback(() => {
    setCurrentPage('game');
  }, []);

  const navigateToGameOver = useCallback((finalScore) => {
    setScore(finalScore);
    setCurrentPage('gameOver');
  }, []);

  const navigateToStart = useCallback(() => {
    setCurrentPage('start');
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-0 sm:p-4">
      {currentPage === 'start' && <StartPage onStartGame={navigateToGame} />}
      {currentPage === 'game' && <GamePage onGameOver={navigateToGameOver} />}
      {currentPage === 'gameOver' && (
        <GameOverPage 
          score={score} 
          onPlayAgain={navigateToGame} 
          onGoHome={navigateToStart} 
        />
      )}
    </div>
  );
}

export default App;
