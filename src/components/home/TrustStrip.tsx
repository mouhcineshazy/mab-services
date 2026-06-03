import { useTranslations } from 'next-intl';

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-em flex-shrink-0">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-em flex-shrink-0">
      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-em flex-shrink-0">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function TrustStrip() {
  const t = useTranslations('Trust');

  const items = [
    { key: 'amf',         icon: ICONS.shield },
    { key: 'fsra',        icon: ICONS.shield },
    { key: 'independent', icon: ICONS.users  },
    { key: 'free',        icon: ICONS.clock  },
  ] as const;

  return (
    <div className="bg-[var(--bg-2)] border-y border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center divide-x divide-[var(--border)]">
          {items.map(({ key, icon }) => (
            <div
              key={key}
              className="flex items-center gap-2.5 px-5 sm:px-8 py-4 text-[13px] font-medium text-content-muted"
            >
              {icon}
              <span dangerouslySetInnerHTML={{ __html: t.raw(key) as string }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
