import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const email = String(body.email || '').trim().toLowerCase().slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'সঠিক ইমেইল দিন।' }, { status: 400 });
  try {
    await getDb().collection('newsletter_subscribers').updateOne(
      { email },
      { $setOnInsert: { email, source: String(body.source || 'web').slice(0, 30), subscribedAt: new Date().toISOString() } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('newsletter failed:', err);
    return NextResponse.json({ error: 'সাবস্ক্রাইব করা যায়নি।' }, { status: 500 });
  }
}
