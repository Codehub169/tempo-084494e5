import React from 'react';

function StartPage({ onStartGame }) {
  return (
    <div className="bg-theme-secondary-bg p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md animate-fadeInScaleUp">
      <h1 
        className="text-5xl sm:text-6xl font-poppins font-bold mb-2.5 tracking-wide gradient-text"
        style={{ backgroundImage: 'linear-gradient(45deg, var(--color-theme-accent), var(--color-theme-snake-head))' }}
      >
        Serpent Dash
      </h1>
      <p className="text-lg sm:text-xl text-theme-text opacity-80 mb-8 font-inter">
        A modern twist on a classic game.
      </p>
      <button 
        onClick={onStartGame} 
        className="bg-theme-accent text-theme-button-text text-xl sm:text-2xl font-poppins font-semibold py-3 sm:py-4 px-10 sm:px-12 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-theme-accent-hover hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-theme-accent focus:ring-opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Start Game
      </button>
      <div className="mt-9 text-sm sm:text-base text-theme-text opacity-70 font-inter">
        <p className="mb-2"><strong className="text-theme-accent font-semibold">Controls:</strong></p>
        <p className="mb-1"><strong>Desktop:</strong> Arrow Keys or WASD</p>
        <p><strong>Mobile:</strong> On-screen D-pad</p>
      </div>
    </div>
  );
}

export default StartPage;
