import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAuth } from '@/lib/auth';
import { COURSES_DATA, NOTICES_DATA } from '@/data/mockData';
import { profileCompleteness } from '@/lib/profile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NOTICE_EN = {
  n1: 'New session (April–June 2026) admission is open. Limited seats.',
  n2: 'A special 50% waiver on ICT and Spoken English batches for HSC candidates is starting soon.',
  n3: 'BTEB January–June session board exam routine has been published.',
  n4: 'Regular classes continue at our Singer Mor campus, 1st floor, Janata Bank Building.',
};

async function getSession(req) {
  try { return await getAuth().api.getSession({ headers: req.headers }); } catch { return null; }
}

export async function GET(req) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const userId = session.user.id;
  const email = session.user.email;

  try {
    // ---- admissions / enrolment ----
    const admissionQuery = email ? { $or: [{ userId }, { email }] } : { userId };
    const rawAdmissions = await db.collection('admissions').find(admissionQuery, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(20).toArray();
    const tokens = rawAdmissions.map((a) => a.token);

    // ---- payments ----
    const payments = await db
      .collection('payments')
      .find({ $or: [{ userId }, { admissionToken: { $in: tokens } }] }, { projection: { _id: 0 } })
      .sort({ paidAt: -1 })
      .limit(100)
      .toArray();

    const admissions = rawAdmissions.map((a) => {
      const course = COURSES_DATA.find((c) => c.id === a.courseId);
      const total = course?.modules.length || 0;
      const done = Array.isArray(a.completedModules) ? a.completedModules.filter((i) => Number.isInteger(i) && i >= 0 && i < total) : [];
      const percent = Number.isFinite(a.progressPercent)
        ? Math.max(0, Math.min(100, Math.round(a.progressPercent)))
        : total ? Math.round((done.length / total) * 100) : 0;

      const base = course?.fee ?? a.payableFee ?? 0;
      const payable = a.payableFee ?? course?.discountFee ?? course?.fee ?? 0;
      const paid = payments.filter((p) => p.admissionToken === a.token).reduce((s, p) => s + (Number(p.amount) || 0), 0);

      return {
        ...a,
        completedModules: done,
        percent,
        fee: { base, payable, discount: Math.max(0, base - payable), paid, due: Math.max(0, payable - paid) },
      };
    });

    // ---- notices (DB first, built-in fallback) ----
    let notices = await db
      .collection('notices')
      .find({ active: { $ne: false } }, { projection: { _id: 0 } })
      .sort({ date: -1 })
      .limit(30)
      .toArray();
    if (!notices.length) {
      notices = NOTICES_DATA.map((n) => ({ id: n.id, titleBn: n.titleBn, titleEn: NOTICE_EN[n.id] || n.titleBn, category: n.category, isUrgent: !!n.isUrgent, date: n.date }));
    }

    // ---- certificates / marksheets linked to this student ----
    const certOr = [{ userId }];
    if (email) certOr.push({ studentEmail: email }, { email });
    const certificates = await db.collection('certificates').find({ $or: certOr }, { projection: { _id: 0 } }).limit(20).toArray();

    // ---- profile ----
    const profile = await db.collection('student_profiles').findOne({ userId }, { projection: { _id: 0 } });

    return NextResponse.json({
      admissions,
      payments,
      notices,
      certificates,
      profile: profile ? { fullName: profile.fullName, photo: profile.photo || '' } : null,
      completeness: profileCompleteness(profile),
    });
  } catch (err) {
    console.error('student overview failed:', err);
    return NextResponse.json({ error: 'ডেটা লোড করা যায়নি।' }, { status: 500 });
  }
}