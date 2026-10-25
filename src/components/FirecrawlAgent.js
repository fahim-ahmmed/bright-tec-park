'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Textarea } from '@heroui/react';
import { Flame, Copy, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useLanguage } from '@/context/LanguageContext';

export default function FirecrawlAgent() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { data: session, isPending } = useSession();
  const [url, setUrl] = useState(process.env.NEXT_PUBLIC_APP_URL || 'https://');
  const [prompt, setPrompt] = useState('Extract institute overview, courses, syllabus, fees, BTEB affiliation, campus location, and contact numbers');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const presets = [
    [isBn ? 'কোর্স ও ফি' : 'Courses & Fees', 'Extract institute overview, courses, syllabus, and fees structure'],
    [isBn ? 'BTEB ও ক্যাম্পাস' : 'BTEB & Campus', 'Extract campus address, BTEB accreditation code 27117, and hotlines'],
    [isBn ? '৫০% HSC অফার' : 'HSC 50% Offer', 'Extract HSC 50% discount offers and coupon codes'],
  ];

  const run = async (p) => {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/firecrawl/agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: p || prompt, url, model: 'spark-2' }) });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Agent failed');
      setResult(data);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const copy = async () => { try { await navigator.clipboard.writeText(JSON.stringify(result.data, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400"><Flame className="w-5 h-5" /></div>
        <div><h1 className="text-lg sm:text-xl font-black text-white">{isBn ? 'ফায়ারক্ল এআই ওয়েব এজেন্ট' : 'Firecrawl AI Agent'}</h1><p className="text-xs text-slate-400">{isBn ? 'ওয়েব এক্সট্রাকশন (শুধু লগইন করা ব্যবহারকারীর জন্য)' : 'Web extraction (logged-in users only)'}</p></div>
      </div>

      {!isPending && !session ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3"><p className="text-sm text-slate-300">{isBn ? 'এজেন্ট চালাতে লগইন করুন।' : 'Log in to run the agent.'}</p><Button as={Link} href="/login?next=/firecrawl" className="bg-emerald-500 text-slate-950 font-bold">{isBn ? 'লগইন' : 'Log in'}</Button></div>
      ) : (
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <Input type="url" variant="bordered" label="Target URL" value={url} onValueChange={setUrl} />
          <Textarea variant="bordered" minRows={2} label="Agent prompt" value={prompt} onValueChange={setPrompt} />
          <div className="flex flex-wrap gap-1.5">{presets.map(([l, p]) => <button key={l} type="button" onClick={() => { setPrompt(p); run(p); }} className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] cursor-pointer">{l}</button>)}</div>
          <Button fullWidth isLoading={loading} onPress={() => run()} className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black" startContent={!loading && <Flame className="w-4 h-4" />}>{isBn ? 'এজেন্ট রান করুন' : 'Run agent'}</Button>
          {error && <p role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</p>}
          {result && (
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px]">
                <span className="text-emerald-400 font-mono flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{result.status} · {result.executionTimeMs}ms</span>
                <button type="button" onClick={copy} className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 cursor-pointer">{copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}{isBn ? 'কপি' : 'Copy'}</button>
              </div>
              {result.summary && <p className="px-4 pt-3 text-[11px] text-slate-400">{result.summary}</p>}
              <pre className="p-4 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-96">{JSON.stringify(result.data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
