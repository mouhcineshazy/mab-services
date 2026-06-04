import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ConsultationSection from '@/components/home/ConsultationSection';
import { BASE_URL } from '@/lib/constants';

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
  const t = await getTranslations({ locale, namespace: 'Metadata.contact' });

  return (
    <div className="pt-24">
      {/* sr-only h1 for SEO — ConsultationSection provides the visual heading */}
      <h1 className="sr-only">{t('title')}</h1>
      <ConsultationSection />
    </div>
  );
}
