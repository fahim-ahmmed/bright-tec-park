// Shared by /api/profile and /api/student/overview.
// Everything is stored in the `student_profiles` collection (one document per user) so a future admin panel can read it.

export const BOARDS = ['ঢাকা', 'রাজশাহী', 'কুমিল্লা', 'যশোর', 'চট্টগ্রাম', 'বরিশাল', 'সিলেট', 'দিনাজপুর', 'ময়মনসিংহ', 'মাদ্রাসা', 'কারিগরি'];

const BN = '০১২৩৪৫৬৭৮৯';
const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const en = (v, max = 200) => clean(v, max).replace(/[০-৯]/g, (d) => BN.indexOf(d));
const thisYear = () => new Date().getFullYear();

const year = (v) => {
  const y = en(v, 4).replace(/\D/g, '');
  const n = Number(y);
  return y.length === 4 && n >= 1980 && n <= thisYear() + 1 ? y : '';
};
const board = (v) => (BOARDS.includes(clean(v, 30)) ? clean(v, 30) : '');

const edu = (b) => {
  const x = b || {};
  return {
    institute: clean(x.institute, 120),
    board: board(x.board),
    group: clean(x.group, 30),
    year: year(x.year),
    roll: en(x.roll, 20),
    reg: en(x.reg, 20),
    gpa: en(x.gpa, 10),
  };
};

export const EMPTY_PROFILE = {
  fullName: '',
  phone: '',
  presentAddress: '',
  permanentAddress: '',
  photo: '',
  ssc: edu({}),
  hsc: edu({}),
  others: [],
};

export function cleanProfile(body) {
  const b = body || {};
  const fullName = clean(b.fullName, 100);
  if (fullName.length < 2) return { error: 'পূর্ণ নাম দিন।' };

  const phone = en(b.phone, 30).replace(/[\s-]/g, '');
  if (phone && !/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) return { error: 'সঠিক মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)।' };

  const others = (Array.isArray(b.others) ? b.others : [])
    .slice(0, 5)
    .map((o) => ({ level: clean(o?.level, 40), institute: clean(o?.institute, 120), year: year(o?.year), result: clean(o?.result, 30) }))
    .filter((o) => o.level || o.institute);

  const doc = {
    fullName,
    phone,
    presentAddress: clean(b.presentAddress, 250),
    permanentAddress: clean(b.permanentAddress, 250),
    ssc: edu(b.ssc),
    hsc: edu(b.hsc),
    others,
  };

  // photo: undefined = keep the old one, '' = remove, data URL = replace
  if (b.photo !== undefined) {
    const p = String(b.photo || '');
    if (p && !(p.startsWith('data:image/') && p.length < 250000)) return { error: 'ছবিটি সঠিক নয় অথবা অনেক বড়।' };
    doc.photo = p;
  }
  return { doc };
}

export function profileCompleteness(p) {
  if (!p) return 0;
  const checks = [p.photo, p.fullName, p.phone, p.presentAddress, p.permanentAddress, p.ssc?.year, p.ssc?.gpa, p.hsc?.year, p.hsc?.gpa, p.hsc?.institute];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}