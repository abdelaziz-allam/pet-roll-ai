import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Petfolioo terms of service. Rules and conditions for using the Petfolioo pet health management platform.',
  alternates: {
    canonical: 'https://petfolioo.com/terms',
    languages: {
      'en': 'https://petfolioo.com/terms',
      'sv': 'https://petfolioo.com/terms',
      'x-default': 'https://petfolioo.com/terms',
    },
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <section className="seo-page">
        <div className="container">
          <article style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="page-header">
              <h1>Terms of Service</h1>
              <p>Last updated: July 2025</p>
            </div>
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using Petfolioo (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

            <h2>The Service</h2>
            <p>Petfolioo provides a pet health management platform including vaccination tracking, health records, pregnancy monitoring, breeding marketplace, care schedules, and health reports. The Service is provided by Petfolioo AB, a Swedish company registered in Helsingborg.</p>

            <h2>User Accounts</h2>
            <ul>
              <li>You must be at least 16 years old to create an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate information about yourself and your pets</li>
              <li>One person may not maintain more than one account</li>
            </ul>

            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose</li>
              <li>Post false or misleading information in the mating marketplace</li>
              <li>Harass other users or misuse the messaging system</li>
              <li>Attempt to access other users&apos; data without authorization</li>
              <li>Use automated tools to scrape or interact with the Service</li>
            </ul>

            <h2>Mating Marketplace</h2>
            <p>The mating marketplace connects pet owners for breeding purposes. Petfolioo does not guarantee the health, temperament, or genetic quality of any listed animal. Users are responsible for their own due diligence and compliance with local breeding regulations.</p>

            <h2>Health Information Disclaimer</h2>
            <p>Petfolioo is a record-keeping tool, not a veterinary service. Information provided through the app does not constitute veterinary advice. Always consult a licensed veterinarian for medical decisions regarding your pets.</p>

            <h2>Intellectual Property</h2>
            <p>The Petfolioo name, logo, and all related content are the property of Petfolioo AB. You retain ownership of all data you submit (pet photos, health records, etc.).</p>

            <h2>Termination</h2>
            <p>We may terminate or suspend your account if you violate these Terms. You may delete your account at any time through the app settings. Upon deletion, your data is permanently removed within 30 days.</p>

            <h2>Limitation of Liability</h2>
            <p>Petfolioo is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from your use of the Service, including missed vaccination reminders, data loss, or reliance on information in the app.</p>

            <h2>Governing Law</h2>
            <p>These Terms are governed by the laws of Sweden. Any disputes shall be resolved in Swedish courts.</p>

            <h2>Contact</h2>
            <p>For questions about these Terms, contact: <a href="mailto:legal@petfolioo.com">legal@petfolioo.com</a></p>
            <p>Petfolioo AB, Helsingborg, Sweden</p>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}
