import { useEffect } from 'react';

export function useScrollReveal(isUnlocked: boolean) {
  useEffect(() => {
    if (!isUnlocked) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isUnlocked]);
}
