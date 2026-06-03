'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export default function LangSwitcher() {
  const locale  = useLocale();
  const router  = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-white/[0.04] border border-[var(--border)] rounded-lg">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={isPending}
          className={cn(
            'px-2.5 py-[5px] rounded-[5px] text-[11px] font-bold tracking-[0.1em] transition-all duration-200',
            locale === l
              ? 'bg-[var(--em-subtle)] text-em ring-1 ring-[var(--border-em)]'
              : 'text-content-subtle hover:text-content-muted',
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
