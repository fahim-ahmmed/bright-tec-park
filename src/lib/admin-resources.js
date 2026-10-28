import { ObjectId } from 'mongodb';
import { COURSES_DATA } from '@/data/mockData';

const BN = '০১২৩৪৫৬৭৮৯';
export const clean = (v, n = 200) => String(v ?? '').trim().slice(0, n);
const toNum = (v) => {
  const s = clean(v, 20).replace(/[০-৯]/g, (d) => BN.indexOf(d)).replace(/,/g, '');
  return s === '' ? NaN : Number(s);
};
const today = () => new Date().toISOString().slice(0, 10);
const isDate = (v) => /^\d{4}-\d{2}-\d{2}/.test(String(v || ''));
const bool = (v) => v === true || v === 'true' || v === 1 || v === '1';
const normalizePhone = (p) => clean(p, 30).replace(/[০-৯]/g, (d) => BN.indexOf(d)).replace(/[\s-]/g, '');
const PHONE_RE = /^(?:\+?88)?01[3-9]\d{8}$/;

export const toId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);
export const escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ---------------- admissions ---------------- */
const ADMISSION_STATUS = ['pending', 'verified', 'enrolled', 'cancelled'];

const admissions = {
  collection: 'admissions',
  sort: { createdAt: -1 },
  search: ['token', 'fullName', 'phone', 'email', 'courseName'],
  filterField: 'status',
  remove: true,

  // walk-in student added by office staff
  async create(b) {
    const fullName = clean(b.fullName, 100);
    const phone = normalizePhone(b.phone);
    const course = COURSES_DATA.find((c) => c.id === b.courseId);
    if (fullName.length < 2) return { error: 'শিক্ষার্থীর নাম দিন।' };
    if (!PHONE_RE.test(phone)) return { error: 'সঠিক মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)।' };
    if (!course) return { error: 'কোর্স নির্বাচন করুন।' };
    const fee = toNum(b.payableFee);
    return {
      doc: {
        token: 'BCTI-ADM-' + Math.floor(10000 + Math.random() * 90000),
        fullName, phone, email: clean(b.email, 120),
        courseId: course.id, courseName: course.titleBn,
        education: clean(b.education, 40), shift: clean(b.shift, 20), address: clean(b.address, 200),
        couponCode: '', payableFee: fee >= 0 ? Math.round(fee) : course.discountFee || course.fee,
        batch: clean(b.batch, 60) || '২০২৬ সেশন',
        status: ADMISSION_STATUS.includes(b.status) ? b.status : 'pending',
        userId: null, source: 'admin',
      },
    };
  },

  async update(b) {
    const doc = {};
    const unset = [];
    if ('status' in b) {
      if (!ADMISSION_STATUS.includes(b.status)) return { error: 'অবৈধ স্ট্যাটাস।' };
      doc.status = b.status;
    }
    if ('fullName' in b) {
      const v = clean(b.fullName, 100);
      if (v.length < 2) return { error: 'শিক্ষার্থীর নাম দিন।' };
      doc.fullName = v;
    }
    if ('phone' in b) {
      const p = normalizePhone(b.phone);
      if (!PHONE_RE.test(p)) return { error: 'সঠিক মোবাইল নম্বর দিন।' };
      doc.phone = p;
    }
    for (const [k, n] of [['email', 120], ['batch', 60], ['shift', 20], ['education', 40], ['address', 200]]) {
      if (k in b) doc[k] = clean(b[k], n);
    }
    if ('payableFee' in b) {
      const n = toNum(b.payableFee);
      if (!(n >= 0)) return { error: 'সঠিক ফি দিন।' };
      doc.payableFee = Math.round(n);
    }
    if ('progressPercent' in b) {
      if (b.progressPercent === '' || b.progressPercent === null) unset.push('progressPercent');
      else {
        const n = toNum(b.progressPercent);
        if (!(n >= 0 && n <= 100)) return { error: 'প্রোগ্রেস ০ থেকে ১০০ এর মধ্যে হতে হবে।' };
        doc.progressPercent = Math.round(n);
      }
    }
    if ('completedModules' in b) {
      doc.completedModules = Array.isArray(b.completedModules)
        ? [...new Set(b.completedModules.map(Number).filter((i) => Number.isInteger(i) && i >= 0 && i < 50))].sort((x, y) => x - y)
        : [];
    }
    return { doc, unset };
  },
};

/* ---------------- payments ---------------- */
const paymentDoc = (b, adm) => {
  const amount = toNum(b.amount);
  if (!(amount > 0)) return { error: 'সঠিক টাকার পরিমাণ দিন।' };
  return {
    doc: {
      admissionToken: adm.token, userId: adm.userId || null, studentName: adm.fullName, courseName: adm.courseName,
      amount: Math.round(amount), method: clean(b.method, 30) || 'নগদ', trxId: clean(b.trxId, 60), note: clean(b.note, 200),
      paidAt: isDate(b.paidAt) ? String(b.paidAt).slice(0, 10) : today(),
    },
  };
};

const payments = {
  collection: 'payments',
  sort: { paidAt: -1, createdAt: -1 },
  search: ['admissionToken', 'studentName', 'trxId', 'method', 'note'],
  remove: true,
  async create(b, db) {
    const token = clean(b.admissionToken, 40);
    const adm = await db.collection('admissions').findOne({ token });
    if (!adm) return { error: 'এই টোকেনে কোনো ভর্তি আবেদন পাওয়া যায়নি।' };
    return paymentDoc(b, adm);
  },
  async update(b, db, existing) {
    const adm =
      (await db.collection('admissions').findOne({ token: existing.admissionToken })) ||
      { token: existing.admissionToken, userId: existing.userId, fullName: existing.studentName, courseName: existing.courseName };
    return paymentDoc(b, adm);
  },
};

/* ---------------- notices ---------------- */
const NOTICE_CATS = ['General', 'Closure', 'Holiday', 'Exam', 'Admission', 'Scholarship', 'Event'];
const noticeDoc = (b) => {
  const titleBn = clean(b.titleBn, 300);
  if (titleBn.length < 3) return { error: 'নোটিশের শিরোনাম (বাংলা) দিন।' };
  return {
    doc: {
      titleBn, titleEn: clean(b.titleEn, 300), bodyBn: clean(b.bodyBn, 1500), bodyEn: clean(b.bodyEn, 1500),
      category: NOTICE_CATS.includes(b.category) ? b.category : 'General',
      isUrgent: bool(b.isUrgent), active: b.active === undefined ? true : bool(b.active),
      date: isDate(b.date) ? String(b.date).slice(0, 10) : today(),
    },
  };
};
const notices = {
  collection: 'notices',
  sort: { date: -1, createdAt: -1 },
  search: ['titleBn', 'titleEn'],
  remove: true,
  async create(b) {
    const r = noticeDoc(b);
    if (r.doc) r.doc.id = 'n-' + Date.now();
    return r;
  },
  async update(b) { return noticeDoc(b); },
};

/* ---------------- homework ---------------- */
const HW_STATUS = ['submitted', 'reviewed', 'revision'];
const homework = {
  collection: 'homework',
  sort: { createdAt: -1 },
  search: ['title', 'studentName', 'studentEmail'],
  filterField: 'status',
  filterQuery: (v) => (v === 'submitted' ? { $or: [{ status: 'submitted' }, { status: { $exists: false } }] } : { status: v }),
  remove: true,
  async update(b) {
    if (!HW_STATUS.includes(b.status)) return { error: 'অবৈধ স্ট্যাটাস।' };
    const doc = { status: b.status, mentorNote: clean(b.mentorNote, 1000) };
    if (b.status === 'reviewed') doc.reviewedAt = new Date().toISOString();
    return { doc };
  },
};

/* ---------------- certificates ---------------- */
const certDoc = (b) => {
  const studentName = clean(b.studentName, 100);
  const courseNameBn = clean(b.courseNameBn, 200);
  if (studentName.length < 2) return { error: 'শিক্ষার্থীর নাম দিন।' };
  if (courseNameBn.length < 2) return { error: 'কোর্সের নাম (বাংলা) দিন।' };
  return {
    doc: {
      studentName, fatherName: clean(b.fatherName, 100), courseNameBn, courseNameEn: clean(b.courseNameEn, 200),
      btebRoll: clean(b.btebRoll, 30), regNo: clean(b.regNo, 30), session: clean(b.session, 60),
      grade: clean(b.grade, 10), cgpa: clean(b.cgpa, 30), issueDate: clean(b.issueDate, 40),
      studentEmail: clean(b.studentEmail, 120).toLowerCase(), status: 'Verified', instituteCode: '27117',
    },
  };
};
const certificates = {
  collection: 'certificates',
  sort: { createdAt: -1 },
  search: ['certificateId', 'studentName', 'regNo', 'btebRoll', 'studentEmail'],
  remove: true,
  async create(b, db) {
    const certificateId = clean(b.certificateId, 40).toUpperCase();
    if (certificateId.length < 3) return { error: 'সার্টিফিকেট আইডি দিন (যেমন: BCTI-2026-010)।' };
    if (await db.collection('certificates').findOne({ certificateId })) return { error: 'এই আইডি আগে থেকেই আছে।' };
    const r = certDoc(b);
    if (r.doc) r.doc.certificateId = certificateId;
    return r;
  },
  async update(b) { return certDoc(b); },
};

/* ---------------- newsletter ---------------- */
const newsletter = {
  collection: 'newsletter_subscribers',
  sort: { subscribedAt: -1 },
  search: ['email', 'source'],
  remove: true,
};

export const RESOURCES = { admissions, payments, notices, homework, certificates, newsletter };