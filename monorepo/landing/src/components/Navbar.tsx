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
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none">
              <defs>
                <linearGradient id="navBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1379D" />
                  <stop offset="100%" stopColor="#722ed1" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="56" fill="url(#navBg)" />
              <path d="M60 22L28 46V92C28 94.2 29.8 96 32 96H88C90.2 96 92 94.2 92 92V46L60 22Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
              <g transform="translate(33, 47)">
                <ellipse cx="14" cy="26" rx="11" ry="13" fill="white" />
                <ellipse cx="6" cy="16" rx="4" ry="7" fill="white" transform="rotate(-10, 6, 16)" />
                <ellipse cx="22" cy="16" rx="4" ry="7" fill="white" transform="rotate(10, 22, 16)" />
                <ellipse cx="14" cy="27" rx="2.5" ry="1.8" fill="#F1379D" />
                <path d="M9 22c1.2-1.2 2.5-1.2 3.5 0" stroke="#3d1a78" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <path d="M16 22c1.2-1.2 2.5-1.2 3.5 0" stroke="#3d1a78" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <path d="M20 11c1.5-1.5 4-1.5 4 0s-2.5 1.5-4 0z" fill="#FFB6D9" />
                <path d="M20 11c-1.5-1.5-4-1.5-4 0s2.5 1.5 4 0z" fill="#FFB6D9" />
                <circle cx="20" cy="11" r="1.2" fill="#F1379D" />
              </g>
              <g transform="translate(55, 49)">
                <circle cx="16" cy="24" r="11" fill="white" />
                <path d="M8 15L5 4L13 12Z" fill="white" />
                <path d="M24 15L27 4L19 12Z" fill="white" />
                <path d="M8.5 13L7 7L12 11Z" fill="#FFB6D9" />
                <path d="M23.5 13L25 7L20 11Z" fill="#FFB6D9" />
                <path d="M14.5 25L16 23.5L17.5 25Z" fill="#F1379D" />
                <circle cx="12" cy="21" r="2" fill="#3d1a78" />
                <circle cx="20" cy="21" r="2" fill="#3d1a78" />
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
