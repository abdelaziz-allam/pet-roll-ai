import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SeoPageLayout from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'Professional Breeding Management Platform',
  description:
    'Petfolioo helps professional breeders manage pregnancies, track lineage, find verified mating partners, and maintain health certifications for responsible breeding.',
  keywords: [
    'pet breeding app',
    'dog breeder software',
    'breeding management',
    'pet pregnancy tracker',
    'mating marketplace',
    'lineage tracking',
    'breeding health records',
    'responsible breeding platform',
  ],
  alternates: {
    canonical: 'https://petfolioo.com/breeders',
    languages: {
      'en': 'https://petfolioo.com/breeders',
      'sv': 'https://petfolioo.com/breeders',
      'x-default': 'https://petfolioo.com/breeders',
    },
  },
  openGraph: {
    title: 'Professional Breeding Management Platform | Petfolioo',
    description: 'Manage pregnancies, track lineage, and find verified mating partners with Petfolioo.',
    url: 'https://petfolioo.com/breeders',
    images: [{ url: 'https://petfolioo.com/og/breeders', width: 1200, height: 630, alt: 'Petfolioo for Breeders' }],
  },
};

const relatedPosts = [
  { title: 'Dog Pregnancy Week by Week: Complete Guide for Breeders', slug: 'dog-pregnancy-week-by-week-guide' },
  { title: 'Cat Pregnancy Signs and Care: A Complete Guide', slug: 'cat-pregnancy-signs-care-guide-breeders' },
  { title: 'How to Choose a Reputable Dog Breeder', slug: 'how-to-choose-reputable-dog-breeder' },
  { title: 'Best Dog Breeds for Families with Children', slug: 'best-dog-breeds-families-children-sweden' },
];

export default async function BreedersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Petfolioo for Breeders',
    description: 'Professional breeding management platform for responsible breeders.',
    url: 'https://petfolioo.com/breeders',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
        { '@type': 'ListItem', position: 2, name: 'Breeders', item: 'https://petfolioo.com/breeders' },
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
      <SeoPageLayout breadcrumb="Breeders" breadcrumbUrl="/breeders" relatedPosts={relatedPosts}>
        <div className="page-header">
          <h1>Professional Breeding Management for Responsible Breeders</h1>
          <p>
            Track pregnancies week by week, manage lineage records, find verified mating partners,
            and maintain health certifications — all in one platform designed for professional breeders.
          </p>
        </div>
        <article>
          <h2>Why Professional Breeders Choose Petfolioo</h2>
          <p>
            Responsible breeding requires meticulous record-keeping, health monitoring, and careful partner
            selection. Petfolioo provides the digital infrastructure that professional breeders need to
            manage their breeding programs with precision and transparency.
          </p>
          <p>
            From tracking heat cycles to monitoring pregnancy milestones to documenting the health history
            that buyers expect, Petfolioo handles the administrative burden so you can focus on the
            animals you love.
          </p>

          <h2>Pregnancy Monitoring with Week-by-Week Milestones</h2>
          <p>
            Petfolioo&apos;s pregnancy tracker provides species-specific milestones for dogs, cats, and other
            species. Track expected delivery dates, weight changes, veterinary checkups, ultrasound results,
            and behavioral changes throughout each stage of pregnancy. Read our detailed{' '}
            <a href="/blog/dog-pregnancy-week-by-week-guide">dog pregnancy week-by-week guide</a> or{' '}
            <a href="/blog/cat-pregnancy-signs-care-guide-breeders">cat pregnancy care guide</a> for more
            information. Support for multiple concurrent pregnancies means you can manage your entire breeding
            program from one dashboard.
          </p>

          <h2>The Mating Marketplace — Find Verified Partners</h2>
          <p>
            Connect with other verified breeders through Petfolioo&apos;s mating marketplace. Every listing
            includes health certifications, breed verification, lineage information, and location data.
            Direct messaging lets you discuss terms, share documents, and coordinate logistics without
            leaving the platform. Verification badges indicate registered breeders who maintain health
            standards.
          </p>

          <h2>Complete Lineage and Health Documentation</h2>
          <p>
            Maintain comprehensive health histories for every animal in your program. When buyers ask for
            health clearances, vaccination records, or genetic test results, generate professional PDF
            reports instantly. Track hereditary conditions across generations to make informed breeding
            decisions that prioritize genetic health and diversity.
          </p>
          <ul>
            <li>Full pregnancy tracking with species-specific timelines</li>
            <li>Mating marketplace with verified breeders and health certifications</li>
            <li>Lineage documentation and breeding history</li>
            <li>Health certification exports for breed registration bodies</li>
            <li>Multi-litter management with individual puppy/kitten tracking</li>
            <li>Integration with Swedish Kennel Club standards</li>
          </ul>

          <h2>Built for Nordic Breeding Standards</h2>
          <p>
            Petfolioo is designed with Nordic breeding regulations and kennel club requirements in mind.
            Whether you breed dogs registered with SKK (Svenska Kennelklubben), cats with SVERAK, or
            other species, our platform supports the documentation and health testing standards that
            Nordic registries require. The platform is available in Swedish and English with EU-compliant
            data storage.
          </p>
        </article>
      </SeoPageLayout>
    </>
  );
}
