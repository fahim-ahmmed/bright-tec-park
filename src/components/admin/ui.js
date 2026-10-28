export const money = (n) => `৳${Number(n || 0).toLocaleString('bn-BD')}`;

export const fmtDate = (v) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' });
};

const TONES = {
  slate: 'border-slate-600 bg-slate-800 text-slate-300',
  green: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  blue: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  red: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  gold: 'border-gold-400/30 bg-gold-400/10 text-gold-300',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
};

export function Badge({ tone = 'slate', children }) {
  return <span className={`inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] font-bold ${TONES[tone] || TONES.slate}`}>{children}</span>;
}

export const ADMISSION_STATUS = {
  pending: ['অপেক্ষমাণ', 'amber'],
  verified: ['যাচাইকৃত', 'blue'],
  enrolled: ['এনরোলড', 'green'],
  cancelled: ['বাতিল', 'red'],
};
export const HW_STATUS = {
  submitted: ['জমা হয়েছে', 'blue'],
  reviewed: ['রিভিউ হয়েছে', 'green'],
  revision: ['সংশোধন দরকার', 'amber'],
};
export const NOTICE_CATS = {
  General: 'সাধারণ', Closure: 'ক্লাস/ল্যাব বন্ধ', Holiday: 'ছুটি', Exam: 'পরীক্ষা', Admission: 'ভর্তি', Scholarship: 'স্কলারশিপ', Event: 'ক্যাম্পাস',
};

export function StatusBadge({ map, value }) {
  const [label, tone] = map[value] || map[Object.keys(map)[0]] || [value, 'slate'];
  return <Badge tone={tone}>{label}</Badge>;
}