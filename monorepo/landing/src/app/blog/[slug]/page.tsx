import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
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
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const publishedISO = post.publishedDate
    ? new Date(post.publishedDate._seconds * 1000).toISOString()
    : new Date(post.createdAt._seconds * 1000).toISOString();

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
    wordCount: post.content.replace(/<[^>]+>/g, '').split(/\s+/).length,
    timeRequired: `PT${post.readingTimeMinutes}M`,
    keywords: post.tags,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#fafafa', paddingTop: 64 }}>
        {post.coverImageUrl && (
          <div
            style={{
              width: '100%',
              height: 360,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={post.coverImageUrl}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '48px 24px 80px',
          }}
        >
          <Link
            href="/blog"
            style={{
              color: '#F1379D',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            &larr; Back to Blog
          </Link>

          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              marginTop: 24,
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
            <span style={{ fontWeight: 500, color: '#333' }}>{post.author}</span>
            <span>{formatDate(post.publishedDate || post.createdAt)}</span>
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
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#333',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
