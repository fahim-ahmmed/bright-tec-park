'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, MessageCircleQuestion } from 'lucide-react';
import { INSTITUTE_INFO } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from './SectionHeading';

export default function HomeFAQ() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = isBn
    ? [
        ['ভর্তি হতে কী করতে হবে?', 'অনলাইনে ভর্তি ফর্ম পূরণ করে অ্যাডমিশন স্লিপ নিন। এরপর ক্যাম্পাসে এসে অথবা বিকাশের মাধ্যমে ভর্তি নিশ্চিত করুন। সাহায্য লাগলে ফোন করুন।'],
        ['ফি কি কিস্তিতে দেওয়া যায়?', 'হ্যাঁ, কিস্তিতে ফি পরিশোধের সুবিধা আছে। এই পেজের ফি ক্যালকুলেটরে ১, ২ বা ৩ কিস্তির হিসাব দেখে নিতে পারবেন।'],
        ['সনদ কি সরকারি অনুমোদিত?', 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) অনুমোদিত, কোড ২৭১১৭। কোন কোর্সে BTEB সনদ আছে তা প্রতিটি কোর্সের পাতায় দেখুন। সনদ অনলাইনে যাচাই করা যায়।'],
        ['HSC50 কুপন কী?', 'এইচএসসি পরীক্ষার্থীদের জন্য ৫০% বিশেষ ছাড়। ভর্তি ফর্মে HSC50 কোড দিলে ছাড় প্রযোজ্য হয়। অফার চলবে ' + 'এপ্রিল–জুন ২০২৬ সেশনে।'],
        ['ক্লাসে কি কম্পিউটার শেয়ার করতে হয়?', 'না। ল্যাবে প্রত্যেক শিক্ষার্থীর জন্য আলাদা কম্পিউটার নির্ধারিত থাকে, তাই শতভাগ প্র্যাকটিক্যাল চর্চা করা যায়।'],
        ['অফিস কখন খোলা থাকে?', INSTITUTE_INFO.workingHoursBn + '। সরাসরি এসে বা ফোনে যোগাযোগ করতে পারেন।'],
      ]
    : [
        ['How do I get admitted?', 'Fill in the online admission form and download your slip. Then confirm your seat at the campus or through bKash. Call us if you need help.'],
        ['Can I pay the fee in instalments?', 'Yes. Instalment payment is available. Use the fee calculator on this page to see 1, 2 or 3 instalment plans.'],
        ['Is the certificate government-approved?', 'Bengal Computer Training Institute is approved by the Bangladesh Technical Education Board (BTEB), code 27117. Check each course page for the BTEB certificate. Certificates can be verified online.'],
        ['What is the HSC50 coupon?', 'A special 50% waiver for HSC candidates. Enter HSC50 in the admission form. The offer runs for the April–June 2026 session.'],
        ['Do students share computers in class?', 'No. Every student gets a dedicated computer in the lab, so practice is fully hands-on.'],
        ['What are the office hours?', INSTITUTE_INFO.workingHoursEn + '. Visit us or call anytime during these hours.'],
      ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow={isBn ? 'সাধারণ প্রশ্নোত্তর' : 'FAQ'}
              title={isBn ? 'আপনার মনে ' : 'Questions you '}
              highlight={isBn ? 'যে প্রশ্নগুলো আসে' : 'may have'}
              className="!mb-6"
            />
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><MessageCircleQuestion className="h-5 w-5" /></span>
              <p className="text-sm font-bold text-white">{isBn ? 'আরও কিছু জানতে চান?' : 'Need more help?'}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{isBn ? 'সরাসরি কল করুন অথবা ক্যাম্পাসে চলে আসুন।' : 'Call us or visit the campus.'}</p>
              <a href={`tel:${INSTITUTE_INFO.phone1}`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition-colors hover:bg-emerald-400">
                <Phone className="h-4 w-4" />{INSTITUTE_INFO.phone1}
              </a>
              <Link href="/campus" className="mt-3 block text-xs font-semibold text-emerald-300 hover:underline">{isBn ? 'ক্যাম্পাসের লোকেশন দেখুন →' : 'See campus location →'}</Link>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {faqs.map(([q, a], i) => {
              const open = openIdx === i;
              return (
                <div key={q} className={`overflow-hidden rounded-2xl border transition-colors ${open ? 'border-emerald-500/40 bg-slate-900' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-bold text-white">{q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-400' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300">{a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}