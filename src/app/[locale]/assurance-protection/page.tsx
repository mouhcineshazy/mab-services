import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import JsonLd from '@/components/shared/JsonLd';
import { IconChevronDown, IconArrowRight } from '@/components/shared/icons';
import { insuranceServiceSchema, faqSchema } from '@/lib/schemas';
import { BASE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.insurance' });
  const ogLocale = locale === 'fr' ? 'fr_CA' : 'en_CA';
  const altLocale = locale === 'fr' ? 'en_CA' : 'fr_CA';
  const url = `${BASE_URL}/${locale}/assurance-protection`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `${BASE_URL}/fr/assurance-protection`,
        'en-CA': `${BASE_URL}/en/assurance-protection`,
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

export default async function InsurancePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Insurance' });

  const products = ['term', 'perm', 'disability', 'critical', 'health', 'travel'] as const;
  const icons    = ['⏱️', '🏛️', '🩺', '💊', '🦷', '✈️'];

  type FaqItem = { q: string; a: string };
  const faqs: FaqItem[] = t.raw('faq') as FaqItem[];

  return (
    <>
      <JsonLd schema={insuranceServiceSchema(locale)} />
      <JsonLd schema={faqSchema(faqs)} />

      <div className="pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-14">
            <span className="section-label">{t('label')}</span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content leading-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-[1.05rem] text-content-muted leading-relaxed">{t('intro')}</p>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {products.map((key, i) => (
              <div key={key} className="card card-accent card-hover p-8 flex gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'var(--em-subtle)', border: '1px solid var(--border-em)' }}>
                  {icons[i]}
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-content mb-2">{t(`${key}.title`)}</h2>
                  <p className="text-sm text-content-muted leading-relaxed">{t(`${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-xl font-bold text-content mb-6">{t('faqTitle')}</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <details key={i} className="card group p-0 overflow-hidden">
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none text-content font-medium hover:text-em transition-colors">
                    <span>{faq.q}</span>
                    <IconChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-sm text-content-muted leading-relaxed border-t border-[var(--border)] pt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link href="/contact" className="btn btn-primary text-base px-10 py-4">
              {t('cta')}
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
