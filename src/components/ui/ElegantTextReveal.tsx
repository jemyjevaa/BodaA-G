import { motion } from 'framer-motion';

interface ElegantTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const childVariants = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%', opacity: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ElegantTextReveal({ text, className = '', delay = 0 }: ElegantTextRevealProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden py-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {text.split(' ').map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span className="inline-block" variants={childVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}
