'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
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
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it Works</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#download" className="btn btn-primary btn-sm">Get the App</a></li>
        </ul>
        <button className="mobile-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
