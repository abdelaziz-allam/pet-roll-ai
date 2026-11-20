import { Readable } from 'stream';
import { env } from '../config/env';
import { AzureObjectStore } from './azure-store';
import { GcsObjectStore } from './gcs-store';

/**
 * Where uploaded files live. GCS keeps today's behaviour (public
 * storage.googleapis.com URLs); Azure keeps everything except PUBLIC_PREFIXES
 * in a private container and hands out short-lived SAS links.
 */
export interface ObjectStore {
  /** Stores the file and returns a URL the caller can show right away. */
  save(path: string, data: Buffer | Readable, contentType: string): Promise<string>;
  delete(path: string): Promise<void>;
  deletePrefix(prefix: string): Promise<void>;
  signedUrl(path: string, minutes: number): Promise<string>;
}

/** Only these prefixes are readable without a signed link on Azure. */
export const PUBLIC_PREFIXES = ['blog/'];

export function isPublicPath(path: string): boolean {
  return PUBLIC_PREFIXES.some((prefix) => path.startsWith(prefix));
}

let store: ObjectStore | undefined;

export function objectStore(): ObjectStore {
  if (!store) {
    store = env.STORAGE_PROVIDER === 'azure' ? new AzureObjectStore() : new GcsObjectStore();
  }
  return store;
}
