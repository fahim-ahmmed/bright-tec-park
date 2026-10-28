'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';
import BengalInstituteLogo from '../BengalInstituteLogo';

const input = 'h-12 w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none';

export default function AdminLoginForm({ configured }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'লগইন ব্যর্থ হয়েছে।');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl sm:p-9">
        <div className="flex flex-col items-center gap-3 text-center">
          <BengalInstituteLogo size="md" />
          <div>
            <h1 className="flex items-center justify-center gap-2 text-xl font-extrabold text-white"><ShieldCheck className="h-5 w-5 text-emerald-400" />অ্যাডমিন প্যানেল</h1>
            <p className="mt-1 text-xs text-slate-400">শুধুমাত্র অনুমোদিত কর্তৃপক্ষের জন্য</p>
          </div>
        </div>

        {!configured && (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
            অ্যাডমিন কনফিগার করা নেই। <code className="font-mono">.env.local</code>-এ <code className="font-mono">ADMIN_EMAIL</code> ও <code className="font-mono">ADMIN_PASSWORD</code> সেট করে সার্ভার রিস্টার্ট করুন।
          </p>
        )}

        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="relative block">
            <span className="sr-only">ইমেইল</span>
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input type="email" autoComplete="username" required placeholder="অ্যাডমিন ইমেইল" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </label>
          <label className="relative block">
            <span className="sr-only">পাসওয়ার্ড</span>
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input type={show ? 'text' : 'password'} autoComplete="current-password" required placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} pr-12`} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখান'} className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:text-white">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </label>

          {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}

          <button type="submit" disabled={loading} className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-extrabold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}লগইন করুন
          </button>
        </form>
      </div>
    </div>
  );
}