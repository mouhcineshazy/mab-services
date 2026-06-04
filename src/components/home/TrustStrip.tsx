import { useTranslations } from 'next-intl';
import { IconShieldCheck, IconUsers, IconClock } from '@/components/shared/icons';

const ICON_CLASS = 'w-4 h-4 text-em flex-shrink-0';

const ICONS = {
  shield: <IconShieldCheck className={ICON_CLASS} />,
  users:  <IconUsers       className={ICON_CLASS} />,
  clock:  <IconClock       className={ICON_CLASS} />,
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
