import type { MetadataRoute } from 'next';

async function getBlogSlugs(): Promise<{ slug: string; updatedAt?: { _seconds: number } }[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.petfolioo.com/api/v1';
  const allPosts: { slug: string; updatedAt?: { _seconds: number } }[] = [];
  let page = 1;
  const limit = 100;

  try {
    while (true) {
      let res: Response | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        res = await fetch(`${apiUrl}/blog/posts?limit=${limit}&page=${page}`, { next: { revalidate: 3600 } });
        if (res.ok) break;
        if (res.status === 429) {
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
          continue;
        }
        break;
      }
      if (!res || !res.ok) break;
      const json = await res.json();
      const posts = json.data || [];
      if (posts.length === 0) break;
      allPosts.push(...posts.map((p: any) => ({ slug: p.slug, updatedAt: p.updatedAt })));
      if (page >= (json.totalPages || 1)) break;
      page++;
    }
  } catch {
    // return whatever we collected
  }

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://petfolioo.com';
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pet-owners`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/breeders`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/veterinarians`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pet-shops`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/adoption`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogPosts = await getBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt._seconds * 1000).toISOString()
      : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
