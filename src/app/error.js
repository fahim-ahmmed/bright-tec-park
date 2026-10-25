'use client';

export default function Error({ error, reset }) {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <h1 className="text-xl font-black text-white">কিছু একটা সমস্যা হয়েছে / Something went wrong</h1>
      <p className="text-xs text-slate-400 break-words">{error?.message}</p>
      <button type="button" onClick={reset} className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm cursor-pointer">আবার চেষ্টা করুন / Try again</button>
    </div>
  );
}
