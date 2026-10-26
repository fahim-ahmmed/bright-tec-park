import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAuth } from '@/lib/auth';

export const runtime = 'nodejs';
const clean = (v, n) => String(v ?? '').trim().slice(0, n);

async function getSession(req) {
  try { return await getAuth().api.getSession({ headers: req.headers }); } catch { return null; }
}

// status values: submitted | reviewed | revision  (an admin/mentor panel will change these later)
export async function GET(req) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await getDb().collection('homework').find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50).toArray();
  const submissions = rows.map(({ _id, ...r }) => ({ id: String(_id), status: 'submitted', mentorNote: '', ...r }));
  return NextResponse.json({ submissions });
}

export async function POST(req) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const title = clean(body.title, 150);
  const notes = clean(body.notes, 1000);
  const link = clean(body.link, 500);
  if (title.length < 2) return NextResponse.json({ error: 'অ্যাসাইনমেন্টের নাম দিন।' }, { status: 400 });
  if (link && !/^https?:\/\//i.test(link)) return NextResponse.json({ error: 'লিংক http:// বা https:// দিয়ে শুরু হতে হবে।' }, { status: 400 });
  await getDb().collection('homework').insertOne({
    userId: session.user.id, studentName: session.user.name, studentEmail: session.user.email,
    courseId: clean(body.courseId, 60), title, notes, link,
    status: 'submitted', mentorNote: '',
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}