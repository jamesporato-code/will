// Proxy generique : tous les /api/admin-proxy/* sont forwardes vers
// le backend Railway en injectant le token x-admin-token (stocke dans le
// cookie httpOnly). Le client n'a jamais le token.

import { getAdminToken, BACKEND_URL } from '@/lib/admin-api';

async function handler(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const token = await getAdminToken();
  if (!token) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { path } = await ctx.params;
  const url = new URL(req.url);
  const targetPath = '/api/admin/' + path.join('/') + url.search;

  const init: RequestInit = {
    method: req.method,
    headers: {
      'x-admin-token': token,
    },
    cache: 'no-store',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const body = await req.text();
    if (body) {
      init.body = body;
      (init.headers as Record<string, string>)['Content-Type'] =
        req.headers.get('content-type') || 'application/json';
    }
  }

  try {
    const upstream = await fetch(BACKEND_URL + targetPath, init);
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/json',
      },
    });
  } catch (err) {
    return Response.json(
      {
        error: 'backend unreachable',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
