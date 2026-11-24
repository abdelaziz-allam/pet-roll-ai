declare global {
  interface Window {
    __PETFOLIOO_CONFIG__?: { apiUrl?: string };
  }
}

/**
 * API base URL. The container writes /config.js at start-up from its API_URL
 * setting, so the same build serves stage and prod; the build-time value
 * remains the fallback for images built per environment.
 */
export const API_BASE: string =
  window.__PETFOLIOO_CONFIG__?.apiUrl || import.meta.env.VITE_API_URL || '/api/v1';
