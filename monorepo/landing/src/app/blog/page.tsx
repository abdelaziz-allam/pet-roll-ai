import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Pet Health Tips & Guides',
  description:
    'Expert articles on pet health, vaccination schedules, breeding tips, and care guides. Stay informed with the latest pet health knowledge from Petfolioo.',
  openGraph: {
    title: 'Blog - Pet Health Tips & Guides | Petfolioo',
    description:
      'Expert articles on pet health, vaccination schedules, breeding tips, and care guides.',
    url: 'https://petfolioo.com/blog',
    images: [{ url: 'https://petfolioo.com/og/blog', width: 1200, height: 630, alt: 'Petfolioo Blog' }],
  },
  alternates: {
    canonical: 'https://petfolioo.com/blog',
    languages: {
      'en': 'https://petfolioo.com/blog',
      'sv': 'https://petfolioo.com/blog',
      'x-default': 'https://petfolioo.com/blog',
    },
  },
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  tags: string;
  author: string;
  readingTimeMinutes: number;
  publishedDate: { _seconds: number } | null;
  createdAt: { _seconds: number };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.petfolioo.com/api/v1';
  try {
    const res = await fetch(`${apiUrl}/blog/posts?limit=50`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

function formatDate(ts: { _seconds: number } | null): string {
  if (!ts) return '';
  return new Date(ts._seconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main style={{ minHeight: '100vh', background: '#fafafa' }}>
      <section
        style={{
          padding: '80px 24px 48px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #F1379D 0%, #722ed1 100%)',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, fontFamily: 'Poppins' }}>
          Pet Health Blog
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: 12, maxWidth: 600, marginInline: 'auto' }}>
          Expert tips, guides, and insights on keeping your pets healthy and happy.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
            <p style={{ fontSize: '1.2rem' }}>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 32,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
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
                  {post.coverImageUrl && (
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: 24 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      {post.tags &&
                        post.tags.split(',').slice(0, 3).map((tag) => (
                          <span
                            key={tag.trim()}
                            style={{
                              fontSize: 12,
                              padding: '2px 10px',
                              borderRadius: 20,
                              background: 'rgba(241, 55, 157, 0.08)',
                              color: '#F1379D',
                              fontWeight: 500,
                            }}
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                        color: '#999',
                      }}
                    >
                      <span>{post.author}</span>
                      <span>
                        {formatDate(post.publishedDate || post.createdAt)} &middot;{' '}
                        {post.readingTimeMinutes} min read
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
