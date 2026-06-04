'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LogoMark from '@/components/shared/LogoMark';
import LangSwitcher from '@/components/shared/LangSwitcher';
import { IconChevronDown, IconList, IconMenu, IconClose } from '@/components/shared/icons';
import { cn } from '@/lib/utils';

const ROUTES = [
  { key: 'home',      href: '/' },
  { key: 'about',     href: '/a-propos' },
  { key: 'insurance', href: '/assurance-protection' },
] as const;

const MORE_ROUTES = [
  { key: 'savings',     href: '/epargne-investissement' },
  { key: 'masterclass', href: '/#masterclass' },
  { key: 'contact',     href: '/contact' },
  { key: 'privacy',     href: '/confidentialite' },
] as const;

export default function Navbar() {
  const t        = useTranslations('Nav');
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function openDropdown()  {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function closeDropdown() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 80);
  }

  function handleHashClick(e: React.MouseEvent, href: string) {
    const hash = href.split('#')[1];
    if (!hash) return;

    e.preventDefault();
    setDropdownOpen(false);
    setMobileOpen(false);

    if (pathname === '/') {
      // Already on the home page — scroll directly.
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Cross-page: navigate to home with the hash in the URL.
      // HashScrollHandler in the layout picks up window.location.hash after
      // the route change and scrolls to the target section.
      router.push(`/#${hash}`);
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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-heading font-extrabold text-lg tracking-wide">
            <LogoMark size={38} />
            <span>
              MAB{' '}
              <span className="font-medium text-content-muted">SERVICES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {ROUTES.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === href
                    ? 'text-em bg-[var(--em-subtle)]'
                    : 'text-content-muted hover:text-content hover:bg-white/5',
                )}
              >
                {t(key)}
              </Link>
            ))}

            {/* More dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-white/5 transition-all duration-200"
                aria-expanded={dropdownOpen}
                onFocus={openDropdown}
                onBlur={closeDropdown}
              >
                {t('more')}
                <IconChevronDown className={cn('w-3 h-3 transition-transform duration-200', dropdownOpen && 'rotate-180')} />
              </button>

              {/* Transparent bridge fills the gap so mouse doesn't leave the zone */}
              <div
                className="absolute top-full left-0 w-full h-2 bg-transparent"
                onMouseEnter={openDropdown}
              />

              <div
                className={cn(
                  'absolute top-[calc(100%+8px)] left-0 min-w-[210px] bg-[var(--bg-2)] border border-[var(--border)] rounded-xl p-1.5 shadow-card transition-all duration-200',
                  dropdownOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1',
                )}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                {MORE_ROUTES.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={href.includes('#') ? (e) => handleHashClick(e, href) : undefined}
                    className="block px-3.5 py-2.5 rounded-lg text-sm text-content-muted hover:bg-[var(--em-subtle)] hover:text-em transition-all duration-150"
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: lang + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <LangSwitcher />
            <Link href="/contact" className="btn btn-primary text-sm px-5 py-2.5">
              <IconList className="w-3.5 h-3.5" />
              {t('cta')}
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-2">
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
          'md:hidden border-t border-[var(--border)] bg-[var(--bg-2)] transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {ROUTES.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                pathname === href ? 'text-em bg-[var(--em-subtle)]' : 'text-content-muted hover:text-content hover:bg-white/5',
              )}
            >
              {t(key)}
            </Link>
          ))}
          <div className="border-t border-[var(--border)] my-1" />
          {MORE_ROUTES.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={href.includes('#') ? (e) => handleHashClick(e, href) : undefined}
              className="px-4 py-3 rounded-xl text-sm text-content-muted hover:text-content hover:bg-white/5 transition-all"
            >
              {t(key)}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Link href="/contact" className="btn btn-primary w-full justify-center">
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
