import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LogoMark from '@/components/shared/LogoMark';
import { IconFacebook, IconLinkedIn } from '@/components/shared/icons';

export default function Footer() {
  const t    = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const year = new Date().getFullYear();

  const navLinks = [
    { label: tNav('home'),      href: '/' },
    { label: tNav('about'),     href: '/a-propos' },
    { label: tNav('insurance'), href: '/assurance-protection' },
    { label: tNav('savings'),   href: '/epargne-investissement' },
    { label: tNav('masterclass'), href: '/#masterclass' },
  ];

  const SERVICE_HREFS = [
    '/assurance-protection',
    '/assurance-protection',
    '/epargne-investissement',
    '/epargne-investissement',
    '/epargne-investissement',
  ] as const;
  const LEGAL_HREFS = ['/confidentialite', '/confidentialite'] as const;

  const serviceLinks = (t.raw('serviceLinks') as string[]).map((label, i) => ({ label, href: SERVICE_HREFS[i] ?? '/' }));
  const legalLinks   = (t.raw('legalLinks')   as string[]).map((label, i) => ({ label, href: LEGAL_HREFS[i]   ?? '/' }));

  return (
    <footer className="bg-[var(--bg-3)] border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--border)]">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-heading font-extrabold text-[17px] tracking-wide mb-4">
              <LogoMark size={32} />
              <span>MAB <span className="font-medium text-content-muted">SERVICES</span></span>
            </Link>
            <p className="text-sm text-content-muted leading-relaxed max-w-[240px] mb-5">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] text-content-muted hover:bg-[var(--em-subtle)] hover:border-[var(--border-em)] hover:text-em transition-all duration-200"
              >
                <IconFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] text-content-muted hover:bg-[var(--em-subtle)] hover:border-[var(--border-em)] hover:text-em transition-all duration-200"
              >
                <IconLinkedIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-em mb-4">{t('nav')}</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-content-muted hover:text-em hover:pl-1 transition-all duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-em mb-4">{t('services')}</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={href + label}>
                  <Link href={href} className="text-sm text-content-muted hover:text-em hover:pl-1 transition-all duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-em mb-4">{t('legal')}</p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {legalLinks.map(({ label, href }) => (
                <li key={href + label}>
                  <Link href={href} className="text-sm text-content-muted hover:text-em hover:pl-1 transition-all duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1.5">
              <a href="tel:6132614428" className="text-sm text-content-muted hover:text-em transition-colors">
                📞 613-261-4428
              </a>
              <a href="mailto:sales@mabservices-ca.com" className="text-sm text-content-muted hover:text-em transition-colors break-all">
                ✉ sales@mabservices-ca.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[11px] text-content-subtle leading-relaxed max-w-3xl">
            {t('disclaimer')}
          </p>
          <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
            <p className="text-xs text-content-subtle whitespace-nowrap">
              {t('copyright', { year })}
            </p>
            <p className="text-[11px] text-content-subtle whitespace-nowrap">
              Design & Dev ·{' '}
              <a
                href="https://www.mouhcine-soukaki.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-em transition-colors"
              >
                Mouhcine SOUKAKI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
