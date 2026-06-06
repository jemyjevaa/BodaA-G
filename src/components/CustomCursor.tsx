interface CustomCursorProps {
  mousePos: { x: number; y: number };
  ringPos: { x: number; y: number };
  isHovered: boolean;
}

export default function CustomCursor({ mousePos, ringPos, isHovered }: CustomCursorProps) {
  return (
    <>
      {/* Dot */}
      <div
        className="hidden lg:block fixed rounded-full pointer-events-none z-[20000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200"
        style={{
          left: mousePos.x, top: mousePos.y,
          width: isHovered ? 4 : 6, height: isHovered ? 4 : 6,
          backgroundColor: isHovered ? '#52644E' : '#C0A97E',
        }}
      />
      {/* Ring */}
      <div
        className="hidden lg:block fixed border rounded-full pointer-events-none z-[19999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-100 ease-out"
        style={{
          left: ringPos.x, top: ringPos.y,
          width: isHovered ? 42 : 28, height: isHovered ? 42 : 28,
          borderColor: isHovered ? '#C0A97E' : 'rgba(192,169,126,0.4)',
          backgroundColor: isHovered ? 'rgba(197,168,128,0.05)' : 'transparent',
          transform: `translate(-50%,-50%) scale(${isHovered ? 1.1 : 1})`,
        }}
      />
    </>
  );
}
