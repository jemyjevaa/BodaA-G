import { useState, useEffect } from 'react';
import type { TimeLeft } from '../types';

export function useCountdown(targetDate: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '000', hours: '00', minutes: '00', seconds: '00',
  });

  useEffect(() => {
    const target = new Date(targetDate);

    const calculate = () => {
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: '000', hours: '00', minutes: '00', seconds: '00' });
        return;
      }
      setTimeLeft({
        days: String(Math.floor(diff / 86400000)).padStart(3, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
