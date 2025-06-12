import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/ui/Button';

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
        <Button 
          onClick={onPlayAgain} 
          variant="accent"
          className="text-lg sm:text-xl font-poppins min-w-[180px] w-full sm:w-auto"
        >
          Play Again
        </Button>
        <Button 
          onClick={onGoHome} 
          variant="subtle"
          className="text-lg sm:text-xl font-poppins min-w-[180px] w-full sm:w-auto"
        >
          Main Menu
        </Button>
      </div>
    </div>
  );
}

GameOverPage.propTypes = {
  score: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onGoHome: PropTypes.func.isRequired,
};

export default GameOverPage;
