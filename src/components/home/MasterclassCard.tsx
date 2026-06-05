import { useTranslations } from 'next-intl';
import CalPopupButton from '@/components/shared/CalPopupButton';
import CountdownTimer from '@/components/shared/CountdownTimer';
import { IconArrowRight } from '@/components/shared/icons';
import type { CalSlot } from '@/lib/calcom';

const CAL_LINK = `${process.env.NEXT_PUBLIC_CAL_USERNAME}/${process.env.NEXT_PUBLIC_CAL_EVENT_SLUG}`;
const CAL_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CAL_USERNAME && process.env.NEXT_PUBLIC_CAL_EVENT_SLUG,
);

interface Props { nextSlot: CalSlot | null }

export default function MasterclassCard({ nextSlot }: Props) {
  const t = useTranslations('Masterclass');

  const features = [t('cardFeature1'), t('cardFeature2'), t('cardFeature3')] as const;

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
      {CAL_CONFIGURED ? (
        <CalPopupButton calLink={CAL_LINK} className="btn btn-primary justify-center w-full py-4 text-[15px]">
          {t('cardCta')}
          <IconArrowRight className="w-4 h-4 flex-shrink-0" />
        </CalPopupButton>
      ) : (
        <button disabled className="btn btn-primary justify-center w-full py-4 text-[15px] opacity-50 cursor-not-allowed">
          {t('calNotConfigured')}
        </button>
      )}

      <p className="text-[11px] text-content-subtle text-center">{t('cardDisclaimer')}</p>
    </div>
  );
}
