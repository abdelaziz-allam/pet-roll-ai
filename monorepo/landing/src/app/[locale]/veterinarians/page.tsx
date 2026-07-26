import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SeoPageLayout from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'Digital Health Records for Veterinarians',
  description:
    'Petfolioo gives veterinarians instant access to patient health histories, vaccination records, and digital reports. Improve clinic efficiency with connected pet health data.',
  keywords: [
    'veterinary health records',
    'digital vet records',
    'pet health platform for vets',
    'veterinary practice software',
    'vaccination records sharing',
    'vet clinic digital records',
  ],
  alternates: {
    canonical: 'https://petfolioo.com/veterinarians',
    languages: {
      'en': 'https://petfolioo.com/veterinarians',
      'sv': 'https://petfolioo.com/veterinarians',
      'x-default': 'https://petfolioo.com/veterinarians',
    },
  },
  openGraph: {
    title: 'Digital Health Records for Veterinarians | Petfolioo',
    description: 'Access patient health histories and improve clinic efficiency with Petfolioo.',
    url: 'https://petfolioo.com/veterinarians',
    images: [{ url: 'https://petfolioo.com/og/veterinarians', width: 1200, height: 630, alt: 'Petfolioo for Veterinarians' }],
  },
};

const relatedPosts = [
  { title: 'How to Read Your Pet Blood Test Results', slug: 'how-to-read-pet-blood-test-results' },
  { title: 'Pet Dental Care: Why Teeth Matter More Than You Think', slug: 'pet-dental-care-dog-cat-teeth' },
  { title: 'Common Puppy Health Problems: Warning Signs', slug: 'common-puppy-health-problems-warning-signs' },
  { title: 'Senior Dog Care: Health Tips for Aging Dogs', slug: 'senior-dog-care-health-tips-aging' },
];

export default async function VeterinariansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Petfolioo for Veterinarians',
    description: 'Digital health records platform for veterinary professionals.',
    url: 'https://petfolioo.com/veterinarians',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
        { '@type': 'ListItem', position: 2, name: 'Veterinarians', item: 'https://petfolioo.com/veterinarians' },
      ],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.page-header h1', '.page-header p'],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoPageLayout breadcrumb="Veterinarians" breadcrumbUrl="/veterinarians" relatedPosts={relatedPosts}>
        <div className="page-header">
          <h1>Digital Pet Health Records for Veterinary Professionals</h1>
          <p>
            When patients arrive with complete digital health histories, your consultations are faster,
            more informed, and more effective. Petfolioo bridges the gap between pet owners and clinics.
          </p>
        </div>
        <article>
          <h2>How Petfolioo Benefits Veterinary Practices</h2>
          <p>
            Patients who use Petfolioo arrive at your clinic with comprehensive digital health records
            already prepared. Vaccination histories, medication logs, weight trends, prior surgeries,
            and lab results are all accessible in structured PDF reports — saving you time during
            intake and improving diagnostic accuracy.
          </p>
          <p>
            Rather than relying on owner memory or paper records from other clinics, you get a reliable
            digital timeline of each animal&apos;s health journey. This is especially valuable for
            referral cases, emergency visits, and new patient intakes.
          </p>

          <h2>Structured Health Data from Day One</h2>
          <p>
            Petfolioo encourages pet owners to log health data consistently. By the time they visit
            your clinic, you have access to weight trends over months, vaccination compliance rates,
            medication adherence, and symptom timelines. This structured data supports better clinical
            decisions and reduces history-taking time.
          </p>

          <h2>Professional Verification System</h2>
          <p>
            Petfolioo&apos;s verification system allows veterinary professionals to verify their credentials
            and appear as trusted providers within the platform. Verified veterinarians can receive
            shared health records from patients, issue digital vaccination certificates, and connect
            with pet owners for follow-up care coordination.
          </p>

          <h2>Health Reports That Match Clinical Standards</h2>
          <p>
            The PDF health reports that Petfolioo generates follow clinical documentation standards
            with chronological entries, vaccination schedules aligned to WSAVA guidelines, and clear
            medication histories including dosages and durations. Reports can be used for travel
            certificates, insurance claims, and breed registration health requirements.
          </p>
          <ul>
            <li>Patients arrive with complete digital vaccination and health histories</li>
            <li>Structured PDF reports reduce intake time by up to 50%</li>
            <li>Verification badge establishes trust with pet owner community</li>
            <li>Secure record sharing with patient consent</li>
            <li>Support for WSAVA vaccination guidelines and Nordic vet standards</li>
            <li>GDPR-compliant data handling across the EU</li>
          </ul>

          <h2>Designed for Nordic Veterinary Practice</h2>
          <p>
            Petfolioo is built in Sweden and designed with Nordic veterinary standards in mind.
            Vaccination schedules follow Swedish Board of Agriculture guidelines. The platform
            supports both Swedish and English, and all data is stored within the EU in compliance
            with GDPR and national data protection regulations for veterinary patient records.
          </p>
        </article>
      </SeoPageLayout>
    </>
  );
}
