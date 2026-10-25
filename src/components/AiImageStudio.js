'use client';
import { useRef, useState } from 'react';
import { Sparkles, Download, RefreshCw, Upload, Copy, Wand2, HardDrive, AlertCircle, ArrowRight } from 'lucide-react';
import { useToaster } from '@gravity-ui/uikit';
import { useLanguage } from '@/context/LanguageContext';
import { requestGenerateImage, STUDENT_IMAGE_PROMPTS } from '@/services/aiImageService';
import { uploadFileToDrive } from '@/services/googleDriveService';

const STYLES = [
  ['Modern Lab', '🏢 মডার্ন ল্যাব', '🏢 Modern Lab', 'আধুনিক কম্পিউটার ল্যাব ও শিক্ষার্থীবান্ধব পরিবেশ', 'Modern computer lab with workstations'],
  ['Computer Technology', '💻 কম্পিউটার টেকনোলজি', '💻 Computer Technology', 'সার্কিট, কোডিং ইন্টারফেস ও আধুনিক হার্ডওয়্যার', 'Futuristic computing, chips & circuitry'],
  ['AI & Coding', '⚡ এআই ও কোডিং', '⚡ AI & Coding', 'অ্যালগরিদম, ডিজিটাল ডাটা ও কোডিং টার্মিনাল', 'AI neural nets & coding terminals'],
  ['Photorealistic Studio', '📸 ফটোরিয়েলিস্টিক', '📸 Photorealistic', '৮কে হাই-রেজ্যুলেশন বাস্তবসম্মত আলো', 'Ultra-realistic 8K studio photography'],
  ['Cyber Neon', '🌟 সাইবার নিয়ন', '🌟 Cyber Neon', 'নিয়ন গ্রিন ও সায়ান ফিউচারিস্টিক লুক', 'Glowing neon cyberpunk aesthetics'],
  ['3D Digital Art', '🧊 ৩ডি ডিজিটাল আর্ট', '🧊 3D Digital Art', 'থ্রি-ডি আইসোমেট্রিক রেন্ডার', 'Blender style 3D isometric render'],
];
const RATIOS = [['16:9', '১৬:৯ (ব্যানার)', 'aspect-video'], ['1:1', '১:১ (স্কয়ার)', 'aspect-square'], ['4:3', '৪:৩ (প্রেজেন্টেশন)', 'aspect-[4/3]'], ['9:16', '৯:১৬ (স্টোরি)', 'aspect-[9/16] max-h-[560px]']];

export default function AiImageStudio() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { add } = useToaster();
  const fileRef = useRef(null);

  const [mode, setMode] = useState('generate');
  const [prompt, setPrompt] = useState('Students collaborating in a high-tech computer lab with modern PCs and programming monitors in Bengal Computer Training Institute Kushtia');
  const [editPrompt, setEditPrompt] = useState('Add glowing neon cyber lighting and high-tech monitors');
  const [style, setStyle] = useState('Modern Lab');
  const [customStyle, setCustomStyle] = useState('');
  const [ratio, setRatio] = useState('16:9');
  const [image, setImage] = useState(null);       // what is shown
  const [source, setSource] = useState(null);     // data URL used as edit input
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [engine, setEngine] = useState('');

  const activeStyle = customStyle.trim() || style;
  const toast = (title, theme = 'success', content) => add({ name: `ai-${Date.now()}`, title, content, theme, autoHiding: 3500 });

  const run = async (action) => {
    setBusy(true); setError('');
    const res = await requestGenerateImage({
      prompt: action === 'edit' ? editPrompt : prompt, aspectRatio: ratio, style: activeStyle, action,
      editImageBase64: action === 'edit' ? source || (image?.startsWith('data:') ? image : undefined) : undefined,
    });
    setBusy(false);
    if (res.success && res.imageUrl) { setImage(res.imageUrl); setEngine(res.engineUsed || ''); if (res.note) toast(res.note, 'warning'); }
    else setError(res.error || (isBn ? 'ছবি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Could not generate the image. Please try again.'));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 6 * 1024 * 1024) { setError(isBn ? 'ছবি ৬MB-এর কম হতে হবে।' : 'Image must be under 6MB.'); return; }
    const r = new FileReader();
    r.onload = () => { setSource(r.result); setImage(r.result); setMode('edit'); };
    r.readAsDataURL(f);
  };

  const fetchBlob = async () => (await fetch(image)).blob();
  const fname = () => `bengal-project-${activeStyle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;

  const save = async () => {
    if (!image) return;
    try {
      const blob = await fetchBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = fname(); document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast(isBn ? 'ছবিটি ডিভাইসে সেভ হয়েছে' : 'Image saved to your device');
    } catch { window.open(image, '_blank', 'noopener'); }
  };

  const saveToDrive = async () => {
    if (!image) return;
    try {
      const t = await fetch('/api/google-token');
      if (!t.ok) return toast(isBn ? 'গুগল দিয়ে লগইন করুন' : 'Sign in with Google first', 'warning', isBn ? 'ড্রাইভ পোর্টাল থেকে গুগল অ্যাকাউন্ট যুক্ত করুন।' : 'Connect Google from the Drive portal.');
      const { accessToken } = await t.json();
      const file = await uploadFileToDrive(accessToken, await fetchBlob(), fname());
      toast(isBn ? 'গুগল ড্রাইভে সেভ হয়েছে' : 'Saved to Google Drive', 'success', file.name);
    } catch (err) { toast(isBn ? 'ড্রাইভে আপলোড ব্যর্থ' : 'Drive upload failed', 'danger', err.message); }
  };

  const copy = async () => { try { await navigator.clipboard.writeText(image.startsWith('data:') ? prompt : image); toast(isBn ? 'কপি হয়েছে' : 'Copied'); } catch {} };
  const ratioCls = (RATIOS.find((r) => r[0] === ratio) || RATIOS[0])[2];
  const field = 'w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 resize-none leading-relaxed';

  return (
    <section className="py-12 sm:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold"><Sparkles className="w-3.5 h-3.5" />{isBn ? 'শিক্ষার্থীদের জন্য টেক্সট-টু-ইমেজ জেনারেটর' : 'Text-to-Image Generator for Student Projects'}</div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{isBn ? 'প্রম্পট ও স্টাইল দিন, ' : 'Enter a Prompt & Style, Generate '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">{isBn ? 'এআই ইমেজ তৈরি করুন' : 'Stunning Project Images'}</span></h1>
        </div>

        <div className="flex items-center gap-2 max-w-md mx-auto p-1.5 rounded-2xl bg-slate-900 border border-slate-800" role="tablist">
          {[['generate', Sparkles, isBn ? 'টেক্সট টু ইমেজ' : 'Text to Image'], ['edit', Wand2, isBn ? 'ইমেজ এডিট' : 'Edit Image']].map(([id, I, l]) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold cursor-pointer ${mode === id ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><I className="w-3.5 h-3.5" />{l}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-5">
            {mode === 'generate' ? (
              <div className="space-y-3">
                <label htmlFor="ai-prompt" className="text-xs font-bold text-slate-200 block">{isBn ? '১. প্রজেক্ট প্রম্পট (বাংলা বা ইংরেজি):' : '1. Project prompt:'}</label>
                <textarea id="ai-prompt" rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} className={field} />
                <div className="flex flex-wrap gap-1.5">
                  {STUDENT_IMAGE_PROMPTS.map((p) => (
                    <button key={p.titleEn} type="button" onClick={() => { setPrompt(p.prompt); setRatio(p.aspectRatio); setStyle(p.style === 'cyber-neon' ? 'Cyber Neon' : p.style === '3d-render' ? '3D Digital Art' : 'Modern Lab'); setCustomStyle(''); }} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 cursor-pointer">⚡ {isBn ? p.titleBn : p.titleEn}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-200 block">{isBn ? '১. যে ছবিটি এডিট করতে চান:' : '1. Photo to edit:'}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-emerald-500 text-slate-300 text-xs font-semibold cursor-pointer"><Upload className="w-4 h-4 text-emerald-400" />{isBn ? 'ডিভাইস থেকে আপলোড' : 'Upload from device'}</button>
                  {image?.startsWith('data:') && <button type="button" onClick={() => setSource(image)} className="px-3 rounded-xl bg-slate-800 text-xs text-emerald-400 font-bold border border-slate-700 cursor-pointer">{isBn ? 'বর্তমান ছবি' : 'Use current'}</button>}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                </div>
                <label htmlFor="ai-edit" className="text-xs font-bold text-slate-200 block">{isBn ? '২. কী এডিট করতে চান:' : '2. Describe your edit:'}</label>
                <textarea id="ai-edit" rows={3} value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} className={field} />
                <p className="text-[11px] text-slate-500">{isBn ? 'ছবি এডিট করতে সার্ভারে GEMINI_API_KEY সেট থাকতে হবে।' : 'Editing requires GEMINI_API_KEY on the server.'}</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-200">{isBn ? '২. স্টাইল:' : '2. Style:'}</span><span className="text-[10px] text-emerald-400 font-semibold">{activeStyle}</span></div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {STYLES.map(([id, lb, le, db, de]) => {
                  const sel = style === id && !customStyle.trim();
                  return (
                    <button key={id} type="button" onClick={() => { setStyle(id); setCustomStyle(''); }} aria-pressed={sel} className={`p-2.5 text-left rounded-xl border cursor-pointer ${sel ? 'bg-emerald-500/20 border-emerald-500 ring-1 ring-emerald-500/50' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'}`}>
                      <div className={`text-xs font-bold ${sel ? 'text-emerald-300' : 'text-slate-200'}`}>{isBn ? lb : le}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{isBn ? db : de}</div>
                    </button>
                  );
                })}
              </div>
              <input value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} aria-label="Custom style" placeholder={isBn ? 'অথবা কাস্টম স্টাইল লিখুন' : 'Or type a custom style'} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-slate-500" />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">{isBn ? '৩. ছবির অনুপাত:' : '3. Aspect ratio:'}</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RATIOS.map(([id, label]) => <button key={id} type="button" onClick={() => setRatio(id)} aria-pressed={ratio === id} className={`py-2 px-1 rounded-xl text-[11px] font-bold border cursor-pointer ${ratio === id ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}>{label}</button>)}
              </div>
            </div>

            {error && <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>}

            <button type="button" disabled={busy} onClick={() => run(mode)} className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer ${busy ? 'bg-emerald-600/50 text-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950'}`}>
              {busy ? <><RefreshCw className="w-4 h-4 animate-spin" />{isBn ? 'ছবি তৈরি হচ্ছে...' : 'Generating...'}</> : <><Sparkles className="w-4 h-4" />{mode === 'edit' ? (isBn ? 'ছবিটি এডিট করুন' : 'Edit image') : (isBn ? `ছবি তৈরি করুন (${activeStyle})` : `Generate (${activeStyle})`)}<ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-3 sm:p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 px-1 text-xs gap-2">
                <span className="font-bold text-white flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />{isBn ? 'তৈরিকৃত ছবি' : 'Generated image'}</span>
                <span className="flex items-center gap-1.5"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">{activeStyle}</span><span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">{ratio}</span></span>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center min-h-[240px]">
                {busy && <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3"><Sparkles className="w-8 h-8 text-emerald-400 animate-spin" /><p className="text-xs font-bold text-emerald-300">{isBn ? 'এআই আপনার জন্য ছবি তৈরি করছে...' : 'AI is creating your image...'}</p></div>}
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={isBn ? 'এআই দ্বারা তৈরি ছবি' : 'AI generated'} className={`w-full object-contain ${ratioCls}`} />
                ) : (
                  <p className="text-xs text-slate-500 p-10 text-center">{isBn ? 'এখনও কোনো ছবি তৈরি হয়নি। প্রম্পট দিয়ে "ছবি তৈরি করুন" চাপুন।' : 'No image yet. Enter a prompt and press Generate.'}</p>
                )}
              </div>
              {engine && <p className="mt-2 text-[10px] text-slate-500 font-mono">engine: {engine}</p>}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3">
                <button type="button" disabled={!image} onClick={save} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm disabled:opacity-40 cursor-pointer"><Download className="w-4 h-4" />{isBn ? 'লোকাল ডিভাইসে সেভ করুন' : 'Save to device'}</button>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" disabled={!image} onClick={copy} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs disabled:opacity-40 cursor-pointer"><Copy className="w-3.5 h-3.5" />{isBn ? 'কপি' : 'Copy'}</button>
                  <button type="button" disabled={!image} onClick={saveToDrive} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold text-xs disabled:opacity-40 cursor-pointer"><HardDrive className="w-3.5 h-3.5" />{isBn ? 'ড্রাইভে সেভ' : 'Save to Drive'}</button>
                  <button type="button" disabled={!image} onClick={() => { if (image.startsWith('data:')) setSource(image); setMode('edit'); }} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 font-bold text-xs disabled:opacity-40 cursor-pointer"><Wand2 className="w-3.5 h-3.5" />{isBn ? 'এডিটরে পাঠান' : 'Edit this'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
