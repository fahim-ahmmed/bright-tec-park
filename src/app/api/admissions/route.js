import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAuth } from '@/lib/auth';
import { COURSES_DATA } from '@/data/mockData';

export const runtime = 'nodejs';

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const BN = '০১২৩৪৫৬৭৮৯';
const normalizePhone = (p) => clean(p, 30).replace(/[০-৯]/g, (d) => BN.indexOf(d)).replace(/[\s-]/g, '');

async function sessionOrNull(req) {
  try { return await getAuth().api.getSession({ headers: req.headers }); } catch { return null; }
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const fullName = clean(body.fullName, 100);
  const phone = normalizePhone(body.phone);
  const email = clean(body.email, 120);
  const course = COURSES_DATA.find((c) => c.id === body.courseId);

  if (fullName.length < 2) return NextResponse.json({ error: 'অনুগ্রহ করে শিক্ষার্থীর নাম দিন।' }, { status: 400 });
  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) return NextResponse.json({ error: 'সঠিক মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)।' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'সঠিক ইমেইল দিন।' }, { status: 400 });
  if (!course) return NextResponse.json({ error: 'কোর্স নির্বাচন করুন।' }, { status: 400 });

  const coupon = clean(body.couponCode, 20).toUpperCase();
  const token = 'BCTI-ADM-' + Math.floor(10000 + Math.random() * 90000);
  const session = await sessionOrNull(req);

  // Fee is recomputed on the server; the client value is never trusted.
  const payableFee = coupon === 'HSC50' ? Math.round(course.fee * 0.5) : course.discountFee || course.fee;

  try {
    const db = getDb();
    const doc = {
      token, fullName, phone, email,
      courseId: course.id, courseName: course.titleBn,
      education: clean(body.education, 40), shift: clean(body.shift, 20), address: clean(body.address, 200),
      couponCode: coupon === 'HSC50' ? 'HSC50' : '', payableFee,
      batch: '২০২৬ সেশন', status: 'pending',
      userId: session?.user?.id || null,
      createdAt: new Date().toISOString(),
    };
    const r = await db.collection('admissions').insertOne(doc);
    return NextResponse.json({ success: true, id: String(r.insertedId), token, payableFee });
  } catch (err) {
    console.error('admission insert failed:', err);
    return NextResponse.json({ error: 'সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে ০১৭৮২-৮২৪৫৮২ নম্বরে যোগাযোগ করুন।' }, { status: 500 });
  }
}

export async function GET(req) {
  const session = await sessionOrNull(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await getDb().collection('admissions').find({ userId: session.user.id }, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ admissions: rows });
}
