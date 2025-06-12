import React from 'react';

function GameOverPage({ score, onPlayAgain, onGoHome }) {
  return (
    <div className="bg-theme-secondary-bg p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md animate-fadeInScaleUpWithTranslate">
      <h1 className="text-5xl sm:text-6xl font-poppins font-bold text-theme-danger mb-5 tracking-wide">
        Game Over
      </h1>
      <div className="text-xl sm:text-2xl text-theme-text mb-4">
        <span className="opacity-80">Your Score:</span>
        <span id="finalScore" className="block font-roboto-mono text-4xl sm:text-5xl font-semibold text-theme-accent mt-1">
          {score}
        </span>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
        <button 
          onClick={onPlayAgain} 
          className="bg-theme-accent text-theme-button-text text-lg sm:text-xl font-poppins font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-theme-accent-hover hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-theme-accent focus:ring-opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto min-w-[180px]"
        >
          Play Again
        </button>
        <button 
          onClick={onGoHome} 
          className="bg-[#3a3a50] hover:bg-[#4a4a60] text-theme-text text-lg sm:text-xl font-poppins font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto min-w-[180px]"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}

export default GameOverPage;
