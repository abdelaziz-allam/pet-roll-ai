import { FastifyBaseLogger } from 'fastify';

const SITE_URL = process.env.SITE_URL || 'https://petfolioo.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

export class SeoService {
  constructor(private logger: FastifyBaseLogger) {}

  async pingSearchEngines(changedUrls?: string[]): Promise<void> {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;

    await Promise.allSettled([
      this.pingGoogle(sitemapUrl),
      this.pingBing(sitemapUrl),
      this.pingIndexNow(changedUrls || [SITE_URL]),
    ]);
  }

  private async pingGoogle(sitemapUrl: string): Promise<void> {
    try {
      const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const response = await fetch(url);
      this.logger.info({ status: response.status }, 'Google sitemap ping sent');
    } catch (error) {
      this.logger.warn({ error }, 'Failed to ping Google');
    }
  }

  private async pingBing(sitemapUrl: string): Promise<void> {
    try {
      const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      const response = await fetch(url);
      this.logger.info({ status: response.status }, 'Bing sitemap ping sent');
    } catch (error) {
      this.logger.warn({ error }, 'Failed to ping Bing');
    }
  }

  private async pingIndexNow(urls: string[]): Promise<void> {
    if (!INDEXNOW_KEY) {
      this.logger.debug('IndexNow key not configured, skipping');
      return;
    }

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: new URL(SITE_URL).hostname,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: urls,
        }),
      });
      this.logger.info({ status: response.status, urlCount: urls.length }, 'IndexNow ping sent');
    } catch (error) {
      this.logger.warn({ error }, 'Failed to ping IndexNow');
    }
  }
}
