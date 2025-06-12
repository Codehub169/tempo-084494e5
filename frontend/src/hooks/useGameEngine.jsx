import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GRID_SIZE,
  INITIAL_SNAKE_LENGTH,
  GAME_SPEED_MS,
  KEY_DIRECTIONS
} from '../utils/constants';

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

  const snakeRef = useRef(snake);
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  const resetGameState = useCallback(() => {
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    const initialSnake = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: startX - i, y: startY });
    }
    setSnake(initialSnake);
    snakeRef.current = initialSnake;

    currentDirectionRef.current = 'RIGHT';
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setIsGameOver(false);
    setFood(getRandomPosition(GRID_SIZE, initialSnake)); 
  }, []); // GRID_SIZE, INITIAL_SNAKE_LENGTH are module constants, not reactive

  const generateFood = useCallback(() => {
    setFood(getRandomPosition(GRID_SIZE, snakeRef.current));
  }, []); // GRID_SIZE is a module constant, snakeRef.current is a ref

  const startGame = useCallback(() => {
    resetGameState();
    setIsRunning(true);
  }, [resetGameState]);

  const processDirectionChange = useCallback((requestedDirection) => {
    if (!isRunning || isGameOver || !DIRECTIONS[requestedDirection]) return;
    if (currentDirectionRef.current !== OPPOSITE_DIRECTIONS[requestedDirection]) {
      nextDirectionRef.current = requestedDirection;
    }
  }, [isRunning, isGameOver]); // DIRECTIONS, OPPOSITE_DIRECTIONS are module constants

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newDir = KEY_DIRECTIONS[event.key];
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
        if (isGameOver || prevSnake.length === 0) return prevSnake; 

        const newHead = { ...prevSnake[0] };
        const move = DIRECTIONS[currentDirectionRef.current];
        newHead.x += move.x;
        newHead.y += move.y;

        let scoreForThisTick = score; // Use score from useEffect closure
        let foodEatenThisTick = false;

        if (newHead.x === food.x && newHead.y === food.y) {
          foodEatenThisTick = true;
          scoreForThisTick += 1;
        }

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          setIsRunning(false);
          if (onGameOver) onGameOver(scoreForThisTick);
          return prevSnake;
        }

        // Self collision
        for (let i = 1; i < prevSnake.length; i++) {
          if (prevSnake[i].x === newHead.x && prevSnake[i].y === newHead.y) {
            setIsGameOver(true);
            setIsRunning(false);
            if (onGameOver) onGameOver(scoreForThisTick);
            return prevSnake;
          }
        }

        const newSnakeUnpopped = [newHead, ...prevSnake];

        if (foodEatenThisTick) {
          setScore(s => s + 1); // Or setScore(scoreForThisTick)
          generateFood(); 
          return newSnakeUnpopped;
        } else {
          newSnakeUnpopped.pop(); 
          return newSnakeUnpopped;
        }
      });

      if (isRunning && !isGameOver) { 
         gameLoopTimeoutRef.current = setTimeout(gameLoop, GAME_SPEED_MS);
      }
    };
    
    gameLoopTimeoutRef.current = setTimeout(gameLoop, GAME_SPEED_MS);

    return () => clearTimeout(gameLoopTimeoutRef.current);
  }, [isRunning, isGameOver, food, score, generateFood, onGameOver]); 

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
