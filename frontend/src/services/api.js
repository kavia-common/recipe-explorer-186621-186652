/**
 * Simple API client for recipes.
 * Uses REACT_APP_API_BASE || REACT_APP_BACKEND_URL as base. Falls back to mock service if not available.
 */

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

const hasApiBase = Boolean(API_BASE);

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the configured API base URL or empty string if none. */
  return API_BASE;
}

// PUBLIC_INTERFACE
export async function getRecipes({ q = '', page = 1, limit = 12 } = {}) {
  /**
   * Fetch list of recipes.
   * Falls back to mock service on network failure or when no API base configured.
   */
  if (!hasApiBase) {
    const { mockGetRecipes } = await import('./mock');
    return mockGetRecipes({ q, page, limit });
  }

  const url = new URL('/recipes', API_BASE);
  if (q) url.searchParams.set('q', q);
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);

  try {
    const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Expected shape: { items: [], total: number, page: number, limit: number }
    if (!data || !Array.isArray(data.items)) {
      throw new Error('Unexpected response shape');
    }
    return data;
  } catch (e) {
    console.warn('API failed, falling back to mock data:', e?.message);
    const { mockGetRecipes } = await import('./mock');
    return mockGetRecipes({ q, page, limit });
  }
}

// PUBLIC_INTERFACE
export async function getRecipeById(id) {
  /**
   * Fetch single recipe by ID.
   * Falls back to mock service on failure.
   */
  if (!hasApiBase) {
    const { mockGetRecipeById } = await import('./mock');
    return mockGetRecipeById(id);
  }

  const url = new URL(`/recipes/${encodeURIComponent(id)}`, API_BASE);
  try {
    const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('API failed, falling back to mock data:', e?.message);
    const { mockGetRecipeById } = await import('./mock');
    return mockGetRecipeById(id);
  }
}
