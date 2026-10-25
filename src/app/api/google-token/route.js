import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const res = await auth.api.getAccessToken({ body: { providerId: 'google' }, headers: req.headers });
    if (!res?.accessToken) return NextResponse.json({ error: 'no_google_account' }, { status: 404 });
    return NextResponse.json({ accessToken: res.accessToken });
  } catch {
    return NextResponse.json({ error: 'no_google_account' }, { status: 404 });
  }
}
