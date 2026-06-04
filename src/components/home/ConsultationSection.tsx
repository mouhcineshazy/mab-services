import { useTranslations } from 'next-intl';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { IconFacebook, IconLinkedIn } from '@/components/shared/icons';

export default function ConsultationSection() {
  const t = useTranslations('Consultation');

  return (
    <section id="contact" className="section scroll-mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-12 lg:gap-16 items-start">

          {/* Info panel */}
          <div className="lg:sticky lg:top-24">
            <span className="section-label">{t('label')}</span>
            <h2
              className="section-title"
              dangerouslySetInnerHTML={{
                __html: (t.raw('title') as string).replace(/<em>(.*?)<\/em>/g, '<span class="text-em">$1</span>'),
              }}
            />
            <p className="text-content-muted leading-relaxed mb-8">{t('subtitle')}</p>

            {/* Contact lines */}
            <div className="flex flex-col gap-3 mb-8">
              {([
                { icon: '📞', labelKey: 'phone', href: 'tel:6132614428' },
                { icon: '✉️', labelKey: 'email', href: 'mailto:sales@mabservices-ca.com' },
                { icon: '📍', labelKey: 'zones', href: null },
              ] as const).map(({ icon, labelKey, href }) => {
                const content = (
                  <div className="card flex items-center gap-4 p-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-content-subtle">{t(`${labelKey}.label`)}</p>
                      <p className="text-[15px] font-semibold text-content">{t(`${labelKey}.value`)}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={labelKey} href={href} className="hover:no-underline">{content}</a>
                ) : (
                  <div key={labelKey}>{content}</div>
                );
              })}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-content-subtle">{t('follow')}</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] text-content-muted hover:bg-[var(--em-subtle)] hover:border-[var(--border-em)] hover:text-em transition-all">
                <IconFacebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] text-content-muted hover:bg-[var(--em-subtle)] hover:border-[var(--border-em)] hover:text-em transition-all">
                <IconLinkedIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Form */}
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
