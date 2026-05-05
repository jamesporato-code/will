// Wrapper server-side pour appeler l'API admin du backend Railway.
// Le token reste cote serveur (cookie httpOnly), jamais expose au client.

import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'will_admin_token';
const BACKEND_URL =
  process.env.WILL_BACKEND_URL ||
  'https://will-backend-production.up.railway.app';

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value ?? null;
}

export async function adminFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  const token = await getAdminToken();
  if (!token) return { ok: false, status: 401, error: 'no token' };

  try {
    const res = await fetch(BACKEND_URL + path, {
      ...init,
      headers: {
        'x-admin-token': token,
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init?.headers || {}),
      },
      // Toujours frais — c'est un backoffice
      cache: 'no-store',
    });
    if (!res.ok) {
      return { ok: false, status: res.status, error: await res.text() };
    }
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : 'fetch failed',
    };
  }
}

export { ADMIN_COOKIE_NAME, BACKEND_URL };
