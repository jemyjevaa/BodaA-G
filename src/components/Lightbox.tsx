interface LightboxProps {
  photos: string[];
  index: number | null;
  onClose: () => void;
  onNavigate: (direction: number, e: React.MouseEvent) => void;
  cursorHoverProps: { onMouseEnter: () => void; onMouseLeave: () => void };
}

export default function Lightbox({ photos, index, onClose, onNavigate, cursorHoverProps }: LightboxProps) {
  if (index === null) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[10010] bg-coastal-900/98 flex items-center justify-center transition-all duration-500"
    >
      <div
        className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute -top-12 right-0 bg-transparent border-none text-white/50 font-serif text-[10px] tracking-widest uppercase hover:text-white transition-colors duration-300 py-2 cursor-none"
          onClick={onClose}
          {...cursorHoverProps}
        >
          Cerrar
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 -left-16 bg-transparent border-none text-white/40 hover:text-white font-serif text-3xl transition-all duration-300 p-4 hover:-translate-x-1 cursor-none"
          onClick={e => onNavigate(-1, e)}
          {...cursorHoverProps}
        >
          &#8249;
        </button>
        <img
          className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/5 rounded-sm"
          src={photos[index]}
          alt="Lookbook Boda Andrea y Gustavo"
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 -right-16 bg-transparent border-none text-white/40 hover:text-white font-serif text-3xl transition-all duration-300 p-4 hover:translate-x-1 cursor-none"
          onClick={e => onNavigate(1, e)}
          {...cursorHoverProps}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
