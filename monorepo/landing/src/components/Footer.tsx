'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="footer-brand">
              <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="footerBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1379D" />
                    <stop offset="100%" stopColor="#722ed1" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="56" fill="url(#footerBg)" />
                <path d="M60 22L28 46V92C28 94.2 29.8 96 32 96H88C90.2 96 92 94.2 92 92V46L60 22Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
                <g transform="translate(33, 47)">
                  <ellipse cx="14" cy="26" rx="11" ry="13" fill="white" />
                  <ellipse cx="6" cy="16" rx="4" ry="7" fill="white" transform="rotate(-10, 6, 16)" />
                  <ellipse cx="22" cy="16" rx="4" ry="7" fill="white" transform="rotate(10, 22, 16)" />
                  <ellipse cx="14" cy="27" rx="2.5" ry="1.8" fill="#F1379D" />
                </g>
                <g transform="translate(55, 49)">
                  <circle cx="16" cy="24" r="11" fill="white" />
                  <path d="M8 15L5 4L13 12Z" fill="white" />
                  <path d="M24 15L27 4L19 12Z" fill="white" />
                  <path d="M14.5 25L16 23.5L17.5 25Z" fill="#F1379D" />
                  <circle cx="12" cy="21" r="2" fill="#3d1a78" />
                  <circle cx="20" cy="21" r="2" fill="#3d1a78" />
                </g>
              </svg>
              <span>Pet<span className="brand-accent">folioo</span></span>
            </Link>
            <p>{t('description')}</p>
            <div className="footer-socials">
              <a href="https://twitter.com/petfolioo" className="social-link" aria-label="Twitter" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://instagram.com/petfolioo" className="social-link" aria-label="Instagram" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://facebook.com/petfolioo" className="social-link" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://linkedin.com/company/petfolioo" className="social-link" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>{t('product')}</h4>
            <ul>
              <li><a href="#features">{t('product')}</a></li>
              <li><Link href="/pet-owners">{t('about')}</Link></li>
              <li><Link href="/breeders">{t('about')}</Link></li>
              <li><Link href="/veterinarians">{t('about')}</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t('company')}</h4>
            <ul>
              <li><Link href="/pet-shops">{t('about')}</Link></li>
              <li><Link href="/adoption">{t('about')}</Link></li>
              <li><a href="https://admin.petfolioo.com" rel="noopener noreferrer" target="_blank">Admin Portal</a></li>
              <li><a href="https://api.petfolioo.com/docs" rel="noopener noreferrer" target="_blank">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('legal')}</h4>
            <ul>
              <li><Link href="/privacy">{t('privacy')}</Link></li>
              <li><Link href="/terms">{t('terms')}</Link></li>
              <li><Link href="/privacy#cookies">Cookies</Link></li>
              <li><Link href="/privacy#gdpr">GDPR</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Petfolioo AB. {t('rights')} Helsingborg, Sweden.</p>
        </div>
      </div>
    </footer>
  );
}
