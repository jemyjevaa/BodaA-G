interface AudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  cursorHoverProps: { onMouseEnter: () => void; onMouseLeave: () => void };
}

const WAVE_DELAYS = ['0s', '0.15s', '0.3s', '0.45s'];

export default function AudioControl({ isPlaying, onToggle, cursorHoverProps }: AudioControlProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Control de música ambiental"
      className="fixed bottom-6 right-6 z-[490] w-12 h-12 rounded-full bg-sand-50/80 backdrop-blur-md border border-sand-300/40 flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-105 hover:bg-sand-50 hover:border-accent-gold group cursor-none"
      {...cursorHoverProps}
    >
      <div className="audio-wave flex items-end gap-[3px] w-4 h-[14px]">
        {WAVE_DELAYS.map((delay, i) => (
          <span
            key={i}
            className={`w-[2px] h-full bg-accent-gold rounded-[1px] origin-bottom animate-[bounceWave_1.2s_ease-in-out_infinite_alternate] ${
              isPlaying ? 'running' : 'paused'
            }`}
            style={{ animationDelay: delay }}
          />
        ))}
      </div>
    </button>
  );
}
