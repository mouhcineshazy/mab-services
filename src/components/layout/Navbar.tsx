'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LogoMark from '@/components/shared/LogoMark';
import LangSwitcher from '@/components/shared/LangSwitcher';
import { IconList, IconMenu, IconClose } from '@/components/shared/icons';
import CalPopupButton from '@/components/shared/CalPopupButton';
import { cn } from '@/lib/utils';
import { CONSULTATION_CAL_LINK, CONSULTATION_CAL_CONFIGURED } from '@/lib/calcom';
import { setScrollTarget } from '@/lib/scroll-target';

const ROUTES = [
  { key: 'home',        href: '/' },
  { key: 'about',       href: '/a-propos' },
  { key: 'insurance',   href: '/assurance-protection' },
  { key: 'savings',     href: '/epargne-investissement' },
  { key: 'masterclass', href: '/#masterclass' },
  { key: 'contact',     href: '/contact' },
] as const;

export default function Navbar() {
  const t        = useTranslations('Nav');
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function handleHashClick(e: React.MouseEvent, href: string) {
    const hash = href.split('#')[1];
    if (!hash) return;

    e.preventDefault();
    setMobileOpen(false);

    if (pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setScrollTarget(hash);
      router.push('/', { scroll: false });
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] transition-all duration-300',
        scrolled
          ? 'bg-[var(--bg)]/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[var(--bg)]/85 backdrop-blur-xl',
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6 h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading font-extrabold text-lg tracking-wide">
            <LogoMark size={38} />
            <span>
              MAB{' '}
              <span className="font-medium text-content-muted">SERVICES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-0.5">
            {ROUTES.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={href.includes('#') ? (e) => handleHashClick(e, href) : undefined}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === href
                    ? 'text-em bg-[var(--em-subtle)]'
                    : 'text-content-muted hover:text-content hover:bg-white/5',
                )}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Right side: lang + CTA */}
          <div className="hidden xl:flex shrink-0 items-center gap-2">
            <LangSwitcher />
            {CONSULTATION_CAL_CONFIGURED ? (
              <CalPopupButton calLink={CONSULTATION_CAL_LINK} namespace="consultation" layout="month_view" className="btn btn-primary text-sm px-5 py-2.5">
                <IconList className="w-3.5 h-3.5" />
                {t('cta')}
              </CalPopupButton>
            ) : (
              <Link href="/contact" className="btn btn-primary text-sm px-5 py-2.5">
                <IconList className="w-3.5 h-3.5" />
                {t('cta')}
              </Link>
            )}
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <LangSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('menuClose') : t('menuOpen')}
              className="p-2 rounded-lg text-content-muted hover:text-content hover:bg-white/5 transition-colors"
            >
              {mobileOpen
                ? <IconClose className="w-5 h-5" />
                : <IconMenu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'xl:hidden border-t border-[var(--border)] bg-[var(--bg-2)] transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {ROUTES.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={href.includes('#') ? (e) => handleHashClick(e, href) : undefined}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                pathname === href ? 'text-em bg-[var(--em-subtle)]' : 'text-content-muted hover:text-content hover:bg-white/5',
              )}
            >
              {t(key)}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            {CONSULTATION_CAL_CONFIGURED ? (
              <CalPopupButton calLink={CONSULTATION_CAL_LINK} namespace="consultation" layout="month_view" className="btn btn-primary w-full justify-center">
                {t('cta')}
              </CalPopupButton>
            ) : (
              <Link href="/contact" className="btn btn-primary w-full justify-center">
                {t('cta')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
