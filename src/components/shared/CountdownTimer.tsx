'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; total: number }

function getTimeLeft(target: string): TimeLeft {
  const total = new Date(target).getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total };
  return {
    total,
    days:    Math.floor(total / 86_400_000),
    hours:   Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1_000) % 60),
  };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const t = useTranslations('Masterclass');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft.total <= 0) {
    return (
      <div
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-em"
        style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}
      >
        <span className="w-2 h-2 rounded-full bg-em animate-pulse-dot flex-shrink-0" />
        {t('sessionLive')}
      </div>
    );
  }

  const units = [
    { value: timeLeft.days,    label: t('countdownDays') },
    { value: timeLeft.hours,   label: t('countdownHours') },
    { value: timeLeft.minutes, label: t('countdownMin') },
    { value: timeLeft.seconds, label: t('countdownSec') },
  ];

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-3">
        {t('countdownTitle')}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div
              className="w-full flex items-center justify-center rounded-xl py-3 font-black font-heading text-em-light tabular-nums"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-em)' }}
            >
              {String(value).padStart(2, '0')}
            </div>
            <span className="text-[9px] uppercase tracking-[0.1em] text-content-subtle">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
