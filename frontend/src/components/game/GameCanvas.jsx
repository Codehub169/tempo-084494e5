import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import {
  SNAKE_COLOR,
  SNAKE_HEAD_COLOR,
  FOOD_COLOR,
  CANVAS_BG_COLOR,
  GAME_OVER_TEXT_COLOR
} from '../../utils/constants';

const GameCanvas = ({ snake, food, gridSize, isGameOver, isRunning }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [tileSize, setTileSize] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const drawGame = useCallback(() => {
    if (!canvasRef.current || tileSize === 0 || !canvasSize.width || !canvasSize.height) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (food && food.x !== undefined && food.y !== undefined) {
      ctx.fillStyle = FOOD_COLOR;
      ctx.beginPath();
      ctx.arc(
        food.x * tileSize + tileSize / 2,
        food.y * tileSize + tileSize / 2,
        tileSize / 2.8, 
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    if (snake && snake.length > 0) {
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
        const segmentRadius = (tileSize - (index === 0 ? 1 : 2.5)) / 2;
        ctx.beginPath();
        ctx.arc(
            segment.x * tileSize + tileSize / 2,
            segment.y * tileSize + tileSize / 2,
            Math.max(1, segmentRadius),
            0, 2 * Math.PI
        );
        ctx.fill();
      });
    }

    if (isGameOver) {
      ctx.fillStyle = 'rgba(16, 16, 26, 0.85)'; // Darker overlay, theme-background with alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = Math.max(16, tileSize * 1.5);
      ctx.font = `bold ${fontSize}px Poppins`; 
      ctx.fillStyle = GAME_OVER_TEXT_COLOR;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }
  }, [snake, food, tileSize, gridSize, isGameOver, canvasSize, SNAKE_COLOR, SNAKE_HEAD_COLOR, FOOD_COLOR, CANVAS_BG_COLOR, GAME_OVER_TEXT_COLOR]);

  useLayoutEffect(() => {
    const calculateAndSetSize = () => {
      if (containerRef.current && canvasRef.current && gridSize > 0) {
        const container = containerRef.current;
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;
        
        const maxDim = Math.min(availableWidth, availableHeight) - 10; 
        const newTileSize = Math.max(5, Math.floor(maxDim / gridSize)); 
        
        const newCanvasWidth = gridSize * newTileSize;
        const newCanvasHeight = gridSize * newTileSize;

        if (newTileSize > 0 && newCanvasWidth > 0 && newCanvasHeight > 0) {
          setTileSize(newTileSize);
          setCanvasSize({ width: newCanvasWidth, height: newCanvasHeight });
        } else {
          // Fallback if calculation results in invalid dimensions
          setTileSize(0);
          setCanvasSize({ width: 0, height: 0 });
        }
      }
    };

    calculateAndSetSize();
    window.addEventListener('resize', calculateAndSetSize);
    return () => window.removeEventListener('resize', calculateAndSetSize);
  }, [gridSize]);

  useEffect(() => {
    if (canvasRef.current && canvasSize.width > 0 && canvasSize.height > 0) {
      canvasRef.current.width = canvasSize.width;
      canvasRef.current.height = canvasSize.height;
      drawGame(); 
    } else if (canvasRef.current) {
       // Clear canvas if size is invalid to prevent showing stale content
      canvasRef.current.width = 0;
      canvasRef.current.height = 0;
    }
  }, [canvasSize, drawGame]);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center p-1 sm:p-2">
      <canvas 
        ref={canvasRef} 
        className="bg-theme-surface rounded-lg shadow-xl"
      />
    </div>
  );
};

export default GameCanvas;
