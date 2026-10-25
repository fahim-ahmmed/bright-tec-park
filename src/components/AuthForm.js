'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Divider } from '@heroui/react';
import { signIn, signUp } from '@/lib/auth-client';
import { useLanguage } from '@/context/LanguageContext';
import BengalInstituteLogo from './BengalInstituteLogo';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') && params.get('next').startsWith('/') ? params.get('next') : '/student';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleOn = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError(isBn ? 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।' : 'Password must be at least 8 characters.');
    setLoading(true);
    const { error: err } = isRegister
      ? await signUp.email({ name: name.trim(), email: email.trim(), password })
      : await signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (err) return setError(err.message || (isBn ? 'অনুরোধ ব্যর্থ হয়েছে।' : 'Request failed.'));
    router.push(next);
    router.refresh();
  };

  const google = async () => {
    setError('');
    const { error: err } = await signIn.social({ provider: 'google', callbackURL: next });
    if (err) setError(err.message || 'Google sign-in failed.');
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <BengalInstituteLogo size="md" />
        <h1 className="text-xl font-black text-white">{isRegister ? t('auth_register_title') : t('auth_login_title')}</h1>
        <p className="text-xs text-slate-400">{isBn ? 'ক্লাস রুটিন, লেকচার শিট ও হোমওয়ার্ক পোর্টাল' : 'Class routine, lecture sheets & homework portal'}</p>
      </div>

      <form onSubmit={submit} className="space-y-3" noValidate>
        {isRegister && <Input isRequired variant="bordered" label={t('auth_name')} autoComplete="name" value={name} onValueChange={setName} />}
        <Input isRequired type="email" variant="bordered" label={t('auth_email')} autoComplete="email" value={email} onValueChange={setEmail} />
        <Input isRequired type="password" variant="bordered" label={t('auth_password')} autoComplete={isRegister ? 'new-password' : 'current-password'} value={password} onValueChange={setPassword} />
        {error && <p role="alert" className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</p>}
        <Button type="submit" fullWidth isLoading={loading} className="bg-emerald-500 text-slate-950 font-black">
          {isRegister ? t('btn_register') : (isBn ? 'লগইন করুন' : 'Log in')}
        </Button>
      </form>

      {googleOn && (
        <>
          <div className="flex items-center gap-3"><Divider className="flex-1" /><span className="text-[11px] text-slate-500">{isBn ? 'অথবা' : 'or'}</span><Divider className="flex-1" /></div>
          <Button type="button" fullWidth variant="bordered" className="font-bold text-white" onPress={google}>{t('auth_google')}</Button>
        </>
      )}

      <p className="text-xs text-center text-slate-400">
        {isRegister ? (isBn ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'Already have an account?') : (isBn ? 'নতুন শিক্ষার্থী?' : 'New student?')}{' '}
        <Link href={isRegister ? '/login' : '/register'} className="text-emerald-400 font-bold hover:underline">
          {isRegister ? (isBn ? 'লগইন করুন' : 'Log in') : (isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create an account')}
        </Link>
      </p>
    </div>
  );
}
