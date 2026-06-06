import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; length: number; speedX: number; speedY: number;
  amplitude: number; frequency: number; opacity: number; width: number;
}

export default function CoastalBreezeParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = width < 768 ? 22 : 55;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      length: Math.random() * 90 + 35, speedX: Math.random() * 0.35 + 0.15,
      speedY: Math.random() * 0.25 + 0.1, amplitude: Math.random() * 12 + 4,
      frequency: Math.random() * 0.004 + 0.001, opacity: Math.random() * 0.16 + 0.04,
      width: Math.random() * 0.8 + 0.4,
    }));

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.55;
      for (const p of particles) {
        const cx = p.x + Math.sin(p.y * p.frequency + time * 0.015) * p.amplitude;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(192, 169, 126, ${p.opacity})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.moveTo(cx, p.y);
        ctx.lineTo(cx + p.length * 0.45, p.y + p.length * 0.35);
        ctx.stroke();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y > height + 60) { p.y = -60; p.x = Math.random() * width; }
        if (p.x > width + 60) { p.x = -60; p.y = Math.random() * height; }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-65"
    />
  );
}
