'use client';
import { useState } from 'react';
import { Building2, MapPin, Navigation, Phone, Clock, Monitor, Wifi, Tv, ShieldCheck, Users, Headphones, Compass, Bus, Car, ExternalLink, Copy, Check } from 'lucide-react';
import { CAMPUS_FACILITIES, INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import CampusGoogleMap from './CampusGoogleMap';

const ICONS = { MonitorCheck: Monitor, Wifi, Tv, ShieldCheck, Users, Headphones };

const DIRECTIONS = {
  majampur: { icon: Bus, title: 'মজমপুর বাসস্ট্যান্ড / গেট থেকে:', body: 'মজমপুর গেট থেকে এন এস রোড ধরে সোজা কোর্টের দিকে রিকশা বা ইজিবাইকে মাত্র ৫ মিনিটে সিঙ্গার মোড়ে আসুন। মোড়ের পশ্চিম পাশে জনতা ব্যাংকের সম্মুখ সিঁড়ি দিয়ে ১ম তলায় উঠলেই বেঙ্গল ইনস্টিটিউট।', meta: 'দূরত্ব: মাত্র ১ কিমি · রিকশা ভাড়া: ১০-১৫ টাকা', tab: 'মজমপুর গেট থেকে' },
  court: { icon: Navigation, title: 'কুষ্টিয়া কোর্ট স্টেশন / ডিসি অফিস থেকে:', body: 'কোর্ট স্টেশন বা ডিসি অফিস মোড় থেকে এন এস রোড দিয়ে পূর্ব দিকে হেঁটে ৩ মিনিটেই সিঙ্গার মোড়। আজিজুর রহমান সুপার মার্কেটের ১ম তলা।', meta: 'দূরত্ব: ৩০০ মিটার · হেঁটেই আসা যায়', tab: 'কোর্ট স্টেশন থেকে' },
  chowrhas: { icon: Car, title: 'চৌড়হাস মোড় থেকে:', body: 'চৌড়হাস মোড় থেকে কোর্টপাড়া হয়ে এন এস রোডগামী যে কোনো ইজিবাইকে সিঙ্গার মোড় নামলেই হাতের কাছে জনতা ব্যাংক ভবন।', meta: 'দূরত্ব: ২.৫ কিমি · ইজিবাইক ভাড়া: ১৫-২০ টাকা', tab: 'চৌড়হাস মোড় থেকে' },
};

export default function LabAndCampusTour() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [tab, setTab] = useState('majampur');
  const [copied, setCopied] = useState(false);
  const [mapView, setMapView] = useState('interactive');
  const url = INSTITUTE_INFO.googleMapsUrl;
  const D = DIRECTIONS[tab];

  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {} };

  return (
    <section id="campus" className="py-12 sm:py-20 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"><Building2 className="w-3.5 h-3.5" />{isBn ? 'আধুনিক ক্যাম্পাস ও ডিজিটাল ল্যাব সুবিধা' : 'Modern Campus & Digital Lab Facilities'}</div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? 'সিঙ্গার মোড় ক্যাম্পাস ও ' : 'Singer Mor Campus & '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">{isBn ? 'অত্যাধুনিক সুবিধা' : 'Modern Facilities'}</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn ? 'কুষ্টিয়ার প্রাণকেন্দ্র সিঙ্গার মোড়ে অবস্থিত আজিজুর রহমান সুপার মার্কেটের ১ম তলায় (জনতা ব্যাংকের উপরে) আমাদের সুপ্রশস্ত, শীতাতপ নিয়ন্ত্রিত আধুনিক কম্পিউটার ল্যাব।' : 'Located at Singer Mor, Azizur Rahman Super Market 1st Floor (above Janata Bank), Kushtia. Fully air-conditioned, dedicated computer workstations with modern amenities.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {CAMPUS_FACILITIES.map((f) => {
            const I = ICONS[f.icon] || Monitor;
            return (
              <div key={f.titleEn} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 shadow-xl flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0"><I className="w-5 h-5 text-emerald-400" /></div>
                <div className="space-y-1"><h2 className="font-bold text-white text-base">{isBn ? f.titleBn : f.titleEn}</h2><p className="text-xs text-slate-400 leading-relaxed">{isBn ? f.descBn : f.descEn}</p></div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400"><Compass className="w-4 h-4" />কীভাবে আসবেন? (লোকেশন গাইড)</div>
                <h2 className="text-xl sm:text-3xl font-black text-white">জনতা ব্যাংক ভবন, সিঙ্গার মোড়, কুষ্টিয়া</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{INSTITUTE_INFO.addressBn}</p>
              </div>

              <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar" role="tablist">
                {Object.entries(DIRECTIONS).map(([k, v]) => (
                  <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tab === k ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white'}`}>{v.tab}</button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                <p className="flex items-center gap-2 font-bold text-white"><D.icon className="w-4 h-4 text-sky-400" />{D.title}</p>
                <p>{D.body}</p>
                <span className="text-[11px] text-sky-400 block font-mono">{D.meta}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"><Clock className="w-4 h-4 text-emerald-400 shrink-0" /><div><span className="block text-[10px] text-slate-400">অফিস খোলা:</span><span className="text-xs font-semibold text-white">শনি - বৃহস্পতি: সকাল ৮টা - রাত ৯টা</span></div></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"><Phone className="w-4 h-4 text-emerald-400 shrink-0" /><div><span className="block text-[10px] text-slate-400">হেল্পলাইন:</span><a href="tel:01782824582" className="text-xs font-bold text-emerald-400 hover:underline">০১৭৮২-৮২৪৫৮২ / ০১৮৭০-৭০৭৭১৫</a></div></div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-500" />গুগল ম্যাপে বেঙ্গল ইনস্টিটিউট</span>
                <div className="flex items-center gap-1">
                  {[['interactive', 'লাইভ ম্যাপ'], ['landmark', 'ল্যান্ডমার্ক']].map(([k, l]) => <button key={k} type="button" onClick={() => setMapView(k)} aria-pressed={mapView === k} className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${mapView === k ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 hover:text-white'}`}>{l}</button>)}
                </div>
              </div>
              {mapView === 'interactive' ? <CampusGoogleMap /> : (
                <a href={url} target="_blank" rel="noopener noreferrer" className="relative aspect-[4/3] rounded-xl border border-slate-700/80 overflow-hidden p-4 flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 hover:border-emerald-500/60">
                  <div className="text-[11px] text-slate-400 space-y-1"><span className="font-mono text-emerald-400 block font-bold">NS ROAD, KUSHTIA (এন এস রোড)</span><p className="text-[10px] text-slate-300">সিঙ্গার মোড় ইন্টারসেকশন · আজিজুর রহমান সুপার মার্কেট</p></div>
                  <div className="self-center flex flex-col items-center"><div className="p-3 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/50"><Building2 className="w-6 h-6" /></div><span className="px-3 py-1 rounded-md bg-slate-900 border border-emerald-500/70 text-emerald-300 font-bold text-xs mt-2">বেঙ্গল ইনস্টিটিউট (১ম তলা)</span><span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">নিচে: জনতা ব্যাংক লিমিটেড<ExternalLink className="w-2.5 h-2.5 text-emerald-400" /></span></div>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between"><span>পোস্ট কোড: ৭০০০</span><span className="text-emerald-400 font-mono">BTEB Code: 27117</span></div>
                </a>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs"><Navigation className="w-4 h-4" />গুগল ম্যাপসে ডিরেকশন খুলুন<ExternalLink className="w-3 h-3" /></a>
                <button type="button" onClick={copy} className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold cursor-pointer">
                  {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">কপি হয়েছে!</span></> : <><Copy className="w-3.5 h-3.5" /><span>লিংক</span></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
