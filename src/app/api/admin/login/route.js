import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminConfigured, adminCookieOptions, checkAdminCredentials, createAdminToken } from '@/lib/admin-auth';

export const runtime = 'nodejs';

// Simple brute-force guard (per server instance).
const attempts = new Map();
const WINDOW = 15 * 60 * 1000;
const MAX = 6;

export async function POST(req) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: 'অ্যাডমিন কনফিগার করা নেই। .env.local-এ ADMIN_EMAIL ও ADMIN_PASSWORD সেট করে সার্ভার রিস্টার্ট করুন।' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.reset > now && rec.n >= MAX) {
    return NextResponse.json({ error: 'অনেকবার ভুল চেষ্টা হয়েছে। ১৫ মিনিট পরে আবার চেষ্টা করুন।' }, { status: 429 });
  }

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!checkAdminCredentials(body.email, body.password)) {
    attempts.set(ip, { n: rec && rec.reset > now ? rec.n + 1 : 1, reset: rec && rec.reset > now ? rec.reset : now + WINDOW });
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।' }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, createAdminToken(String(body.email).trim().toLowerCase()), adminCookieOptions);
  return res;
}