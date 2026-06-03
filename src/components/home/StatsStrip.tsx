import { useTranslations } from 'next-intl';

export default function StatsStrip() {
  const t = useTranslations('Stats');

  const items = ['provinces', 'free', 'amf', 'fsra'] as const;

  return (
    <div className="py-16 bg-[var(--bg)] border-y border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((k) => (
            <div key={k} className="text-center">
              <div
                className="font-heading font-black text-em leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {t(`${k}.num`)}
              </div>
              <div className="text-[13px] text-content-muted font-medium tracking-wide whitespace-pre-line leading-tight">
                {t(`${k}.label`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
