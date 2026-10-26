'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToaster } from '@gravity-ui/uikit';
import { ArrowLeft, Camera, Trash2, Plus, Save, Loader2, GraduationCap, MapPin, UserRound } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { BOARDS, EMPTY_PROFILE } from '@/lib/profile';
import { useLanguage } from '@/context/LanguageContext';

const field = 'h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none';
const area = 'w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none';

// Crop to a centred square and shrink, so the photo stays small enough to store in MongoDB.
const resizeImage = (file, size = 256) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad image')); };
    img.src = url;
  });

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-white"><Icon className="h-4.5 w-4.5 text-emerald-400" />{title}</h2>
      {children}
    </section>
  );
}

export default function ProfileForm({ user }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const router = useRouter();
  const { add } = useToaster();
  const fileRef = useRef(null);

  const [form, setForm] = useState({ ...EMPTY_PROFILE, fullName: user.name || '' });
  const [photoChanged, setPhotoChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.profile) setForm((f) => ({ ...f, ...d.profile })); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setEdu = (lvl, k) => (e) => setForm((f) => ({ ...f, [lvl]: { ...f[lvl], [k]: e.target.value } }));
  const setOther = (i, k) => (e) => setForm((f) => ({ ...f, others: f.others.map((o, idx) => (idx === i ? { ...o, [k]: e.target.value } : o)) }));
  const addOther = () => setForm((f) => (f.others.length >= 5 ? f : { ...f, others: [...f.others, { level: '', institute: '', year: '', result: '' }] }));
  const removeOther = (i) => setForm((f) => ({ ...f, others: f.others.filter((_, idx) => idx !== i) }));

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) { setError(isBn ? 'ছবি (৮MB-এর কম) নির্বাচন করুন।' : 'Choose an image under 8MB.'); return; }
    try {
      const data = await resizeImage(file);
      setForm((f) => ({ ...f, photo: data }));
      setPhotoChanged(true);
      setError('');
    } catch { setError(isBn ? 'ছবিটি পড়া যায়নি।' : 'Could not read the image.'); }
  };

  const save = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photo: photoChanged ? form.photo : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      // Keep the login account (navbar avatar & name) in sync. Best-effort.
      try { await authClient.updateUser({ name: form.fullName, ...(photoChanged ? { image: form.photo || null } : {}) }); } catch {}

      setPhotoChanged(false);
      add({ name: 'profile', title: isBn ? 'প্রোফাইল সংরক্ষিত হয়েছে' : 'Profile saved', theme: 'success', autoHiding: 3500 });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally { setSaving(false); }
  };

  const eduBlock = (lvl, title, instituteLabel) => (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <h3 className="text-sm font-bold text-gold-300">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={instituteLabel} className="sm:col-span-2"><input className={field} value={form[lvl].institute} onChange={setEdu(lvl, 'institute')} /></Field>
        <Field label={isBn ? 'বোর্ড' : 'Board'}>
          <select className={field} value={form[lvl].board} onChange={setEdu(lvl, 'board')}>
            <option value="">{isBn ? '— নির্বাচন করুন —' : '— Select —'}</option>
            {BOARDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
        <Field label={isBn ? 'বিভাগ / গ্রুপ' : 'Group'}><input className={field} placeholder={isBn ? 'বিজ্ঞান / ব্যবসায় / মানবিক' : 'Science / Commerce / Arts'} value={form[lvl].group} onChange={setEdu(lvl, 'group')} /></Field>
        <Field label={isBn ? 'পাশের বছর' : 'Passing year'}><input inputMode="numeric" className={field} placeholder="2022" value={form[lvl].year} onChange={setEdu(lvl, 'year')} /></Field>
        <Field label={isBn ? 'জিপিএ / প্রাপ্ত নম্বর' : 'GPA / marks'}><input className={field} placeholder="5.00" value={form[lvl].gpa} onChange={setEdu(lvl, 'gpa')} /></Field>
        <Field label={isBn ? 'রোল নম্বর' : 'Roll no.'}><input inputMode="numeric" className={field} value={form[lvl].roll} onChange={setEdu(lvl, 'roll')} /></Field>
        <Field label={isBn ? 'রেজিস্ট্রেশন নম্বর' : 'Registration no.'}><input inputMode="numeric" className={field} value={form[lvl].reg} onChange={setEdu(lvl, 'reg')} /></Field>
      </div>
    </div>
  );

  return (
    <form onSubmit={save} className="mx-auto max-w-3xl space-y-5 px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/student" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400"><ArrowLeft className="h-4 w-4" />{isBn ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to dashboard'}</Link>
      <div>
        <h1 className="text-2xl font-extrabold text-white">{isBn ? 'আমার প্রোফাইল' : 'My profile'}</h1>
        <p className="mt-1 text-sm text-slate-400">{isBn ? 'ব্যক্তিগত ও শিক্ষাগত তথ্য হালনাগাদ রাখুন। ইনস্টিটিউট কর্তৃপক্ষ এই তথ্য ভর্তি ও সনদের কাজে ব্যবহার করবে।' : 'Keep your personal and academic details up to date. The institute uses them for admission and certificates.'}</p>
      </div>

      <fieldset disabled={loading} className="space-y-5 disabled:opacity-60">
        <Section icon={UserRound} title={isBn ? 'ব্যক্তিগত তথ্য' : 'Personal information'}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative">
              {form.photo || user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.photo || user.image} alt="" referrerPolicy="no-referrer" className="h-28 w-28 rounded-2xl border-2 border-emerald-500/50 object-cover" />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-4xl font-bold text-emerald-400">{(form.fullName || '?').charAt(0).toUpperCase()}</div>
              )}
              <button type="button" onClick={() => fileRef.current?.click()} aria-label={isBn ? 'ছবি পরিবর্তন' : 'Change photo'} className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg hover:bg-emerald-400"><Camera className="h-4 w-4" /></button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-white">{isBn ? 'প্রোফাইল ছবি' : 'Profile photo'}</p>
              <p className="text-xs text-slate-400">{isBn ? 'স্পষ্ট, মুখ দেখা যায় এমন ছবি দিন। ছবি স্বয়ংক্রিয়ভাবে বর্গাকার হয়ে যাবে।' : 'Use a clear face photo. It is cropped to a square automatically.'}</p>
              {form.photo && <button type="button" onClick={() => { setForm((f) => ({ ...f, photo: '' })); setPhotoChanged(true); }} className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-rose-400 hover:underline"><Trash2 className="h-3 w-3" />{isBn ? 'ছবি মুছুন' : 'Remove photo'}</button>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label={isBn ? 'পূর্ণ নাম *' : 'Full name *'}><input required className={field} value={form.fullName} onChange={set('fullName')} /></Field>
            <Field label={isBn ? 'মোবাইল নম্বর' : 'Mobile number'}><input type="tel" className={field} placeholder="017xxxxxxxx" value={form.phone} onChange={set('phone')} /></Field>
            <Field label={isBn ? 'ইমেইল (লগইন)' : 'Email (login)'} className="sm:col-span-2">
              <input className={`${field} cursor-not-allowed opacity-70`} value={user.email} readOnly />
            </Field>
          </div>
        </Section>

        <Section icon={MapPin} title={isBn ? 'ঠিকানা' : 'Address'}>
          <Field label={isBn ? 'বর্তমান ঠিকানা' : 'Present address'}><textarea rows={2} className={area} value={form.presentAddress} onChange={set('presentAddress')} /></Field>
          <Field label={isBn ? 'স্থায়ী ঠিকানা' : 'Permanent address'}><textarea rows={2} className={area} value={form.permanentAddress} onChange={set('permanentAddress')} /></Field>
        </Section>

        <Section icon={GraduationCap} title={isBn ? 'শিক্ষাগত যোগ্যতা' : 'Academic history'}>
          {eduBlock('ssc', 'SSC / দাখিল', isBn ? 'স্কুল / মাদ্রাসার নাম' : 'School / madrasa')}
          {eduBlock('hsc', 'HSC / আলিম', isBn ? 'কলেজের নাম' : 'College')}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{isBn ? 'অন্যান্য (JSC / অনার্স / ডিপ্লোমা)' : 'Others (JSC / Honours / Diploma)'}</h3>
              <button type="button" onClick={addOther} disabled={form.others.length >= 5} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-bold text-emerald-300 hover:bg-slate-800 disabled:opacity-40"><Plus className="h-3.5 w-3.5" />{isBn ? 'যোগ করুন' : 'Add'}</button>
            </div>
            {form.others.map((o, i) => (
              <div key={i} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 sm:grid-cols-2">
                <Field label={isBn ? 'স্তর (যেমন: অনার্স)' : 'Level (e.g. Honours)'}><input className={field} value={o.level} onChange={setOther(i, 'level')} /></Field>
                <Field label={isBn ? 'প্রতিষ্ঠান' : 'Institute'}><input className={field} value={o.institute} onChange={setOther(i, 'institute')} /></Field>
                <Field label={isBn ? 'বছর' : 'Year'}><input inputMode="numeric" className={field} value={o.year} onChange={setOther(i, 'year')} /></Field>
                <Field label={isBn ? 'ফলাফল / CGPA' : 'Result / CGPA'}><input className={field} value={o.result} onChange={setOther(i, 'result')} /></Field>
                <button type="button" onClick={() => removeOther(i)} className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-rose-400 hover:underline sm:col-span-2"><Trash2 className="h-3 w-3" />{isBn ? 'এই তথ্য মুছুন' : 'Remove'}</button>
              </div>
            ))}
          </div>
        </Section>
      </fieldset>

      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

      <div className="sticky bottom-3 z-10 flex justify-end">
        <button type="submit" disabled={saving || loading} className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-8 text-sm font-extrabold text-slate-950 shadow-xl shadow-black/40 transition-colors hover:bg-emerald-400 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isBn ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save profile'}
        </button>
      </div>
    </form>
  );
}