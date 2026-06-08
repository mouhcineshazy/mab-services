import { getTranslations } from 'next-intl/server';
import CalPopupButton from '@/components/shared/CalPopupButton';
import CountdownTimer from '@/components/shared/CountdownTimer';
import { IconArrowRight } from '@/components/shared/icons';
import { type CalSlot, MASTERCLASS_CAL_LINK, MASTERCLASS_CAL_CONFIGURED } from '@/lib/calcom';

interface Props { nextSlot: CalSlot | null }

export default async function MasterclassCard({ nextSlot }: Props) {
  const t = await getTranslations('Masterclass');

  const features = [t('cardFeature1'), t('cardFeature2'), t('cardFeature3')];

  return (
    <div className="card card-accent p-8 lg:p-10 flex flex-col gap-6">

      {/* Platform badge */}
      <div
        className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide"
        style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)', color: 'var(--em-light)' }}
      >
        <span className="w-2 h-2 rounded-full bg-em animate-pulse-dot flex-shrink-0" />
        {t('cardPlatform')}
      </div>

      {/* Title */}
      <div>
        <h3 className="font-heading text-xl font-extrabold text-content mb-1">{t('cardTitle')}</h3>
        <p className="text-sm text-content-muted">{t('warning')}</p>
      </div>

      {/* Countdown — only shown when a slot is scheduled */}
      {nextSlot && <CountdownTimer targetDate={nextSlot.start} />}

      {/* Feature list */}
      <ul className="flex flex-col gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-content-muted">
            <span
              className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md text-[11px] text-em"
              style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}
            >
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {MASTERCLASS_CAL_CONFIGURED ? (
        <CalPopupButton calLink={MASTERCLASS_CAL_LINK} namespace="masterclass" layout="month_view" className="btn btn-primary justify-center w-full py-4 text-[15px]">
          {t('cardCta')}
          <IconArrowRight className="w-4 h-4 flex-shrink-0" />
        </CalPopupButton>
      ) : (
        <button disabled className="btn btn-primary justify-center w-full py-4 text-[15px] opacity-50 cursor-not-allowed">
          {t('calNotConfigured')}
        </button>
      )}

      {/* Seats remaining + warning */}
      <div className="flex flex-col gap-2">
        {nextSlot?.seatsAvailable !== undefined && (
          <p className="text-[12px] font-bold text-center" style={{ color: 'var(--gold)' }}>
            {t('seatsLeft', { count: nextSlot.seatsAvailable })}
          </p>
        )}
        <p className="text-[11px] text-content-subtle text-center">{t('cardDisclaimer')}</p>
      </div>
    </div>
  );
}
