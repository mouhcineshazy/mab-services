import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ConsultationSection from '@/components/home/ConsultationSection';

const BASE_URL = 'https://mabservices-ca.com';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.contact' });
  const ogLocale = locale === 'fr' ? 'fr_CA' : 'en_CA';
  const altLocale = locale === 'fr' ? 'en_CA' : 'fr_CA';
  const url = `${BASE_URL}/${locale}/contact`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `${BASE_URL}/fr/contact`,
        'en-CA': `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      locale: ogLocale,
      alternateLocale: [altLocale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return (
    <div className="pt-24">
      {/* Hero card */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl mx-auto">
          <div className="card card-accent p-10 text-center">
            <h1 className="font-heading text-2xl font-extrabold text-content mb-6">{t('cardTitle')}</h1>
            <div className="flex flex-col gap-4">
              {([
                { icon: '📞', label: t('phoneLabel'), value: t('phoneValue'), href: 'tel:6132614428' },
                { icon: '✉️', label: t('emailLabel'), value: t('emailValue'), href: 'mailto:sales@mabservices-ca.com' },
              ] as const).map(({ icon, label, value, href }) => (
                <a key={href} href={href}
                  className="flex items-center gap-4 p-4 bg-[var(--bg)] rounded-xl border border-[var(--border)] hover:border-[var(--border-em)] transition-all text-left group">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}>
                    {icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-content-subtle">{label}</p>
                    <p className="text-base font-semibold text-content group-hover:text-em transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="border-t border-[var(--border)] my-6" />
            <div>
              <p className="text-xs text-content-subtle uppercase tracking-widest mb-3">{t('follow')}</p>
              <div className="flex justify-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-content-muted hover:bg-[var(--em-subtle)] hover:border-[var(--border-em)] hover:text-em transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="mt-6 text-sm text-content-muted">{t('freeNote')}</p>
          </div>
        </div>
      </div>

      {/* Full consultation form below */}
      <ConsultationSection />
    </div>
  );
}
