import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BASE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.privacy' });
  const url = `${BASE_URL}/${locale}/confidentialite`;

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `${BASE_URL}/fr/confidentialite`,
        'en-CA': `${BASE_URL}/en/confidentialite`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <span className="section-label">{t('label')}</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-content mb-8">{t('title')}</h1>
          <div className="card card-accent p-7">
            <p className="text-sm text-content-muted leading-relaxed">{t('body')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
