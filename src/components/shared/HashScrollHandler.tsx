'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import { consumeScrollTarget } from '@/lib/scroll-target';

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    // consumeScrollTarget() handles cross-page nav (set by Navbar before router.push).
    // window.location.hash handles direct URL access like /en#masterclass.
    const hash = consumeScrollTarget() ?? window.location.hash.slice(1);
    if (!hash) return;
    const id = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
