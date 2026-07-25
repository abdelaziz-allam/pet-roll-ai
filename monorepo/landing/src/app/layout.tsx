import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://petfolioo.com'),
  title: {
    default: 'Petfolioo - Complete Pet Health Management Platform',
    template: '%s | Petfolioo',
  },
  description:
    'Petfolioo is the complete pet health management platform. Track vaccinations, manage health records, monitor pregnancies, and find breeding partners. Available on iOS and Android.',
  keywords: [
    'pet health management',
    'pet vaccination tracker',
    'pet health records',
    'dog health app',
    'cat health app',
    'pet pregnancy monitor',
    'breeding marketplace',
    'pet care app',
    'veterinary records',
    'pet health app Sweden',
  ],
  authors: [{ name: 'Petfolioo', url: 'https://petfolioo.com' }],
  creator: 'Petfolioo',
  publisher: 'Petfolioo AB',
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'sv_SE',
    url: 'https://petfolioo.com',
    siteName: 'Petfolioo',
    title: 'Petfolioo - Complete Pet Health Management Platform',
    description:
      'Track vaccinations, manage health records, monitor pregnancies, and find breeding partners. The all-in-one pet health app for modern pet parents and breeders.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Petfolioo - Pet Health Management Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petfolioo - Complete Pet Health Management Platform',
    description:
      'Track vaccinations, manage health records, monitor pregnancies, and find breeding partners.',
    images: ['/og-image.png'],
    creator: '@petfolioo',
    site: '@petfolioo',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://petfolioo.com',
    languages: {
      'en': 'https://petfolioo.com',
      'sv': 'https://petfolioo.com',
      'x-default': 'https://petfolioo.com',
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'google-site-verification': '',
    'theme-color': '#F1379D',
  },
};

function StructuredData() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://petfolioo.com/#website',
      url: 'https://petfolioo.com',
      name: 'Petfolioo',
      alternateName: ['Pet Folioo', 'Petfolio'],
      description: 'Complete pet health management platform for modern pet parents and professional breeders.',
      inLanguage: ['en', 'sv'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://app.petfolioo.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://petfolioo.com/#organization',
      name: 'Petfolioo',
      legalName: 'Petfolioo AB',
      url: 'https://petfolioo.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://petfolioo.com/logo.png',
        width: 512,
        height: 512,
      },
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Helsingborg',
        addressCountry: 'SE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@petfolioo.com',
        availableLanguage: ['English', 'Swedish'],
      },
      sameAs: [
        'https://twitter.com/petfolioo',
        'https://instagram.com/petfolioo',
        'https://facebook.com/petfolioo',
        'https://linkedin.com/company/petfolioo',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://petfolioo.com/#app',
      name: 'Petfolioo',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android, iOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SEK',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '127',
        bestRating: '5',
      },
      publisher: { '@id': 'https://petfolioo.com/#organization' },
      description: 'Track pet vaccinations, health records, pregnancies, and find breeding partners.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://petfolioo.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Petfolioo and how does it help pet owners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Petfolioo is a comprehensive pet health management platform that helps pet owners track vaccinations, manage digital health records, monitor pregnancies, set care schedules, and find verified breeding partners. It supports dogs, cats, birds, reptiles, and other pets. The platform is available as a mobile app on Android and iOS, serving pet owners primarily in Sweden and the Nordic region, with plans for EU-wide expansion.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the vaccination tracker work in Petfolioo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Petfolioo vaccination tracker allows you to log all vaccinations for each pet with dates, vaccine types, batch numbers, and administering veterinarian. It sends smart reminders before upcoming vaccinations are due, supports species-specific vaccine schedules (including core and non-core vaccines), and generates vaccination certificates that can be shared digitally with vets, boarding facilities, or travel authorities.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I track my pet\'s pregnancy with Petfolioo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Petfolioo includes a full pregnancy monitoring feature that tracks week-by-week milestones for dogs, cats, and other species. It monitors expected delivery dates, weight changes, veterinary checkups, and provides guidance on each stage of pregnancy. The feature supports multiple concurrent pregnancies and maintains a complete breeding history for each pet.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Petfolioo mating marketplace?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Petfolioo mating marketplace connects verified pet owners and breeders looking for breeding partners. Listings include health certifications, breed verification, lineage information, and location data. The platform includes direct messaging between owners, health document sharing, and verification badges for registered breeders. It is designed for responsible breeding with emphasis on pet health and genetic diversity.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Petfolioo free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Petfolioo offers a free tier that includes managing up to 3 pets with full access to health records, vaccination tracking, and scheduling features. The free plan includes all core features needed by most pet owners. Premium features like unlimited pets, breeding marketplace access, advanced health reports, and priority support are available through subscription plans.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Petfolioo protect my pet\'s health data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Petfolioo takes data security seriously. All health records are encrypted at rest and in transit using industry-standard encryption. The platform is hosted on Google Cloud Platform in the EU (europe-north1 region, located in Finland) ensuring GDPR compliance. Users have full control over their data with export and deletion capabilities. Authentication uses Firebase Auth with support for Google, Apple, and email sign-in methods.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I share health records with my veterinarian?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Petfolioo allows you to generate comprehensive PDF health reports that can be shared with veterinarians, boarding facilities, insurance companies, or travel authorities. Reports include vaccination history, medical records, weight logs, and any relevant health notes. Vets can also receive digital access to view a pet\'s records through a secure sharing link.',
          },
        },
        {
          '@type': 'Question',
          name: 'What pet species does Petfolioo support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Petfolioo supports a wide range of pet species including dogs, cats, birds (parrots, canaries, finches), rabbits, hamsters, guinea pigs, reptiles (snakes, lizards, turtles), fish, and horses. Each species has customized health tracking features, vaccination schedules, and pregnancy milestones appropriate to that animal type. The breed database includes hundreds of breeds across all supported species.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Petfolioo available in Sweden and the Nordic countries?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Petfolioo is headquartered in Helsingborg, Sweden and is specifically designed for the Nordic market. The app is available in both English and Swedish, with plans to add Norwegian, Danish, and Finnish. The platform follows Swedish and EU regulations for data handling (GDPR), and its infrastructure is hosted in the EU. The vaccination schedules and health recommendations are aligned with Nordic veterinary standards.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I get started with Petfolioo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Getting started with Petfolioo takes less than 2 minutes. Download the app from Google Play or the Apple App Store, create an account using your email, Google, or Apple sign-in, then add your first pet with basic information like name, species, breed, and date of birth. You can immediately start logging health records, setting vaccination reminders, and exploring the breeding marketplace. No credit card is required for the free plan.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://petfolioo.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://petfolioo.com',
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`,
        }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
