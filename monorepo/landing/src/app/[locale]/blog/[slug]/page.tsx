import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  tags: string;
  author: string;
  readingTimeMinutes: number;
  isPublished: boolean;
  publishedDate: { _seconds: number } | null;
  metaTitle: string;
  metaDescription: string;
  createdAt: { _seconds: number };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.petfolioo.com/api/v1';

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blog/posts/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getRelatedPosts(tags: string, currentSlug: string): Promise<BlogPost[]> {
  try {
    const primaryTag = tags.split(',')[0]?.trim();
    if (!primaryTag) return [];
    const res = await fetch(`${API_URL}/blog/posts?limit=50&page=1`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const posts = (json.data || []) as BlogPost[];
    const related = posts
      .filter((p) => p.slug !== currentSlug && p.tags?.includes(primaryTag))
      .slice(0, 6);
    if (related.length < 6) {
      const more = posts
        .filter((p) => p.slug !== currentSlug && !related.find((r) => r.id === p.id))
        .slice(0, 6 - related.length);
      related.push(...more);
    }
    return related;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://petfolioo.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate
        ? new Date(post.publishedDate._seconds * 1000).toISOString()
        : undefined,
      authors: [post.author],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
    alternates: {
      canonical: `https://petfolioo.com/blog/${post.slug}`,
      languages: {
        'en': `https://petfolioo.com/blog/${post.slug}`,
        'sv': `https://petfolioo.com/blog/${post.slug}`,
        'x-default': `https://petfolioo.com/blog/${post.slug}`,
      },
    },
  };
}

function formatDate(ts: { _seconds: number } | null): string {
  if (!ts) return '';
  return new Date(ts._seconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.tags || '', post.slug);
  const t = await getTranslations({ locale, namespace: 'blog' });

  const publishedISO = post.publishedDate
    ? new Date(post.publishedDate._seconds * 1000).toISOString()
    : new Date(post.createdAt._seconds * 1000).toISOString();

  const wordCount = post.content
    ? post.content.replace(/<[^>]+>/g, '').split(/\s+/).length
    : 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl || undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Petfolioo',
      logo: { '@type': 'ImageObject', url: 'https://petfolioo.com/logo.png' },
    },
    datePublished: publishedISO,
    dateModified: publishedISO,
    mainEntityOfPage: `https://petfolioo.com/blog/${post.slug}`,
    wordCount,
    timeRequired: `PT${post.readingTimeMinutes}M`,
    keywords: post.tags,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://petfolioo.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://petfolioo.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://petfolioo.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#fafafa', paddingTop: 64 }}>
        {post.coverImageUrl && (
          <div style={{ width: '100%', height: 360, overflow: 'hidden', position: 'relative' }}>
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.6))',
              }}
            />
          </div>
        )}

        <article
          style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
            <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#888' }}>
              <li><Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" style={{ color: '#F1379D', textDecoration: 'none' }}>Blog</Link></li>
              <li>/</li>
              <li style={{ color: '#555', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</li>
            </ol>
          </nav>

          <h1
            itemProp="headline"
            style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 16,
              lineHeight: 1.2,
              fontFamily: 'Poppins',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 32,
              fontSize: '0.9rem',
              color: '#666',
              flexWrap: 'wrap',
            }}
          >
            <span itemProp="author" style={{ fontWeight: 500, color: '#333' }}>{post.author}</span>
            <time itemProp="datePublished" dateTime={publishedISO}>
              {formatDate(post.publishedDate || post.createdAt)}
            </time>
            <span>{post.readingTimeMinutes} min read</span>
          </div>

          {post.tags && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {post.tags.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  style={{
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: 20,
                    background: 'rgba(114, 46, 209, 0.08)',
                    color: '#722ed1',
                    fontWeight: 500,
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <div
            className="blog-content"
            itemProp="articleBody"
            style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 24, fontFamily: 'Poppins' }}>
              Related Articles
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <article
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {related.coverImageUrl && (
                      <div style={{ height: 160, position: 'relative' }}>
                        <Image
                          src={related.coverImageUrl}
                          alt={related.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                        {related.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: '8px 0 0', lineHeight: 1.4 }}>
                        {related.excerpt?.slice(0, 100)}...
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
