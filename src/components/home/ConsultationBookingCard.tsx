import { useTranslations } from 'next-intl';
import ConsultationForm from '@/components/forms/ConsultationForm';
import CalPopupButton from '@/components/shared/CalPopupButton';
import { IconArrowRight } from '@/components/shared/icons';

const CAL_LINK = `${process.env.NEXT_PUBLIC_CAL_USERNAME}/${process.env.NEXT_PUBLIC_CAL_CONSULTATION_SLUG}`;
const CAL_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_CAL_USERNAME && process.env.NEXT_PUBLIC_CAL_CONSULTATION_SLUG,
);

const BADGE_KEYS = ['bookingBadge1', 'bookingBadge2', 'bookingBadge3'] as const;

export default function ConsultationBookingCard() {
  const t = useTranslations('Consultation');

  return (
    <div className="flex flex-col gap-8">

      {/* ── Cal.com booking — primary action ───────── */}
      <div className="card card-accent p-7 lg:p-8">
        <h3 className="font-heading text-lg font-bold text-content mb-2">{t('bookingTitle')}</h3>
        <p className="text-sm text-content-muted leading-relaxed mb-5">{t('bookingSubtitle')}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {BADGE_KEYS.map((key) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)', color: 'var(--em-light)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-em flex-shrink-0" />
              {t(key)}
            </span>
          ))}
        </div>

        {CAL_CONFIGURED ? (
          <CalPopupButton
            calLink={CAL_LINK}
            namespace="consultation"
            layout="month_view"
            className="btn btn-primary justify-center w-full py-4 text-[15px]"
          >
            {t('bookingCta')}
            <IconArrowRight className="w-4 h-4 flex-shrink-0" />
          </CalPopupButton>
        ) : (
          <button disabled className="btn btn-primary justify-center w-full py-4 text-[15px] opacity-50 cursor-not-allowed">
            {t('calNotConfigured')}
          </button>
        )}
      </div>

      {/* ── Divider ─────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-content-subtle whitespace-nowrap">
          {t('orDivider')}
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
      </div>

      {/* ── Consultation form — secondary fallback ── */}
      <ConsultationForm />
    </div>
  );
}
