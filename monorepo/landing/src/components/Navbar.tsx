'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames } from '@/i18n/locales';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langOpen && !(e.target as Element)?.closest('.lang-switcher')) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as any });
    setLangOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="navPaw" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1379D" />
                  <stop offset="100%" stopColor="#722ed1" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#navPaw)" />
              <g fill="white" transform="translate(14, 12) scale(0.75)">
                <ellipse cx="14" cy="8" rx="5" ry="6.5" />
                <ellipse cx="34" cy="8" rx="5" ry="6.5" />
                <ellipse cx="6" cy="22" rx="4.2" ry="5.5" />
                <ellipse cx="42" cy="22" rx="4.2" ry="5.5" />
                <path d="M24 24c-6 0-11 4-13 9-2.8 6 1 12 7 13.5 2 .6 4 2 6 2s4-1.4 6-2c6-1.5 9.8-7.5 7-13.5-2-5-7-9-13-9z" />
              </g>
            </svg>
          </div>
          <span className="brand-text">Pet<span className="brand-accent">folioo</span></span>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/#features">{t('features')}</Link></li>
          <li><Link href="/#how-it-works">{t('howItWorks')}</Link></li>
          <li><Link href="/blog">{t('blog')}</Link></li>
          <li><Link href="/#testimonials">{t('testimonials')}</Link></li>
          <li>
            <div className="lang-switcher" style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {locale.toUpperCase()}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 4,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  zIndex: 1000,
                  minWidth: 140,
                  maxHeight: 300,
                  overflow: 'auto',
                }}>
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 14px',
                        border: 'none',
                        background: loc === locale ? 'rgba(241,55,157,0.08)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: loc === locale ? 600 : 400,
                        color: loc === locale ? '#F1379D' : '#333',
                      }}
                    >
                      {localeNames[loc as keyof typeof localeNames]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </li>
          <li><Link href="/#download" className="btn btn-primary btn-sm">{t('getApp')}</Link></li>
        </ul>
        <button
          className={`mobile-menu-btn${mobileOpen ? ' active' : ''}`}
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setMobileOpen(false)}>{t('home')}</Link>
          <Link href="/#features" onClick={() => setMobileOpen(false)}>{t('features')}</Link>
          <Link href="/#how-it-works" onClick={() => setMobileOpen(false)}>{t('howItWorks')}</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>{t('blog')}</Link>
          <Link href="/pet-owners" onClick={() => setMobileOpen(false)}>{t('petOwners')}</Link>
          <Link href="/breeders" onClick={() => setMobileOpen(false)}>{t('breeders')}</Link>
          <Link href="/veterinarians" onClick={() => setMobileOpen(false)}>{t('veterinarians')}</Link>
          <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: 8 }}>
            <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>{t('language')}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                  style={{
                    padding: '4px 8px',
                    border: loc === locale ? '1px solid #F1379D' : '1px solid #e5e7eb',
                    borderRadius: 4,
                    background: loc === locale ? 'rgba(241,55,157,0.08)' : '#fff',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: loc === locale ? 600 : 400,
                    color: loc === locale ? '#F1379D' : '#555',
                  }}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <Link href="/#download" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>{t('getApp')}</Link>
        </div>
      )}
    </nav>
  );
}
