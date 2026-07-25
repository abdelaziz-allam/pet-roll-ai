import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <ScrollReveal>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-decorations">
          <svg className="deco deco-paw-1" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.12"><path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.53 4.76 7.17 3.18 8.35 3ZM15.5 3C16.68 3.18 17.32 4.76 16.97 6.54C16.61 8.31 15.36 9.6 14.18 9.43C13 9.25 12.35 7.67 12.71 5.9C13.07 4.12 14.32 2.83 15.5 3ZM3 7.5C4.11 7.04 5.57 7.92 6.29 9.54C7 11.16 6.66 12.84 5.55 13.31C4.44 13.77 2.97 12.89 2.26 11.27C1.54 9.65 1.88 7.97 3 7.5ZM21 7.5C22.12 7.97 22.46 9.65 21.74 11.27C21.03 12.89 19.56 13.77 18.45 13.31C17.34 12.84 17 11.16 17.71 9.54C18.43 7.92 19.89 7.04 21 7.5ZM12 11.5C13.47 11.14 15.23 12.3 15.97 14.41C16.71 16.53 16.05 18.53 14.58 18.9C13.97 19.06 12 20 12 20C12 20 10.03 19.06 9.42 18.9C7.95 18.53 7.29 16.53 8.03 14.41C8.77 12.3 10.53 11.14 12 11.5Z" /></svg>
          <svg className="deco deco-dog" width="80" height="80" viewBox="0 0 64 64" fill="none" opacity="0.12"><path d="M52 18c0-4-3-6-6-6s-4 2-5 4c-2-1-4-2-7-2h-4c-3 0-5 1-7 2-1-2-2-4-5-4s-6 2-6 6c0 3 2 5 4 6-1 2-2 5-2 8 0 8 6 16 18 16s18-8 18-16c0-3-1-6-2-8 2-1 4-3 4-6z" fill="currentColor" /><circle cx="24" cy="26" r="2.5" fill="white" /><circle cx="40" cy="26" r="2.5" fill="white" /></svg>
          <svg className="deco deco-cat" width="70" height="70" viewBox="0 0 64 64" fill="none" opacity="0.1"><path d="M16 14l6 12h20l6-12c1-2 4-1 4 1v25c0 10-8 18-20 18S12 40 12 40V15c0-2 3-3 4-1z" fill="currentColor" /><circle cx="24" cy="30" r="2" fill="white" /><circle cx="40" cy="30" r="2" fill="white" /></svg>
          <svg className="deco deco-heart-1" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" opacity="0.1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge reveal">
              <span className="badge-dot"></span>
              Trusted by 10,000+ pet parents worldwide
            </div>
            <h1 className="reveal">
              Your Pet&apos;s Health,<br />
              <span className="gradient-text">All in One Place</span>
            </h1>
            <p className="hero-subtitle reveal">
              Track vaccinations, manage health records, monitor pregnancies,
              and find the perfect breeding partner — all from one beautiful app.
            </p>
            <div className="hero-buttons reveal">
              <a href="#download" className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 21.99C7.78997 22.03 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" /></svg>
                Download for iOS
              </a>
              <a href="#download" className="btn btn-dark btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                Get on Android
              </a>
            </div>
            <div className="hero-stats reveal">
              <div className="hero-stat"><div className="hero-stat-number">10K+</div><div className="hero-stat-label">Pet Owners</div></div>
              <div className="stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">25K+</div><div className="hero-stat-label">Pets Managed</div></div>
              <div className="stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">50K+</div><div className="hero-stat-label">Health Records</div></div>
              <div className="stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">4.9</div><div className="hero-stat-label">App Rating</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
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
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Features</span>
            <h2>Everything Your Pet Needs</h2>
            <p>Comprehensive pet health management tools designed for modern pet parents and breeders.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4M12 16h.01" /></svg></div></div>
              <h3>Vaccination Tracker</h3>
              <p>Never miss a vaccine. Get smart reminders and keep a complete immunization history for each pet.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon feature-icon-blue"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div></div>
              <h3>Health Records</h3>
              <p>Digital health records with vet visits, surgeries, lab results, and medications all in one secure place.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon feature-icon-purple"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div></div>
              <h3>Pregnancy Monitor</h3>
              <p>Track pregnancy milestones week by week, monitor weight changes, and prepare for delivery day.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon feature-icon-orange"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div></div>
              <h3>Mating Marketplace</h3>
              <p>Find verified breeding partners with health certifications, lineage info, and direct messaging.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon feature-icon-green"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div></div>
              <h3>Smart Schedules</h3>
              <p>Automated feeding, medication, grooming, and exercise reminders customized for your pet&apos;s routine.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon-wrap"><div className="feature-icon feature-icon-red"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div></div>
              <h3>Health Reports</h3>
              <p>Generate PDF health reports for vet visits, travel documents, or breed certification applications.</p>
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
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
                <div className="step-content"><span className="step-number">Step 1</span><h3>Create Account</h3><p>Sign up with email or social login in seconds. Free forever for up to 3 pets.</p></div>
              </div>
              <div className="step reveal">
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg></div>
                <div className="step-content"><span className="step-number">Step 2</span><h3>Add Your Pets</h3><p>Enter your pet&apos;s details, breed, age, and upload adorable photos.</p></div>
              </div>
              <div className="step reveal">
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
                <div className="step-content"><span className="step-number">Step 3</span><h3>Track Health</h3><p>Log records, set schedules, and get intelligent reminders.</p></div>
              </div>
              <div className="step reveal">
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg></div>
                <div className="step-content"><span className="step-number">Step 4</span><h3>Stay Connected</h3><p>Connect with breeders, share reports with your vet, and join the community.</p></div>
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
            <p>See what our community has to say about Petfolioo.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">{'★★★★★'}</div>
              <p>&ldquo;Petfolioo completely changed how I manage my dog&apos;s health. The vaccination reminders alone have saved me multiple vet emergencies.&rdquo;</p>
              <div className="testimonial-author"><div className="author-avatar">SM</div><div><div className="author-name">Sarah Mitchell</div><div className="author-role">Dog Owner, 3 Golden Retrievers</div></div></div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">{'★★★★★'}</div>
              <p>&ldquo;As a professional breeder, the mating marketplace and pregnancy tracker are game changers. I can&apos;t imagine going back.&rdquo;</p>
              <div className="testimonial-author"><div className="author-avatar">JD</div><div><div className="author-name">James Davidson</div><div className="author-role">Professional Breeder</div></div></div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">{'★★★★★'}</div>
              <p>&ldquo;The health reports feature is amazing. My vet loves that I come prepared with complete digital records for every visit.&rdquo;</p>
              <div className="testimonial-author"><div className="author-avatar">AL</div><div><div className="author-name">Amanda Liu</div><div className="author-role">Cat Owner, 2 Persians</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Download */}
      <section className="cta" id="download">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-content">
              <h2>Ready to Give Your Pet<br />the Best Care?</h2>
              <p>Join thousands of pet owners who trust Petfolioo for their pet&apos;s health management. Download free today.</p>
              <div className="cta-buttons">
                <a href="https://apps.apple.com/app/petfolioo" className="store-btn store-btn-apple" rel="noopener noreferrer" target="_blank">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 21.99C7.78997 22.03 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" /></svg>
                  <div className="store-btn-text"><span className="store-btn-small">Download on the</span><span className="store-btn-big">App Store</span></div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.petroll.pet_roll" className="store-btn store-btn-google" rel="noopener noreferrer" target="_blank">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                  <div className="store-btn-text"><span className="store-btn-small">Get it on</span><span className="store-btn-big">Google Play</span></div>
                </a>
              </div>
              <div className="cta-note">Free to use &bull; No credit card required &bull; Cancel anytime</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </ScrollReveal>
  );
}
