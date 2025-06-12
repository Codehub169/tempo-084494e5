import { useState, useEffect, useCallback, useRef } from 'react';

// Constants that would ideally be in frontend/src/utils/constants.js
const GRID_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED_MS = 150; // milliseconds per game tick

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITE_DIRECTIONS = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

function getRandomPosition(gridSize, snakeToAvoid = []) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snakeToAvoid.some(seg => seg.x === position.x && seg.y === position.y));
  return position;
}

export function useGameEngine({ onGameOver }) {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const currentDirectionRef = useRef('RIGHT'); 
  const nextDirectionRef = useRef('RIGHT'); 
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const gameLoopTimeoutRef = useRef(null);

  const resetGameState = useCallback(() => {
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    const initialSnake = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: startX - i, y: startY });
    }
    setSnake(initialSnake);

    currentDirectionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setIsGameOver(false);
    setFood(getRandomPosition(GRID_SIZE, initialSnake));
  }, []);

  const generateNewFood = useCallback(() => {
    setFood(currentSnake => getRandomPosition(GRID_SIZE, currentSnake));
  }, []);
  
  // This effect ensures generateNewFood uses the most up-to-date snake state for food placement.
  // It's a common pattern when a callback needs latest state but shouldn't cause re-creation of another effect/callback.
  const snakeRef = useRef(snake);
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  const generateFood = useCallback(() => {
    setFood(getRandomPosition(GRID_SIZE, snakeRef.current));
  }, []);


  const startGame = useCallback(() => {
    resetGameState();
    setIsRunning(true);
  }, [resetGameState]);

  const processDirectionChange = useCallback((requestedDirection) => {
    if (!isRunning || isGameOver || !DIRECTIONS[requestedDirection]) return;
    if (currentDirectionRef.current !== OPPOSITE_DIRECTIONS[requestedDirection]) {
      nextDirectionRef.current = requestedDirection;
    }
  }, [isRunning, isGameOver]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newDir = null;
      switch (event.key.toLowerCase()) {
        case 'arrowup': case 'w': newDir = 'UP'; break;
        case 'arrowdown': case 's': newDir = 'DOWN'; break;
        case 'arrowleft': case 'a': newDir = 'LEFT'; break;
        case 'arrowright': case 'd': newDir = 'RIGHT'; break;
        default: break;
      }
      if (newDir) {
        event.preventDefault();
        processDirectionChange(newDir);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [processDirectionChange]);

  useEffect(() => {
    if (!isRunning || isGameOver) {
      if (gameLoopTimeoutRef.current) clearTimeout(gameLoopTimeoutRef.current);
      return;
    }

    const gameLoop = () => {
      currentDirectionRef.current = nextDirectionRef.current;
      setSnake(prevSnake => {
        if (prevSnake.length === 0 && !isGameOver) return []; // Should not happen in normal flow
        if (isGameOver) return prevSnake; // Prevent updates if game over was set mid-tick

        const newHead = { ...prevSnake[0] };
        const move = DIRECTIONS[currentDirectionRef.current];
        newHead.x += move.x;
        newHead.y += move.y;

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          setIsRunning(false);
          if (onGameOver) onGameOver(score);
          return prevSnake;
        }

        for (let i = 1; i < prevSnake.length; i++) {
          if (prevSnake[i].x === newHead.x && prevSnake[i].y === newHead.y) {
            setIsGameOver(true);
            setIsRunning(false);
            if (onGameOver) onGameOver(score);
            return prevSnake;
          }
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          generateFood(); 
        } else {
          newSnake.pop(); 
        }
        return newSnake;
      });

      if (!isGameOver && isRunning) { // Double check flags before scheduling next tick
         gameLoopTimeoutRef.current = setTimeout(gameLoop, GAME_SPEED_MS);
      }
    };
    
    // Initial call to start the loop if not already over
    if (!isGameOver && isRunning) {
        gameLoopTimeoutRef.current = setTimeout(gameLoop, GAME_SPEED_MS);
    }

    return () => clearTimeout(gameLoopTimeoutRef.current);
  }, [isRunning, isGameOver, food, score, generateFood, onGameOver]); // Added food, score, generateFood as dependencies

  return {
    snake,
    food,
    score,
    isGameOver,
    isRunning,
    gridSize: GRID_SIZE,
    startGame,
    changeDirection: processDirectionChange,
  };
}
