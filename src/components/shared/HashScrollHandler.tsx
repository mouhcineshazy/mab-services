'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Fires after every client-side route change. When the target page is home ("/"),
 * reads window.location.hash and scrolls to the matching section.
 *
 * Needed because Next.js App Router's router.push() does not scroll to hash
 * anchors automatically — it only restores scroll to the top.
 */
export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pathname]);

  return null;
}
