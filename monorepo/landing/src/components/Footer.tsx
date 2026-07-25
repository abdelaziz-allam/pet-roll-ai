import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="footer-brand">
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="footerPaw" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F1379D" />
                    <stop offset="100%" stopColor="#722ed1" />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="30" fill="url(#footerPaw)" />
                <g fill="white" transform="translate(14, 12) scale(0.75)">
                  <ellipse cx="14" cy="8" rx="5" ry="6.5" />
                  <ellipse cx="34" cy="8" rx="5" ry="6.5" />
                  <ellipse cx="6" cy="22" rx="4.2" ry="5.5" />
                  <ellipse cx="42" cy="22" rx="4.2" ry="5.5" />
                  <path d="M24 24c-6 0-11 4-13 9-2.8 6 1 12 7 13.5 2 .6 4 2 6 2s4-1.4 6-2c6-1.5 9.8-7.5 7-13.5-2-5-7-9-13-9z" />
                </g>
              </svg>
              <span>Pet<span className="brand-accent">folioo</span></span>
            </Link>
            <p>The complete pet health management platform for modern pet parents and professional breeders.</p>
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
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><Link href="/pet-owners">For Pet Owners</Link></li>
              <li><Link href="/breeders">For Breeders</Link></li>
              <li><Link href="/veterinarians">For Veterinarians</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/pet-shops">For Pet Shops</Link></li>
              <li><Link href="/adoption">Adoption</Link></li>
              <li><a href="https://admin.petfolioo.com" rel="noopener noreferrer" target="_blank">Admin Portal</a></li>
              <li><a href="https://api.petfolioo.com/docs" rel="noopener noreferrer" target="_blank">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy#cookies">Cookie Policy</Link></li>
              <li><Link href="/privacy#gdpr">GDPR</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Petfolioo AB. All rights reserved. Helsingborg, Sweden.</p>
        </div>
      </div>
    </footer>
  );
}
