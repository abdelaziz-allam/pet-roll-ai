import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BlobServiceClient } from '@azure/storage-blob';

vi.mock('../../src/config/env', () => ({
  env: {
    AZURE_STORAGE_ACCOUNT_URL: 'https://stpetfolioo.blob.core.windows.net',
    AZURE_PUBLIC_CONTAINER: 'public',
    AZURE_PRIVATE_CONTAINER: 'private',
    LEGACY_GCS_BUCKET: 'petroll-production-storage',
    GCS_BUCKET: 'petroll-production-storage',
  },
}));
vi.mock('../../src/config/firebase', () => ({ storage: { bucket: vi.fn() } }));

import { AzureObjectStore } from '../../src/storage/azure-store';
import { hasStoredUrl, resolveStoredUrl, resolveUrlsInPayload } from '../../src/storage/url-resolver';

const ACCOUNT = 'https://stpetfolioo.blob.core.windows.net';
const LEGACY = 'petroll-production-storage';

function makeStore() {
  const service = new BlobServiceClient(ACCOUNT);
  const getKey = vi.spyOn(service, 'getUserDelegationKey').mockImplementation(async (startsOn, expiresOn) => ({
    signedObjectId: 'oid',
    signedTenantId: 'tid',
    signedStartsOn: startsOn,
    signedExpiresOn: expiresOn,
    signedService: 'b',
    signedVersion: '2023-11-03',
    value: Buffer.from('test-delegation-key').toString('base64'),
  }) as any);
  return { store: new AzureObjectStore(service), getKey };
}

describe('AzureObjectStore.signedUrl', () => {
  it('signs a read-only HTTPS link for a private blob', async () => {
    const { store } = makeStore();
    const url = new URL(await store.signedUrl('verifications/u1/id.pdf', 15));

    expect(`${url.origin}${url.pathname}`).toBe(`${ACCOUNT}/private/verifications/u1/id.pdf`);
    expect(url.searchParams.get('sp')).toBe('r');
    expect(url.searchParams.get('spr')).toBe('https');
    expect(url.searchParams.get('sig')).toBeTruthy();
    const minutes = (new Date(url.searchParams.get('se')!).getTime() - Date.now()) / 60000;
    expect(minutes).toBeGreaterThan(14);
    expect(minutes).toBeLessThanOrEqual(15);
  });

  it('reuses the delegation key between links', async () => {
    const { store, getKey } = makeStore();
    await store.signedUrl('pets/a.png', 60);
    await store.signedUrl('pets/b.png', 60);
    expect(getKey).toHaveBeenCalledTimes(1);
  });
});

describe('resolveStoredUrl', () => {
  let store: AzureObjectStore;
  beforeEach(async () => {
    store = makeStore().store;
    await store.ensureSigningKey();
  });

  it('maps a legacy public blog URL to the public container', () => {
    const out = resolveStoredUrl(`https://storage.googleapis.com/${LEGACY}/blog/1-cover.jpg`, store, LEGACY);
    expect(out).toBe(`${ACCOUNT}/public/blog/1-cover.jpg`);
  });

  // Regression: health records and ID documents were world-readable on GCS.
  it('maps a legacy private URL to a signed private link', () => {
    const out = new URL(resolveStoredUrl(`https://storage.googleapis.com/${LEGACY}/health-records/p/r/x.png`, store, LEGACY));
    expect(out.pathname).toBe('/private/health-records/p/r/x.png');
    expect(out.searchParams.get('sig')).toBeTruthy();
  });

  it('re-signs a stored private link whose signature has expired', () => {
    const stale = `${ACCOUNT}/private/pets/o/p/1.png?se=2020-01-01T00%3A00%3A00Z&sig=old`;
    const out = new URL(resolveStoredUrl(stale, store, LEGACY));
    expect(out.searchParams.get('sig')).not.toBe('old');
    expect(new Date(out.searchParams.get('se')!).getTime()).toBeGreaterThan(Date.now());
  });

  it('decodes encoded path segments', () => {
    const out = new URL(resolveStoredUrl(`https://storage.googleapis.com/${LEGACY}/pets/o/my%20cat.png`, store, LEGACY));
    expect(out.pathname).toBe('/private/pets/o/my%20cat.png');
  });

  it('leaves unrelated URLs alone', () => {
    const other = 'https://images.unsplash.com/photo-1?w=400';
    expect(resolveStoredUrl(other, store, LEGACY)).toBe(other);
    const otherBucket = 'https://storage.googleapis.com/some-other-bucket/pets/x.png';
    expect(resolveStoredUrl(otherBucket, store, LEGACY)).toBe(otherBucket);
  });
});

describe('resolveUrlsInPayload', () => {
  it('rewrites nested file URLs and keeps every other field', async () => {
    const { store } = makeStore();
    await store.ensureSigningKey();
    const payload = {
      id: 'pet-1',
      name: 'Max',
      createdAt: { _seconds: 1, _nanoseconds: 0 },
      photos: [{ url: `https://storage.googleapis.com/${LEGACY}/pets/o/1.png`, path: 'pets/o/1.png' }],
      fatherInfo: { photos: [`https://storage.googleapis.com/${LEGACY}/blog/c.jpg`] },
    };

    resolveUrlsInPayload(payload, store, LEGACY);

    expect(payload.photos[0].url).toContain(`${ACCOUNT}/private/pets/o/1.png?`);
    expect(payload.photos[0].path).toBe('pets/o/1.png');
    expect(payload.fatherInfo.photos[0]).toBe(`${ACCOUNT}/public/blog/c.jpg`);
    expect(payload.name).toBe('Max');
    expect(payload.createdAt).toEqual({ _seconds: 1, _nanoseconds: 0 });
  });

  it('survives self-referencing objects', () => {
    const { store } = makeStore();
    const node: any = { a: 'x' };
    node.self = node;
    expect(() => resolveUrlsInPayload(node, store, LEGACY)).not.toThrow();
  });
});

describe('hasStoredUrl', () => {
  it('is false for a payload without file links, so no key is fetched', () => {
    const { store } = makeStore();
    expect(hasStoredUrl({ list: [{ title: 'tip', link: 'https://petfolioo.com' }] }, store, LEGACY)).toBe(false);
  });

  it('finds a legacy URL deep in an array', () => {
    const { store } = makeStore();
    expect(hasStoredUrl([{ p: { u: `https://storage.googleapis.com/${LEGACY}/x` } }], store, LEGACY)).toBe(true);
  });
});
