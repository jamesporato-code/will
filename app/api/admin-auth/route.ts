// Endpoint d'auth pour le backoffice : POST pose un cookie, DELETE le retire.
// Le cookie est httpOnly → jamais accessible cote client.

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/admin-api';

const ADMIN_COOKIE_NAME = 'will_admin_token';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { token?: string };
  const token = (body.token || '').trim();
  if (!token) {
    return NextResponse.json({ error: 'token requis' }, { status: 400 });
  }

  // Valide le token contre le backend (n'importe quel endpoint admin protege)
  try {
    const res = await fetch(BACKEND_URL + '/api/admin/stats', {
      headers: { 'x-admin-token': token },
      cache: 'no-store',
    });
    if (res.status === 401) {
      return NextResponse.json({ error: 'token invalide' }, { status: 401 });
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: 'backend renvoie ' + res.status },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json({ error: 'backend injoignable' }, { status: 502 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
