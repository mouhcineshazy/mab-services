import { getTranslations, getFormatter } from 'next-intl/server';
import MasterclassCard from '@/components/home/MasterclassCard';
import { IconAlertTriangle } from '@/components/shared/icons';
import { getNextMasterclassSlot } from '@/lib/calcom';

export default async function MasterclassSection() {
  const t      = await getTranslations('Masterclass');
  const format = await getFormatter();
  const nextSlot = await getNextMasterclassSlot();

  const topics = [t('topic1'), t('topic2'), t('topic3'), t('topic4')];

  const sessionDateStr = nextSlot
    ? format.dateTime(new Date(nextSlot.start), {
        weekday: 'long',
        day:     'numeric',
        month:   'long',
        hour:    'numeric',
        minute:  '2-digit',
        timeZone: 'America/Toronto',
        timeZoneName: 'short',
      })
    : null;

  return (
    <section id="masterclass" className="section-alt scroll-mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Promo panel */}
          <div className="lg:sticky lg:top-24">

            {/* Badge — dynamic availability */}
            {nextSlot ? (
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-bold uppercase tracking-wide mb-3"
                style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.08)', color: 'var(--gold)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse-dot flex-shrink-0" style={{ background: 'var(--gold)' }} />
                {t('badge')}
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[12px] font-bold uppercase tracking-wide mb-3"
                style={{ borderColor: 'rgba(156,163,175,0.2)', background: 'rgba(156,163,175,0.06)', color: 'var(--text-2)' }}
              >
                <span className="w-2 h-2 rounded-full bg-content-muted flex-shrink-0" />
                {t('badgeSoon')}
              </div>
            )}

            {/* Session date line */}
            {sessionDateStr && (
              <p className="text-sm text-em font-medium mb-5">
                📅 {t('sessionDateLabel')} · {sessionDateStr}
              </p>
            )}

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
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md text-[11px] text-em mt-0.5"
                    style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}
                  >
                    ✓
                  </span>
                  {topic}
                </li>
              ))}
            </ul>

            {/* Warning */}
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: 'var(--gold)' }}
            >
              <IconAlertTriangle className="w-4 h-4 flex-shrink-0" />
              {t('warning')}
            </div>
          </div>

          {/* Registration card */}
          <MasterclassCard nextSlot={nextSlot} />
        </div>
      </div>
    </section>
  );
}
