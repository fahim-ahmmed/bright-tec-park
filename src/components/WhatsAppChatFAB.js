'use client';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Original WhatsAppChatFAB was not in the upload; uses the institute's published hotline.
export default function WhatsAppChatFAB() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const msg = encodeURIComponent(isBn ? 'আসসালামু আলাইকুম, বেঙ্গল ইনস্টিটিউটে ভর্তি সম্পর্কে জানতে চাই।' : 'Hello, I would like to know about admission at Bengal Institute.');
  return (
    <a href={`https://wa.me/8801782824582?text=${msg}`} target="_blank" rel="noopener noreferrer"
      aria-label={isBn ? 'WhatsApp-এ মেসেজ করুন' : 'Chat on WhatsApp'}
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 pl-3 pr-3 sm:pr-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/30 print:hidden">
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">{isBn ? 'WhatsApp চ্যাট' : 'WhatsApp Chat'}</span>
    </a>
  );
}
