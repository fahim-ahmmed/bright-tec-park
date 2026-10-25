'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useToaster } from '@gravity-ui/uikit';
import { CheckCircle2, Printer, ShieldCheck, Send } from 'lucide-react';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import BengalInstituteLogo from './BengalInstituteLogo';

const SHIFTS = [
  ['morning', 'সকাল (৯:০০টা - ১১:০০টা)'], ['noon', 'দুপুর (১১:০০টা - ১:০০টা)'], ['afternoon', 'বিকাল (৩:০০টা - ৫:০০টা)'],
  ['evening', 'সান্ধ্যকালীন (৬:০০টা - ৮:০০টা)'], ['weekend', 'শুক্র-শনিবার বিশেষ ব্যাচ'],
];
const EDU = [
  ['HSC Candidate', 'এইচএসসি পরীক্ষার্থী / শিক্ষার্থী'], ['SSC', 'এসএসসি পাস'], ['Honours/Degree', 'অনার্স / ডিগ্রি শিক্ষার্থী'],
  ['Job Holder', 'চাকরিজীবী / প্রফেশনাল'], ['Kids', 'স্কুল শিক্ষার্থী (কিডস)'],
];

export default function AdmissionForm() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const params = useSearchParams();
  const { add } = useToaster();

  const initialCourse = COURSES_DATA.some((c) => c.id === params.get('course')) ? params.get('course') : COURSES_DATA[0].id;
  const initialCoupon = (params.get('coupon') || '').toUpperCase();

  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', education: 'HSC Candidate', courseId: initialCourse,
    shift: 'morning', couponCode: initialCoupon, address: 'কুষ্টিয়া',
  });
  const [couponOk, setCouponOk] = useState(initialCoupon === 'HSC50');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const course = useMemo(() => COURSES_DATA.find((c) => c.id === form.courseId) || COURSES_DATA[0], [form.courseId]);
  const locale = isBn ? 'bn-BD' : 'en-US';
  const discount = couponOk ? 50 : course.discountFee ? 30 : 0;
  const payable = couponOk ? Math.round(course.fee * 0.5) : course.discountFee || course.fee;

  const applyCoupon = () => {
    const ok = form.couponCode.trim().toUpperCase() === 'HSC50';
    setCouponOk(ok);
    add({
      name: 'coupon', title: ok ? (isBn ? 'HSC50 কুপন কার্যকর হয়েছে' : 'HSC50 applied') : (isBn ? 'কুপন সঠিক নয়' : 'Invalid coupon'),
      content: ok ? (isBn ? '৫০% ছাড় প্রযোজ্য।' : '50% discount applied.') : (isBn ? 'সঠিক কোড দিন (যেমন: HSC50)।' : 'Enter a valid code (e.g. HSC50).'),
      theme: ok ? 'success' : 'danger', autoHiding: 3500,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, courseName: course.titleBn, couponCode: couponOk ? 'HSC50' : form.couponCode, payableFee: payable }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (isBn ? 'আবেদন জমা হয়নি।' : 'Submission failed.'));
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="text-center space-y-4">
        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40"><CheckCircle2 className="w-8 h-8" /></div>
        <h2 className="text-xl sm:text-2xl font-black text-white">{isBn ? 'অভিনন্দন! ভর্তি আবেদন গৃহীত হয়েছে' : 'Congratulations! Application Received'}</h2>
        <p className="text-xs text-slate-300">{isBn ? 'আপনার ভর্তি রেজিস্ট্রেশন সাময়িকভাবে সম্পন্ন হয়েছে। নিচে অ্যাডমিশন স্লিপ দেওয়া হলো।' : 'Your provisional registration is complete. Your admission slip is below.'}</p>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-emerald-500/40 text-left space-y-3 print:bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <BengalInstituteLogo size="sm" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">{isBn ? 'রেজিস্ট্রেশন টোকেন' : 'Registration Token'}</span>
              <span className="text-sm font-mono font-black text-emerald-400">{result.token}</span>
            </div>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div><dt className="text-slate-400 text-[10px]">{isBn ? 'শিক্ষার্থীর নাম:' : 'Student:'}</dt><dd className="font-bold text-white">{form.fullName}</dd></div>
            <div><dt className="text-slate-400 text-[10px]">{isBn ? 'মোবাইল:' : 'Mobile:'}</dt><dd className="font-mono text-slate-200">{form.phone}</dd></div>
            <div><dt className="text-slate-400 text-[10px]">{isBn ? 'কোর্স:' : 'Course:'}</dt><dd className="font-semibold text-emerald-300">{isBn ? course.titleBn : course.titleEn}</dd></div>
            <div><dt className="text-slate-400 text-[10px]">{isBn ? 'নির্ধারিত ফি:' : 'Payable Fee:'}</dt><dd className="font-bold text-amber-400 font-mono">৳{payable.toLocaleString(locale)}</dd></div>
          </dl>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5 text-emerald-400 font-semibold"><ShieldCheck className="w-3.5 h-3.5 shrink-0" />{isBn ? 'ক্যাম্পাসে সরাসরি উপস্থিত হয়ে বা বিকাশে কনফার্ম করতে পারেন।' : 'Confirm at campus or via bKash.'}</p>
            <p>{isBn ? 'ঠিকানা: আজিজুর রহমান সুপার মার্কেট (১ম তলা, জনতা ব্যাংক ভবন), সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া।' : 'Address: Azizur Rahman Super Market (1st Floor, Janata Bank Building), Singer Mor, Kushtia.'}</p>
            <p className="font-mono text-slate-300">{isBn ? 'জরুরি যোগাযোগ: ০১৭৮২-৮২৪৫৮২ / ০১৮৭০-৭০৭৭১৫' : 'Hotline: 01782-824582 / 01870-707715'}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"><Printer className="w-4 h-4" />{isBn ? 'স্লিপ প্রিন্ট করুন' : 'Print Slip'}</button>
          <Link href="/" className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center">{isBn ? 'হোমে ফিরুন' : 'Back to Home'}</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input isRequired variant="bordered" label={isBn ? 'শিক্ষার্থীর পূর্ণ নাম' : "Student's Full Name"} placeholder={isBn ? 'যেমন: মোঃ সাকিব হাসান' : 'e.g. Md. Sakib Hasan'} value={form.fullName} onValueChange={set('fullName')} />
        <Input isRequired type="tel" variant="bordered" label={isBn ? 'মোবাইল নম্বর (সচল)' : 'Mobile Number'} placeholder="017xxxxxxxx" value={form.phone} onValueChange={set('phone')} />
      </div>
      <Input type="email" variant="bordered" label={isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email (optional)'} value={form.email} onValueChange={set('email')} />

      <Select variant="bordered" label={isBn ? 'যে কোর্সে ভর্তি হতে চান' : 'Course'} selectedKeys={[form.courseId]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && set('courseId')(k.currentKey)}>
        {COURSES_DATA.map((c) => <SelectItem key={c.id}>{isBn ? `${c.titleBn} - ${c.durationBn}` : `${c.titleEn} - ${c.durationEn}`}</SelectItem>)}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select variant="bordered" label="সুবিধাজনক শিফট / সময়" selectedKeys={[form.shift]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && set('shift')(k.currentKey)}>
          {SHIFTS.map(([v, l]) => <SelectItem key={v}>{l}</SelectItem>)}
        </Select>
        <Select variant="bordered" label="শিক্ষাগত যোগ্যতা" selectedKeys={[form.education]} disallowEmptySelection onSelectionChange={(k) => k.currentKey && set('education')(k.currentKey)}>
          {EDU.map(([v, l]) => <SelectItem key={v}>{l}</SelectItem>)}
        </Select>
      </div>

      <div>
        <div className="flex gap-2">
          <Input variant="bordered" label="প্রমো বা স্কলারশিপ কোড" placeholder="HSC50" value={form.couponCode} onValueChange={(v) => { set('couponCode')(v); if (v.trim().toUpperCase() === 'HSC50') setCouponOk(true); else setCouponOk(false); }} classNames={{ input: 'uppercase font-mono' }} />
          <Button type="button" variant="flat" className="h-14 font-bold text-emerald-400" onPress={applyCoupon}>{isBn ? 'যাচাই' : 'Apply'}</Button>
        </div>
        {couponOk && <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">✓ HSC50 কুপন কোডে ৫০% ছাড় কার্যকর হয়েছে!</span>}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-400 block">{isBn ? 'প্রদেয় কোর্স ফি:' : 'Payable fee:'}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-400 font-mono">৳{payable.toLocaleString(locale)}</span>
            {discount > 0 && <span className="text-slate-500 line-through text-[11px]">৳{course.fee.toLocaleString(locale)}</span>}
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <span className="text-emerald-400 font-bold block">{discount}% {isBn ? 'ছাড় প্রযোজ্য' : 'discount applied'}</span>
          <span>{isBn ? 'কিস্তিতেও পরিশোধযোগ্য' : 'Installments available'}</span>
        </div>
      </div>

      {error && <p role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</p>}

      <Button type="submit" isLoading={loading} size="lg" fullWidth className="bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30" startContent={!loading && <Send className="w-4 h-4" />}>
        {t('modal_submit')}
      </Button>
    </form>
  );
}
