'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { COURSES_DATA, INSTITUTE_STATISTICS } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

// Charts only use real course data (fees, seats). No invented placement numbers.
export default function CourseAnalytics() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const fees = COURSES_DATA.map((c) => ({ name: (isBn ? c.titleBn : c.titleEn).slice(0, 14) + '…', regular: c.fee, offer: c.discountFee || c.fee }));
  const seats = COURSES_DATA.map((c) => ({ name: (isBn ? c.titleBn : c.titleEn).slice(0, 14) + '…', enrolled: c.batchInfo.enrolledStudents, free: c.batchInfo.totalSeats - c.batchInfo.enrolledStudents }));
  const stats = [[INSTITUTE_STATISTICS.courseCount, isBn ? 'কোর্স' : 'Courses'], [INSTITUTE_STATISTICS.btebApprovedCourses, isBn ? 'BTEB কোর্স' : 'BTEB courses'], [INSTITUTE_STATISTICS.successfulStudents, isBn ? 'সফল শিক্ষার্থী' : 'Graduates'], [INSTITUTE_STATISTICS.averagePlacementRate, isBn ? 'গড় প্লেসমেন্ট' : 'Avg. placement']];
  const tip = { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, color: '#e2e8f0', fontSize: 12 };

  return (
    <section id="course-analytics" className="py-12 sm:py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white">{isBn ? 'কোর্স অ্যানালিটিক্স' : 'Course Analytics'}</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{stats.map(([v, l]) => <div key={l} className="p-4 rounded-2xl bg-slate-900 border border-slate-800"><div className="text-2xl font-black text-emerald-400 font-mono">{v}</div><div className="text-xs text-slate-400">{l}</div></div>)}</div>
        {[[isBn ? 'কোর্স ফি (নিয়মিত বনাম অফার, ৳)' : 'Course fees (regular vs offer, ৳)', fees, [['regular', '#64748b'], ['offer', '#10b981']]], [isBn ? 'ব্যাচের আসন (ভর্তি বনাম খালি)' : 'Batch seats (enrolled vs free)', seats, [['enrolled', '#0ea5e9'], ['free', '#f59e0b']]]].map(([title, data, bars]) => (
          <div key={title} className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-4">{title}</h2>
            <div className="w-full h-72 overflow-x-auto"><div className="min-w-[560px] h-full">
              <ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid stroke="#1e293b" strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} /><YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} /><Tooltip contentStyle={tip} /><Legend />{bars.map(([k, c]) => <Bar key={k} dataKey={k} fill={c} radius={[4, 4, 0, 0]} />)}</BarChart></ResponsiveContainer>
            </div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
