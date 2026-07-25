import type { Metadata } from 'next';
import SeoPageLayout from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'Pet Health Management for Pet Owners',
  description:
    'Petfolioo helps pet owners track vaccinations, manage health records, set care schedules, and monitor their pets\' wellbeing. Free app for dogs, cats, birds, and more.',
  keywords: [
    'pet health app',
    'pet owner app',
    'dog health tracker',
    'cat health app',
    'pet vaccination reminders',
    'pet care management',
    'pet health records app',
  ],
  alternates: {
    canonical: 'https://petfolioo.com/pet-owners',
    languages: {
      'en': 'https://petfolioo.com/pet-owners',
      'sv': 'https://petfolioo.com/pet-owners',
      'x-default': 'https://petfolioo.com/pet-owners',
    },
  },
  openGraph: {
    title: 'Pet Health Management for Pet Owners | Petfolioo',
    description: 'Track vaccinations, manage health records, and keep your pets healthy with Petfolioo.',
    url: 'https://petfolioo.com/pet-owners',
    images: [{ url: 'https://petfolioo.com/og/pet-owners', width: 1200, height: 630, alt: 'Petfolioo for Pet Owners' }],
  },
};

const relatedPosts = [
  { title: 'Complete Dog Vaccination Schedule in Sweden 2025', slug: 'dog-vaccination-schedule-sweden-2025' },
  { title: 'Digital Pet Health Records: Why Every Pet Owner Needs One', slug: 'digital-pet-health-records-benefits' },
  { title: 'Flea and Tick Prevention for Pets in Sweden', slug: 'flea-tick-prevention-pets-sweden-seasonal' },
  { title: 'Pet Weight Management Guide', slug: 'pet-weight-management-overweight-dog-cat' },
];

export default function PetOwnersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Petfolioo for Pet Owners',
    description: 'Complete pet health management for pet owners.',
    url: 'https://petfolioo.com/pet-owners',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
        { '@type': 'ListItem', position: 2, name: 'Pet Owners', item: 'https://petfolioo.com/pet-owners' },
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
      <SeoPageLayout breadcrumb="Pet Owners" breadcrumbUrl="/pet-owners" relatedPosts={relatedPosts}>
        <div className="page-header">
          <h1>Complete Pet Health Management for Modern Pet Owners</h1>
          <p>
            Keep your dogs, cats, birds, and all pets healthy with digital vaccination tracking,
            health records, smart care schedules, and instant vet-ready reports.
          </p>
        </div>
        <article>
          <h2>Why Pet Owners Choose Petfolioo</h2>
          <p>
            Managing your pet&apos;s health shouldn&apos;t mean juggling paper records, forgotten vaccination dates,
            and lost vet receipts. Petfolioo gives you a single digital platform to track every aspect of your
            pet&apos;s wellbeing — from their first puppy vaccine to senior care checkups.
          </p>
          <p>
            Whether you have one cat or five dogs, Petfolioo adapts to your needs. The free plan supports up to
            3 pets with full access to health records, vaccination tracking, scheduling, and health reports.
          </p>

          <h2>Digital Vaccination Tracking That Sends Smart Reminders</h2>
          <p>
            Never miss a booster shot again. Petfolioo&apos;s vaccination tracker stores your pet&apos;s complete
            immunization history including vaccine names, batch numbers, dates, and administering veterinarian.
            You receive timely reminders before each vaccination is due, with species-specific schedules that
            distinguish between core and non-core vaccines. Learn more about{' '}
            <a href="/blog/dog-vaccination-schedule-sweden-2025">dog vaccination schedules</a> and{' '}
            <a href="/blog/cat-vaccination-guide-sweden">cat vaccination requirements</a> in Sweden.
          </p>

          <h2>Health Records Always at Your Fingertips</h2>
          <p>
            Log vet visits, surgeries, medications, weight measurements, lab results, and more. Every record is
            stored securely in the cloud and accessible from any device. When you visit a new vet or travel with
            your pet, generate a comprehensive PDF health report in seconds — no more scrambling through
            paper files.
          </p>

          <h2>Smart Schedules for Daily Pet Care</h2>
          <p>
            Set recurring reminders for feeding times, medication doses, grooming appointments, exercise routines,
            and flea/tick treatments. Petfolioo learns your pet&apos;s routine and helps you stay consistent with
            care schedules that veterinarians recommend for optimal pet health.
          </p>

          <h2>Multi-Pet Household Support</h2>
          <p>
            Managing health for multiple pets is where Petfolioo truly shines. Each pet gets their own profile
            with species-specific features. View all upcoming appointments across pets in a unified calendar.
            Track different vaccination schedules, medications, and dietary needs without confusion.
          </p>
          <ul>
            <li>Support for dogs, cats, <a href="/blog/bird-health-care-parrot-guide">birds</a>, <a href="/blog/rabbit-health-guide-common-illnesses">rabbits</a>, <a href="/blog/reptile-pet-care-health-guide">reptiles</a>, fish, <a href="/blog/horse-health-management-scandinavia-guide">horses</a>, and more</li>
            <li>Hundreds of breeds in the database with breed-specific health insights</li>
            <li>Individual profiles with photos, birth dates, and medical history</li>
            <li>Family sharing so multiple caregivers can access pet records</li>
          </ul>

          <h2>Available in Sweden and the Nordic Region</h2>
          <p>
            Petfolioo is built in Helsingborg, Sweden with Nordic veterinary standards in mind.
            The app is available in English and Swedish, with vaccination schedules aligned to
            Swedish Kennel Club and Nordic veterinary guidelines. All data is stored in the EU
            with full GDPR compliance.
          </p>
        </article>
      </SeoPageLayout>
    </>
  );
}
