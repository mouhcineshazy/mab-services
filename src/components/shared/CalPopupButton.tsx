'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import type { ReactNode } from 'react';

interface Props {
  calLink:   string;
  namespace: string;
  layout?:   'month_view' | 'column_view' | 'week_view';
  className?: string;
  children:  ReactNode;
}

export default function CalPopupButton({ calLink, namespace, layout = 'month_view', className, children }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#10B981' } },
        hideEventTypeDetails: false,
      });
    })();
  }, [namespace]);

  return (
    <button
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({ layout })}
      className={className}
    >
      {children}
    </button>
  );
}
