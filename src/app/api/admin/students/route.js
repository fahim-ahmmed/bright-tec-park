import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAdmin } from '@/lib/admin-auth';
import { escapeRe } from '@/lib/admin-resources';
import { profileCompleteness } from '@/lib/profile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const uid = (u) => (typeof u.id === 'string' && u.id ? u.id : String(u._id));

export async function GET(req) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDb();
  const sp = new URL(req.url).searchParams;
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);
  const limit = 20;
  const q = (sp.get('q') || '').trim().slice(0, 80);

  const query = q ? { $or: [{ name: { $regex: escapeRe(q), $options: 'i' } }, { email: { $regex: escapeRe(q), $options: 'i' } }] } : {};
  const [users, total] = await Promise.all([
    db.collection('user').find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    db.collection('user').countDocuments(query),
  ]);

  const ids = users.map(uid);
  const [profiles, adms] = await Promise.all([
    db.collection('student_profiles').find({ userId: { $in: ids } }).toArray(),
    db.collection('admissions').find({ userId: { $in: ids } }, { projection: { _id: 0, userId: 1, status: 1, courseName: 1, createdAt: 1 } }).sort({ createdAt: -1 }).toArray(),
  ]);

  const items = users.map((u) => {
    const id = uid(u);
    const p = profiles.find((x) => x.userId === id);
    const mine = adms.filter((a) => a.userId === id);
    return {
      id, name: p?.fullName || u.name, email: u.email, createdAt: u.createdAt,
      phone: p?.phone || '', completeness: profileCompleteness(p),
      admissions: mine.length, latestCourse: mine[0]?.courseName || '', latestStatus: mine[0]?.status || '',
      hsc: p?.hsc?.institute ? `${p.hsc.institute}${p.hsc.gpa ? ` · GPA ${p.hsc.gpa}` : ''}` : '',
    };
  });

  return NextResponse.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
}