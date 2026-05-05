// Proxy server-side : la page admin a un cookie httpOnly avec le token,
// elle appelle ce proxy qui injecte le token et tape Railway. Le client ne
// voit jamais le token.

import { NextResponse } from 'next/server';
import { adminFetch } from '@/lib/admin-api';

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const result = await adminFetch<{
    success: boolean;
    type?: string;
    day?: number;
    error?: string;
  }>(`/api/admin/trigger-daily/${userId}`, { method: 'POST' });
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: result.status || 500 }
    );
  }
  return NextResponse.json(result.data);
}
