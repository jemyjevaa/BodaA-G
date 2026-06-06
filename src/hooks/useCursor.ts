import { useState, useEffect } from 'react';

interface CursorState {
  mousePos: { x: number; y: number };
  ringPos: { x: number; y: number };
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  cursorHoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function useCursor(): CursorState {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const updateRing = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mousePos]);

  return {
    mousePos,
    ringPos,
    isHovered,
    setIsHovered,
    cursorHoverProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
}
