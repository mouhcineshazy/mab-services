import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/shared/JsonLd';
import { localBusinessSchema, webSiteSchema } from '@/lib/schemas';
import '../globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const inter      = Inter({      subsets: ['latin'], variable: '--font-inter',      display: 'swap' });

const BASE_URL = 'https://mabservices-ca.com';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const ogLocale = locale === 'fr' ? 'fr_CA' : 'en_CA';
  const altLocale = locale === 'fr' ? 'en_CA' : 'fr_CA';

  return {
    metadataBase: new URL(BASE_URL),
    title:       { template: '%s | MAB Services', default: t('title') },
    description: t('description'),
    keywords: locale === 'fr'
      ? ['assurance vie Québec', 'assurance vie Ontario', 'REER', 'CELI', 'CELIAPP', 'REEE', 'REEI', 'conseiller financier', 'courtier assurance', 'AMF', 'FSRA', 'consultation gratuite']
      : ['life insurance Quebec', 'life insurance Ontario', 'RRSP', 'TFSA', 'FHSA', 'RESP', 'RDSP', 'financial advisor', 'insurance broker', 'AMF', 'FSRA', 'free consultation'],
    authors: [{ name: 'Mohammed Amine BENZAKOUR', url: `${BASE_URL}/${locale}/a-propos` }],
    creator: 'Mohammed Amine BENZAKOUR',
    publisher: 'MAB Services',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      siteName: 'MAB Services',
      locale: ogLocale,
      alternateLocale: [altLocale],
      type: 'website',
      title: t('title'),
      description: t('description'),
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@mabservices',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'fr-CA': `${BASE_URL}/fr`,
        'en-CA': `${BASE_URL}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} font-body antialiased`}>
        <JsonLd schema={localBusinessSchema(locale)} />
        <JsonLd schema={webSiteSchema()} />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
