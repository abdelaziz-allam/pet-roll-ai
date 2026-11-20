import { Readable } from 'stream';
import { DefaultAzureCredential } from '@azure/identity';
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  SASProtocol,
  UserDelegationKey,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';
import { env } from '../config/env';
import { ObjectStore, isPublicPath } from './object-store';

/** How long a link handed to the app stays valid. */
export const READ_LINK_MINUTES = 60;

// The account has shared keys disabled, so SAS links are signed with a user
// delegation key obtained through the managed identity. One key is valid for
// up to 7 days; renewing at 6h keeps every issued link inside its lifetime.
const KEY_LIFETIME_MS = 6 * 60 * 60 * 1000;
const KEY_RENEW_MARGIN_MS = 2 * 60 * 60 * 1000;

export class AzureObjectStore implements ObjectStore {
  private readonly service: BlobServiceClient;
  private readonly publicContainer: ContainerClient;
  private readonly privateContainer: ContainerClient;
  private key?: UserDelegationKey;
  private keyExpiresAt = 0;

  constructor(service?: BlobServiceClient) {
    if (!service && !env.AZURE_STORAGE_ACCOUNT_URL) {
      throw new Error('AZURE_STORAGE_ACCOUNT_URL is required when STORAGE_PROVIDER=azure');
    }
    this.service = service ?? new BlobServiceClient(env.AZURE_STORAGE_ACCOUNT_URL!, new DefaultAzureCredential());
    this.publicContainer = this.service.getContainerClient(env.AZURE_PUBLIC_CONTAINER);
    this.privateContainer = this.service.getContainerClient(env.AZURE_PRIVATE_CONTAINER);
  }

  get accountUrl(): string {
    return this.service.url.replace(/\/$/, '');
  }

  get publicContainerName(): string {
    return this.publicContainer.containerName;
  }

  get privateContainerName(): string {
    return this.privateContainer.containerName;
  }

  private containerFor(path: string): ContainerClient {
    return isPublicPath(path) ? this.publicContainer : this.privateContainer;
  }

  async save(path: string, data: Buffer | Readable, contentType: string): Promise<string> {
    const blob = this.containerFor(path).getBlockBlobClient(path);
    const options = { blobHTTPHeaders: { blobContentType: contentType } };
    if (Buffer.isBuffer(data)) {
      await blob.uploadData(data, options);
    } else {
      await blob.uploadStream(data, undefined, undefined, options);
    }
    return isPublicPath(path) ? blob.url : this.signedUrl(path, READ_LINK_MINUTES);
  }

  async delete(path: string): Promise<void> {
    await this.containerFor(path).getBlobClient(path).deleteIfExists();
  }

  async deletePrefix(prefix: string): Promise<void> {
    const container = this.containerFor(prefix);
    for await (const item of container.listBlobsFlat({ prefix })) {
      await container.getBlobClient(item.name).deleteIfExists();
    }
  }

  async signedUrl(path: string, minutes: number): Promise<string> {
    await this.ensureSigningKey();
    return this.signedUrlSync(path, minutes);
  }

  /** Fetches or renews the delegation key; call before signedUrlSync. */
  async ensureSigningKey(): Promise<void> {
    if (this.key && Date.now() < this.keyExpiresAt - KEY_RENEW_MARGIN_MS) return;
    const startsOn = new Date(Date.now() - 5 * 60 * 1000);
    const expiresOn = new Date(Date.now() + KEY_LIFETIME_MS);
    this.key = await this.service.getUserDelegationKey(startsOn, expiresOn);
    this.keyExpiresAt = expiresOn.getTime();
  }

  /** Signs a read link for a private blob with the cached delegation key. */
  signedUrlSync(path: string, minutes: number): string {
    if (!this.key) throw new Error('ensureSigningKey() must run first');
    const blob = this.privateContainer.getBlobClient(path);
    const expiresOn = new Date(Math.min(Date.now() + minutes * 60 * 1000, this.keyExpiresAt));
    const sas = generateBlobSASQueryParameters(
      {
        containerName: this.privateContainer.containerName,
        blobName: path,
        permissions: BlobSASPermissions.parse('r'),
        startsOn: new Date(Date.now() - 5 * 60 * 1000),
        expiresOn,
        protocol: SASProtocol.Https,
      },
      this.key,
      this.service.accountName,
    ).toString();
    return `${blob.url}?${sas}`;
  }

  publicUrl(path: string): string {
    return this.publicContainer.getBlobClient(path).url;
  }
}
