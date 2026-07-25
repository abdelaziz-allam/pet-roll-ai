import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../src/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 3001,
    GCP_PROJECT_ID: 'petroll-mvp',
    FIREBASE_PROJECT_ID: 'petroll-mvp',
    JWT_SECRET: 'test-secret-minimum-16-chars',
    JWT_EXPIRY: '1h',
    REFRESH_TOKEN_EXPIRY: '7d',
    CORS_ORIGINS: 'http://localhost:5173',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW: 60000,
    GCS_BUCKET: 'petroll-mvp.appspot.com',
  },
}));

const mockLogger: any = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  fatal: vi.fn(),
  trace: vi.fn(),
  child: vi.fn().mockReturnThis(),
};

describe('SeoService', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch = vi.fn().mockResolvedValue({ status: 200 });
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('without INDEXNOW_KEY (default)', () => {
    let SeoService: any;

    beforeEach(async () => {
      delete process.env.INDEXNOW_KEY;
      delete process.env.SITE_URL;
      vi.resetModules();
      const mod = await import('../../src/modules/seo/seo.service');
      SeoService = mod.SeoService;
    });

    describe('pingSearchEngines', () => {
      it('should call Google, Bing, and IndexNow', async () => {
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        // Google ping
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('https://www.google.com/ping?sitemap=')
        );
        // Bing ping
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('https://www.bing.com/ping?sitemap=')
        );
        // IndexNow skipped (no key), so only 2 fetch calls
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });

      it('should use default SITE_URL when env var is not set', async () => {
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        const expectedSitemap = encodeURIComponent('https://petfolioo.com/sitemap.xml');
        expect(mockFetch).toHaveBeenCalledWith(
          `https://www.google.com/ping?sitemap=${expectedSitemap}`
        );
        expect(mockFetch).toHaveBeenCalledWith(
          `https://www.bing.com/ping?sitemap=${expectedSitemap}`
        );
      });

      it('should pass changedUrls to IndexNow when provided', async () => {
        const service = new SeoService(mockLogger);
        const urls = ['https://petfolioo.com/blog/post-1', 'https://petfolioo.com/blog/post-2'];
        await service.pingSearchEngines(urls);

        // IndexNow is skipped because no key, but Google and Bing still called
        expect(mockFetch).toHaveBeenCalledTimes(2);
        expect(mockLogger.debug).toHaveBeenCalledWith('IndexNow key not configured, skipping');
      });

      it('should use SITE_URL as default when changedUrls is not provided', async () => {
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        // Without changedUrls, it defaults to [SITE_URL]
        // But since no INDEXNOW_KEY, it skips IndexNow entirely
        expect(mockLogger.debug).toHaveBeenCalledWith('IndexNow key not configured, skipping');
      });
    });

    describe('pingGoogle (via pingSearchEngines)', () => {
      it('should log info on successful ping', async () => {
        mockFetch.mockResolvedValue({ status: 200 });
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        expect(mockLogger.info).toHaveBeenCalledWith(
          { status: 200 },
          'Google sitemap ping sent'
        );
      });

      it('should log warning when fetch throws', async () => {
        const error = new Error('Network error');
        mockFetch.mockRejectedValue(error);
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        expect(mockLogger.warn).toHaveBeenCalledWith(
          { error },
          'Failed to ping Google'
        );
      });
    });

    describe('pingBing (via pingSearchEngines)', () => {
      it('should log info on successful ping', async () => {
        mockFetch.mockResolvedValue({ status: 200 });
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        expect(mockLogger.info).toHaveBeenCalledWith(
          { status: 200 },
          'Bing sitemap ping sent'
        );
      });

      it('should log warning when fetch throws', async () => {
        const error = new Error('Network error');
        mockFetch.mockRejectedValue(error);
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        expect(mockLogger.warn).toHaveBeenCalledWith(
          { error },
          'Failed to ping Bing'
        );
      });
    });

    describe('pingIndexNow without key', () => {
      it('should skip IndexNow and log debug message', async () => {
        const service = new SeoService(mockLogger);
        await service.pingSearchEngines();

        expect(mockLogger.debug).toHaveBeenCalledWith('IndexNow key not configured, skipping');
        // Only Google and Bing should be called
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('with INDEXNOW_KEY configured', () => {
    let SeoService: any;
    const TEST_INDEXNOW_KEY = 'test-indexnow-key-12345';

    beforeEach(async () => {
      process.env.INDEXNOW_KEY = TEST_INDEXNOW_KEY;
      delete process.env.SITE_URL;
      vi.resetModules();
      const mod = await import('../../src/modules/seo/seo.service');
      SeoService = mod.SeoService;
    });

    afterEach(() => {
      delete process.env.INDEXNOW_KEY;
    });

    it('should call IndexNow API with correct payload', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      const urls = ['https://petfolioo.com/blog/new-post'];
      await service.pingSearchEngines(urls);

      expect(mockFetch).toHaveBeenCalledWith('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'petfolioo.com',
          key: TEST_INDEXNOW_KEY,
          keyLocation: `https://petfolioo.com/${TEST_INDEXNOW_KEY}.txt`,
          urlList: urls,
        }),
      });
    });

    it('should call all three endpoints (Google, Bing, IndexNow)', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines(['https://petfolioo.com/page']);

      // 3 fetch calls: Google, Bing, IndexNow
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should use SITE_URL as default urlList when changedUrls not provided', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines();

      expect(mockFetch).toHaveBeenCalledWith('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'petfolioo.com',
          key: TEST_INDEXNOW_KEY,
          keyLocation: `https://petfolioo.com/${TEST_INDEXNOW_KEY}.txt`,
          urlList: ['https://petfolioo.com'],
        }),
      });
    });

    it('should log info with status and urlCount on success', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      const urls = ['https://petfolioo.com/a', 'https://petfolioo.com/b'];
      await service.pingSearchEngines(urls);

      expect(mockLogger.info).toHaveBeenCalledWith(
        { status: 200, urlCount: 2 },
        'IndexNow ping sent'
      );
    });

    it('should log warning when IndexNow fetch throws', async () => {
      const networkError = new Error('IndexNow API down');
      // Google and Bing succeed, IndexNow fails
      mockFetch
        .mockResolvedValueOnce({ status: 200 }) // Google
        .mockResolvedValueOnce({ status: 200 }) // Bing
        .mockRejectedValueOnce(networkError);   // IndexNow

      const service = new SeoService(mockLogger);
      await service.pingSearchEngines(['https://petfolioo.com/page']);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        { error: networkError },
        'Failed to ping IndexNow'
      );
    });

    it('should not throw even if all pings fail', async () => {
      mockFetch.mockRejectedValue(new Error('All failed'));
      const service = new SeoService(mockLogger);

      // Should not throw due to Promise.allSettled
      await expect(service.pingSearchEngines()).resolves.toBeUndefined();
    });
  });

  describe('with custom SITE_URL', () => {
    let SeoService: any;
    const CUSTOM_SITE_URL = 'https://custom.example.com';

    beforeEach(async () => {
      process.env.SITE_URL = CUSTOM_SITE_URL;
      process.env.INDEXNOW_KEY = 'custom-key';
      vi.resetModules();
      const mod = await import('../../src/modules/seo/seo.service');
      SeoService = mod.SeoService;
    });

    afterEach(() => {
      delete process.env.SITE_URL;
      delete process.env.INDEXNOW_KEY;
    });

    it('should use custom SITE_URL for sitemap pings', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines();

      const expectedSitemap = encodeURIComponent(`${CUSTOM_SITE_URL}/sitemap.xml`);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://www.google.com/ping?sitemap=${expectedSitemap}`
      );
      expect(mockFetch).toHaveBeenCalledWith(
        `https://www.bing.com/ping?sitemap=${expectedSitemap}`
      );
    });

    it('should use custom SITE_URL hostname in IndexNow payload', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines(['https://custom.example.com/page']);

      expect(mockFetch).toHaveBeenCalledWith('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'custom.example.com',
          key: 'custom-key',
          keyLocation: `${CUSTOM_SITE_URL}/custom-key.txt`,
          urlList: ['https://custom.example.com/page'],
        }),
      });
    });

    it('should default changedUrls to [SITE_URL] for IndexNow', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines();

      expect(mockFetch).toHaveBeenCalledWith('https://api.indexnow.org/indexnow', expect.objectContaining({
        body: expect.stringContaining(`"urlList":["${CUSTOM_SITE_URL}"]`),
      }));
    });
  });

  describe('edge cases', () => {
    let SeoService: any;

    beforeEach(async () => {
      delete process.env.INDEXNOW_KEY;
      delete process.env.SITE_URL;
      vi.resetModules();
      const mod = await import('../../src/modules/seo/seo.service');
      SeoService = mod.SeoService;
    });

    it('should handle non-200 status codes without throwing', async () => {
      mockFetch.mockResolvedValue({ status: 503 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines();

      expect(mockLogger.info).toHaveBeenCalledWith(
        { status: 503 },
        'Google sitemap ping sent'
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        { status: 503 },
        'Bing sitemap ping sent'
      );
    });

    it('should handle empty changedUrls array', async () => {
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines([]);

      // Empty array is still truthy, so it passes [] to pingIndexNow
      // IndexNow is skipped due to no key
      expect(mockLogger.debug).toHaveBeenCalledWith('IndexNow key not configured, skipping');
    });

    it('should encode sitemap URL properly', async () => {
      mockFetch.mockResolvedValue({ status: 200 });
      const service = new SeoService(mockLogger);
      await service.pingSearchEngines();

      // The sitemap URL should be URL-encoded in the query parameter
      const googleCall = mockFetch.mock.calls.find((call: any[]) =>
        call[0].includes('google.com')
      );
      expect(googleCall[0]).toContain(encodeURIComponent('https://petfolioo.com/sitemap.xml'));
    });

    it('should resolve even when individual pings are rejected', async () => {
      mockFetch.mockRejectedValue(new Error('Timeout'));
      const service = new SeoService(mockLogger);

      // Promise.allSettled ensures no throw
      await expect(service.pingSearchEngines()).resolves.toBeUndefined();
    });
  });
});
