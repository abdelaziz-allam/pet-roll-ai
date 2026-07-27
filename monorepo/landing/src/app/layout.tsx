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
  authors: [{ name: 'Petfolioo', url: 'https://petfolioo.com' }],
  creator: 'Petfolioo',
  publisher: 'Petfolioo AB',
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'google-site-verification': 'gdhx6DN7H1sHG0ZDD55T02onQCXPbGxeLDBsHWMyghQ',
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
      inLanguage: ['en', 'sv', 'de', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'da', 'no', 'fi'],
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
        availableLanguage: ['English', 'Swedish', 'German', 'French', 'Italian', 'Spanish', 'Dutch', 'Polish', 'Portuguese', 'Danish', 'Norwegian', 'Finnish'],
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
        priceCurrency: 'EUR',
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
        <link rel="author" href="https://petfolioo.com" />
        <link rel="me" href="https://twitter.com/petfolioo" />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
