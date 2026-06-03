import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/shared/JsonLd';
import { personSchema } from '@/lib/schemas';

const BASE_URL = 'https://mabservices-ca.com';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.about' });
  const ogLocale = locale === 'fr' ? 'fr_CA' : 'en_CA';
  const altLocale = locale === 'fr' ? 'en_CA' : 'fr_CA';
  const url = `${BASE_URL}/${locale}/a-propos`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `${BASE_URL}/fr/a-propos`,
        'en-CA': `${BASE_URL}/en/a-propos`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      locale: ogLocale,
      alternateLocale: [altLocale],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <>
      <JsonLd schema={personSchema()} />

      <div className="pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="max-w-3xl mb-16">
            <span className="section-label">À Propos</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content leading-tight">
              {t('title')}
            </h1>
          </div>

          {/* Profile card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">

            {/* Identity card */}
            <div className="card card-accent p-8 text-center lg:text-left lg:sticky lg:top-28">
              <div className="w-20 h-20 rounded-full bg-[var(--em-subtle)] border-2 border-[var(--border-em)] flex items-center justify-center text-2xl font-heading font-black text-em mx-auto lg:mx-0 mb-5">
                MAB
              </div>
              <h2 className="font-heading text-lg font-bold text-content mb-1">Mohammed Amine BENZAKOUR</h2>
              <p className="text-sm text-content-muted mb-4">MAB Services</p>
              <div className="flex flex-col gap-2">
                <span className="badge justify-center lg:justify-start text-[10px]">AMF — Québec</span>
                <span className="badge justify-center lg:justify-start text-[10px]">FSRA — Ontario</span>
              </div>
              <div className="border-t border-[var(--border)] my-5" />
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:6132614428" className="flex items-center gap-2 text-content-muted hover:text-em transition-colors justify-center lg:justify-start">
                  <span>📞</span> 613-261-4428
                </a>
                <a href="mailto:sales@mabservices-ca.com" className="flex items-center gap-2 text-content-muted hover:text-em transition-colors justify-center lg:justify-start break-all">
                  <span>✉</span> sales@mabservices-ca.com
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="card p-8 lg:p-10">
              <div className="flex flex-col gap-6 text-[1.05rem] text-content-muted leading-relaxed">
                {(['p1', 'p2', 'p3'] as const).map((key) => (
                  <p key={key} dangerouslySetInnerHTML={{ __html: t.raw(key) as string }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
