'use client';
import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// The original NewsletterSubscription file was not in the upload; rebuilt to
// match the old Firestore flow, but saves to MongoDB via /api/newsletter.
export default function NewsletterSubscription() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus('done');
      setMessage(isBn ? 'ধন্যবাদ! আপনি সাবস্ক্রাইব করেছেন।' : 'Thanks! You are subscribed.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || (isBn ? 'সাবস্ক্রাইব করা যায়নি।' : 'Could not subscribe.'));
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-base sm:text-lg font-black text-white">{t('news_title')}</h3>
      </div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 w-full md:max-w-md">
        <Input
          type="email"
          isRequired
          size="sm"
          variant="bordered"
          aria-label={t('news_placeholder')}
          placeholder={t('news_placeholder')}
          value={email}
          onValueChange={setEmail}
        />
        <Button type="submit" isLoading={status === 'loading'} className="bg-emerald-500 text-slate-950 font-bold">
          {t('news_btn')}
        </Button>
      </form>
      {status === 'done' && (
        <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 md:basis-full"><CheckCircle2 className="w-4 h-4" />{message}</p>
      )}
      {status === 'error' && <p className="text-xs text-rose-400 md:basis-full" role="alert">{message}</p>}
    </div>
  );
}
