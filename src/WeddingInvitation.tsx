import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import { motion } from 'framer-motion';
=======
>>>>>>> develop
import img1 from './assets/image1.jpg';
import img2 from './assets/Image2.jpg';
import img3 from './assets/image3.jpg';
import img4 from './assets/image4.jpg';
import img5 from './assets/image5.jpg';
import img6 from './assets/image6.jpg';
<<<<<<< HEAD

// ══════════════════════════════════════════════════
// GOOGLE SHEETS WEBHOOK — URL de tu Apps Script
// ══════════════════════════════════════════════════
const SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyqZbKcG4vl8fLjJbcoTr0Dr6spfOMcZzUZlADSLo3cD1KVIbCWYns3yJNOB5XoAwoG/exec';

// ══════════════════════════════════════════════════
// MEGA FILE REQUEST — pega aquí tu URL de solicitud de archivo
// Cómo obtenerla: MEGA → clic derecho en tu carpeta → "Nueva solicitud de archivo"
// ══════════════════════════════════════════════════
const MEGA_FILE_REQUEST = 'https://mega.nz/filerequest/cyvG56iiltU';

// ══════════════════════════════════════════════════
// TYPES & INTERFACES
// ══════════════════════════════════════════════════
interface RSVPData {
  nombre: string;
  asistencia: 'si' | 'no' | '';
  personas: number;
  telefono: string;
  dieta: string;
  alergiaDetalles: string;
  mensaje: string;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// ══════════════════════════════════════════════════
// AUXILIARY VISUAL EFFECT COMPONENTS
// ══════════════════════════════════════════════════

// 1. "Destello de Sol sobre el Agua" (Shimmer shine gradient overlay)
function SunGlintOverlay({ periodic = true }: { periodic?: boolean }) {
  return (
    <div 
      className={`sun-glint-effect absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] ${periodic ? 'animate-sunGlint' : ''}`} 
    />
  );
}

// 2. "Viento en el Lino" Canvas Particles (Diagonal silk golden breeze filaments)
function CoastalBreezeParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = isMobile ? 22 : 55;
    
    interface Particle {
      x: number;
      y: number;
      length: number;
      speedX: number;
      speedY: number;
      amplitude: number;
      frequency: number;
      opacity: number;
      width: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 90 + 35,
        speedX: Math.random() * 0.35 + 0.15,
        speedY: Math.random() * 0.25 + 0.1,
        amplitude: Math.random() * 12 + 4,
        frequency: Math.random() * 0.004 + 0.001,
        opacity: Math.random() * 0.16 + 0.04,
        width: Math.random() * 0.8 + 0.4,
      });
    }

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.55;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        const currentX = p.x + Math.sin(p.y * p.frequency + time * 0.015) * p.amplitude;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(192, 169, 126, ${p.opacity})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        
        ctx.moveTo(currentX, p.y);
        ctx.lineTo(currentX + p.length * 0.45, p.y + p.length * 0.35);
        ctx.stroke();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > height + 60) {
          p.y = -60;
          p.x = Math.random() * width;
        }
        if (p.x > width + 60) {
          p.x = -60;
          p.y = Math.random() * height;
        }
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

// 3. GPU-Accelerated 3D Tilt Container with Cursor-Following Sheen
interface Interactive3DTiltProps {
  children: React.ReactNode;
  maxRotation?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Interactive3DTilt({ children, maxRotation = 5, className = '', style = {} }: Interactive3DTiltProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rx = (py - 0.5) * -2 * maxRotation;
    const ry = (px - 0.5) * 2 * maxRotation;

    el.style.setProperty('--tilt-rx', `${rx}deg`);
    el.style.setProperty('--tilt-ry', `${ry}deg`);
    el.style.setProperty('--glint-x', `${px * 100}%`);
    el.style.setProperty('--glint-y', `${py * 100}%`);
    el.style.setProperty('--card-scale', '1.015');
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--card-scale', '1');
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || e.touches.length === 0) return;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const px = Math.max(0, Math.min(1, x / rect.width));
    const py = Math.max(0, Math.min(1, y / rect.height));

    const rx = (py - 0.5) * -2 * maxRotation;
    const ry = (px - 0.5) * 2 * maxRotation;

    el.style.setProperty('--tilt-rx', `${rx}deg`);
    el.style.setProperty('--tilt-ry', `${ry}deg`);
    el.style.setProperty('--glint-x', `${px * 100}%`);
    el.style.setProperty('--glint-y', `${py * 100}%`);
    el.style.setProperty('--card-scale', '1.015');
  };

  const handleTouchEnd = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
    el.style.setProperty('--card-scale', '1');
  };

  const positionClass = className.includes('absolute') || className.includes('fixed') || className.includes('relative') ? '' : 'relative';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`transition-all duration-300 ease-out select-none group ${positionClass} ${className}`}
      style={{
        transform: 'perspective(1000px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg)) scale(var(--card-scale, 1))',
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      {children}
      {/* Light sheen overlay following mouse cursor dynamically */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] mix-blend-overlay opacity-0 group-hover:opacity-45 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--glint-x, 50%) var(--glint-y, 50%), rgba(255, 245, 220, 0.35) 0%, transparent 60%)',
          zIndex: 19
        }}
      />
    </div>
  );
}

// 4. Elegant Text Word-by-Word Scroll Reveal Animation
interface ElegantTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

function ElegantTextReveal({ text, className = '', delay = 0 }: ElegantTextRevealProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  };

  const childVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      }
    }
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden py-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span className="inline-block" variants={childVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
=======
import musicTrack from './music/ti-amo.mp3';
import videoBg from './assets/video_web.mp4';

import { SHEET_WEBHOOK, MEGA_FILE_REQUEST } from './config';
import type { RSVPData } from './types';
import { useCountdown } from './hooks/useCountdown';
import { useCursor } from './hooks/useCursor';
import { useScrollReveal } from './hooks/useScrollReveal';
import CustomCursor from './components/CustomCursor';
import AudioControl from './components/AudioControl';
import Lightbox from './components/Lightbox';
import EnvelopeIntro from './components/EnvelopeIntro';
import SunGlintOverlay from './components/ui/SunGlintOverlay';
import CoastalBreezeParticles from './components/ui/CoastalBreezeParticles';
import Interactive3DTilt from './components/ui/Interactive3DTilt';
import ElegantTextReveal from './components/ui/ElegantTextReveal';


>>>>>>> develop

export default function WeddingInvitation() {
  // ══════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ══════════════════════════════════════════════════

<<<<<<< HEAD
  // Interactive Entry states (3D Envelope & Preloader)
  const [isPreloaderHidden, setIsPreloaderHidden] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isEnvelopeFadeOut, setIsEnvelopeFadeOut] = useState(false);
=======
  // Entry & scroll state
>>>>>>> develop
  const [isScrollUnlocked, setIsScrollUnlocked] = useState(false);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
<<<<<<< HEAD

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
=======
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Countdown — via hook
  const timeLeft = useCountdown('2026-09-04T15:00:00');
>>>>>>> develop

  // RSVP Step-by-Step Flow states
  const [rsvpStep, setRsvpStep] = useState<1 | 2 | 3 | 4>(1);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState(false);
  const [rsvpData, setRsvpData] = useState<RSVPData>({
    nombre: '',
    asistencia: '',
    personas: 1,
    telefono: '',
    dieta: 'sin_restriccion',
    alergiaDetalles: '',
    mensaje: ''
  });

  // Dynamic Photo Lookbook states
  const [initialPhotos] = useState<string[]>([img2, img5, img6, img3, img4]);

  // Lightbox Viewer state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

<<<<<<< HEAD
  // Custom Cursor coordinates (Desktop only)
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
=======
  // Cursor — via hook
  const { mousePos, ringPos, isHovered, cursorHoverProps } = useCursor();

  // Scroll reveal — via hook
  useScrollReveal(isScrollUnlocked);
>>>>>>> develop

  const allPhotos = initialPhotos;

  // ══════════════════════════════════════════════════
  // EFFECTS
  // ══════════════════════════════════════════════════

<<<<<<< HEAD
  // 1. Initial preloader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderHidden(true);
    }, 2400);
    // Lock body scrolling by default
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Astronomical Countdown clock logic
  useEffect(() => {
    const target = new Date('2026-09-04T15:00:00');

    const calculateTime = () => {
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: '000', hours: '00', minutes: '00', seconds: '00' });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setTimeLeft({
        days: String(d).padStart(3, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Custom cursor tracker (smooth lag using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const updateRing = () => {
      setRingPos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mousePos]);

  // 4. Scroll Reveal Intersection Observer
  useEffect(() => {
    if (!isScrollUnlocked) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isScrollUnlocked]);

  // 5. Manage body overflow unlock
  useEffect(() => {
    if (isScrollUnlocked) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
=======
  // Precarga audio en memoria al montar + bloquea scroll hasta que el usuario entre
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Precarga el audio como blob para reproducción instantánea al tocar.
    // Solo actualiza el src si el audio NO está sonando, para evitar
    // interrumpir una reproducción que ya inició.
    fetch(musicTrack)
      .then(r => r.blob())
      .then(blob => {
        if (!audioRef.current) return;
        if (!audioRef.current.paused) return; // ya sonando — no interrumpir
        const url = URL.createObjectURL(blob);
        audioRef.current.src = url;
        audioRef.current.load();
      })
      .catch(() => {});
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Desbloquea el scroll al entrar
  useEffect(() => {
    if (isScrollUnlocked) document.body.style.overflow = '';
    else document.body.style.overflow = 'hidden';
>>>>>>> develop
  }, [isScrollUnlocked]);

  // ══════════════════════════════════════════════════
  // ACTIONS & HANDLERS
  // ══════════════════════════════════════════════════

<<<<<<< HEAD
  // 3D Envelope Opening Trigger
  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);

    // Audio elements fade-in
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        const interval = setInterval(() => {
          vol += 0.05;
          if (vol >= 0.5) {
            if (audioRef.current) audioRef.current.volume = 0.5;
            clearInterval(interval);
          } else {
            if (audioRef.current) audioRef.current.volume = vol;
          }
        }, 80);
      }).catch(err => {
        console.log("Audio play blocked by browser sandbox policy.", err);
      });
    }

    // Fades and unlock scroll timeouts
    setTimeout(() => {
      setIsEnvelopeFadeOut(true);
    }, 2600);

    setTimeout(() => {
      setIsScrollUnlocked(true);
    }, 3800);
  };

  // Toggle Audio Playback
  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
=======
  // El usuario presionó "Comenzar" en el sobre → inicia música + video
  const handleBegin = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  // El sobre terminó su animación → mostrar la invitación
  const handleEnvelopeComplete = () => {
    setIsScrollUnlocked(true);
  };

  // Botón inferior: pausa / reanuda
  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
>>>>>>> develop
    }
  };

  // RSVP Form Progression
  const handleNextStep = async () => {
    if (rsvpStep === 1) {
      if (rsvpData.nombre.trim()) setRsvpStep(2);
      return;
    }
    if (rsvpStep === 2 && !rsvpData.asistencia) return;
    if (rsvpStep === 2) {
      rsvpData.asistencia === 'no' ? await handleSubmitRSVP() : setRsvpStep(3);
    } else if (rsvpStep === 3) {
      await handleSubmitRSVP();
    }
  };

  // RSVP Submit → Google Sheets via Apps Script webhook
  const handleSubmitRSVP = async () => {
    setRsvpLoading(true);
    setRsvpError(false);

    const payload = {
      fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
      nombre: rsvpData.nombre,
      telefono: rsvpData.telefono || '—',
      asistencia: rsvpData.asistencia === 'si' ? 'Sí asiste' : 'No asiste',
      personas: rsvpData.asistencia === 'si' ? rsvpData.personas : 0,
      dieta: rsvpData.dieta,
      alergias: rsvpData.alergiaDetalles || '—',
      mensaje: rsvpData.mensaje || '—',
    };

    // Solo envía al webhook si ya tiene URL real configurada
    // mode: 'no-cors' evita el bloqueo CORS de Apps Script;
    // los datos llegan a la hoja aunque la respuesta sea opaca.
    if (SHEET_WEBHOOK.startsWith('https://')) {
      try {
        await fetch(SHEET_WEBHOOK, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('RSVP webhook error:', err);
      }
    }

    setRsvpLoading(false);
    setRsvpStep(4);
  };


  // Lightbox Navigation
  const navigateLightbox = (direction: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const total = allPhotos.length;
    setLightboxIndex((lightboxIndex + direction + total) % total);
  };

  // Google Calendar URL builder
  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    const title = encodeURIComponent("Boda de Andrea & Gustavo");
    const details = encodeURIComponent("¡Tenemos el honor de invitarlos a celebrar nuestro enlace matrimonial!\n\n15:00 hrs - Ceremonia Religiosa · Puerto Vallarta\n16:50 hrs - Ceremonia Frente al Mar · Puerto Vallarta\n18:00 hrs - Recepción · Puerto Vallarta\n23:30 hrs - After Party (Opcional) · Puerto Vallarta");
    const location = encodeURIComponent("Puerto Vallarta, Jalisco");
    const dates = "20260904T150000/20260905T030000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  // Download ICS File
  const handleDownloadICS = (e: React.MouseEvent) => {
    e.preventDefault();
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "CLASS:PUBLIC",
      "DESCRIPTION:¡Tenemos el honor de invitarlos a celebrar nuestro enlace matrimonial!\\n\\n15:00 hrs - Ceremonia Religiosa · Puerto Vallarta\\n16:50 hrs - Ceremonia Frente al Mar\\n18:00 hrs - Recepción\\n23:30 hrs - After Party (Opcional)",
      "DTSTART:20260904T150000",
      "DTEND:20260905T030000",
      "LOCATION:Puerto Vallarta\\, Jalisco",
      "SUMMARY:Boda de Andrea & Gustavo",
      "TRANSP:OPAQUE",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Boda_Andrea_y_Gustavo.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

<<<<<<< HEAD
  // Helper hover class injection
  const cursorHoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };
=======

>>>>>>> develop

  // ══════════════════════════════════════════════════
  // RENDER COMPONENT
  // ══════════════════════════════════════════════════
  return (
    <div className="bg-sand-50 selection:bg-accent-gold/20 selection:text-coastal-800 text-coastal-800 min-h-screen relative overflow-x-hidden w-full font-sans antialiased">

      {/* Live Waving Linen Background with HD Grain and Breeze Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-[-10%] w-[120%] h-[120%] linen-bg grain-overlay viento-lino-active"></div>
        <CoastalBreezeParticles />
      </div>

<<<<<<< HEAD
      {/* ══ CURSOR PERSONALIZADO (DESKTOP ONLY) ══ */}
      <div
        className="hidden lg:block fixed w-1.5 h-1.5 bg-accent-gold rounded-full pointer-events-none z-[20000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          backgroundColor: isHovered ? '#52644E' : '#C0A97E'
        }}
      />
      <div
        className="hidden lg:block fixed w-7 h-7 border border-accent-gold/40 rounded-full pointer-events-none z-[19999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color,transform] duration-[100ms] ease-out"
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          width: isHovered ? '42px' : '28px',
          height: isHovered ? '42px' : '28px',
          borderColor: isHovered ? '#C0A97E' : 'rgba(192, 169, 126, 0.4)',
          backgroundColor: isHovered ? 'rgba(197, 168, 128, 0.05)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`
        }}
      />

      {/* ══ CONTROL DE AUDIO FLOTANTE ══ */}
      <button
        onClick={handleToggleAudio}
        aria-label="Control de música ambiental"
        className="fixed bottom-6 right-6 z-[490] w-12 h-12 rounded-full bg-sand-50/80 backdrop-blur-md border border-sand-300/40 flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-105 hover:bg-sand-50 hover:border-accent-gold group cursor-none"
        {...cursorHoverProps}
      >
        <div className="audio-wave flex items-end gap-[3px] w-4 h-[14px]">
          <span className={`w-[2px] h-full bg-accent-gold rounded-[1px] origin-bottom animate-[bounceWave_1.2s_ease-in-out_infinite_alternate] ${isPlaying ? 'running' : 'paused'}`}></span>
          <span className={`w-[2px] h-full bg-accent-gold rounded-[1px] origin-bottom animate-[bounceWave_1.2s_ease-in-out_infinite_alternate_0.15s] ${isPlaying ? 'running' : 'paused'}`}></span>
          <span className={`w-[2px] h-full bg-accent-gold rounded-[1px] origin-bottom animate-[bounceWave_1.2s_ease-in-out_infinite_alternate_0.3s] ${isPlaying ? 'running' : 'paused'}`}></span>
          <span className={`w-[2px] h-full bg-accent-gold rounded-[1px] origin-bottom animate-[bounceWave_1.2s_ease-in-out_infinite_alternate_0.45s] ${isPlaying ? 'running' : 'paused'}`}></span>
        </div>
      </button>
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-delicate-piano-163.mp3" className="hidden" />

      {/* ══ SOBRE VIRTUAL 3D (ENTRADA INMERSIVA) ══ */}
      <div
        className={`fixed inset-0 z-[10005] bg-gradient-radial from-[#F5F0E6] to-[#D9CCAA] flex items-center justify-center overflow-hidden transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) perspective-[1600px] ${isEnvelopeFadeOut ? 'opacity-0 pointer-events-none invisible' : ''}`}
        style={{
          background: 'radial-gradient(circle at center, #F5F0E6 0%, #D9CCAA 100%)'
        }}
      >
        <div className="absolute font-display text-[140px] md:text-[280px] lg:text-[380px] text-accent-gold/[0.04] pointer-events-none select-none z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          A & G
        </div>

        {/* Outer 3D Envelope Base container */}
        <div
          onClick={handleOpenEnvelope}
          className={`relative w-[min(450px,90vw)] h-[310px] bg-coastal-800 rounded-lg border border-accent-gold/35 transition-all duration-[1000ms] cubic-bezier(0.2, 0.8, 0.2, 1) select-none cursor-none ${isEnvelopeOpen ? 'open rotate-x-12 rotate-y-0 rotate-z-0 translate-y-5 scale-95 shadow-2xl shadow-coastal-900/40' : 'rotate-x-16 -rotate-y-8 -rotate-z-3 hover:translate-y-[-5px] hover:rotate-x-10 hover:-rotate-y-3 hover:-rotate-z-1 hover:shadow-2xl shadow-coastal-900/30'}`}
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isEnvelopeOpen ? '0 25px 55px rgba(15, 26, 32, 0.45)' : '-15px 30px 50px rgba(15, 26, 32, 0.4)',
            transform: isEnvelopeOpen
              ? 'rotateX(12deg) rotateY(0deg) rotateZ(0deg) translateY(20px) scale(0.96)'
              : 'rotateX(16deg) rotateY(-8deg) rotateZ(-3deg)'
          }}
          {...cursorHoverProps}
        >
          {/* Inner luxury gold border frame */}
          <div className="absolute inset-3 border border-accent-gold/18 rounded-md pointer-events-none z-[2]"></div>

          {/* Silk Ribbon Vertical */}
          <div className="absolute top-0 bottom-0 left-[calc(50%-11px)] w-[22px] z-[3.5] pointer-events-none shadow-md shadow-black/20"
            style={{
              background: 'linear-gradient(to right, #a28860 0%, #ebd8b7 30%, #c5a880 50%, #a28860 100%)',
            }}
          />

          {/* Flap Superior (Clips up / opens down behind) */}
          <div
            className="absolute top-0 left-0 right-0 h-[158px] bg-coastal-800/80 border-b border-accent-gold/25 pointer-events-none transition-transform duration-[1000ms] ease-out origin-top"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              zIndex: isEnvelopeOpen ? 1 : 4,
              transform: isEnvelopeOpen ? 'rotateX(-150deg)' : 'rotateX(0deg)'
            }}
          >
            <div className="absolute inset-3 border border-accent-gold/15 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
          </div>

          {/* Lower Pocket Pouch cover */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[170px] bg-[#1E2B1A] border-t border-accent-gold/22 pointer-events-none shadow-lg shadow-black/18"
            style={{
              clipPath: 'polygon(0 20px, 50% 0, 100% 20px, 100% 100%, 0 100%)',
              zIndex: 3
            }}
          >
            <div className="absolute inset-[10px] border border-accent-gold/15 pointer-events-none" style={{ clipPath: 'polygon(0 20px, 50% 0, 100% 20px, 100% 100%, 0 100%)' }}></div>
          </div>

          {/* Sello de Lacre Interactivo */}
          <div
            onClick={(e) => { e.stopPropagation(); handleOpenEnvelope(); }}
            className={`absolute top-[125px] left-[calc(50%-32px)] w-16 h-16 rounded-full flex items-center justify-center cursor-none shadow-2xl transition-all duration-[500ms] hover:scale-108 hover:rotate-4 hover:shadow-accent-gold/45 active:scale-95 ${isEnvelopeOpen ? 'opacity-0 scale-[1.4] -rotate-[15deg] pointer-events-none' : 'animate-[sealPulse_2.4s_infinite_ease-in-out]'}`}
            style={{
              background: 'radial-gradient(circle at 35% 35%, #ebd8b7 0%, #c5a880 50%, #90734a 100%)',
              zIndex: 5,
              borderRadius: '48% 52% 47% 53% / 52% 48% 54% 46%'
            }}
          >
            <span className="font-display text-[13px] font-bold text-white/90 drop-shadow-md tracking-tighter">A & G</span>
          </div>

          {/* Card Emerging inside (Interactive 3D Tilt) */}
          <div
            className="absolute left-[18px] right-[18px] bottom-3 h-[260px] transition-all duration-[1400ms] cubic-bezier(0.25, 1, 0.5, 1)"
            style={{
              zIndex: isEnvelopeOpen ? 4 : 2,
              transform: isEnvelopeOpen 
                ? 'translateY(-115px) translateZ(20px) scale(1.025)' 
                : 'translateY(20px) translateZ(-5px) scale(0.9)',
              transitionDelay: isEnvelopeOpen ? '0.35s' : '0s',
              pointerEvents: isEnvelopeOpen ? 'auto' : 'none',
              opacity: isEnvelopeOpen ? 1 : 0
            }}
          >
            <Interactive3DTilt maxRotation={6} className="w-full h-full">
              <div className="w-full h-full bg-sand-50 p-6 flex flex-col items-center justify-center text-center border border-accent-gold/30 rounded-md shadow-md relative group overflow-hidden">
                <SunGlintOverlay periodic={true} />
                <div className="absolute inset-1.5 border border-accent-gold/18 rounded-[4px] pointer-events-none z-10"></div>
                <div className="font-display text-2xl text-coastal-800 tracking-wider mb-1 relative z-10">
                  A & G
                  <span className="block text-[10px] text-accent-gold mt-1 font-sans opacity-65">✻</span>
                </div>
                <div className="font-serif uppercase text-[9px] tracking-super text-accent-bronze font-semibold mb-3 relative z-10">Enlace Matrimonial</div>
                <div className="font-serif italic font-light text-lg text-coastal-800 leading-tight relative z-10">Andrea<br />&amp;<br />Gustavo</div>
                <div className="font-serif text-[10px] tracking-wide text-accent-bronze mt-3.5 uppercase relative z-10">04 · 09 · 2026</div>
              </div>
            </Interactive3DTilt>
          </div>

        </div>
      </div>

      {/* ══ VISUALIZADOR DE FOTOS (LIGHTBOX OVERLAY) ══ */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[10010] bg-coastal-900/98 flex items-center justify-center transition-all duration-500"
        >
          <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 bg-transparent border-none text-white/50 font-serif text-[10px] tracking-widest uppercase hover:text-white transition-colors duration-300 py-2 cursor-none"
              onClick={() => setLightboxIndex(null)}
              {...cursorHoverProps}
            >
              Cerrar
            </button>

            <button
              className="absolute top-1/2 -translate-y-1/2 -left-16 bg-transparent border-none text-white/40 hover:text-white font-serif text-3xl transition-all duration-300 p-4 hover:-translate-x-1 cursor-none"
              onClick={(e) => navigateLightbox(-1, e)}
              {...cursorHoverProps}
            >
              &#8249;
            </button>

            <img
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/5 rounded-sm transition-transform duration-700 ease-out scale-100"
              src={allPhotos[lightboxIndex]}
              alt="Lookbook Boda Andrea y Gustavo"
            />

            <button
              className="absolute top-1/2 -translate-y-1/2 -right-16 bg-transparent border-none text-white/40 hover:text-white font-serif text-3xl transition-all duration-300 p-4 hover:translate-x-1 cursor-none"
              onClick={(e) => navigateLightbox(1, e)}
              {...cursorHoverProps}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}

      {/* ══ PRELOADER ══ */}
      <div id="preloader" className={isPreloaderHidden ? 'hidden' : ''}>
        <div className="monogram">
          <span className="monogram-initial">A</span>
          <span className="monogram-amp">&amp;</span>
          <span className="monogram-initial">G</span>
        </div>
        <div className="monogram-line-h"></div>
        <p className="monogram-sub">IV · IX · MMXXVI</p>
      </div>
=======
      {/* Cursor personalizado — solo desktop */}
      <CustomCursor mousePos={mousePos} ringPos={ringPos} isHovered={isHovered} />

      {/* Botón de música flotante */}
      <AudioControl isPlaying={isPlaying} onToggle={handleToggleAudio} cursorHoverProps={cursorHoverProps} />
      <audio ref={audioRef} loop preload="auto" src={musicTrack} style={{ display: 'none' }} />

      {/* Lightbox de fotos */}
      <Lightbox
        photos={allPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={navigateLightbox}
        cursorHoverProps={cursorHoverProps}
      />

      {/* Sobre de entrada — primera pantalla */}
      <EnvelopeIntro onBegin={handleBegin} onComplete={handleEnvelopeComplete} />
>>>>>>> develop

      {/* ══ NAV BAR (GLASSMORPHISM EDITORIAL) ══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 flex items-center bg-sand-50/80 backdrop-blur-md border-b border-sand-200/40 select-none">
        <div
          className="flex items-center w-full px-3 md:px-6 md:justify-center overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          <a href="#itinerario" className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-super text-coastal-800/70 hover:text-coastal-800 transition-all duration-300 px-2 md:px-3 py-2 font-medium cursor-none whitespace-nowrap flex-shrink-0" {...cursorHoverProps}>Itinerario</a>
          <span className="w-[3px] h-[3px] rounded-full bg-accent-gold/40 flex-shrink-0 mx-0.5 md:mx-0"></span>
          <a href="#dresscode" className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-super text-coastal-800/70 hover:text-coastal-800 transition-all duration-300 px-2 md:px-3 py-2 font-medium cursor-none whitespace-nowrap flex-shrink-0" {...cursorHoverProps}>Vestimenta</a>
          <span className="w-[3px] h-[3px] rounded-full bg-accent-gold/40 flex-shrink-0 mx-0.5 md:mx-0"></span>
          <a href="#regalos" className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-super text-coastal-800/70 hover:text-coastal-800 transition-all duration-300 px-2 md:px-3 py-2 font-medium cursor-none whitespace-nowrap flex-shrink-0" {...cursorHoverProps}>Regalos</a>
          <span className="w-[3px] h-[3px] rounded-full bg-accent-gold/40 flex-shrink-0 mx-0.5 md:mx-0"></span>
          <a href="#hospedaje" className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-super text-coastal-800/70 hover:text-coastal-800 transition-all duration-300 px-2 md:px-3 py-2 font-medium cursor-none whitespace-nowrap flex-shrink-0" {...cursorHoverProps}>Hospedaje</a>
          <span className="w-[3px] h-[3px] rounded-full bg-accent-gold/40 flex-shrink-0 mx-0.5 md:mx-0"></span>
          <a href="#rsvp" className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-super text-coastal-800/70 hover:text-coastal-800 transition-all duration-300 px-2 md:px-3 py-2 font-medium cursor-none whitespace-nowrap flex-shrink-0" {...cursorHoverProps}>Asistencia</a>
        </div>
      </nav>

      {/* ══ HERO SECTION (LOOKBOOK LUXURY SUNSET) ══ */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden select-none">
<<<<<<< HEAD
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.45] saturate-[0.7] transition-transform duration-[4000ms] ease-out scale-105 hover:scale-100" style={{ backgroundImage: `url(${img2})` }}></div>
=======
        {/* Foto fallback con Ken Burns — visible inmediatamente mientras carga el video */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenBurns brightness-[0.45] saturate-[0.7]"
          style={{ backgroundImage: `url(${img2})` }}
        />
        {/* Video de fondo — reemplaza la foto cuando carga (7.7MB, faststart, muted = nunca bloqueado) */}
        <video
          ref={videoRef}
          src={videoBg}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-[0.7]"
          autoPlay
          muted
          loop
          playsInline
        />
>>>>>>> develop
        <div className="absolute inset-0 bg-gradient-to-t from-coastal-900 via-transparent to-coastal-900/60 z-0"></div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto w-full">
          <p className="font-serif italic text-xs md:text-sm text-accent-gold tracking-widest mb-6 reveal">Viernes · 4 de Septiembre · 2026</p>

          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-accent-gold/50 mb-6 reveal reveal-d1"></div>

<<<<<<< HEAD
          <h1 className="font-serif italic font-light text-5xl md:text-7xl lg:text-8xl text-white/95 tracking-wide leading-none mb-4 select-text flex flex-wrap justify-center items-center">
            <ElegantTextReveal text="Andrea" className="font-serif font-light text-white/95" />
            <span className="font-serif font-light italic text-accent-gold/90 text-4xl md:text-6xl lg:text-7xl mx-3 -translate-y-1 block select-none">&amp;</span>
            <ElegantTextReveal text="Gustavo" className="font-serif font-light text-white/95" delay={0.2} />
=======
          <h1 className="font-serif italic font-normal text-5xl md:text-7xl lg:text-8xl text-white/95 tracking-wide leading-none mb-4 select-text flex flex-wrap justify-center items-center">
            <ElegantTextReveal text="Andrea" className="font-serif font-normal text-white/95" />
            <span className="font-serif font-normal italic text-accent-gold/90 text-4xl md:text-6xl lg:text-7xl mx-3 -translate-y-1 block select-none">&amp;</span>
            <ElegantTextReveal text="Gustavo" className="font-serif font-normal text-white/95" delay={0.2} />
>>>>>>> develop
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
            <span className="w-8 h-[1px] bg-accent-gold/30"></span>
            <span className="font-serif italic text-xs tracking-[0.25em] text-accent-gold/80 uppercase">Enlace Matrimonial</span>
            <span className="w-8 h-[1px] bg-accent-gold/30"></span>
          </div>

          <p className="font-sans text-[10px] md:text-xs tracking-super uppercase text-white/40 mb-8 reveal reveal-d2">IV · IX · MMXXVI</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal reveal-d3">
            <a href="#" className="font-sans text-[8px] md:text-[9px] tracking-wider uppercase border border-white/20 hover:border-accent-gold text-white/70 hover:text-white px-5 py-2.5 transition-all duration-500 bg-white/5 hover:bg-accent-gold/10 rounded-sm cursor-none relative group overflow-hidden" onClick={handleGoogleCalendar} {...cursorHoverProps}>
              <SunGlintOverlay periodic={false} />
              <span className="relative z-10">Google Calendar</span>
            </a>
            <a href="#" className="font-sans text-[8px] md:text-[9px] tracking-wider uppercase border border-white/20 hover:border-accent-gold text-white/70 hover:text-white px-5 py-2.5 transition-all duration-500 bg-white/5 hover:bg-accent-gold/10 rounded-sm cursor-none relative group overflow-hidden" onClick={handleDownloadICS} {...cursorHoverProps}>
              <SunGlintOverlay periodic={false} />
              <span className="relative z-10">iCal / Outlook</span>
            </a>
          </div>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent mb-10 reveal reveal-d3"></div>

<<<<<<< HEAD
          <p className="font-serif italic font-light text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mb-12 reveal reveal-d3">
=======
          <p className="font-serif italic font-normal text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mb-12 reveal reveal-d3">
>>>>>>> develop
            Tenemos el honor de invitarlos a celebrar nuestro enlace matrimonial, con la bendición de Dios y acompañados de nuestros padres:
          </p>

          {/* Glass parents card */}
<<<<<<< HEAD
          <div className="max-w-2xl w-full px-6 py-10 md:px-12 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-sm shadow-2xl relative select-text reveal reveal-d4">
            <div className="absolute inset-1.5 border border-accent-gold/10 rounded-[1px] pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="text-center">
                <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Madre de la Novia</p>
                <p className="font-serif italic font-light text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                  María de la Luz Hernández Cruz
                </p>
              </div>
              <div className="text-center">
                <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Padre del Novio</p>
                <p className="font-serif italic font-light text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                  Gustavo Luján Flores
                </p>
=======
          <div className="max-w-3xl w-full px-6 py-10 md:px-12 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-sm shadow-2xl relative select-text reveal reveal-d4">
            <div className="absolute inset-1.5 border border-accent-gold/10 rounded-[1px] pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Madre de la Novia</p>
                <p className="font-serif italic font-normal text-[14px] md:text-[15px] text-white/90 leading-relaxed">
                  María de la Luz Hernández Cruz
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Padre del Novio</p>
                  <p className="font-serif italic font-normal text-[14px] md:text-[15px] text-white/90 leading-relaxed">
                    Gustavo Luján Flores
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Madre del Novio</p>
                  <p className="font-serif italic font-normal text-[14px] md:text-[15px] text-white/90 leading-relaxed">
                    Rita Flores García
                  </p>
                </div>
>>>>>>> develop
              </div>
            </div>
          </div>

          <a href="#countdown" className="flex flex-col items-center gap-2 mt-16 text-decoration-none group animate-[breathe_2.4s_ease-in-out_infinite] reveal reveal-d4 cursor-none" {...cursorHoverProps}>
            <span className="font-serif italic text-[8.5px] tracking-widest text-accent-gold/70 uppercase">Descubrir</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-accent-gold/60 to-transparent"></div>
          </a>
        </div>
      </section>

      {/* ══ FECHA OFICIAL — IMAGEN PROTAGONISTA ══ */}
      <section className="py-20 md:py-28 px-6 bg-sand-50 border-b border-sand-200/40 select-none overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">¡Lo dijimos!</span>
            <h2 className="font-serif italic font-light text-3xl md:text-4xl text-coastal-800 tracking-wide flex justify-center">
              <ElegantTextReveal text="We Said I Do" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">

            {/* Imagen protagonista — grande y con 3D tilt */}
            <Interactive3DTilt maxRotation={5} className="md:col-span-7 reveal reveal-d1">
              <div className="relative overflow-hidden rounded-sm border border-accent-gold/35 shadow-2xl group">
                <SunGlintOverlay periodic={true} />
                <img
                  src={img1}
                  alt="Andrea y Gustavo — Oficialmente casados 04.09.26"
                  className="w-full object-cover filter saturate-[0.92] brightness-[1.02] group-hover:saturate-100 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent pointer-events-none z-10"></div>
                <div className="absolute bottom-6 left-0 right-0 text-center z-20 px-4">
                  <p className="font-display text-white text-xl md:text-3xl tracking-widest drop-shadow-lg">04 · 09 · 2026</p>
                  <p className="font-serif italic text-white/75 text-xs md:text-sm mt-1 tracking-widest drop-shadow">Puerto Vallarta, Jalisco</p>
                </div>
              </div>
            </Interactive3DTilt>

            {/* Panel de texto derecho */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-6 reveal reveal-d2 px-2 md:px-0">

              <div className="w-10 h-[1px] bg-accent-gold/60 hidden md:block"></div>

              <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold font-semibold">Enlace Matrimonial</p>

<<<<<<< HEAD
              <p className="font-serif italic font-light text-4xl md:text-5xl text-coastal-800 leading-tight">
                Andrea<br />
                <span className="text-accent-gold text-2xl md:text-3xl font-light">&amp;</span><br />
=======
              <p className="font-serif italic font-normal text-4xl md:text-5xl text-coastal-800 leading-tight">
                Andrea<br />
                <span className="text-accent-gold text-2xl md:text-3xl font-normal">&amp;</span><br />
>>>>>>> develop
                Gustavo
              </p>

              <div className="flex flex-col gap-3 border-l-0 md:border-l border-accent-gold/30 md:pl-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-[7.5px] tracking-super uppercase text-accent-bronze">Fecha</span>
                  <span className="font-serif italic text-coastal-800 text-sm">04 de Septiembre, 2026</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-[7.5px] tracking-super uppercase text-accent-bronze">Lugar</span>
                  <span className="font-serif italic text-coastal-800 text-sm">Puerto Vallarta, Jalisco</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-[7.5px] tracking-super uppercase text-accent-bronze">Hora</span>
                  <span className="font-serif italic text-coastal-800 text-sm">15:00 hrs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="w-6 h-[1px] bg-accent-gold/40"></span>
                <span className="font-serif italic text-[11px] text-coastal-800/50 tracking-wider">IV · IX · MMXXVI</span>
                <span className="w-6 h-[1px] bg-accent-gold/40"></span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ══ COUNTDOWN SECTION (ASTRONOMICAL GLASS DIALS) ══ */}
      <section id="countdown" className="py-24 md:py-32 px-6 bg-sand-100 border-t border-b border-sand-200/40 select-none">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Tiempo Restante</span>
<<<<<<< HEAD
          <h2 className="font-serif italic font-light text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 reveal reveal-d1">La Espera</h2>
=======
          <h2 className="font-serif italic font-normal text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 reveal reveal-d1">La Espera</h2>
>>>>>>> develop

          <div className="flex items-center justify-center gap-4 mb-16 reveal reveal-d2">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold"></span>
            <div className="w-[5px] h-[5px] border border-accent-gold rotate-45"></div>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold"></span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 reveal reveal-d3">
            <div className="cd-unit w-24 h-24 md:w-32 md:h-32 border border-accent-gold/25 rounded-full bg-sand-50/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm transition-all duration-700 ease-out hover:scale-105 hover:border-accent-gold hover:shadow-lg relative cursor-none" {...cursorHoverProps}>
              <div className="absolute inset-1.5 border border-accent-gold/10 rounded-full pointer-events-none"></div>
<<<<<<< HEAD
              <span className="font-serif font-light text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.days}</span>
=======
              <span className="font-serif font-normal text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.days}</span>
>>>>>>> develop
              <span className="font-sans text-[8px] uppercase tracking-widest text-coastal-800/50 relative z-10">Días</span>
            </div>
            <div className="cd-unit w-24 h-24 md:w-32 md:h-32 border border-accent-gold/25 rounded-full bg-sand-50/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm transition-all duration-700 ease-out hover:scale-105 hover:border-accent-gold hover:shadow-lg relative cursor-none" {...cursorHoverProps}>
              <div className="absolute inset-1.5 border border-accent-gold/10 rounded-full pointer-events-none"></div>
<<<<<<< HEAD
              <span className="font-serif font-light text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.hours}</span>
=======
              <span className="font-serif font-normal text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.hours}</span>
>>>>>>> develop
              <span className="font-sans text-[8px] uppercase tracking-widest text-coastal-800/50 relative z-10">Horas</span>
            </div>
            <div className="cd-unit w-24 h-24 md:w-32 md:h-32 border border-accent-gold/25 rounded-full bg-sand-50/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm transition-all duration-700 ease-out hover:scale-105 hover:border-accent-gold hover:shadow-lg relative cursor-none" {...cursorHoverProps}>
              <div className="absolute inset-1.5 border border-accent-gold/10 rounded-full pointer-events-none"></div>
<<<<<<< HEAD
              <span className="font-serif font-light text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.minutes}</span>
=======
              <span className="font-serif font-normal text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.minutes}</span>
>>>>>>> develop
              <span className="font-sans text-[8px] uppercase tracking-widest text-coastal-800/50 relative z-10">Minutos</span>
            </div>
            <div className="cd-unit w-24 h-24 md:w-32 md:h-32 border border-accent-gold/25 rounded-full bg-sand-50/50 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm transition-all duration-700 ease-out hover:scale-105 hover:border-accent-gold hover:shadow-lg relative cursor-none" {...cursorHoverProps}>
              <div className="absolute inset-1.5 border border-accent-gold/10 rounded-full pointer-events-none"></div>
<<<<<<< HEAD
              <span className="font-serif font-light text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.seconds}</span>
=======
              <span className="font-serif font-normal text-3xl md:text-4xl text-coastal-800 relative z-10 leading-none mb-1">{timeLeft.seconds}</span>
>>>>>>> develop
              <span className="font-sans text-[8px] uppercase tracking-widest text-coastal-800/50 relative z-10">Segundos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ITINERARIO SECTION (BENTO GRID ASYMMETRICAL LOOKBOOK) ══ */}
      <section id="itinerario" className="py-24 md:py-32 px-6 select-none bg-sand-50 animate-fadeIn">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">El Gran Día</span>
<<<<<<< HEAD
            <h2 className="font-serif italic font-light text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
=======
            <h2 className="font-serif italic font-normal text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
>>>>>>> develop
              <ElegantTextReveal text="Itinerario" />
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold"></span>
              <div className="w-[5px] h-[5px] border border-accent-gold rotate-45"></div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold"></span>
            </div>
          </div>

          <div className="flex flex-col gap-12 mt-8 select-text">

            {/* ── DÍA 03 SEPTIEMBRE ── */}
            <div>
              <div className="flex items-center gap-3 mb-6 reveal">
                <div className="w-6 h-[1px] bg-accent-gold/50 shrink-0"></div>
                <span className="font-sans text-[8px] tracking-super uppercase text-accent-gold font-semibold whitespace-nowrap">Miércoles · 03 de Septiembre</span>
                <div className="flex-1 h-[1px] bg-accent-gold/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Interactive3DTilt maxRotation={3} className="md:col-span-4 h-56 md:h-auto overflow-hidden bg-white border border-sand-200/60 rounded-sm relative group reveal">
                  <div className="absolute inset-0 bg-cover bg-center filter brightness-[0.75] saturate-[0.85] transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${img6})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/60 via-transparent to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="font-serif italic text-white/90 text-base">"Bienvenidos a Puerto Vallarta..."</span>
                  </div>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={4} className="md:col-span-8 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal reveal-d1">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">01</span>
                  <div className="relative z-10 font-sans">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">15:00 hrs</p>
<<<<<<< HEAD
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-6">Recepción de Bienvenida</h3>
=======
                    <h3 className="font-serif italic font-normal text-2xl md:text-3xl text-coastal-800 mb-6">Recepción de Bienvenida</h3>
>>>>>>> develop
                    <p className="font-serif italic text-[14px] md:text-[15px] text-accent-bronze/90 leading-relaxed mb-8 max-w-md">
                      Hotel Meliá<br />
                      <span className="font-sans not-italic text-[11px] text-coastal-800/60 block mt-2">Puerto Vallarta, Jalisco</span>
                    </p>
                  </div>
                  <a className="self-start inline-flex items-center gap-2 font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm cursor-none relative overflow-hidden z-10" href="https://maps.app.goo.gl/37bXyMvnZqbDVrEt9" target="_blank" rel="noopener" {...cursorHoverProps}>
                    <SunGlintOverlay periodic={false} />
                    <svg className="w-3 h-3 stroke-current fill-none relative z-10" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="relative z-10">Ver en Mapa</span>
                  </a>
                </Interactive3DTilt>
              </div>
            </div>

            {/* ── DÍA 04 SEPTIEMBRE ── */}
            <div>
              <div className="flex items-center gap-3 mb-6 reveal">
                <div className="w-6 h-[1px] bg-accent-gold/50 shrink-0"></div>
                <span className="font-sans text-[8px] tracking-super uppercase text-accent-gold font-semibold whitespace-nowrap">Jueves · 04 de Septiembre · ✦ El Gran Día</span>
                <div className="flex-1 h-[1px] bg-accent-gold/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">02</span>
                  <div className="relative z-10 font-sans">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">15:00 hrs</p>
<<<<<<< HEAD
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-6">Ceremonia Religiosa</h3>
=======
                    <h3 className="font-serif italic font-normal text-2xl md:text-3xl text-coastal-800 mb-6">Ceremonia Religiosa</h3>
>>>>>>> develop
                    <p className="font-serif italic text-[14px] md:text-[15px] text-accent-bronze/90 leading-relaxed mb-8 max-w-md">
                      Puerto Vallarta, Jalisco
                    </p>
                  </div>
                  <a className="self-start inline-flex items-center gap-2 font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm cursor-none relative overflow-hidden z-10" href="https://maps.app.goo.gl/LZ1S5pERpwhM9nym6" target="_blank" rel="noopener" {...cursorHoverProps}>
                    <SunGlintOverlay periodic={false} />
                    <svg className="w-3 h-3 stroke-current fill-none relative z-10" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="relative z-10">Ver en Mapa</span>
                  </a>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal reveal-d1">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">03</span>
                  <div className="relative z-10 font-sans">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">16:50 hrs</p>
<<<<<<< HEAD
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-6">Ceremonia Frente al Mar</h3>
=======
                    <h3 className="font-serif italic font-normal text-2xl md:text-3xl text-coastal-800 mb-6">Ceremonia Frente al Mar</h3>
>>>>>>> develop
                    <p className="font-serif italic text-[14px] md:text-[15px] text-accent-bronze/90 leading-relaxed mb-8 max-w-md">
                      Puerto Vallarta, Jalisco
                    </p>
                  </div>
                  <a className="self-start inline-flex items-center gap-2 font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm cursor-none relative overflow-hidden z-10" href="https://maps.app.goo.gl/9eDntodSdtcUwB1Z7" target="_blank" rel="noopener" {...cursorHoverProps}>
                    <SunGlintOverlay periodic={false} />
                    <svg className="w-3 h-3 stroke-current fill-none relative z-10" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="relative z-10">Ver en Mapa</span>
                  </a>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={3} className="md:col-span-5 h-56 md:h-auto overflow-hidden bg-white border border-sand-200/60 rounded-sm relative group reveal reveal-d2">
                  <div className="absolute inset-0 bg-cover bg-center filter brightness-[0.75] saturate-[0.85] transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${img5})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/60 via-transparent to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="font-serif italic text-white/90 text-base">"Frente a la inmensidad del mar..."</span>
                  </div>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={4} className="md:col-span-7 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal reveal-d2">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">04</span>
                  <div className="relative z-10">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">18:00 hrs</p>
<<<<<<< HEAD
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-4">Recepción</h3>
=======
                    <h3 className="font-serif italic font-normal text-2xl md:text-3xl text-coastal-800 mb-4">Recepción</h3>
>>>>>>> develop
                    <p className="font-serif italic text-[14px] md:text-[15px] text-accent-bronze/90 leading-relaxed mb-4">Puerto Vallarta, Jalisco</p>
                  </div>
                  <a className="self-start inline-flex items-center gap-2 font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm cursor-none relative overflow-hidden z-10" href="https://maps.app.goo.gl/4aU8xRd7SW8dXKmq9" target="_blank" rel="noopener" {...cursorHoverProps}>
                    <SunGlintOverlay periodic={false} />
                    <svg className="w-3 h-3 stroke-current fill-none relative z-10" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="relative z-10">Ver en Mapa</span>
                  </a>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={4} className="md:col-span-12 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 group overflow-hidden reveal reveal-d3">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">05</span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold">23:30 hrs</p>
                      <span className="font-sans text-[7.5px] tracking-wider uppercase border border-accent-gold/50 text-accent-gold px-2 py-0.5 rounded-sm">Opcional</span>
                    </div>
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-2">After Party</h3>
                    <p className="font-serif italic text-[14px] text-accent-bronze/90">Puerto Vallarta, Jalisco</p>
                  </div>
                  <div className="relative z-10 shrink-0">
                    <p className="font-serif italic text-[12px] text-coastal-800/50 max-w-xs leading-relaxed">Continúa la celebración con nosotros. ¡Nos encantaría tenerte!</p>
                  </div>
                </Interactive3DTilt>
              </div>
            </div>

            {/* ── DÍA 05 SEPTIEMBRE ── */}
            <div>
              <div className="flex items-center gap-3 mb-6 reveal">
                <div className="w-6 h-[1px] bg-accent-gold/50 shrink-0"></div>
                <span className="font-sans text-[8px] tracking-super uppercase text-accent-gold font-semibold whitespace-nowrap">Viernes · 05 de Septiembre</span>
                <div className="flex-1 h-[1px] bg-accent-gold/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
<<<<<<< HEAD
                <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal">
=======
                <Interactive3DTilt maxRotation={4} className="md:col-span-12 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal">
>>>>>>> develop
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">06</span>
                  <div className="relative z-10">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">Todo el Día</p>
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-4">Día Libre</h3>
<<<<<<< HEAD
                    <p className="font-serif italic text-[14px] text-coastal-800/60 leading-relaxed">Disfruta Puerto Vallarta a tu ritmo</p>
                  </div>
                </Interactive3DTilt>

                <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group overflow-hidden reveal reveal-d1">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">07</span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold">Actividad</p>
                      <span className="font-sans text-[7.5px] tracking-wider uppercase border border-accent-gold/50 text-accent-gold px-2 py-0.5 rounded-sm">Opcional</span>
                    </div>
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-4">Tour en Barco Pirata</h3>
                    <p className="font-serif italic text-[13px] text-coastal-800/60 leading-relaxed">Nos encantaría que nos acompañaran a pasear por Puerto Vallarta. La actividad es opcional y cada invitado cubre su acceso.</p>
=======
                    <p className="font-serif italic text-[14px] text-coastal-800 leading-relaxed font-normal">Disfruta Puerto Vallarta a tu ritmo</p>
>>>>>>> develop
                  </div>
                </Interactive3DTilt>
              </div>
            </div>

            {/* ── DÍA 06 SEPTIEMBRE ── */}
            <div>
              <div className="flex items-center gap-3 mb-6 reveal">
                <div className="w-6 h-[1px] bg-accent-gold/50 shrink-0"></div>
                <span className="font-sans text-[8px] tracking-super uppercase text-accent-gold font-semibold whitespace-nowrap">Sábado · 06 de Septiembre</span>
                <div className="flex-1 h-[1px] bg-accent-gold/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
<<<<<<< HEAD
                <Interactive3DTilt maxRotation={4} className="md:col-span-6 md:col-start-4 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col items-center justify-center text-center group overflow-hidden reveal">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">08</span>
=======
                <Interactive3DTilt maxRotation={4} className="md:col-span-12 bg-white border border-sand-200/60 p-8 md:p-10 rounded-sm shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col items-center justify-center text-center group overflow-hidden reveal">
                  <SunGlintOverlay periodic={true} />
                  <span className="absolute right-8 top-6 font-serif italic text-7xl md:text-8xl text-accent-gold/10 group-hover:text-accent-gold/20 transition-all duration-700 select-none pointer-events-none z-0">07</span>
>>>>>>> develop
                  <div className="relative z-10">
                    <p className="font-sans text-[9px] tracking-super uppercase text-accent-gold font-semibold mb-2">12:00 hrs</p>
                    <h3 className="font-serif italic font-light text-2xl md:text-3xl text-coastal-800 mb-4">Check-Out</h3>
                    <p className="font-serif italic text-[14px] text-coastal-800/60 leading-relaxed">Hotel Meliá · Puerto Vallarta</p>
                  </div>
                </Interactive3DTilt>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ DRESS CODE SECTION (EDITORIAL DOUBLE COLUMN) ══ */}
      <section id="dresscode" className="py-24 md:py-32 px-6 bg-sand-100 border-t border-b border-sand-200/40 select-none">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Indumentaria</span>
<<<<<<< HEAD
            <h2 className="font-serif italic font-light text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
=======
            <h2 className="font-serif italic font-normal text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
>>>>>>> develop
              <ElegantTextReveal text="Dress Code" />
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold"></span>
              <div className="w-[5px] h-[5px] border border-accent-gold rotate-45"></div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold"></span>
            </div>
          </div>

          <div className="bg-white border border-sand-200/60 rounded-sm shadow-lg overflow-hidden select-text reveal reveal-d3">
            <div className="p-8 md:p-16 flex flex-col justify-center text-center max-w-3xl mx-auto">
              <p className="font-serif italic text-3xl text-coastal-800 mb-6">Beach Formal</p>
              <p className="font-serif italic text-[14.5px] leading-relaxed text-coastal-800/70 mb-6 max-w-lg mx-auto">
                Agradecemos su asistencia vistiendo con elegancia costera:<br /><br />
                <strong className="font-sans not-italic text-xs uppercase tracking-wider text-accent-gold">Damas:</strong> Beach Formal — vestido largo formal en telas fluidas.<br />
                <strong className="font-sans not-italic text-xs uppercase tracking-wider text-accent-gold">Caballeros:</strong> Elegant Beach Attire — traje de lino o algodón en tonos claros.
              </p>

              <div className="mb-8 max-w-lg mx-auto">
                <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-3">Inspiración · Take a look!</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { url: "https://pin.it/JDceWXYN7", label: "Ref. 1" },
                    { url: "https://pin.it/1Oy7b2XRp", label: "Ref. 2" },
                    { url: "https://pin.it/5exbeTN1w", label: "Ref. 3" },
                    { url: "https://pin.it/5E4Sh8PHS", label: "Ref. 4" },
                    { url: "https://pin.it/7MaV8uygD", label: "Ref. 5" },
                    { url: "https://pin.it/77LMC6zKg", label: "Ref. 6" },
                  ].map((pin) => (
                    <a key={pin.url} href={pin.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-sans text-[7.5px] tracking-wider uppercase border border-coastal-800/15 hover:border-accent-gold text-coastal-800/60 hover:text-coastal-800 px-3 py-1.5 transition-all duration-300 rounded-sm cursor-none" {...cursorHoverProps}>
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                      {pin.label}
                    </a>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
=======
              {/* Paleta de Colores */}
              <div className="mb-10 mt-8">
                <p className="font-sans text-[8px] tracking-super uppercase text-accent-gold/70 mb-4">Paleta de Colores Sugerida</p>
                <div className="flex justify-center gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full shadow-md border border-sand-200/40 transition-transform hover:scale-110" style={{ backgroundColor: "#52644E" }}></div>
                    <span className="font-sans text-[7px] uppercase tracking-wider text-coastal-800/70">Verde</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full shadow-md border border-sand-200/40 transition-transform hover:scale-110" style={{ backgroundColor: "#634F3D" }}></div>
                    <span className="font-sans text-[7px] uppercase tracking-wider text-coastal-800/70">Café</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full shadow-md border border-sand-200/40 transition-transform hover:scale-110" style={{ backgroundColor: "#A38971" }}></div>
                    <span className="font-sans text-[7px] uppercase tracking-wider text-coastal-800/70">Café Claro</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full shadow-md border border-sand-200/40 transition-transform hover:scale-110" style={{ backgroundColor: "#C0A97E" }}></div>
                    <span className="font-sans text-[7px] uppercase tracking-wider text-coastal-800/70">Beige</span>
                  </div>
                </div>
              </div>

>>>>>>> develop
              <div className="flex justify-center gap-12 md:gap-16 border-t border-sand-200/60 pt-10 select-none">
                <div className="flex flex-col items-center gap-3">
                  <svg width="40" height="60" viewBox="0 0 44 68" fill="none" className="stroke-accent-bronze/70" strokeWidth="0.8">
                    <circle cx="22" cy="9" r="7.5" />
                    <path d="M7 28C7 19 13.5 17 22 17C30.5 17 37 19 37 28L39 64H5L7 28Z" fill="none" />
                    <path d="M22 17L17 30L22 26L27 30Z" className="fill-accent-gold/25" stroke="none" />
                    <path d="M22 26L22 64" strokeWidth="0.5" className="opacity-40" />
                    <circle cx="22" cy="36" r="1" className="fill-accent-bronze/50" stroke="none" />
                    <circle cx="22" cy="42" r="1" className="fill-accent-bronze/50" stroke="none" />
                    <circle cx="22" cy="48" r="1" className="fill-accent-bronze/50" stroke="none" />
                  </svg>
                  <span className="font-sans text-[8px] tracking-super uppercase text-coastal-800/60">Caballeros</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <svg width="40" height="60" viewBox="0 0 44 68" fill="none" className="stroke-accent-bronze/70" strokeWidth="0.8">
                    <circle cx="22" cy="8.5" r="7" />
                    <path d="M15 17C15 17 10 22 9 28L5 64H39L35 28C34 22 29 17 29 17" fill="none" />
                    <path d="M15 17C16 21 19 23 22 23C25 23 28 21 29 17" fill="none" />
                    <path d="M9 40C13 37 18 36 22 36C26 36 31 37 35 40" strokeWidth="0.6" className="opacity-40" />
                  </svg>
                  <span className="font-sans text-[8px] tracking-super uppercase text-coastal-800/60">Damas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REGALOS SECTION (BENTO ASYMMETRICAL CARDS) ══ */}
      <section id="regalos" className="py-24 md:py-32 px-6 select-none bg-sand-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Mesa de</span>
<<<<<<< HEAD
            <h2 className="font-serif italic font-light text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
=======
            <h2 className="font-serif italic font-normal text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
>>>>>>> develop
              <ElegantTextReveal text="Regalos" />
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold"></span>
              <div className="w-[5px] h-[5px] border border-accent-gold rotate-45"></div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold"></span>
            </div>

<<<<<<< HEAD
            <p className="font-serif italic text-base md:text-lg text-coastal-800/60 mt-8 reveal reveal-d2">¡Gracias por formar parte de nuestro inicio como familia!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16 select-text">
            {/* Lluvia de sobres */}
            <Interactive3DTilt maxRotation={4} className="md:col-span-7 bg-sand-100/50 border border-sand-200/80 p-10 md:p-12 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d3">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-accent-gold/15 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">I</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Lluvia de Sobres</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800/60 max-w-xs mb-4 relative z-10">
                Tendremos una caja especial para sobres el día del evento en la recepción. Tu presencia es nuestro mayor regalo.
              </p>
              <span className="font-sans text-[8px] tracking-super uppercase border border-accent-gold/40 text-accent-gold px-5 py-2.5 bg-transparent rounded-sm select-none relative z-10">El día del evento</span>
            </Interactive3DTilt>

            {/* Liverpool */}
            <Interactive3DTilt maxRotation={4} className="md:col-span-5 bg-white border border-sand-200/60 p-8 md:p-10 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d3">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-sand-200/40 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">II</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Liverpool</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800/60 max-w-xs mb-4 relative z-10">
=======
            <p className="font-serif italic text-base md:text-lg text-coastal-800 mt-8 reveal reveal-d2 font-normal">¡Gracias por formar parte de nuestro inicio como familia!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16 select-text">
            {/* Liverpool */}
            <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d3">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-sand-200/40 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">I</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Liverpool</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800 max-w-xs mb-4 relative z-10 font-normal">
>>>>>>> develop
                Mesa de regalos física u online en almacenes Liverpool.
              </p>
              <a className="inline-flex items-center justify-center font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm select-none cursor-none relative overflow-hidden z-10" href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51965594" target="_blank" rel="noopener" {...cursorHoverProps}>
                <SunGlintOverlay periodic={false} />
                <span className="relative z-10">Ir a Mesa de Regalos</span>
              </a>
            </Interactive3DTilt>

            {/* Amazon */}
<<<<<<< HEAD
            <Interactive3DTilt maxRotation={4} className="md:col-span-5 md:col-start-8 bg-white border border-sand-200/60 p-8 md:p-10 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d4">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-sand-200/40 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">III</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Amazon</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800/60 max-w-xs mb-4 relative z-10">
=======
            <Interactive3DTilt maxRotation={4} className="md:col-span-6 bg-white border border-sand-200/60 p-8 md:p-10 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d3">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-sand-200/40 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">II</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Amazon</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800 max-w-xs mb-4 relative z-10 font-normal">
>>>>>>> develop
                Lista de regalos online en Amazon México.
              </p>
              <a className="inline-flex items-center justify-center font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/20 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm select-none cursor-none relative overflow-hidden z-10" href="https://www.amazon.com.mx/wedding/guest-view/Z24ES7T2EJ8K" target="_blank" rel="noopener" {...cursorHoverProps}>
                <SunGlintOverlay periodic={false} />
                <span className="relative z-10">Ver Lista Amazon</span>
              </a>
            </Interactive3DTilt>
<<<<<<< HEAD
=======

            {/* Lluvia de sobres */}
            <Interactive3DTilt maxRotation={4} className="md:col-span-12 bg-sand-100/50 border border-sand-200/80 p-10 md:p-12 text-center flex flex-col items-center justify-center gap-4 rounded-sm relative group overflow-hidden reveal reveal-d4">
              <SunGlintOverlay periodic={true} />
              <div className="absolute inset-1.5 border border-accent-gold/15 rounded-[1px] pointer-events-none z-10"></div>
              <span className="font-serif italic text-xs text-accent-gold tracking-[0.2em] relative z-10">III</span>
              <p className="font-serif italic font-light text-2xl text-coastal-800 relative z-10">Lluvia de Sobres</p>
              <p className="font-serif italic text-[13.5px] leading-relaxed text-coastal-800 max-w-xs mb-4 relative z-10 font-normal">
                Tendremos una caja especial para sobres el día del evento en la recepción. Tu presencia es nuestro mayor regalo.
              </p>
              <span className="font-sans text-[8px] tracking-super uppercase border border-accent-gold/40 text-accent-gold px-5 py-2.5 bg-transparent rounded-sm select-none relative z-10">El día del evento</span>
            </Interactive3DTilt>
>>>>>>> develop
          </div>
        </div>
      </section>

      {/* ══ HOSPEDAJE SECTION (LUXURY EDITORIAL GALLERIES) ══ */}
      <section id="hospedaje" className="py-24 md:py-32 px-6 bg-sand-100 border-t border-b border-sand-200/40 select-none">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Alojamiento</span>
<<<<<<< HEAD
            <h2 className="font-serif italic font-light text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
=======
            <h2 className="font-serif italic font-normal text-3xl md:text-5xl text-coastal-800 tracking-wide mb-6 flex justify-center">
>>>>>>> develop
              <ElegantTextReveal text="Hospedaje" />
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold"></span>
              <div className="w-[5px] h-[5px] border border-accent-gold rotate-45"></div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold"></span>
            </div>

<<<<<<< HEAD
            <p className="font-serif italic text-base md:text-lg text-coastal-800/60 mt-8 reveal reveal-d2">La recepción de bienvenida y el hospedaje principal se llevan a cabo en Hotel Meliá Puerto Vallarta.</p>
=======
            <p className="font-serif italic text-base md:text-lg text-coastal-800 mt-8 reveal reveal-d2 font-normal">La recepción de bienvenida y el hospedaje principal se llevan a cabo en Hotel Meliá Puerto Vallarta.</p>
>>>>>>> develop
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 select-text reveal reveal-d3">

            {/* Hotel Principal */}
            <Interactive3DTilt maxRotation={3} className="md:col-span-1 md:col-start-2 bg-white border border-sand-200/60 rounded-sm overflow-hidden shadow-sm hover:border-accent-gold hover:shadow-xl flex flex-col justify-between group">
              <SunGlintOverlay periodic={true} />
              <div className="overflow-hidden aspect-[4/3] border-b border-sand-100 relative select-none">
                <img className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105 filter saturate-[0.6] brightness-[0.92] group-hover:saturate-[0.9] group-hover:brightness-100" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=75" alt="Hotel Meliá Puerto Vallarta" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/30 to-transparent"></div>
              </div>
              <div className="p-8 flex flex-col items-center text-center flex-grow relative z-10">
                <span className="font-sans text-[7px] tracking-[4px] text-accent-gold block mb-3">★★★★★</span>
                <h3 className="font-serif italic font-light text-lg md:text-xl text-coastal-800 mb-2 leading-tight">Hotel Meliá</h3>
                <p className="font-serif italic text-xs text-coastal-800/50 mb-6 uppercase tracking-wider">Puerto Vallarta, Jalisco</p>
                <a className="inline-flex items-center gap-2 font-sans text-[8.5px] tracking-wider uppercase border border-coastal-800/10 group-hover:border-accent-gold text-coastal-800 px-5 py-2.5 transition-all duration-500 bg-transparent hover:bg-coastal-800 hover:text-white rounded-sm select-none cursor-none relative overflow-hidden z-10" href="https://maps.app.goo.gl/37bXyMvnZqbDVrEt9" target="_blank" rel="noopener" {...cursorHoverProps}>
                  <SunGlintOverlay periodic={false} />
                  <svg className="w-3 h-3 stroke-current fill-none relative z-10" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span className="relative z-10">Ver Ubicación</span>
                </a>
              </div>
            </Interactive3DTilt>

          </div>
        </div>
      </section>

      {/* ══ RSVP SECTION (PAPIRO PAPER OVER DEEP OCEAN NAVY - 3 STEP REACT FLOW) ══ */}
      <section id="rsvp" className="py-24 md:py-32 px-6 bg-coastal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-soft-light opacity-[0.06] select-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-coastal-900 via-coastal-900/90 to-coastal-900 select-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16 select-none">
<<<<<<< HEAD
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Confirmación</span>
=======
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Confirmación al After Party</span>
>>>>>>> develop
            <h2 className="font-serif italic font-light text-3xl md:text-5xl text-white/90 tracking-wide mb-6 flex justify-center">
              <ElegantTextReveal text="¿Nos Acompañas?" />
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6 reveal reveal-d2">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-accent-gold/40"></span>
              <div className="w-[5px] h-[5px] border border-accent-gold/40 rotate-45"></div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-accent-gold/40"></span>
            </div>

<<<<<<< HEAD
            <p className="font-serif italic text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-6 reveal reveal-d2">
=======
            <p className="font-serif italic text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-6 reveal reveal-d2 font-normal">
>>>>>>> develop
              ¡Queremos compartir este momento tan esperado contigo! Por favor ayúdanos confirmando tu asistencia.
            </p>

            <div className="flex items-center justify-center gap-3 reveal reveal-d3">
              <span className="w-6 h-[1px] bg-accent-gold/25"></span>
              <span className="font-sans text-[8px] uppercase tracking-super text-accent-gold/60 font-semibold">Evento para adultos · No niños</span>
              <span className="w-6 h-[1px] bg-accent-gold/25"></span>
            </div>
          </div>

          {/* Interactive React Flow RSVP Sheet */}
          <Interactive3DTilt maxRotation={2} className="max-w-2xl mx-auto bg-sand-50 border border-accent-gold/20 rounded-sm shadow-2xl relative linen-bg reveal reveal-d4 select-text overflow-hidden">
            <SunGlintOverlay periodic={true} />
            <div className="absolute inset-2 border border-accent-gold/10 rounded-[1px] pointer-events-none z-10"></div>

            <div className="relative z-10 p-8 md:p-14">
              {rsvpStep < 4 && (
                <div className="mb-10 select-none">
                  {/* Visual Progressive Timeline bar */}
                  <div className="flex justify-between items-center max-w-[240px] mx-auto relative mb-3">
                    <div className="absolute h-[1px] bg-accent-gold/20 left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
                    <div
                      className="absolute h-[1px] bg-accent-gold left-0 top-1/2 -translate-y-1/2 z-0 transition-all duration-500 ease-out"
                      style={{ width: `${((rsvpStep - 1) / 2) * 100}%` }}
                    />
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[9px] font-sans font-semibold z-10 transition-all duration-500 ${rsvpStep >= 1 ? 'bg-coastal-800 text-white border-coastal-800' : 'bg-sand-50 text-coastal-800/40 border-accent-gold/30'}`}>1</div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[9px] font-sans font-semibold z-10 transition-all duration-500 ${rsvpStep >= 2 ? 'bg-coastal-800 text-white border-coastal-800' : 'bg-sand-50 text-coastal-800/40 border-accent-gold/30'}`}>2</div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[9px] font-sans font-semibold z-10 transition-all duration-500 ${rsvpStep >= 3 ? 'bg-coastal-800 text-white border-coastal-800' : 'bg-sand-50 text-coastal-800/40 border-accent-gold/30'}`}>3</div>
                  </div>
                  <p className="text-center font-sans text-[8px] uppercase tracking-widest text-accent-gold">
                    {rsvpStep === 1 && 'Paso 1: Tu Identificación'}
                    {rsvpStep === 2 && 'Paso 2: Confirmación de Asistencia'}
                    {rsvpStep === 3 && 'Paso 3: Detalles Adicionales'}
                  </p>
                </div>
              )}

              {/* STEP 1: Search Name */}
              {rsvpStep === 1 && (
                <div className="flex flex-col gap-8 animate-fadeIn">
                  <div className="flex flex-col gap-2">
<<<<<<< HEAD
                    <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Nombre Completo del Invitado</label>
=======
                    <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Nombre Completo del Invitado</label>
>>>>>>> develop
                    <input
                      type="text"
                      value={rsvpData.nombre}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Escribe tu nombre y apellido..."
                      required
<<<<<<< HEAD
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-3 text-coastal-800 font-serif italic text-base transition-colors duration-300 placeholder-coastal-800/30"
=======
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-3 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 placeholder-coastal-800/70"
>>>>>>> develop
                    />
                  </div>

                  <div className="flex flex-col gap-2">
<<<<<<< HEAD
                    <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Teléfono de Contacto</label>
=======
                    <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Teléfono de Contacto</label>
>>>>>>> develop
                    <input
                      type="tel"
                      value={rsvpData.telefono}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, telefono: e.target.value }))}
                      placeholder="+52 33 0000 0000"
<<<<<<< HEAD
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-3 text-coastal-800 font-serif italic text-base transition-colors duration-300 placeholder-coastal-800/30"
=======
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-3 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 placeholder-coastal-800/70"
>>>>>>> develop
                    />
                  </div>

                  <button
                    onClick={handleNextStep}
                    disabled={!rsvpData.nombre.trim()}
                    className="w-full mt-6 font-sans text-[9px] tracking-super uppercase bg-coastal-800 hover:bg-accent-gold text-white hover:text-white py-4 transition-all duration-500 rounded-sm font-semibold shadow-md select-none disabled:opacity-40 disabled:hover:bg-coastal-800 disabled:hover:text-white cursor-none relative overflow-hidden group"
                    {...cursorHoverProps}
                  >
                    <SunGlintOverlay periodic={false} />
                    <span className="relative z-10">Continuar</span>
                  </button>
                </div>
              )}

              {/* STEP 2: Attendance premium options */}
              {rsvpStep === 2 && (
                <div className="flex flex-col gap-8 animate-fadeIn">
                  <div className="text-center py-4 select-none">
                    <p className="font-serif italic text-lg text-coastal-800 mb-2">Hola, {rsvpData.nombre}</p>
<<<<<<< HEAD
                    <p className="font-serif italic text-sm text-coastal-800/60 leading-relaxed">¿Contamos con tu grata presencia el 4 de Septiembre?</p>
=======
                    <p className="font-serif italic text-sm text-coastal-800 leading-relaxed font-normal">¿Contamos con tu grata presencia el 4 de Septiembre en nuestra After Party?</p>
>>>>>>> develop
                  </div>

                  <div className="flex flex-col gap-4 border-t border-b border-sand-200/60 py-6 select-none">
                    <label
                      onClick={() => setRsvpData(prev => ({ ...prev, asistencia: 'si' }))}
                      className={`flex items-center justify-between p-4 border rounded-sm transition-all duration-500 cursor-none ${rsvpData.asistencia === 'si' ? 'bg-[#F5F0E6] border-accent-gold/80 shadow-md' : 'bg-transparent border-sand-200/50 hover:border-accent-gold/40'}`}
                      {...cursorHoverProps}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 border border-accent-gold rounded-full flex items-center justify-center transition-colors ${rsvpData.asistencia === 'si' ? 'bg-accent-gold' : ''}`}>
                          {rsvpData.asistencia === 'si' && <div className="w-1.5 h-1.5 bg-sand-50 rounded-full"></div>}
                        </div>
                        <span className="font-serif italic text-coastal-800 text-[15px]">Sí, estaré ahí celebrando con ustedes</span>
                      </div>
                      <span className="font-serif text-accent-gold text-sm opacity-50">✻</span>
                    </label>

                    <label
                      onClick={() => setRsvpData(prev => ({ ...prev, asistencia: 'no' }))}
                      className={`flex items-center justify-between p-4 border rounded-sm transition-all duration-500 cursor-none ${rsvpData.asistencia === 'no' ? 'bg-[#F5F0E6] border-accent-gold/80 shadow-md' : 'bg-transparent border-sand-200/50 hover:border-accent-gold/40'}`}
                      {...cursorHoverProps}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 border border-accent-gold rounded-full flex items-center justify-center transition-colors ${rsvpData.asistencia === 'no' ? 'bg-accent-gold' : ''}`}>
                          {rsvpData.asistencia === 'no' && <div className="w-1.5 h-1.5 bg-sand-50 rounded-full"></div>}
                        </div>
                        <span className="font-serif italic text-coastal-800 text-[15px]">Lamentablemente no podré asistir</span>
                      </div>
                      <span className="font-serif text-accent-gold text-sm opacity-50">◇</span>
                    </label>
                  </div>

                  <div className="flex gap-4 select-none">
                    <button
                      onClick={() => setRsvpStep(1)}
                      disabled={rsvpLoading}
                      className="w-1/3 font-sans text-[9px] tracking-super uppercase border border-coastal-800/10 text-coastal-800 hover:border-coastal-800 py-4 transition-all duration-500 rounded-sm font-semibold cursor-none disabled:opacity-40"
                      {...cursorHoverProps}
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!rsvpData.asistencia || rsvpLoading}
                      className="w-2/3 font-sans text-[9px] tracking-super uppercase bg-coastal-800 hover:bg-accent-gold text-white py-4 transition-all duration-500 rounded-sm font-semibold shadow-md disabled:opacity-40 cursor-none relative overflow-hidden group"
                      {...cursorHoverProps}
                    >
                      <SunGlintOverlay periodic={false} />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {rsvpLoading && (
                          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                          </svg>
                        )}
                        {rsvpLoading ? 'Enviando...' : rsvpData.asistencia === 'no' ? 'Confirmar' : 'Continuar'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Dietary requirements & message (if attendance is YES) */}
              {rsvpStep === 3 && (
                <div className="flex flex-col gap-8 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
<<<<<<< HEAD
                      <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Número de Pases a Reservar</label>
=======
                      <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Número de Pases a Reservar</label>
>>>>>>> develop
                      <div className="relative">
                        <select
                          value={rsvpData.personas}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, personas: Number(e.target.value) }))}
<<<<<<< HEAD
                          className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-base transition-colors duration-300 appearance-none rounded-none cursor-pointer"
=======
                          className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 appearance-none rounded-none cursor-pointer"
>>>>>>> develop
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num} className="bg-sand-100 font-serif italic py-2">{num} {num === 1 ? 'Persona' : 'Personas'}</option>
                          ))}
                        </select>
<<<<<<< HEAD
                        <span className="absolute right-2 bottom-3 text-coastal-800/40 pointer-events-none text-xs">&#9662;</span>
=======
                        <span className="absolute right-2 bottom-3 text-coastal-800/70 pointer-events-none text-xs">&#9662;</span>
>>>>>>> develop
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
<<<<<<< HEAD
                      <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Restricciones o Preferencia de Menú</label>
=======
                      <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Restricciones o Preferencia de Menú</label>
>>>>>>> develop
                      <div className="relative">
                        <select
                          value={rsvpData.dieta}
                          onChange={(e) => setRsvpData(prev => ({ ...prev, dieta: e.target.value }))}
<<<<<<< HEAD
                          className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-base transition-colors duration-300 appearance-none rounded-none cursor-pointer"
=======
                          className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 appearance-none rounded-none cursor-pointer"
>>>>>>> develop
                        >
                          <option value="sin_restriccion" className="bg-sand-100 font-serif italic py-2">Sin Restricciones</option>
                          <option value="vegetariano" className="bg-sand-100 font-serif italic py-2">Vegetariano</option>
                          <option value="vegano" className="bg-sand-100 font-serif italic py-2">Vegano</option>
                          <option value="sin_gluten" className="bg-sand-100 font-serif italic py-2">Sin Gluten</option>
                          <option value="alergia" className="bg-sand-100 font-serif italic py-2">Tengo una Alergia</option>
                        </select>
<<<<<<< HEAD
                        <span className="absolute right-2 bottom-3 text-coastal-800/40 pointer-events-none text-xs">&#9662;</span>
=======
                        <span className="absolute right-2 bottom-3 text-coastal-800/70 pointer-events-none text-xs">&#9662;</span>
>>>>>>> develop
                      </div>
                    </div>
                  </div>

                  {rsvpData.dieta === 'alergia' && (
                    <div className="flex flex-col gap-2 animate-fadeIn">
<<<<<<< HEAD
                      <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Especificar Alergia / Detalles alimentarios</label>
=======
                      <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Especificar Alergia / Detalles alimentarios</label>
>>>>>>> develop
                      <input
                        type="text"
                        value={rsvpData.alergiaDetalles}
                        onChange={(e) => setRsvpData(prev => ({ ...prev, alergiaDetalles: e.target.value }))}
                        placeholder="Ej. Nueces, mariscos..."
<<<<<<< HEAD
                        className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-base transition-colors duration-300 placeholder-coastal-800/30"
=======
                        className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 placeholder-coastal-800/70"
>>>>>>> develop
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
<<<<<<< HEAD
                    <label className="font-sans text-[9px] uppercase tracking-super text-coastal-800/40 font-semibold">Mensaje para los Novios</label>
=======
                    <label className="font-sans text-[11px] uppercase tracking-super text-coastal-800/80 font-bold">Mensaje para los Novios</label>
>>>>>>> develop
                    <textarea
                      value={rsvpData.mensaje}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, mensaje: e.target.value }))}
                      placeholder="Escribe un mensaje de cariño o buenos deseos..."
                      rows={2}
<<<<<<< HEAD
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-base transition-colors duration-300 placeholder-coastal-800/30 resize-none"
=======
                      className="w-full bg-transparent border-b border-coastal-800/10 focus:border-accent-gold outline-none py-2 text-coastal-800 font-serif italic text-lg font-normal transition-colors duration-300 placeholder-coastal-800/70 resize-none"
>>>>>>> develop
                    />
                  </div>

                  {rsvpError && (
                    <p className="font-sans text-[10px] text-red-500/80 text-center -mt-4">
                      Ocurrió un error al enviar. Verifica tu conexión e intenta de nuevo.
                    </p>
                  )}

                  <div className="flex gap-4 select-none">
                    <button
                      onClick={() => setRsvpStep(2)}
                      disabled={rsvpLoading}
                      className="w-1/3 font-sans text-[9px] tracking-super uppercase border border-coastal-800/10 text-coastal-800 hover:border-coastal-800 py-4 transition-all duration-500 rounded-sm font-semibold cursor-none disabled:opacity-40"
                      {...cursorHoverProps}
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={rsvpLoading}
                      className="w-2/3 font-sans text-[9px] tracking-super uppercase bg-coastal-800 hover:bg-accent-gold text-white py-4 transition-all duration-500 rounded-sm font-semibold shadow-md cursor-none relative overflow-hidden group disabled:opacity-70"
                      {...cursorHoverProps}
                    >
                      <SunGlintOverlay periodic={false} />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {rsvpLoading && (
                          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                          </svg>
                        )}
                        {rsvpLoading ? 'Enviando...' : 'Confirmar Asistencia'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Success / Error screen */}
              {rsvpStep === 4 && (
                <div className="text-center py-10 animate-fadeIn select-none">
                  <span className="font-serif italic text-3xl text-accent-gold block mb-6">◆</span>
                  <h3 className="font-serif italic font-light text-3xl text-coastal-800 mb-4">
                    {rsvpData.asistencia === 'si' ? '¡Gracias por confirmar!' : '¡Agradecemos tu respuesta!'}
                  </h3>
<<<<<<< HEAD
                  <p className="font-serif italic text-base leading-relaxed text-coastal-800/60 max-w-sm mx-auto">
=======
                  <p className="font-serif italic text-base leading-relaxed text-coastal-800 max-w-sm mx-auto font-normal">
>>>>>>> develop
                    {rsvpData.asistencia === 'si' ? (
                      <>Hemos recibido tu respuesta con mucho cariño.<br />Los esperamos en el paradisíaco gran día.</>
                    ) : (
                      <>Lamentamos que no nos puedas acompañar físicamente, pero sabemos que tu corazón y buenos deseos estarán ahí.</>
                    )}
                  </p>
                </div>
              )}
            </div>

          </Interactive3DTilt>
        </div>
      </section>

      {/* ══ SECCIÓN DE GALERÍA / SUBIDA DE FOTOS (DESTINO DEL QR) ══ */}
      <section id="galeria" className="py-24 md:py-32 bg-sand-50 select-none">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-[9px] tracking-super uppercase text-accent-gold block mb-3 reveal">Lookbook Interactivo</span>

<<<<<<< HEAD
            <span className="font-serif italic font-light text-4xl md:text-6xl text-coastal-800 block mb-6 flex justify-center items-center">
              <span className="font-serif not-italic text-accent-gold text-3xl md:text-5xl mr-1 font-light">#</span>
              <ElegantTextReveal text="AndreayGustavo" />
            </span>

            <p className="font-serif italic text-base text-coastal-800/60 max-w-sm mx-auto leading-relaxed reveal reveal-d2">
=======
            <span className="font-serif italic font-normal text-4xl md:text-6xl text-coastal-800 block mb-6 flex justify-center items-center">
              <span className="font-serif not-italic text-accent-gold text-3xl md:text-5xl mr-1 font-normal">#</span>
              <ElegantTextReveal text="AndreayGustavo" />
            </span>

            <p className="font-serif italic text-base text-coastal-800 max-w-sm mx-auto leading-relaxed reveal reveal-d2 font-normal">
>>>>>>> develop
              Ayúdanos a capturar cada instante eterno del evento compartiendo tus fotos capturadas desde tu celular.
            </p>
          </div>

          {/* 1. MEGA UPLOAD CTA */}
          <div className="max-w-xl mx-auto mb-20 text-center select-none reveal reveal-d2">
            <a
              href={MEGA_FILE_REQUEST.startsWith('http') ? MEGA_FILE_REQUEST : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-sand-100/50 hover:bg-white border-2 border-dashed border-accent-gold/30 hover:border-accent-gold p-8 md:p-10 flex flex-col items-center justify-center gap-4 rounded-sm transition-all duration-700 ease-out shadow-sm hover:shadow-xl cursor-none relative group overflow-hidden"
              {...cursorHoverProps}
            >
              <SunGlintOverlay periodic={true} />

              {/* Ícono nube + flecha */}
              <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-white text-accent-gold transition-all duration-500 relative z-10">
                <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V8m0 0-3 3m3-3 3 3"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
              </div>

              <div className="relative z-10">
                <p className="font-serif italic text-xl text-coastal-800 mb-1">Subir Fotos del Evento</p>
                <p className="font-sans text-[8.5px] uppercase tracking-wider text-accent-bronze/70">
                  Tus fotos se guardan directo en nuestra carpeta de MEGA
                </p>
              </div>

              {/* Chips informativos */}
              <div className="flex flex-wrap justify-center gap-2 relative z-10 mt-1">
                <span className="font-sans text-[7.5px] uppercase tracking-wider border border-accent-gold/30 text-accent-gold px-3 py-1 rounded-full">Sin límite</span>
                <span className="font-sans text-[7.5px] uppercase tracking-wider border border-accent-gold/30 text-accent-gold px-3 py-1 rounded-full">Sin cuenta requerida</span>
                <span className="font-sans text-[7.5px] uppercase tracking-wider border border-accent-gold/30 text-accent-gold px-3 py-1 rounded-full">Fotos y videos</span>
              </div>
            </a>
          </div>

          {/* 2. DYNAMIC GRID ASYMMETRIC LOOKBOOK */}
          <div className="gallery grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl mx-auto reveal reveal-d3">

            {/* Dynamic Rendering of uploaded & preset photos in Asymmetric Grid Spans */}
            {allPhotos.map((src, idx) => {
              // Custom span mapping to preserve gorgeous looking Bento Grid lookbook
              let gridSpan = "md:col-span-4 aspect-square";
              if (idx % 6 === 0) gridSpan = "md:col-span-4 aspect-square md:aspect-[3/4]";
              else if (idx % 6 === 1) gridSpan = "md:col-span-8 aspect-[16/10]";
              else if (idx % 6 === 2) gridSpan = "md:col-span-12 aspect-[21/9] md:aspect-[32/10]";
              else if (idx % 6 === 3) gridSpan = "md:col-span-7 aspect-[4/3]";
              else if (idx % 6 === 4) gridSpan = "md:col-span-5 aspect-square md:aspect-[3/4]";
              else if (idx % 6 === 5) gridSpan = "col-span-12 md:col-span-8 md:col-start-3 aspect-[3/4]";

              return (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`${gridSpan} overflow-hidden bg-white border border-sand-200/40 rounded-sm relative group cursor-none animate-fadeIn`}
                  {...cursorHoverProps}
                >
                  <img
                    src={src}
                    alt={`Foto Lookbook Boda Andrea y Gustavo - ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover filter saturate-[0.6] brightness-[0.95] group-hover:scale-105 group-hover:saturate-[0.9] group-hover:brightness-100 transition-all duration-[1200ms] ease-out"
                    style={{ objectPosition: idx % 6 === 5 ? 'center center' : 'center' }}
                  />

                  {/* Subtle fade-overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

                </div>
              );
            })}


          </div>
        </div>
      </section>

      {/* ══ FOOTER SECTION (DEEP OCEAN TWILIGHT) ══ */}
      <footer className="bg-coastal-900 py-16 px-6 text-center border-t border-white/[0.03] select-none relative z-10">
        <p className="font-display text-lg md:text-2xl text-white/80 tracking-widest mb-4">
          A <span className="font-serif italic text-accent-gold/60 text-sm md:text-base mx-1">&amp;</span> G
        </p>
        <p className="font-sans text-[9px] tracking-super uppercase text-white/20 mb-8">IV · IX · MMXXVI</p>
        <div className="w-10 h-[1px] bg-accent-gold/25 mx-auto mb-8"></div>
        <p className="font-serif italic text-[11px] md:text-xs text-white/30 tracking-[0.1em]">Con amor · Frente al Mar · Puerto Vallarta</p>
      </footer>

    </div>
  );
}
