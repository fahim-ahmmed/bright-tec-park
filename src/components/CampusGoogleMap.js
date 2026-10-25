'use client';
import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Phone, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const LOCATION = { lat: 23.9038, lng: 89.1235 };

export default function CampusGoogleMap() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const [info, setInfo] = useState(true);
  const [mapType, setMapType] = useState('roadmap');
  const url = INSTITUTE_INFO.googleMapsUrl;

  if (!apiKey) {
    return (
      <div className="relative aspect-[4/3] rounded-xl bg-slate-950 border border-slate-700/80 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-10 h-10 text-emerald-400 mb-3" />
        <h3 className="text-white font-bold text-base mb-1">{isBn ? 'জনতা ব্যাংক ভবন, সিঙ্গার মোড়' : 'Janata Bank Building, Singer Mor'}</h3>
        <p className="text-xs text-slate-400 max-w-sm mb-4">{isBn ? 'আজিজুর রহমান সুপার মার্কেট, ১ম তলা, এন এস রোড, কুষ্টিয়া।' : 'Azizur Rahman Super Market, 1st Floor, NS Road, Kushtia.'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" />{isBn ? 'Google Maps অ্যাপে খুলুন' : 'Open in Google Maps'}
        </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={LOCATION} defaultZoom={16} mapId="DEMO_MAP_ID" mapTypeId={mapType} gestureHandling="cooperative" className="w-full h-full">
          <AdvancedMarker position={LOCATION} title={isBn ? INSTITUTE_INFO.nameBn : INSTITUTE_INFO.nameEn} onClick={() => setInfo((v) => !v)}>
            <Pin background="#10b981" borderColor="#064e3b" glyphColor="#ffffff" />
          </AdvancedMarker>
          {info && (
            <InfoWindow position={LOCATION} onCloseClick={() => setInfo(false)} pixelOffset={[0, -32]}>
              <div className="p-1 max-w-[240px] text-slate-900 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 border-b border-slate-200 pb-1 mb-1.5"><Sparkles className="w-3.5 h-3.5" />{isBn ? 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট' : 'Bengal Computer Training Inst.'}</div>
                <p className="text-[11px] text-slate-600 leading-snug">{isBn ? '১ম তলা, সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া-৭০০০' : '1st Floor, Singer Mor, NS Road, Kushtia-7000'}</p>
                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <a href={`tel:${INSTITUTE_INFO.phone1}`} className="flex items-center gap-1 text-[11px] font-bold text-emerald-700"><Phone className="w-3 h-3" />{INSTITUTE_INFO.phone1}</a>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold inline-flex items-center gap-1"><Navigation className="w-3 h-3" />{isBn ? 'দিকনির্দেশনা' : 'Directions'}</a>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-slate-950/90 border border-slate-700/80 p-1 rounded-lg text-[10px]">
        {[['roadmap', isBn ? 'ম্যাপ' : 'Map'], ['hybrid', isBn ? 'স্যাটেলাইট' : 'Satellite']].map(([k, l]) => (
          <button key={k} type="button" onClick={() => setMapType(k)} className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${mapType === k ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}>{l}</button>
        ))}
      </div>
    </div>
  );
}
