import { useTranslations } from 'next-intl';
import { IconDualLicense, IconPersonalized, IconTransparency } from '@/components/shared/icons';

const CARD_ICONS = [IconDualLicense, IconPersonalized, IconTransparency] as const;

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
          {([1, 2, 3] as const).map((n, i) => {
            const CardIcon = CARD_ICONS[i];
            return (
            <div key={n} className="card card-hover p-7 text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--em-subtle)] border border-[var(--border-em)] mx-auto mb-5">
                <CardIcon className="w-7 h-7 text-em" />
              </div>
              <h3 className="font-heading text-[15px] font-bold text-content mb-2.5">
                {t(`card${n}.title`)}
              </h3>
              <p className="text-sm text-content-muted leading-relaxed">
                {t(`card${n}.desc`)}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
