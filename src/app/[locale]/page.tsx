import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HeroSection         from '@/components/home/HeroSection';
import TrustStrip          from '@/components/home/TrustStrip';
import ServicesGrid        from '@/components/home/ServicesGrid';
import WhySection          from '@/components/home/WhySection';
import StatsStrip          from '@/components/home/StatsStrip';
import MasterclassSection  from '@/components/home/MasterclassSection';
import ConsultationSection from '@/components/home/ConsultationSection';

const BASE_URL = 'https://mabservices-ca.com';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const ogLocale = locale === 'fr' ? 'fr_CA' : 'en_CA';
  const altLocale = locale === 'fr' ? 'en_CA' : 'fr_CA';
  const url = `${BASE_URL}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `${BASE_URL}/fr`,
        'en-CA': `${BASE_URL}/en`,
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesGrid />
      <WhySection />
      <StatsStrip />
      <MasterclassSection />
      <ConsultationSection />
    </>
  );
}
