'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import type { ReactNode } from 'react';

interface Props {
  calLink: string;
  className?: string;
  children: ReactNode;
}

const CAL_NAMESPACE = 'masterclass';

export default function CalPopupButton({ calLink, className, children }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#10B981' } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={calLink}
      data-cal-config='{"layout":"column_view"}'
      className={className}
    >
      {children}
    </button>
  );
}
