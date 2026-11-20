import { FastifyInstance } from 'fastify';
import { env } from '../config/env';
import { READ_LINK_MINUTES } from './azure-store';
import { isPublicPath } from './object-store';

/** The parts of AzureObjectStore the resolver needs. */
export interface LinkSigner {
  accountUrl: string;
  publicContainerName: string;
  privateContainerName: string;
  ensureSigningKey(): Promise<void>;
  signedUrlSync(path: string, minutes: number): string;
  publicUrl(path: string): string;
}

/**
 * Turns a stored file URL into one the client can open now: a fresh SAS link
 * for private files, the public container URL for public ones. Firestore keeps
 * the URLs written before the move (storage.googleapis.com) and links whose SAS
 * has expired, so both forms are recognised. Anything else is returned as is.
 */
export function resolveStoredUrl(value: string, signer: LinkSigner, legacyBucket: string): string {
  const legacyPrefix = `https://storage.googleapis.com/${legacyBucket}/`;
  let path: string | undefined;

  if (value.startsWith(legacyPrefix)) {
    path = decodePath(value.slice(legacyPrefix.length).split('?')[0]);
  } else if (value.startsWith(`${signer.accountUrl}/`)) {
    const rest = value.slice(signer.accountUrl.length + 1).split('?')[0];
    const slash = rest.indexOf('/');
    if (slash < 0) return value;
    const container = rest.slice(0, slash);
    if (container !== signer.privateContainerName && container !== signer.publicContainerName) return value;
    path = decodePath(rest.slice(slash + 1));
  } else {
    return value;
  }

  if (!path) return value;
  return isPublicPath(path) ? signer.publicUrl(path) : signer.signedUrlSync(path, READ_LINK_MINUTES);
}

function decodePath(path: string): string | undefined {
  try {
    return path.split('/').map(decodeURIComponent).join('/');
  } catch {
    return undefined;
  }
}

/** Calls fn on every string field of a payload; returning a string replaces the field. */
function eachString(payload: unknown, fn: (value: string) => string | void): void {
  const seen = new WeakSet<object>();
  const visit = (node: any): void => {
    if (!node || typeof node !== 'object' || seen.has(node)) return;
    seen.add(node);
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (typeof value === 'string') {
        const next = fn(value);
        if (typeof next === 'string') node[key] = next;
      } else if (value && typeof value === 'object') {
        visit(value);
      }
    }
  };
  visit(payload);
}

/** Rewrites every file URL inside a response payload, in place. */
export function resolveUrlsInPayload(payload: unknown, signer: LinkSigner, legacyBucket: string): void {
  eachString(payload, (value) => (value.startsWith('https://') ? resolveStoredUrl(value, signer, legacyBucket) : undefined));
}

export function hasStoredUrl(payload: unknown, signer: LinkSigner, legacyBucket: string): boolean {
  const prefixes = [`https://storage.googleapis.com/${legacyBucket}/`, `${signer.accountUrl}/`];
  let found = false;
  eachString(payload, (value) => {
    if (!found && prefixes.some((prefix) => value.startsWith(prefix))) found = true;
  });
  return found;
}

/**
 * On Azure, re-signs file links in every JSON response just before it is
 * sent. Responses without file links never touch the storage account.
 */
export function registerUrlResolver(app: FastifyInstance, signer: LinkSigner): void {
  const legacyBucket = env.LEGACY_GCS_BUCKET;
  app.addHook('preSerialization', async (_request, _reply, payload) => {
    if (!payload || typeof payload !== 'object' || !hasStoredUrl(payload, signer, legacyBucket)) return payload;
    await signer.ensureSigningKey();
    resolveUrlsInPayload(payload, signer, legacyBucket);
    return payload;
  });
}
