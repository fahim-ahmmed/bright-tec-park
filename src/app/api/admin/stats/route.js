
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getAdmin } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!(await getAdmin())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDb();

    const [
      admTotal,
      pending,
      enrolled,
      students,
      activeNotices,
      hwPending,
      certs,
      subs,
    ] = await Promise.all([
      db.collection('admissions').countDocuments({}),
      db.collection('admissions').countDocuments({ status: 'pending' }),
      db.collection('admissions').countDocuments({ status: 'enrolled' }),
      db.collection('user').countDocuments({}),
      db.collection('notices').countDocuments({
        active: { $ne: false },
      }),
      db.collection('homework').countDocuments({
        $or: [
          { status: 'submitted' },
          { status: { $exists: false } },
        ],
      }),
      db.collection('certificates').countDocuments({}),
      db.collection('newsletter_subscribers').countDocuments({}),
    ]);

    const admissions = await db
      .collection('admissions')
      .find(
        {},
        {
          projection: {
            _id: 0,
            token: 1,
            createdAt: 1,
            status: 1,
            payableFee: 1,
            fullName: 1,
            courseName: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .limit(5000)
      .toArray();

    const payments = await db
      .collection('payments')
      .find(
        {},
        {
          projection: {
            _id: 0,
            amount: 1,
            paidAt: 1,
            admissionToken: 1,
          },
        }
      )
      .limit(5000)
      .toArray();

    const now = new Date();

    const getMonthKey = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (5 - index),
        1
      );

      return {
        key: getMonthKey(date),
        label: date.toLocaleDateString('bn-BD', {
          month: 'short',
        }),
        admissions: 0,
        revenue: 0,
      };
    });

    const monthsByKey = Object.fromEntries(
      months.map((month) => [month.key, month])
    );

    const toDate = (value) => {
      if (!value) return null;

      const date = value instanceof Date ? value : new Date(value);

      return Number.isNaN(date.getTime()) ? null : date;
    };

    admissions.forEach((admission) => {
      const date = toDate(admission.createdAt);
      if (!date) return;

      const month = monthsByKey[getMonthKey(date)];
      if (month) month.admissions += 1;
    });

    payments.forEach((payment) => {
      const date = toDate(payment.paidAt);
      if (!date) return;

      const month = monthsByKey[getMonthKey(date)];

      if (month) {
        month.revenue += Number(payment.amount) || 0;
      }
    });

    const revenue = payments.reduce(
      (sum, payment) => sum + (Number(payment.amount) || 0),
      0
    );

    const activeAdmissions = admissions.filter(
      (admission) =>
        admission.status === 'enrolled' ||
        admission.status === 'verified'
    );

    const activeTokens = new Set(
      activeAdmissions.map((admission) => admission.token)
    );

    const expected = activeAdmissions.reduce(
      (sum, admission) => sum + (Number(admission.payableFee) || 0),
      0
    );

    const collected = payments
      .filter((payment) => activeTokens.has(payment.admissionToken))
      .reduce(
        (sum, payment) => sum + (Number(payment.amount) || 0),
        0
      );

    return NextResponse.json({
      counts: {
        admTotal,
        pending,
        enrolled,
        students,
        activeNotices,
        hwPending,
        certs,
        subs,
      },
      revenue,
      due: Math.max(0, expected - collected),
      months,
      recent: admissions.slice(0, 6),
    });
  } catch (error) {
    // Keep database credentials and internal details out of API responses.
    console.error('Admin stats API error:', error);

    return NextResponse.json(
      { error: 'Unable to load admin statistics. Check server logs.' },
      { status: 500 }
    );
  }
}
