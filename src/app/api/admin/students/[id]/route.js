import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAdmin } from '@/lib/admin-auth';
import { toId } from '@/lib/admin-resources';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const db = getDb();
  const users = db.collection('user');

  let user = null;
  const oid = toId(id);
  if (oid) user = await users.findOne({ _id: oid });
  if (!user) user = await users.findOne({ id });
  if (!user) return NextResponse.json({ error: 'শিক্ষার্থী পাওয়া যায়নি।' }, { status: 404 });

  const strip = ({ _id, ...r }) => r;
  const email = user.email;

  const profile = await db.collection('student_profiles').findOne({ userId: id }, { projection: { _id: 0 } });
  const admissions = (await db.collection('admissions').find(email ? { $or: [{ userId: id }, { email }] } : { userId: id }).sort({ createdAt: -1 }).toArray()).map(strip);
  const tokens = admissions.map((a) => a.token);
  const payments = (await db.collection('payments').find({ $or: [{ userId: id }, { admissionToken: { $in: tokens } }] }).sort({ paidAt: -1 }).toArray()).map(strip);
  const homework = (await db.collection('homework').find({ userId: id }).sort({ createdAt: -1 }).limit(30).toArray()).map(strip);

  return NextResponse.json({
    user: { id, name: user.name, email, createdAt: user.createdAt, emailVerified: !!user.emailVerified, image: user.image || null },
    profile, admissions, payments, homework,
  });
}