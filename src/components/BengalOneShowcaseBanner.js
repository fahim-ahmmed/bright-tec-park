'use client';
import { useEffect, useState } from 'react';
import { Globe2, Cpu, ShieldCheck, Wifi, Monitor, Sparkles, Maximize2, X } from 'lucide-react';

// Ported from BengalOneShowcaseBanner.tsx. Drop your real banner at /public/IMG_0759_edited.png to show it instead.
function Composite({ big = false }) {
  const t = (s, b) => (big ? b : s);
  return (
    <div className="relative w-full aspect-[16/9] grid grid-cols-12 bg-slate-950 select-none overflow-hidden text-white">
      <div className="col-span-6 relative border-r-2 border-white/90 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-[#071d3a] to-slate-900">
        <div className="relative flex-1 flex items-center justify-center pt-2">
          <div className="relative w-32 sm:w-44 lg:w-56 aspect-square flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.6)] rotate-[-22deg] scale-y-[0.42] scale-x-[1.28] flex items-center justify-around">
              {['hp', 'DELL', 'CISCO', 'Microsoft'].map((b) => <span key={b} className="text-[7px] sm:text-[9px] font-black text-cyan-200 bg-slate-950/80 px-1 rounded border border-cyan-400/40">{b}</span>)}
            </div>
            <div className="relative w-20 sm:w-28 lg:w-36 aspect-square rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-white border border-white/60 flex items-center justify-center overflow-hidden"><Globe2 className="w-4/5 h-4/5 text-slate-500/40" /></div>
          </div>
        </div>
        <div className="px-2 pb-2 text-center">
          <div className="mx-auto max-w-[92%] rounded-xl bg-gradient-to-b from-white/95 to-slate-200/95 text-slate-900 py-1.5 px-2 shadow-lg">
            <div className="flex items-center justify-center gap-1 leading-none"><span className={`${t('text-sm sm:text-xl', 'text-2xl')} font-black text-slate-800`}>BENGAL</span><span className={`${t('text-sm sm:text-xl', 'text-2xl')} font-black text-sky-600`}>ONE</span></div>
            <div className="text-[7px] sm:text-[9px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">ONE ROOF. GLOBAL TECH. INFINITE SOLUTIONS.</div>
            <div className="text-[6px] sm:text-[8px] font-black text-slate-700">EST. 2008 | 16 YEARS OF EXCELLENCE</div>
          </div>
          <div className="flex justify-between text-[7px] sm:text-[9px] text-slate-300 mt-1 px-2 font-bold"><span>1</span><span>BENGAL ONE TECH SOLUTION</span></div>
        </div>
      </div>
      <div className="col-span-6 flex flex-col">
        <div className="h-1/2 relative border-b-2 border-white/90 flex flex-col justify-between p-2 bg-gradient-to-tr from-slate-950 via-[#0a1a36] to-cyan-950/70">
          <div className="text-center"><span className="inline-block px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-[7px] sm:text-[9px] font-bold text-cyan-300">Connected Ark</span></div>
          <div className="grid grid-cols-4 gap-1 text-center">
            {[[Monitor, 'Hardware', 'text-cyan-300'], [Cpu, 'Software', 'text-emerald-300'], [Wifi, 'Networking', 'text-sky-300'], [ShieldCheck, 'Cyber Security', 'text-indigo-300']].map(([I, l, c]) => (
              <div key={l} className="flex flex-col items-center"><div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-slate-900/80 border border-slate-600/40 flex items-center justify-center ${c}`}><I className="w-3 h-3 sm:w-4 sm:h-4" /></div><span className="text-[6px] sm:text-[8px] font-semibold text-slate-200 mt-0.5">{l}</span></div>
            ))}
          </div>
          <div className="flex items-end justify-between border-t border-slate-700/60 pt-1"><span className="font-mono text-[7px] text-slate-400">2</span><div className="text-center flex-1"><div className="text-[8px] sm:text-xs font-black text-cyan-300">BENGAL ONE UNIFIED IT SOLUTIONS</div><div className="text-[5px] sm:text-[7px] text-slate-300">HARDWARE | SOFTWARE | NETWORKING | SECURITY</div></div><span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 text-[6px] font-black">16</span></div>
        </div>
        <div className="h-1/2 relative flex flex-col justify-between p-2 bg-gradient-to-tr from-slate-950 via-[#0a1e3d] to-slate-900">
          <div className="rounded-lg bg-slate-900/90 border border-cyan-500/40 p-1 text-center"><div className="flex justify-between text-[6px] sm:text-[8px] text-cyan-400 font-bold px-1"><span>2008: VISION</span><span className="text-white font-black">BENGAL ONE</span><span>2024: INNOVATION</span></div><div className="text-[8px] sm:text-xs font-black text-cyan-300">BENGAL TRAINING INSTITUTE</div><div className="text-[5px] sm:text-[7px] text-slate-300 font-semibold">BUILDING FUTURE LEADERS SINCE 2008 • AI, CLOUD, CYBER, R&amp;D</div></div>
          <div className="flex items-center justify-between"><span className="font-mono text-[7px] text-slate-400">3</span><span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[6px] sm:text-[8px] font-bold text-cyan-300"><Sparkles className="w-2.5 h-2.5" />Interactive AI Lab &amp; Humanoid Robotics</span></div>
        </div>
      </div>
    </div>
  );
}

export default function BengalOneShowcaseBanner({ className = '' }) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let live = true;
    fetch('/IMG_0759_edited.png', { method: 'HEAD' }).then((r) => { if (live && r.ok) setPhoto('/IMG_0759_edited.png'); }).catch(() => {});
    return () => { live = false; };
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title="BENGAL ONE - UNIFIED IT SOLUTIONS & TRAINING INSTITUTE" className={`relative block w-full text-left rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl shadow-cyan-950/40 group cursor-pointer hover:border-cyan-400 ${className}`}>
        {photo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={photo} alt="BENGAL ONE UNIFIED IT SOLUTIONS" className="w-full aspect-[16/9] object-cover" /> : <Composite />}
        <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/90 text-cyan-300 text-[10px] font-bold border border-cyan-500/40"><Maximize2 className="w-3 h-3" />বড় করে দেখুন</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-cyan-500/60 bg-slate-950 p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2"><h2 className="text-sm sm:text-lg font-black text-white">BENGAL ONE UNIFIED IT SOLUTIONS &amp; TRAINING INSTITUTE</h2><button type="button" aria-label="Close" onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"><X className="w-5 h-5" /></button></div>
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-800">{photo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={photo} alt="BENGAL ONE" className="w-full max-h-[75vh] object-contain mx-auto" /> : <Composite big />}</div>
          </div>
        </div>
      )}
    </>
  );
}
