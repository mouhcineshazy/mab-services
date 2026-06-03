import { cn } from '@/lib/utils';

interface Props { className?: string; size?: number }

export default function LogoMark({ className, size = 38 }: Props) {
  const id = `lg-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('flex-shrink-0', className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill={`url(#${id})`} />
      <line x1="28" y1="11" x2="13" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
      <line x1="28" y1="11" x2="43" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
      <line x1="13" y1="39" x2="43" y2="39" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
      <line x1="28" y1="11" x2="20.5" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
      <line x1="28" y1="11" x2="35.5" y2="25" stroke="white" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
      <circle cx="28" cy="11" r="4.5" fill="white" />
      <circle cx="13" cy="39" r="3.5" fill="white" fillOpacity="0.88" />
      <circle cx="43" cy="39" r="3.5" fill="white" fillOpacity="0.88" />
      <circle cx="20.5" cy="25" r="1.8" fill="white" fillOpacity="0.45" />
      <circle cx="35.5" cy="25" r="1.8" fill="white" fillOpacity="0.45" />
    </svg>
  );
}
