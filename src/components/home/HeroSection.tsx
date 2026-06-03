'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const ParticleCanvas = dynamic(() => import('@/components/shared/ParticleCanvas'), { ssr: false });

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-[70px]"
      aria-label="Hero"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,78,59,0.18) 0%, transparent 70%), linear-gradient(180deg, rgba(17,24,39,0) 0%, rgba(17,24,39,0.65) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center pt-32 pb-20 max-w-[780px] mx-auto">

          {/* Badge */}
          <div className="badge mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="badge-dot" />
            {t('badge')}
          </div>

          {/* Name */}
          <h1
            className="gradient-text font-heading font-black leading-none tracking-wide mb-3 animate-fade-up"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', animationDelay: '0.2s' }}
          >
            {t('name')}
          </h1>

          {/* Person */}
          <p
            className="font-heading font-semibold text-em-light tracking-[0.06em] mb-4 animate-fade-up"
            style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)', animationDelay: '0.3s' }}
          >
            {t('person')}
          </p>

          {/* Titles */}
          <div className="flex flex-col gap-1 mb-6 animate-fade-up" style={{ animationDelay: '0.35s' }}>
            <span className="text-[13px] font-medium tracking-[0.1em] uppercase text-content-subtle">
              {t('title1')}
            </span>
            <span className="text-[13px] font-medium tracking-[0.1em] uppercase text-content-subtle">
              {t('title2')}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-14 h-px mb-6 animate-fade-up"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--em), transparent)',
              animationDelay: '0.4s',
            }}
          />

          {/* Tagline */}
          <p
            className="font-heading font-medium italic text-content-muted mb-2 animate-fade-up"
            style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', animationDelay: '0.45s' }}
          >
            {t('tagline')}
          </p>
          <p className="text-sm text-content-subtle mb-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {t('taglineEn')}
          </p>

          {/* Description */}
          <p
            className="text-[1.05rem] text-content-muted leading-relaxed mb-11 max-w-[560px] animate-fade-up"
            style={{ animationDelay: '0.55s' }}
            dangerouslySetInnerHTML={{
              __html: (t.raw('description') as string).replace(/<em>(.*?)<\/em>/g,
                '<strong class="text-em-light font-semibold">$1</strong>'),
            }}
          />

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Link href="/contact" className="btn btn-primary text-[15px] px-8 py-4 justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('ctaPrimary')}
            </Link>
            <Link href="/assurance-protection" className="btn btn-outline text-[15px] px-8 py-4 justify-center">
              {t('ctaSecondary')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce-slow pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-content-subtle">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span className="text-[10px] tracking-[0.1em] uppercase text-content-subtle">{t('scroll')}</span>
      </div>
    </section>
  );
}
