import { motion } from 'framer-motion';

interface PreloaderProps {
  isHidden: boolean;
  onBegin: () => void;
}

export default function Preloader({ isHidden, onBegin }: PreloaderProps) {
  return (
    <div id="preloader" className={isHidden ? 'hidden' : ''}>
      <div className="monogram">
        <span className="monogram-initial">A</span>
        <span className="monogram-amp">&amp;</span>
        <span className="monogram-initial">G</span>
      </div>
      <div className="monogram-line-h" />
      <p className="monogram-sub">IV · IX · MMXXVI</p>
      <motion.button
        onClick={onBegin}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          marginTop: 36,
          padding: '11px 34px',
          border: '1px solid rgba(192,169,126,0.55)',
          borderRadius: 9999,
          background: 'transparent',
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: '7.5px',
          letterSpacing: '0.38em',
          color: '#A38971',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Comenzar
      </motion.button>
    </div>
  );
}
