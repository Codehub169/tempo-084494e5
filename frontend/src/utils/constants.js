// frontend/src/utils/constants.js

// Game Core Settings
export const GRID_SIZE = 20; // Number of cells in one row/column
export const INITIAL_SNAKE_LENGTH = 3;
export const GAME_SPEED_MS = 150; // Milliseconds per game tick

// Game Element Colors (matching HTML previews and Tailwind config)
export const SNAKE_COLOR = '#00f0c0';       // From game.html --snake-color
export const SNAKE_HEAD_COLOR = '#32ff7e';  // From game.html --snake-head-color
export const FOOD_COLOR = '#ff6b81';        // From game.html --food-color
export const CANVAS_BG_COLOR = '#181828';   // From game.html --game-bg
export const GAME_OVER_TEXT_COLOR = '#ff4757'; // From gameover.html --danger-color

// UI & Layout Constants
export const PAGE_PATHS = {
  START: '/',
  GAME: '/game',
  GAME_OVER: '/gameover',
};

// Keyboard Controls Mapping
export const KEY_DIRECTIONS = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
  W: 'UP', // Adding uppercase variants as well
  S: 'DOWN',
  A: 'LEFT',
  D: 'RIGHT',
};

// API Endpoint
// Backend serves frontend, so API calls are relative to the current origin
export const API_BASE_URL = '/api';

// Local Storage Keys
export const LOCAL_STORAGE_LAST_SCORE_KEY = 'serpentDashLastScore';
export const LOCAL_STORAGE_HIGH_SCORE_KEY = 'serpentDashHighScore'; // For future high score feature
