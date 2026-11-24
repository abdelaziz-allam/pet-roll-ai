/**
 * Server-side settings read when the page renders, not when the image is
 * built, so one landing image can serve stage and prod. Bracket access keeps
 * Next.js from inlining the value at build time; the NEXT_PUBLIC_ build
 * argument stays as the fallback for images built per environment.
 */
export function apiUrl(): string {
  return process.env['API_URL'] || process.env.NEXT_PUBLIC_API_URL || 'https://api.petfolioo.com/api/v1';
}
