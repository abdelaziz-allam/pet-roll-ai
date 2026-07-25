import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Petfolioo privacy policy. How we collect, use, and protect your personal data and pet health information.',
  alternates: {
    canonical: 'https://petfolioo.com/privacy',
    languages: {
      'en': 'https://petfolioo.com/privacy',
      'sv': 'https://petfolioo.com/privacy',
      'x-default': 'https://petfolioo.com/privacy',
    },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <section className="seo-page">
        <div className="container">
          <article style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="page-header">
              <h1>Privacy Policy</h1>
              <p>Last updated: July 2025</p>
            </div>
            <h2>Introduction</h2>
            <p>Petfolioo AB (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy explains how we collect, use, and protect your personal data when you use the Petfolioo app and website.</p>

            <h2>Data We Collect</h2>
            <p>We collect the following categories of data:</p>
            <ul>
              <li><strong>Account information:</strong> email address, name, profile photo (via Google/Apple/email sign-up)</li>
              <li><strong>Pet information:</strong> pet names, species, breeds, dates of birth, photos, health records, vaccination data, pregnancy data</li>
              <li><strong>Usage data:</strong> app interactions, feature usage, crash reports</li>
              <li><strong>Device data:</strong> device type, OS version, app version</li>
            </ul>

            <h2>How We Use Your Data</h2>
            <ul>
              <li>Provide and improve the Petfolioo service</li>
              <li>Send vaccination and care reminders</li>
              <li>Generate health reports</li>
              <li>Match breeding partners in the mating marketplace</li>
              <li>Communicate service updates and support</li>
            </ul>

            <h2>Data Storage and Security</h2>
            <p>Your data is stored on Google Cloud Platform in the EU (europe-north1 region, Finland). All data is encrypted at rest and in transit. We use Firebase Authentication for secure access control.</p>

            <h2 id="gdpr">GDPR Rights</h2>
            <p>Under the EU General Data Protection Regulation, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (right to be forgotten)</li>
              <li>Export your data in a portable format</li>
              <li>Object to processing</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 id="cookies">Cookies</h2>
            <p>The Petfolioo website uses essential cookies only for session management. We do not use tracking cookies or third-party advertising cookies. The mobile app does not use cookies.</p>

            <h2>Third-Party Services</h2>
            <ul>
              <li>Firebase (Google) — authentication and database</li>
              <li>Google Cloud Storage — pet photos and documents</li>
              <li>Google Analytics — anonymized usage statistics (website only)</li>
            </ul>

            <h2>Data Retention</h2>
            <p>We retain your data as long as your account is active. Upon account deletion, all personal data and pet records are permanently removed within 30 days.</p>

            <h2>Contact</h2>
            <p>For privacy inquiries or to exercise your GDPR rights, contact us at: <a href="mailto:privacy@petfolioo.com">privacy@petfolioo.com</a></p>
            <p>Petfolioo AB, Helsingborg, Sweden</p>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}
