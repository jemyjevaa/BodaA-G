import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img2 from '../assets/Image2.jpg';

interface EnvelopeIntroProps {
  onBegin: () => void;
  onComplete: () => void;
}

type Phase = 'idle' | 'opening' | 'open' | 'exit';

// Ornamento decorativo ─◇─
function Ornament({ color = 'rgba(192,169,126,0.55)', width = 72 }: { color?: string; width?: number }) {
  return (
    <svg width={width} height={10} viewBox={`0 0 ${width} 10`} fill="none">
      <line x1="0" y1="5" x2={width / 2 - 7} y2="5" stroke={color} strokeWidth="0.7"/>
      <polygon
        points={`${width/2},1 ${width/2+5},5 ${width/2},9 ${width/2-5},5`}
        fill="none" stroke={color} strokeWidth="0.7"
      />
      <line x1={width / 2 + 7} y1="5" x2={width} y2="5" stroke={color} strokeWidth="0.7"/>
    </svg>
  );
}

// Marco de esquinas para la carta
function CornerFrame({ size = 14, color = 'rgba(192,169,126,0.45)', inset = 10 }: { size?: number; color?: string; inset?: number }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
      {/* Esquina superior izquierda */}
      <path d={`M ${inset} ${inset + size/3} L ${inset} ${inset} L ${inset + size/3} ${inset}`} stroke={color} strokeWidth="0.6"/>
      {/* Esquina superior derecha */}
      <path d={`M ${100-inset-size/3} ${inset} L ${100-inset} ${inset} L ${100-inset} ${inset+size/3}`} stroke={color} strokeWidth="0.6"/>
      {/* Esquina inferior izquierda */}
      <path d={`M ${inset} ${100-inset-size/3} L ${inset} ${100-inset} L ${inset+size/3} ${100-inset}`} stroke={color} strokeWidth="0.6"/>
      {/* Esquina inferior derecha */}
      <path d={`M ${100-inset-size/3} ${100-inset} L ${100-inset} ${100-inset} L ${100-inset} ${100-inset-size/3}`} stroke={color} strokeWidth="0.6"/>
    </svg>
  );
}

export default function EnvelopeIntro({ onBegin, onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<Phase>('idle');

  const handleStart = () => {
    if (phase !== 'idle') return;
    onBegin();
    setPhase('opening');
    setTimeout(() => setPhase('open'),  1600);
    setTimeout(() => setPhase('exit'),  4200);
    setTimeout(() => onComplete(),       5500);
  };

  const isAnimating = phase !== 'idle';

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="env"
          className="fixed inset-0 z-[10005] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 1.2, ease: [0.4, 0, 1, 1] } }}
        >
          {/* Fondo: foto de boda muy oscurecida */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img2})`, filter: 'brightness(0.15) saturate(0.35)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(10,7,4,0.4) 0%, rgba(5,3,1,0.75) 100%)' }} />

          {/* ══ SOBRE ══ */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: 'min(88vw, 500px)', height: 'min(60vw, 340px)', zIndex: 1 }}
          >

            {/* ── Cuerpo del sobre ── */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: '#EDE7DA',
              border: '1px solid rgba(192,169,126,0.5)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06) inset',
            }}>
              {/* Textura de papel: patrón diagonal sutil */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(192,169,126,0.05) 0px, rgba(192,169,126,0.05) 1px, transparent 1px, transparent 8px)',
                backgroundSize: '8px 8px',
              }} />

              {/* Pliegues V inferiores con gradiente dorado */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                viewBox="0 0 500 340" preserveAspectRatio="none" fill="none">
                <line x1="0"   y1="340" x2="250" y2="170" stroke="rgba(192,169,126,0.3)" strokeWidth="1"/>
                <line x1="500" y1="340" x2="250" y2="170" stroke="rgba(192,169,126,0.3)" strokeWidth="1"/>
                {/* Línea base del sobre */}
                <line x1="0" y1="339" x2="500" y2="339" stroke="rgba(192,169,126,0.25)" strokeWidth="0.7"/>
              </svg>

              {/* Puntos decorativos en esquinas inferiores */}
              <div style={{ position: 'absolute', bottom: 10, left: 12, width: 3, height: 3, borderRadius: '50%', background: 'rgba(192,169,126,0.4)' }} />
              <div style={{ position: 'absolute', bottom: 10, right: 12, width: 3, height: 3, borderRadius: '50%', background: 'rgba(192,169,126,0.4)' }} />

              {/* Contenido en idle: iniciales + fecha + botón */}
              <motion.div
                animate={{ opacity: isAnimating ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  pointerEvents: isAnimating ? 'none' : 'auto',
                  position: 'absolute',
                  top: '48%', left: 0, right: 0, bottom: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 'clamp(6px, 1.8vw, 10px)',
                  paddingBottom: 'clamp(8px, 2vw, 14px)',
                }}
              >
                {/* Monograma */}
                <div style={{
                  fontFamily: '"Cinzel Decorative", serif',
                  fontSize: 'clamp(16px, 5vw, 24px)',
                  color: '#6B5535',
                  letterSpacing: '0.18em',
                  display: 'flex', alignItems: 'center',
                  gap: 'clamp(6px, 1.8vw, 10px)',
                  lineHeight: 1,
                }}>
                  <span>A</span>
                  <span style={{
                    fontFamily: '"Melodrama", Georgia, serif',
                    fontStyle: 'italic', fontWeight: 300,
                    fontSize: '0.65em', color: '#9A7D56',
                    transform: 'translateY(-1px)', display: 'inline-block',
                  }}>&amp;</span>
                  <span>G</span>
                </div>

                {/* Ornamento */}
                <Ornament color="rgba(107,85,53,0.35)" width={56} />

                {/* Fecha */}
                <span style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: 'clamp(5px, 1.5vw, 6.5px)',
                  letterSpacing: '0.4em', color: '#9A7D56',
                  textTransform: 'uppercase',
                }}>IV · IX · MMXXVI</span>

                {/* Botón Comenzar */}
                <button onClick={handleStart} style={{
                  marginTop: 'clamp(2px, 1vw, 6px)',
                  padding: 'clamp(6px, 1.6vw, 9px) clamp(16px, 4.5vw, 26px)',
                  border: '1px solid rgba(107,85,53,0.45)',
                  borderRadius: 9999,
                  background: 'transparent',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: 'clamp(5.5px, 1.5vw, 6.5px)',
                  letterSpacing: '0.4em',
                  color: '#6B5535',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}>
                  Comenzar
                </button>
              </motion.div>
            </div>

            {/* ── Carta emergente ── */}
            <motion.div
              animate={{
                y:       phase === 'open' ? '-54%' : '6%',
                opacity: isAnimating ? 1 : 0,
                scale:   isAnimating ? 1 : 0.97,
              }}
              transition={{
                y:       { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: isAnimating ? 0.6 : 0 },
                opacity: { duration: 0.7, ease: 'easeOut',          delay: isAnimating ? 0.4 : 0 },
                scale:   { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: isAnimating ? 0.4 : 0 },
              }}
              style={{
                position: 'absolute',
                left: '8%', right: '8%',
                top: '8%', bottom: '8%',
                backgroundColor: '#FFFEF9',
                boxShadow: '0 12px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(192,169,126,0.2)',
                zIndex: 2,
                pointerEvents: 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 'clamp(5px, 1.4vw, 9px)',
                padding: '0 8%',
              }}
            >
              {/* Marco de esquinas */}
              <CornerFrame size={16} color="rgba(192,169,126,0.5)" inset={9} />

              {/* Ornamento superior */}
              <Ornament width={60} color="rgba(192,169,126,0.5)" />

              {/* Monograma grande */}
              <div style={{
                fontFamily: '"Cinzel Decorative", serif',
                fontSize: 'clamp(20px, 6vw, 30px)',
                color: '#C0A97E',
                letterSpacing: '0.16em',
                lineHeight: 1,
                display: 'flex', alignItems: 'center',
                gap: 'clamp(8px, 2.2vw, 14px)',
              }}>
                <span>A</span>
                <span style={{
                  fontFamily: '"Melodrama", Georgia, serif',
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: '0.6em', color: '#A38971',
                  transform: 'translateY(-1px)', display: 'inline-block',
                }}>&amp;</span>
                <span>G</span>
              </div>

              {/* Línea dorada */}
              <div style={{ width: 'clamp(36px, 10vw, 52px)', height: 1, background: 'rgba(192,169,126,0.6)' }} />

              {/* Nombres completos */}
              <div style={{
                fontFamily: '"Melodrama", Georgia, serif',
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(11px, 3.2vw, 17px)',
                color: '#4A3820',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textAlign: 'center',
              }}>
                Andrea &amp; Gustavo
              </div>

              {/* Ornamento */}
              <Ornament width={52} color="rgba(192,169,126,0.45)" />

              {/* Fecha */}
              <span style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: 'clamp(5px, 1.4vw, 6.5px)',
                letterSpacing: '0.34em', color: '#A38971',
                textTransform: 'uppercase',
              }}>4 de Septiembre · 2026</span>

              {/* Lugar */}
              <span style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontStyle: 'italic',
                fontSize: 'clamp(5px, 1.3vw, 6px)',
                letterSpacing: '0.2em', color: '#B89A70',
                textTransform: 'uppercase',
              }}>Puerto Vallarta · Jalisco</span>
            </motion.div>

            {/* ── Solapa ── */}
            <motion.div
              animate={{ scaleY: isAnimating ? 0 : 1 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.08, 1] }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '50%',
                transformOrigin: 'top center',
                zIndex: 3, pointerEvents: 'none',
              }}
            >
              {/* Triángulo de la solapa */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
                viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Relleno con gradiente de dirección */}
                <defs>
                  <linearGradient id="flapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#E8E1D2"/>
                    <stop offset="100%" stopColor="#DDD5C3"/>
                  </linearGradient>
                </defs>
                <polygon points="0,0 100,0 50,84" fill="url(#flapGrad)"/>
                {/* Borde dorado de los lados del triángulo */}
                <polyline points="0,0 50,84 100,0" fill="none" stroke="rgba(192,169,126,0.5)" strokeWidth="0.6"/>
                {/* Línea de pliegue superior */}
                <line x1="0" y1="0.3" x2="100" y2="0.3" stroke="rgba(192,169,126,0.5)" strokeWidth="0.6"/>
              </svg>

              {/* Sello de cera */}
              <div style={{
                position: 'absolute',
                bottom: '18%', left: '50%', transform: 'translateX(-50%)',
                width: 'clamp(36px, 10vw, 50px)', height: 'clamp(36px, 10vw, 50px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 28%, #E8CB8A, #B8893C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(168,131,74,0.65), 0 0 0 1.5px rgba(192,169,126,0.3)',
              }}>
                {/* Anillo interior del sello */}
                <div style={{
                  position: 'absolute', inset: 4,
                  borderRadius: '50%',
                  border: '0.5px solid rgba(255,255,255,0.25)',
                }}/>
                <span style={{
                  fontFamily: '"Cinzel Decorative", serif',
                  fontSize: 'clamp(6px, 1.8vw, 8px)',
                  color: 'rgba(255,255,255,0.96)',
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  position: 'relative', zIndex: 1,
                }}>A&amp;G</span>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
