'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Sparkles, Wallet, Bell, ClipboardCheck, CalendarDays, Award, Compass, UserRound, Megaphone, ChevronRight } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { COURSES_DATA } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import CourseProgress from './student/CourseProgress';
import FeeLedger from './student/FeeLedger';
import StudentNotices from './student/StudentNotices';
import HomeworkPanel from './student/HomeworkPanel';
import ClassRoutine from './student/ClassRoutine';
import CertificatesPanel from './student/CertificatesPanel';
import ExploreCourses from './student/ExploreCourses';

export default function StudentDashboard({ user }) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('/api/student/overview', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setData(d); setToken((d.admissions.find((a) => a.status === 'enrolled') || d.admissions[0])?.token || ''); })
      .catch(() => setFailed(true));
  }, []);

  const out = async () => { await signOut(); router.push('/'); router.refresh(); };

  const admissions = data?.admissions || [];
  const admission = useMemo(() => admissions.find((a) => a.token === token) || null, [admissions, token]);
  const course = admission ? COURSES_DATA.find((c) => c.id === admission.courseId) : null;
  const notices = data?.notices || [];
  const urgent = notices.find((n) => n.isUrgent);
  const photo = data?.profile?.photo || user.image;
  const displayName = data?.profile?.fullName || user.name;
  const completeness = data?.completeness ?? 0;

  const tabs = [
    ['overview', Sparkles, isBn ? 'ওভারভিউ' : 'Overview'],
    ['fees', Wallet, isBn ? 'ফি ও কিস্তি' : 'Fees'],
    ['notices', Bell, isBn ? 'নোটিশ' : 'Notices', notices.filter((n) => n.isUrgent).length],
    ['homework', ClipboardCheck, isBn ? 'হোমওয়ার্ক' : 'Homework'],
    ['routine', CalendarDays, isBn ? 'ক্লাস রুটিন' : 'Routine'],
    ['certificate', Award, isBn ? 'সনদ ও মার্কশিট' : 'Certificates'],
    ['courses', Compass, isBn ? 'আরও কোর্স' : 'More courses'],
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 items-center gap-3.5">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" className="h-14 w-14 shrink-0 rounded-2xl border-2 border-emerald-500/50 object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 text-xl font-bold text-emerald-400">{(displayName || '?').charAt(0).toUpperCase()}</div>
          )}
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-emerald-400">{isBn ? 'শিক্ষার্থী ড্যাশবোর্ড' : 'Student dashboard'}</p>
            <h1 className="truncate text-lg font-extrabold text-white">{displayName}</h1>
            <p className="truncate font-mono text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/student/profile" className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm font-bold text-white transition-colors hover:border-emerald-500/50">
            <UserRound className="h-4 w-4 text-emerald-400" />{isBn ? 'আমার প্রোফাইল' : 'My profile'}
          </Link>
          <button type="button" onClick={out} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 text-sm font-bold text-rose-300 transition-colors hover:bg-rose-500/20">
            <LogOut className="h-4 w-4" />{isBn ? 'লগআউট' : 'Log out'}
          </button>
        </div>
      </div>

      {/* Urgent notice banner */}
      {urgent && (
        <button type="button" onClick={() => setTab('notices')} className="flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-gold-400/40 bg-gold-400/10 p-4 text-left transition-colors hover:bg-gold-400/15">
          <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold text-gold-300">{isBn ? 'জরুরি নোটিশ' : 'Urgent notice'}</span>
            <span className="block text-sm text-slate-100">{isBn ? urgent.titleBn : urgent.titleEn || urgent.titleBn}</span>
          </span>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold-300" />
        </button>
      )}

      {/* Tabs */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist">
        {tabs.map(([id, Icon, label, badge]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border px-3.5 text-xs font-bold transition-colors ${
              tab === id ? 'border-emerald-500 bg-emerald-500 text-slate-950' : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />{label}
            {badge > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">{badge}</span>}
          </button>
        ))}
      </div>

      {failed && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">{isBn ? 'ড্যাশবোর্ডের তথ্য লোড করা যায়নি। পেজটি রিলোড করুন।' : 'Could not load dashboard data. Please reload.'}</p>}
      {!data && !failed && <div className="space-y-3" aria-busy="true">{[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-900" />)}</div>}

      {data && (
        <>
          {admissions.length > 1 && (tab === 'overview' || tab === 'fees' || tab === 'routine') && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3">
              <label htmlFor="enrol" className="shrink-0 text-xs font-bold text-slate-300">{isBn ? 'কোর্স:' : 'Course:'}</label>
              <select id="enrol" value={token} onChange={(e) => setToken(e.target.value)} className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white focus:border-emerald-500 focus:outline-none">
                {admissions.map((a) => <option key={a.token} value={a.token}>{a.courseName} · {a.token}</option>)}
              </select>
            </div>
          )}

          {tab === 'overview' && (
            <div className="space-y-5">
              <CourseProgress admission={admission} course={course} />
              {admission && <FeeLedger admission={admission} payments={data.payments} compact onMore={() => setTab('fees')} />}

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  [ClipboardCheck, isBn ? 'হোমওয়ার্ক' : 'Homework', isBn ? 'জমা দিন ও স্ট্যাটাস দেখুন' : 'Submit & track', 'homework', 'text-sky-300 bg-sky-500/10'],
                  [Award, isBn ? 'সনদ ও মার্কশিট' : 'Certificates', `${data.certificates.length} ${isBn ? 'টি' : 'available'}`, 'certificate', 'text-gold-300 bg-gold-400/10'],
                  [Compass, isBn ? 'আরও কোর্স' : 'More courses', isBn ? 'ছাড়ে ভর্তি হোন' : 'Enrol at a discount', 'courses', 'text-violet-300 bg-violet-500/10'],
                ].map(([Icon, title, sub, go, tone]) => (
                  <button key={go} type="button" onClick={() => setTab(go)} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left transition-colors hover:border-emerald-500/40">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
                    <span><span className="block text-sm font-bold text-white">{title}</span><span className="block text-xs text-slate-400">{sub}</span></span>
                  </button>
                ))}
              </div>

              {completeness < 100 && (
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{isBn ? `আপনার প্রোফাইল ${completeness.toLocaleString('bn-BD')}% সম্পূর্ণ` : `Your profile is ${completeness}% complete`}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{isBn ? 'ছবি, ঠিকানা ও SSC/HSC-র তথ্য যোগ করুন।' : 'Add your photo, address and SSC/HSC details.'}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completeness}%` }} /></div>
                  </div>
                  <Link href="/student/profile" className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-extrabold text-slate-950 hover:bg-emerald-400">{isBn ? 'প্রোফাইল সম্পূর্ণ করুন' : 'Complete profile'}</Link>
                </div>
              )}

              <StudentNotices notices={notices.slice(0, 3)} compact onMore={() => setTab('notices')} />
            </div>
          )}

          {tab === 'fees' && (admission ? <FeeLedger admission={admission} payments={data.payments} /> : <EmptyEnrol isBn={isBn} />)}
          {tab === 'notices' && <StudentNotices notices={notices} />}
          {tab === 'homework' && <HomeworkPanel defaultCourseId={admission?.courseId} />}
          {tab === 'routine' && <ClassRoutine admission={admission} course={course} />}
          {tab === 'certificate' && <CertificatesPanel certificates={data.certificates} />}
          {tab === 'courses' && <ExploreCourses enrolledIds={admissions.map((a) => a.courseId)} />}
        </>
      )}
    </div>
  );
}

function EmptyEnrol({ isBn }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
      <p className="text-sm text-slate-300">{isBn ? 'এখনও কোনো ভর্তি আবেদন পাওয়া যায়নি।' : 'No admission found yet.'}</p>
      <Link href="/admission" className="mt-4 inline-flex h-10 items-center rounded-xl bg-emerald-500 px-5 text-sm font-extrabold text-slate-950 hover:bg-emerald-400">{isBn ? 'ভর্তি আবেদন করুন' : 'Apply now'}</Link>
    </div>
  );
}