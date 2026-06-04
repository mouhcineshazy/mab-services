import { useTranslations } from 'next-intl';
import MasterclassForm from '@/components/forms/MasterclassForm';
import { IconAlertTriangle } from '@/components/shared/icons';

export default function MasterclassSection() {
  const t = useTranslations('Masterclass');

  const topics = [t('topic1'), t('topic2'), t('topic3'), t('topic4')];

  return (
    <section id="masterclass" className="section-alt scroll-mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Promo panel */}
          <div className="lg:sticky lg:top-24">
            {/* Gold badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-bold uppercase tracking-wide mb-6"
              style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: 'var(--gold)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot flex-shrink-0" style={{ background: 'var(--gold)' }} />
              {t('badge')}
            </div>

            <h2
              className="font-heading text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold leading-snug mb-4"
              dangerouslySetInnerHTML={{
                __html: (t.raw('title') as string).replace(/<em>(.*?)<\/em>/g, '<span class="text-em">$1</span>'),
              }}
            />
            <p className="text-content-muted leading-relaxed mb-7">{t('subtitle')}</p>

            <ul className="flex flex-col gap-3 mb-7">
              {topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-content-muted">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md text-[11px] text-em mt-0.5"
                    style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}>
                    ✓
                  </span>
                  {topic}
                </li>
              ))}
            </ul>

            {/* Warning */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: 'var(--gold)' }}>
              <IconAlertTriangle className="w-4 h-4 flex-shrink-0" />
              {t('warning')}
            </div>
          </div>

          {/* Form */}
          <MasterclassForm />
        </div>
      </div>
    </section>
  );
}
