import { storage } from '../config/firebase.js';
import { env } from '../config/env.js';
import { randomUUID } from 'crypto';

const bucket = storage.bucket(env.GCS_BUCKET);

export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
}

export interface UploadOptions {
  ownerId?: string;
}

export async function uploadImage(
  buffer: Buffer,
  destination: string,
  contentType: string,
  options?: UploadOptions
): Promise<UploadResult> {
  const fileName = `${randomUUID()}.${getExtension(contentType)}`;
  const filePath = `${destination}/${fileName}`;
  const file = bucket.file(filePath);

  const metadata: Record<string, string> = {};
  if (options?.ownerId) {
    metadata.ownerId = options.ownerId;
  }

  await file.save(buffer, {
    metadata: {
      contentType,
      metadata,
    },
  });

  const url = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

  return { url, path: filePath, fileName };
}

export async function deleteFile(path: string): Promise<void> {
  try {
    await bucket.file(path).delete();
  } catch {
    // File may not exist, ignore
  }
}

export async function deleteFolder(prefix: string): Promise<void> {
  const [files] = await bucket.getFiles({ prefix });
  await Promise.all(files.map((file) => file.delete()));
}

export async function getSignedUrl(path: string, expiresInHours = 24): Promise<string> {
  const file = bucket.file(path);
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + expiresInHours * 60 * 60 * 1000,
  });
  return url;
}

function getExtension(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  return map[contentType] || 'jpg';
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
