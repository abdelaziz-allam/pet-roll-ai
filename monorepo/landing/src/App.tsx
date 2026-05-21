import { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-brand">
            <div className="brand-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGrad)"/>
                <defs>
                  <linearGradient id="heartGrad" x1="2" y1="3" x2="22" y2="21">
                    <stop offset="0%" stopColor="#F1379D"/>
                    <stop offset="100%" stopColor="#722ed1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-text">PET <span className="brand-accent">Roll</span></span>
          </a>
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

      {/* Hero */}
      <section className="hero">
        <div className="hero-decorations">
          {/* Paw prints */}
          <svg className="deco deco-paw-1" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.12">
            <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
          </svg>
          <svg className="deco deco-paw-2" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.08">
            <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
          </svg>
          <svg className="deco deco-paw-3" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.06">
            <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
          </svg>
          {/* Dog */}
          <svg className="deco deco-dog" width="80" height="80" viewBox="0 0 64 64" fill="none" opacity="0.12">
            <path d="M52 18c0-4-3-6-6-6s-4 2-5 4c-2-1-4-2-7-2h-4c-3 0-5 1-7 2-1-2-2-4-5-4s-6 2-6 6c0 3 2 5 4 6-1 2-2 5-2 8 0 8 6 16 18 16s18-8 18-16c0-3-1-6-2-8 2-1 4-3 4-6z" fill="currentColor"/>
            <circle cx="24" cy="26" r="2.5" fill="white"/>
            <circle cx="40" cy="26" r="2.5" fill="white"/>
            <ellipse cx="32" cy="32" rx="4" ry="3" fill="white" opacity="0.5"/>
            <path d="M29 35c0 0 1.5 2 3 2s3-2 3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {/* Cat */}
          <svg className="deco deco-cat" width="70" height="70" viewBox="0 0 64 64" fill="none" opacity="0.1">
            <path d="M16 14l6 12h20l6-12c1-2 4-1 4 1v25c0 10-8 18-20 18S12 40 12 40V15c0-2 3-3 4-1z" fill="currentColor"/>
            <circle cx="24" cy="30" r="2" fill="white"/>
            <circle cx="40" cy="30" r="2" fill="white"/>
            <path d="M30 34c0 0 1 1.5 2 1.5s2-1.5 2-1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M28 36l24 0" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            <path d="M28 38l24 0" stroke="white" strokeWidth="0.5" opacity="0.3"/>
          </svg>
          {/* Bone */}
          <svg className="deco deco-bone-1" width="44" height="44" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
            <path d="M3.79 7.11C3.79 5.95 4.72 5 5.88 5C6.2 5 6.5 5.08 6.77 5.22C7.04 4.5 7.74 4 8.56 4C9.56 4 10.38 4.74 10.5 5.71L13.5 5.71C13.62 4.74 14.44 4 15.44 4C16.26 4 16.96 4.5 17.23 5.22C17.5 5.08 17.8 5 18.12 5C19.28 5 20.21 5.95 20.21 7.11C20.21 7.88 19.79 8.55 19.17 8.92C19.79 9.29 20.21 9.96 20.21 10.73C20.21 11.89 19.28 12.84 18.12 12.84C17.8 12.84 17.5 12.76 17.23 12.62C16.96 13.34 16.26 13.84 15.44 13.84C14.44 13.84 13.62 13.1 13.5 12.13H10.5C10.38 13.1 9.56 13.84 8.56 13.84C7.74 13.84 7.04 13.34 6.77 12.62C6.5 12.76 6.2 12.84 5.88 12.84C4.72 12.84 3.79 11.89 3.79 10.73C3.79 9.96 4.21 9.29 4.83 8.92C4.21 8.55 3.79 7.88 3.79 7.11Z"/>
          </svg>
          <svg className="deco deco-bone-2" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" opacity="0.07">
            <path d="M3.79 7.11C3.79 5.95 4.72 5 5.88 5C6.2 5 6.5 5.08 6.77 5.22C7.04 4.5 7.74 4 8.56 4C9.56 4 10.38 4.74 10.5 5.71L13.5 5.71C13.62 4.74 14.44 4 15.44 4C16.26 4 16.96 4.5 17.23 5.22C17.5 5.08 17.8 5 18.12 5C19.28 5 20.21 5.95 20.21 7.11C20.21 7.88 19.79 8.55 19.17 8.92C19.79 9.29 20.21 9.96 20.21 10.73C20.21 11.89 19.28 12.84 18.12 12.84C17.8 12.84 17.5 12.76 17.23 12.62C16.96 13.34 16.26 13.84 15.44 13.84C14.44 13.84 13.62 13.1 13.5 12.13H10.5C10.38 13.1 9.56 13.84 8.56 13.84C7.74 13.84 7.04 13.34 6.77 12.62C6.5 12.76 6.2 12.84 5.88 12.84C4.72 12.84 3.79 11.89 3.79 10.73C3.79 9.96 4.21 9.29 4.83 8.92C4.21 8.55 3.79 7.88 3.79 7.11Z"/>
          </svg>
          {/* Heart */}
          <svg className="deco deco-heart-1" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg className="deco deco-heart-2" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" opacity="0.08">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          {/* Fish (for cats) */}
          <svg className="deco deco-fish" width="44" height="44" viewBox="0 0 24 24" fill="currentColor" opacity="0.08">
            <path d="M12 20L12.76 17C9.5 16.79 6.59 15.4 5.75 12.01C6.59 8.61 9.5 7.21 12.76 7L12 4C12 4 20 8 20 12S12 20 12 20ZM7 12C7.55 12 8 11.55 8 11S7.55 10 7 10 6 10.45 6 11 6.45 12 7 12ZM2 12L4.5 9.5V14.5L2 12Z"/>
          </svg>
          {/* Bird */}
          <svg className="deco deco-bird" width="38" height="38" viewBox="0 0 24 24" fill="currentColor" opacity="0.07">
            <path d="M23 11.5L19.95 12.35C20 12.23 20 12.12 20 12C20 10.34 18.66 9 17 9C15.34 9 14 10.34 14 12C14 12.04 14 12.08 14 12.12L7 9V11L14.4 13.11C14.79 13.43 15.27 13.66 15.8 13.78L12 15L13 18L16.57 16.63C17.03 16.84 17.5 17 18 17C20.21 17 22 15.21 22 13C22 12.45 21.88 11.92 21.66 11.45L23 11.5ZM18 11.5C17.17 11.5 16.5 10.83 16.5 10S17.17 8.5 18 8.5 19.5 9.17 19.5 10 18.83 11.5 18 11.5Z"/>
          </svg>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge reveal">
              <span className="badge-dot"></span>
              Trusted by 10,000+ pet parents worldwide
            </div>
            <h1 className="reveal">
              Your Pet's Health,<br />
              <span className="gradient-text">All in One Place</span>
            </h1>
            <p className="hero-subtitle reveal">
              Track vaccinations, manage health records, monitor pregnancies,
              and find the perfect breeding partner — all from one beautiful app.
            </p>
            <div className="hero-buttons reveal">
              <a href="#download" className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 21.99C7.78997 22.03 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Download for iOS
              </a>
              <a href="#download" className="btn btn-dark btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Get on Android
              </a>
            </div>
            <div className="hero-stats reveal">
              <div className="hero-stat">
                <div className="hero-stat-number">10K+</div>
                <div className="hero-stat-label">Pet Owners</div>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">25K+</div>
                <div className="hero-stat-label">Pets Managed</div>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">50K+</div>
                <div className="hero-stat-label">Health Records</div>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">4.9</div>
                <div className="hero-stat-label">App Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands / Social Proof */}
      <section className="social-proof">
        <div className="container">
          <p className="social-proof-text">Featured in</p>
          <div className="logos-row">
            <div className="logo-item">TechCrunch</div>
            <div className="logo-item">Product Hunt</div>
            <div className="logo-item">Forbes</div>
            <div className="logo-item">Wired</div>
            <div className="logo-item">The Verge</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="features-deco">
          <svg className="deco deco-section-paw-1" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.05">
            <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
          </svg>
          <svg className="deco deco-section-paw-2" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" opacity="0.04">
            <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
          </svg>
        </div>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Features</span>
            <h2>Everything Your Pet Needs</h2>
            <p>Comprehensive pet health management tools designed for modern pet parents and breeders.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M12 8v4M12 16h.01"/>
                  </svg>
                </div>
              </div>
              <h3>Vaccination Tracker</h3>
              <p>Never miss a vaccine. Get smart reminders and keep a complete immunization history for each pet.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon feature-icon-blue">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
              </div>
              <h3>Health Records</h3>
              <p>Digital health records with vet visits, surgeries, lab results, and medications all in one secure place.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon feature-icon-purple">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </div>
              <h3>Pregnancy Monitor</h3>
              <p>Track pregnancy milestones week by week, monitor weight changes, and prepare for delivery day.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon feature-icon-orange">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
              <h3>Mating Marketplace</h3>
              <p>Find verified breeding partners with health certifications, lineage info, and direct messaging.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon feature-icon-green">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
              </div>
              <h3>Smart Schedules</h3>
              <p>Automated feeding, medication, grooming, and exercise reminders customized for your pet's routine.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap">
                <div className="feature-icon feature-icon-red">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
              </div>
              <h3>Health Reports</h3>
              <p>Generate PDF health reports for vet visits, travel documents, or breed certification applications.</p>
              <div className="feature-link">
                Learn more <span>&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">How it Works</span>
            <h2>Get Started in Minutes</h2>
            <p>Simple setup, powerful results. Your pet deserves the best.</p>
          </div>
          <div className="steps-container">
            <div className="steps-line"></div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="step-content">
                  <span className="step-number">Step 1</span>
                  <h3>Create Account</h3>
                  <p>Sign up with email or social login in seconds. Free forever for up to 3 pets.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </div>
                <div className="step-content">
                  <span className="step-number">Step 2</span>
                  <h3>Add Your Pets</h3>
                  <p>Enter your pet's details, breed, age, and upload adorable photos.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div className="step-content">
                  <span className="step-number">Step 3</span>
                  <h3>Track Health</h3>
                  <p>Log records, set schedules, and get intelligent AI-powered reminders.</p>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                    <line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                </div>
                <div className="step-content">
                  <span className="step-number">Step 4</span>
                  <h3>Stay Connected</h3>
                  <p>Connect with breeders, share reports with your vet, and join the community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Testimonials</span>
            <h2>Loved by Pet Parents</h2>
            <p>See what our community has to say about PET Roll.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">
                {'★'.repeat(5)}
              </div>
              <p>"PET Roll completely changed how I manage my dog's health. The vaccination reminders alone have saved me multiple vet emergencies."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div>
                  <div className="author-name">Sarah Mitchell</div>
                  <div className="author-role">Dog Owner, 3 Golden Retrievers</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">
                {'★'.repeat(5)}
              </div>
              <p>"As a professional breeder, the mating marketplace and pregnancy tracker are game changers. I can't imagine going back."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div>
                  <div className="author-name">James Davidson</div>
                  <div className="author-role">Professional Breeder</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">
                {'★'.repeat(5)}
              </div>
              <p>"The health reports feature is amazing. My vet loves that I come prepared with complete digital records for every visit."</p>
              <div className="testimonial-author">
                <div className="author-avatar">AL</div>
                <div>
                  <div className="author-name">Amanda Liu</div>
                  <div className="author-role">Cat Owner, 2 Persians</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Download */}
      <section className="cta" id="download">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-animals">
              <svg className="cta-deco cta-deco-1" width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.08">
                <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z"/>
              </svg>
              <svg className="cta-deco cta-deco-2" width="40" height="40" viewBox="0 0 24 24" fill="white" opacity="0.06">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <svg className="cta-deco cta-deco-3" width="50" height="50" viewBox="0 0 24 24" fill="white" opacity="0.05">
                <path d="M3.79 7.11C3.79 5.95 4.72 5 5.88 5C6.2 5 6.5 5.08 6.77 5.22C7.04 4.5 7.74 4 8.56 4C9.56 4 10.38 4.74 10.5 5.71L13.5 5.71C13.62 4.74 14.44 4 15.44 4C16.26 4 16.96 4.5 17.23 5.22C17.5 5.08 17.8 5 18.12 5C19.28 5 20.21 5.95 20.21 7.11C20.21 7.88 19.79 8.55 19.17 8.92C19.79 9.29 20.21 9.96 20.21 10.73C20.21 11.89 19.28 12.84 18.12 12.84C17.8 12.84 17.5 12.76 17.23 12.62C16.96 13.34 16.26 13.84 15.44 13.84C14.44 13.84 13.62 13.1 13.5 12.13H10.5C10.38 13.1 9.56 13.84 8.56 13.84C7.74 13.84 7.04 13.34 6.77 12.62C6.5 12.76 6.2 12.84 5.88 12.84C4.72 12.84 3.79 11.89 3.79 10.73C3.79 9.96 4.21 9.29 4.83 8.92C4.21 8.55 3.79 7.88 3.79 7.11Z"/>
              </svg>
            </div>
            <div className="cta-content">
              <h2>Ready to Give Your Pet<br />the Best Care?</h2>
              <p>Join thousands of pet owners who trust PET Roll for their pet's health management. Download free today.</p>
              <div className="cta-buttons">
                <a href="#" className="store-btn store-btn-apple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 21.99C7.78997 22.03 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="store-btn-text">
                    <span className="store-btn-small">Download on the</span>
                    <span className="store-btn-big">App Store</span>
                  </div>
                </a>
                <a href="#" className="store-btn store-btn-google">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="store-btn-text">
                    <span className="store-btn-small">Get it on</span>
                    <span className="store-btn-big">Google Play</span>
                  </div>
                </a>
              </div>
              <div className="cta-note">
                Free to use &bull; No credit card required &bull; Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#" className="footer-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#footerHeart)"/>
                  <defs>
                    <linearGradient id="footerHeart" x1="2" y1="3" x2="22" y2="21">
                      <stop offset="0%" stopColor="#F1379D"/>
                      <stop offset="100%" stopColor="#722ed1"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span>PET <span className="brand-accent">Roll</span></span>
              </a>
              <p>The complete pet health management platform for modern pet parents and professional breeders.</p>
              <div className="footer-socials">
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#">Mobile App</a></li>
                <li><a href="#">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PET Roll. All rights reserved. Made with love for pets everywhere.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
