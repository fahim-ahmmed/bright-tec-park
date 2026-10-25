'use client';
import { useState } from 'react';
import { Building2, Monitor, Award } from 'lucide-react';
import CampusBuildingView from './CampusBuildingView';
import { ComputerLabPhotoView, CertificatePhotoView } from './LabAndCertificateViews';
import { INSTITUTE_STATISTICS } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

// Real-photo hero: building / lab / certificate views. If you add the original photos to /public
// (20211010_170230_edited.jpg, IMG_2810.JPG, IMG_2816.JPG) they are used instead of the vector art.
const VIEWS = [
  { id: 'building', icon: Building2, bn: 'ক্যাম্পাস ভবন', en: 'Campus Building', photo: '/20211010_170230_edited.jpg', Art: CampusBuildingView },
  { id: 'lab', icon: Monitor, bn: 'কম্পিউটার ল্যাব', en: 'Computer Lab', photo: '/IMG_2810.JPG', Art: ComputerLabPhotoView },
  { id: 'cert', icon: Award, bn: 'সনদ হস্তান্তর', en: 'Certificates', photo: '/IMG_2816.JPG', Art: CertificatePhotoView },
];

function View({ v }) {
  const [broken, setBroken] = useState(false);
  if (!broken) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={v.photo} alt={v.en} onError={() => setBroken(true)} className="w-full h-full object-cover" />;
  }
  return <v.Art />;
}

export default function ModernizedHeroBanner({ showStats = true }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [active, setActive] = useState('building');
  const current = VIEWS.find((v) => v.id === active);
  const stats = [[INSTITUTE_STATISTICS.courseCount, isBn ? 'কোর্স' : 'Courses'], [INSTITUTE_STATISTICS.btebApprovedCourses, isBn ? 'BTEB কোর্স' : 'BTEB Courses'], [INSTITUTE_STATISTICS.successfulStudents, isBn ? 'সফল শিক্ষার্থী' : 'Graduates'], [INSTITUTE_STATISTICS.averagePlacementRate, isBn ? 'গড় প্লেসমেন্ট' : 'Avg. Placement']];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar" role="tablist">
        {VIEWS.map((v) => (
          <button key={v.id} type="button" role="tab" aria-selected={active === v.id} onClick={() => setActive(v.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${active === v.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'}`}>
            <v.icon className="w-3.5 h-3.5" />{isBn ? v.bn : v.en}
          </button>
        ))}
      </div>
      <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl aspect-[16/10] sm:aspect-[16/8]" key={current.id}><View v={current} /></div>
      {showStats && <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(([v, l]) => <div key={l} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center"><div className="text-xl sm:text-2xl font-black text-white font-mono">{v}</div><div className="text-[11px] text-slate-400">{l}</div></div>)}
      </div>}
    </div>
  );
}
