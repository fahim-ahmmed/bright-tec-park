import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { runFirecrawlAgent } from '@/server/firecrawlService';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req) {
  let session = null;
  try { session = await getAuth().api.getSession({ headers: req.headers }); } catch {}
  if (!session) return NextResponse.json({ success: false, error: 'লগইন করুন।' }, { status: 401 });
  // Optional: restrict to staff. Set ADMIN_EMAILS="a@x.com,b@y.com" to enable.
  const admins = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (admins.length && !admins.includes(String(session.user.email).toLowerCase())) return NextResponse.json({ success: false, error: 'অনুমতি নেই।' }, { status: 403 });
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }
  const result = await runFirecrawlAgent({
    prompt: String(b.prompt || '').slice(0, 1000),
    urls: b.url ? [String(b.url)] : Array.isArray(b.urls) ? b.urls.slice(0, 3).map(String) : undefined,
    schema: b.schema, model: b.model, maxCredits: Math.min(Number(b.maxCredits) || 50, 200),
  });
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
