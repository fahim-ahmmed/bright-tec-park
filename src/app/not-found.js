import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <p className="text-5xl font-black text-emerald-400 font-mono">404</p>
      <h1 className="text-xl font-black text-white">পেজটি খুঁজে পাওয়া যায়নি / Page not found</h1>
      <Link href="/" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm">হোমে ফিরুন / Back to home</Link>
    </div>
  );
}
