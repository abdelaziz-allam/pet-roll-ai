import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/locales';

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

function localizedUrl(baseUrl: string, path: string, locale: string): string {
  if (locale === defaultLocale) return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
}

function buildAlternates(baseUrl: string, path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedUrl(baseUrl, path, locale);
  }
  languages['x-default'] = `${baseUrl}${path}`;
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://petfolioo.com';
  const now = new Date().toISOString();

  const staticPaths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/pet-owners', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/breeders', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/veterinarians', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pet-shops', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/adoption', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = [];
  for (const page of staticPaths) {
    for (const locale of locales) {
      staticPages.push({
        url: localizedUrl(baseUrl, page.path, locale),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: locale === defaultLocale ? page.priority : page.priority * 0.9,
        alternates: { languages: buildAlternates(baseUrl, page.path) },
      });
    }
  }

  const blogPosts = await getBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = [];
  for (const post of blogPosts) {
    const lastMod = post.updatedAt
      ? new Date(post.updatedAt._seconds * 1000).toISOString()
      : now;
    for (const locale of locales) {
      blogPages.push({
        url: localizedUrl(baseUrl, `/blog/${post.slug}`, locale),
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: locale === defaultLocale ? 0.7 : 0.6,
        alternates: { languages: buildAlternates(baseUrl, `/blog/${post.slug}`) },
      });
    }
  }

  return [...staticPages, ...blogPages];
}
