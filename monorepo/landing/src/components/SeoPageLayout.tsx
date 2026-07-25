import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';

interface SeoPageProps {
  children: React.ReactNode;
  breadcrumb: string;
  breadcrumbUrl: string;
}

const seoPages = [
  { label: 'Pet Owners', href: '/pet-owners' },
  { label: 'Breeders', href: '/breeders' },
  { label: 'Veterinarians', href: '/veterinarians' },
  { label: 'Pet Shops', href: '/pet-shops' },
  { label: 'Adoption', href: '/adoption' },
];

export default function SeoPageLayout({ children, breadcrumb, breadcrumbUrl }: SeoPageProps) {
  return (
    <ScrollReveal>
      <Navbar />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href={breadcrumbUrl}>{breadcrumb}</Link></li>
          </ol>
        </div>
      </nav>
      <section className="seo-page">
        <div className="container">
          {children}
          <div className="cta-inline">
            <h3>Start Managing Your Pet&apos;s Health Today</h3>
            <p>Download Petfolioo free on iOS and Android.</p>
            <a href="https://play.google.com/store/apps/details?id=com.petroll.pet_roll" className="btn btn-primary btn-lg" rel="noopener noreferrer" target="_blank">Download Free</a>
          </div>
          <div className="cross-links">
            <h3>Explore More</h3>
            <ul>
              {seoPages
                .filter((p) => p.href !== breadcrumbUrl)
                .map((p) => (
                  <li key={p.href}><Link href={p.href}>{p.label}</Link></li>
                ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </ScrollReveal>
  );
}
