import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SeoPageLayout from '@/components/SeoPageLayout';

export const metadata: Metadata = {
  title: 'Pet Adoption Health Records Platform',
  description:
    'Petfolioo helps shelters and adopters maintain complete health histories for adopted pets. Digital vaccination records, medical history, and care continuity for rescue animals.',
  keywords: [
    'pet adoption health records',
    'shelter pet health tracking',
    'rescue animal health history',
    'adoption pet care',
    'digital pet adoption records',
    'shelter management health',
  ],
  alternates: {
    canonical: 'https://petfolioo.com/adoption',
    languages: {
      'en': 'https://petfolioo.com/adoption',
      'sv': 'https://petfolioo.com/adoption',
      'x-default': 'https://petfolioo.com/adoption',
    },
  },
  openGraph: {
    title: 'Pet Adoption Health Records Platform | Petfolioo',
    description: 'Complete health histories for adopted pets. Support rescue animals with digital records.',
    url: 'https://petfolioo.com/adoption',
    images: [{ url: 'https://petfolioo.com/og/adoption', width: 1200, height: 630, alt: 'Petfolioo for Pet Adoption' }],
  },
};

const relatedPosts = [
  { title: 'Adopting a Rescue Dog in Sweden: Process, Costs, and Tips', slug: 'adopting-rescue-dog-sweden-guide' },
  { title: 'Common Puppy Health Problems: Warning Signs', slug: 'common-puppy-health-problems-warning-signs' },
  { title: 'Pet Microchipping in Sweden: Laws and Benefits', slug: 'pet-microchipping-sweden-guide' },
  { title: 'Digital Pet Health Records: Why You Need One', slug: 'digital-pet-health-records-benefits' },
];

export default async function AdoptionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Petfolioo for Pet Adoption',
    description: 'Health records platform for shelters and adopters.',
    url: 'https://petfolioo.com/adoption',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
        { '@type': 'ListItem', position: 2, name: 'Adoption', item: 'https://petfolioo.com/adoption' },
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
      <SeoPageLayout breadcrumb="Adoption" breadcrumbUrl="/adoption" relatedPosts={relatedPosts}>
        <div className="page-header">
          <h1>Health Records for Pet Adoption and Rescue Animals</h1>
          <p>
            Every adopted pet deserves a fresh start with complete health documentation.
            Petfolioo helps shelters document health histories and adopters continue
            care seamlessly from day one.
          </p>
        </div>
        <article>
          <h2>Continuity of Care for Rescue Animals</h2>
          <p>
            Rescue animals often come with fragmented or missing health records. Petfolioo provides
            a fresh digital health profile that starts from the moment an animal enters shelter care.
            Every vaccination, deworming treatment, spay/neuter procedure, and health assessment is
            documented digitally and transfers seamlessly to the adopter when the animal finds its
            forever home.
          </p>

          <h2>For Shelters: Document Everything Digitally</h2>
          <p>
            Managing health records for dozens or hundreds of animals is complex. Petfolioo gives
            shelters a structured system to log intake health assessments, track vaccination protocols,
            schedule follow-up treatments, and generate adoption-ready health summaries. When an
            adopter takes an animal home, the complete health history transfers to their account
            automatically.
          </p>

          <h2>For Adopters: Know Your Pet&apos;s History</h2>
          <p>
            When you adopt a pet through a Petfolioo-connected shelter, you receive the animal&apos;s
            complete health profile from day one. Know exactly what vaccinations have been given,
            what treatments are upcoming, and what health considerations to discuss with your
            veterinarian. No guessing, no gaps, no lost paperwork.
          </p>

          <h2>Supporting Responsible Adoption</h2>
          <p>
            Complete health documentation supports responsible adoption by ensuring adopters understand
            an animal&apos;s medical needs before committing. Post-adoption, Petfolioo&apos;s reminders help
            new owners stay on top of follow-up vaccinations, health check appointments, and
            ongoing care needs — reducing the risk of adoption returns due to unexpected health issues.
          </p>
          <ul>
            <li>Digital health profiles from shelter intake to forever home</li>
            <li>Complete vaccination and treatment history for every animal</li>
            <li>Seamless record transfer from shelter to adopter account</li>
            <li>Post-adoption care reminders reduce return rates</li>
            <li>Multi-animal management for shelters of any size</li>
            <li>Integration with Swedish animal welfare regulations</li>
          </ul>

          <h2>Available for Nordic Shelters and Rescue Organizations</h2>
          <p>
            Petfolioo works with animal shelters and rescue organizations across Sweden and the
            Nordic region. The platform supports Swedish animal welfare documentation requirements
            and integrates with standard shelter intake protocols. Shelter accounts are free and
            include unlimited animal profiles, making professional health record management
            accessible to organizations of any size.
          </p>
        </article>
      </SeoPageLayout>
    </>
  );
}
