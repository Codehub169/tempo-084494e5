import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';

// Hex colors from HTML previews / Tailwind config
const SNAKE_COLOR = '#00f0c0';       // theme-snake / var(--snake-color)
const SNAKE_HEAD_COLOR = '#32ff7e';  // theme-snake-head / var(--snake-head-color)
const FOOD_COLOR = '#ff6b81';       // theme-food / var(--food-color)
const CANVAS_BG_COLOR = '#181828';  // theme-game-bg / var(--game-bg)

const GameCanvas = ({ snake, food, gridSize, isGameOver, isRunning }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tileSize, setTileSize] = useState(0); // Initialize with 0 to ensure first calc
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const drawGame = useCallback(() => {
    if (!canvasRef.current || tileSize === 0 || !canvasSize.width || !canvasSize.height) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (food) {
      ctx.fillStyle = FOOD_COLOR;
      ctx.beginPath();
      ctx.arc(
        food.x * tileSize + tileSize / 2,
        food.y * tileSize + tileSize / 2,
        tileSize / 2.8, // Slightly smaller than cell, as in HTML example (2.5)
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    if (snake) {
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
        const segmentRadius = (tileSize - (index === 0 ? 1 : 2.5)) / 2; // Head slightly fuller
        ctx.beginPath();
        ctx.arc(
            segment.x * tileSize + tileSize / 2,
            segment.y * tileSize + tileSize / 2,
            Math.max(1, segmentRadius), // Ensure radius is at least 1
            0, 2 * Math.PI
        );
        ctx.fill();
      });
    }

    if (isGameOver) {
      ctx.fillStyle = 'rgba(16, 16, 26, 0.85)'; // Darker overlay, matching primary-bg with alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = Math.max(16, tileSize * 1.5); // Responsive font size
      ctx.font = `bold ${fontSize}px Poppins`; 
      ctx.fillStyle = '#F44336'; // theme-danger
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }
  }, [snake, food, tileSize, gridSize, isGameOver, canvasSize]); // Added canvasSize

  useLayoutEffect(() => {
    const calculateAndSetSize = () => {
      if (containerRef.current && canvasRef.current) {
        const container = containerRef.current;
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;
        
        const maxDim = Math.min(availableWidth, availableHeight) - 20; // -20 for some padding around canvas
        const newTileSize = Math.max(5, Math.floor(maxDim / gridSize)); 
        
        const newCanvasWidth = gridSize * newTileSize;
        const newCanvasHeight = gridSize * newTileSize;

        setTileSize(newTileSize);
        setCanvasSize({ width: newCanvasWidth, height: newCanvasHeight });

        // Directly set canvas element size after state update is processed
        // This will be handled by the useEffect for canvasRef.current properties
      }
    };

    calculateAndSetSize();
    window.addEventListener('resize', calculateAndSetSize);
    return () => window.removeEventListener('resize', calculateAndSetSize);
  }, [gridSize]);

  // Effect to update canvas actual width/height when canvasSize state changes
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasSize.width;
      canvasRef.current.height = canvasSize.height;
      // After canvas dimensions are set, trigger a draw if game is running or just ended
      if (isRunning || isGameOver || (snake && snake.length > 0)) {
        drawGame();
      }
    }
  }, [canvasSize, isRunning, isGameOver, snake, drawGame]);

  // Initial and subsequent draws
  useEffect(() => {
    drawGame();
  }, [drawGame]); // drawGame is memoized and includes all its dependencies

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center p-2 sm:p-4">
      <canvas 
        ref={canvasRef} 
        className="bg-theme-game-bg rounded-lg shadow-xl"
        // Width and height are set dynamically via JS
      />
    </div>
  );
};

export default GameCanvas;
