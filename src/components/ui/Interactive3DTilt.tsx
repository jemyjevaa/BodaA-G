import { useRef } from 'react';

interface Interactive3DTiltProps {
  children: React.ReactNode;
  maxRotation?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Interactive3DTilt({
  children, maxRotation = 5, className = '', style = {},
}: Interactive3DTiltProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setTilt = (px: number, py: number, scale = '1.015') => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', `${(py - 0.5) * -2 * maxRotation}deg`);
    el.style.setProperty('--tilt-ry', `${(px - 0.5) * 2 * maxRotation}deg`);
    el.style.setProperty('--glint-x', `${px * 100}%`);
    el.style.setProperty('--glint-y', `${py * 100}%`);
    el.style.setProperty('--card-scale', scale);
  };

  const resetTilt = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--card-scale', '1');
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const t = e.touches[0];
    setTilt(
      Math.max(0, Math.min(1, (t.clientX - rect.left) / rect.width)),
      Math.max(0, Math.min(1, (t.clientY - rect.top) / rect.height)),
    );
  };

  const positionClass =
    className.includes('absolute') || className.includes('fixed') || className.includes('relative')
      ? ''
      : 'relative';

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
      onTouchMove={onTouchMove}
      onTouchEnd={resetTilt}
      className={`transition-all duration-300 ease-out select-none group ${positionClass} ${className}`}
      style={{
        transform:
          'perspective(1000px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg)) scale(var(--card-scale, 1))',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] mix-blend-overlay opacity-0 group-hover:opacity-45 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at var(--glint-x, 50%) var(--glint-y, 50%), rgba(255,245,220,0.35) 0%, transparent 60%)',
          zIndex: 19,
        }}
      />
    </div>
  );
}
