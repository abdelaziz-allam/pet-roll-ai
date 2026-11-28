import { createHash } from 'crypto';

// No imports from config: the migration job uses these without the API's settings.

export type Provider = 'password' | 'google' | 'apple';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** auth_identities document id. Emails are hashed: Cosmos ids cannot hold every character an email can. */
export function identityId(provider: Provider, key: string): string {
  if (provider === 'password') return `password_${createHash('sha256').update(normalizeEmail(key)).digest('hex')}`;
  return `${provider}_${key}`;
}
