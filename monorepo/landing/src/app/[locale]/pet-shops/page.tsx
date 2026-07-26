import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SeoPageLayout from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'Pet Shop Customer Engagement Platform',
  description:
    'Help your customers maintain their pets\' health with Petfolioo. Offer digital health profiles, vaccination tracking, and care schedules as a value-add for your pet shop.',
  keywords: [
    'pet shop customer engagement',
    'pet retail technology',
    'pet store digital tools',
    'customer retention pet shop',
    'pet health profiles retail',
  ],
  alternates: {
    canonical: 'https://petfolioo.com/pet-shops',
    languages: {
      'en': 'https://petfolioo.com/pet-shops',
      'sv': 'https://petfolioo.com/pet-shops',
      'x-default': 'https://petfolioo.com/pet-shops',
    },
  },
  openGraph: {
    title: 'Pet Shop Customer Engagement Platform | Petfolioo',
    description: 'Enhance customer experience with digital pet health profiles.',
    url: 'https://petfolioo.com/pet-shops',
    images: [{ url: 'https://petfolioo.com/og/pet-shops', width: 1200, height: 630, alt: 'Petfolioo for Pet Shops' }],
  },
};

const relatedPosts = [
  { title: 'Pet Microchipping in Sweden: Laws and Benefits', slug: 'pet-microchipping-sweden-guide' },
  { title: 'Pet-Proofing Your Home: Room-by-Room Safety Checklist', slug: 'pet-proofing-home-safety-checklist' },
  { title: 'Best Dog Breeds for Families with Children', slug: 'best-dog-breeds-families-children-sweden' },
  { title: 'How to Deworm Your Dog: Schedule and Products', slug: 'how-to-deworm-dog-schedule-guide' },
];

export default async function PetShopsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Petfolioo for Pet Shops',
    description: 'Customer engagement platform for pet retailers.',
    url: 'https://petfolioo.com/pet-shops',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
        { '@type': 'ListItem', position: 2, name: 'Pet Shops', item: 'https://petfolioo.com/pet-shops' },
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
      <SeoPageLayout breadcrumb="Pet Shops" breadcrumbUrl="/pet-shops" relatedPosts={relatedPosts}>
        <div className="page-header">
          <h1>Digital Pet Health Profiles for Pet Shop Customers</h1>
          <p>
            Offer your customers more than products. Help them start their pet&apos;s digital health
            journey from day one with Petfolioo&apos;s health profiles, vaccination tracking, and care reminders.
          </p>
        </div>
        <article>
          <h2>Add Value to Every Pet Purchase</h2>
          <p>
            When a customer buys a new pet from your shop, help them set up a Petfolioo health profile
            on the spot. Pre-populate vaccination records, include breed-specific care schedules, and
            set initial vet visit reminders. This value-add differentiates your shop from competitors
            and creates a lasting relationship with the customer beyond the transaction.
          </p>

          <h2>Customer Engagement Beyond the Store</h2>
          <p>
            Pet owners who use Petfolioo receive regular care reminders — many of which drive them
            back to your store. Flea treatment reminders, grooming schedule notifications, and dietary
            supplement suggestions keep your brand top-of-mind. Build customer loyalty through
            ongoing pet care engagement rather than one-time purchases.
          </p>

          <h2>Health Documentation for Responsible Retail</h2>
          <p>
            Modern pet buyers expect documentation. Petfolioo lets you provide digital health profiles
            with every animal you sell, including initial veterinary checks, deworming records,
            vaccination status, and microchip information. This transparency builds trust and
            demonstrates your commitment to animal welfare and responsible retail practices.
          </p>
          <ul>
            <li>Set up health profiles for animals at point of sale</li>
            <li>Include initial vaccinations, deworming, and health check records</li>
            <li>Automated care reminders drive repeat visits to your store</li>
            <li>Demonstrate responsible retail practices to customers</li>
            <li>Breed-specific care guides educate new pet owners</li>
            <li>Partner verification badge on the Petfolioo platform</li>
          </ul>

          <h2>Join the Petfolioo Partner Network</h2>
          <p>
            Pet shops in Sweden and the Nordic region can join the Petfolioo partner network to
            appear as recommended retailers within the app. Partners receive a verification badge,
            listing in the app&apos;s local services directory, and access to anonymized insights about
            pet health trends in their area to optimize inventory and services.
          </p>
        </article>
      </SeoPageLayout>
    </>
  );
}
