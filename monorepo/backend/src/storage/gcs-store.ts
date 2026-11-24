import { Readable } from 'stream';
import { storage } from '../config/firebase';
import { env } from '../config/env';
import { ObjectStore, isPublicPath } from './object-store';

export class GcsObjectStore implements ObjectStore {
  private bucket() {
    return storage.bucket(env.GCS_BUCKET);
  }

  async save(path: string, data: Buffer | Readable, contentType: string): Promise<string> {
    const file = this.bucket().file(path);
    if (Buffer.isBuffer(data)) {
      await file.save(data, { metadata: { contentType }, ...(isPublicPath(path) ? { public: true } : {}) });
    } else {
      const stream = file.createWriteStream({ metadata: { contentType }, resumable: false });
      await new Promise<void>((resolve, reject) => {
        data.pipe(stream);
        stream.on('error', reject);
        stream.on('finish', resolve);
      });
    }
    return `https://storage.googleapis.com/${env.GCS_BUCKET}/${path}`;
  }

  storedUrl(path: string): string {
    return `https://storage.googleapis.com/${env.GCS_BUCKET}/${path}`;
  }

  async delete(path: string): Promise<void> {
    try {
      await this.bucket().file(path).delete();
    } catch {
      // Already gone: deleting is idempotent.
    }
  }

  async deletePrefix(prefix: string): Promise<void> {
    await this.bucket().deleteFiles({ prefix });
  }

  async signedUrl(path: string, minutes: number): Promise<string> {
    const [url] = await this.bucket().file(path).getSignedUrl({
      action: 'read',
      expires: Date.now() + minutes * 60 * 1000,
    });
    return url;
  }
}
