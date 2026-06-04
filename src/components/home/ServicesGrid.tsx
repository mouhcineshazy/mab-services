import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { IconArrowRight } from '@/components/shared/icons';

export default function ServicesGrid() {
  const t = useTranslations('Services');

  const savingsItems = ['reer','celi','celiapp','reee','reei','nonreg'] as const;
  const insItems     = ['term','perm','disability','critical','health','travel'] as const;

  return (
    <section id="services" className="section scroll-mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="section-label">{t('label')}</span>
        <h2
          className="section-title"
          dangerouslySetInnerHTML={{
            __html: (t.raw('title') as string).replace(/<em>(.*?)<\/em>/g,
              '<span class="text-em">$1</span>'),
          }}
        />
        <p className="section-sub">{t('subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

          {/* Savings card */}
          <div className="card card-accent card-hover p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--em-glow) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--em-subtle)] border border-[var(--border-em)] text-2xl mb-5">💰</div>
            <h3 className="font-heading text-lg font-bold text-content mb-5">{t('savings.title')}</h3>
            <ul className="flex flex-col gap-3">
              {savingsItems.map((k) => (
                <li key={k} className="flex items-start gap-3 text-sm text-content-muted">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-em flex-shrink-0" />
                  <span>
                    <strong className="text-content font-semibold">{t(`savings.${k}.name`)}</strong>
                    {' — '}
                    {t(`savings.${k}.desc`)}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/epargne-investissement" className="btn btn-outline mt-6 text-sm" aria-label={t('savings.title')}>
              {t('learnMore')}
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insurance card */}
          <div className="card card-accent card-hover p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--em-glow) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--em-subtle)] border border-[var(--border-em)] text-2xl mb-5">🛡️</div>
            <h3 className="font-heading text-lg font-bold text-content mb-5">{t('insurance.title')}</h3>
            <ul className="flex flex-col gap-3">
              {insItems.map((k) => (
                <li key={k} className="flex items-start gap-3 text-sm text-content-muted">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-em flex-shrink-0" />
                  <span>
                    <strong className="text-content font-semibold">{t(`insurance.${k}.name`)}</strong>
                    {' — '}
                    {t(`insurance.${k}.desc`)}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/assurance-protection" className="btn btn-outline mt-6 text-sm" aria-label={t('insurance.title')}>
              {t('learnMore')}
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
