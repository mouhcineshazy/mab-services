import { useTranslations } from 'next-intl';

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-em">
    <path d="M3 10h18M3 14h18M10 3v18M14 3v18" strokeLinecap="round" />
    <rect x="3" y="3" width="18" height="18" rx="3" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-em">
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-em">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" />
  </svg>,
];

export default function WhySection() {
  const t = useTranslations('Why');

  return (
    <section id="about" className="section-alt scroll-mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="section-label">{t('label')}</span>
        <h2
          className="section-title"
          dangerouslySetInnerHTML={{
            __html: (t.raw('title') as string).replace(/<em>(.*?)<\/em>/g, '<span class="text-em">$1</span>'),
          }}
        />
        <p className="section-sub mb-12">{t('subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {([1, 2, 3] as const).map((n, i) => (
            <div key={n} className="card card-hover p-7 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--em-subtle)] border border-[var(--border-em)] mx-auto mb-5">
                {ICONS[i]}
              </div>
              <h3 className="font-heading text-[15px] font-bold text-content mb-2.5">
                {t(`card${n}.title`)}
              </h3>
              <p className="text-sm text-content-muted leading-relaxed">
                {t(`card${n}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
