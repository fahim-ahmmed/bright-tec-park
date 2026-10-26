import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAuth } from '@/lib/auth';
import { cleanProfile, profileCompleteness, EMPTY_PROFILE } from '@/lib/profile';

export const runtime = 'nodejs';

async function getSession(req) {
  try { return await getAuth().api.getSession({ headers: req.headers }); } catch { return null; }
}

export async function GET(req) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const doc = await getDb().collection('student_profiles').findOne({ userId: session.user.id }, { projection: { _id: 0 } });
  const profile = { ...EMPTY_PROFILE, fullName: session.user.name || '', ...(doc || {}) };
  return NextResponse.json({ profile, completeness: profileCompleteness(profile) });
}

export async function PUT(req) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { doc, error } = cleanProfile(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const now = new Date().toISOString();
  try {
    await getDb().collection('student_profiles').updateOne(
      { userId: session.user.id },
      {
        $set: { ...doc, userId: session.user.id, loginEmail: session.user.email, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const saved = await getDb().collection('student_profiles').findOne({ userId: session.user.id }, { projection: { _id: 0 } });
    return NextResponse.json({ success: true, completeness: profileCompleteness(saved) });
  } catch (err) {
    console.error('profile save failed:', err);
    return NextResponse.json({ error: 'সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।' }, { status: 500 });
  }
}