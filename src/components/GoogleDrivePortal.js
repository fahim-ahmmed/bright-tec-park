'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HardDrive, FolderPlus, Upload, Trash2, ExternalLink, FileText, Folder, Search, RefreshCw, FileSpreadsheet, FilePlus2, LogIn } from 'lucide-react';
import { Button } from '@heroui/react';
import { useToaster } from '@gravity-ui/uikit';
import { authClient, useSession } from '@/lib/auth-client';
import { useLanguage } from '@/context/LanguageContext';
import { listDriveFiles, createDriveFolder, uploadFileToDrive, deleteDriveFile, getDriveStorageInfo, createSpreadsheet, createDocument } from '@/services/googleDriveService';

const fmtSize = (b) => (b ? (Number(b) > 1048576 ? `${(Number(b) / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(Number(b) / 1024))} KB`) : '');

export default function GoogleDrivePortal() {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { add } = useToaster();
  const { data: session, isPending } = useSession();
  const fileRef = useRef(null);

  const [token, setToken] = useState(null);
  const [state, setState] = useState('checking'); // checking | need-google | ready
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState(null);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const googleOn = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true';

  const toast = useCallback((title, theme = 'success', content) => add({ name: `drv-${Date.now()}`, title, content, theme, autoHiding: 4000 }), [add]);

  const load = useCallback(async (tk, search = '') => {
    setLoading(true);
    try {
      const [list, st] = await Promise.all([listDriveFiles(tk, { searchQuery: search }), getDriveStorageInfo(tk).catch(() => null)]);
      setFiles(list.files || []); setInfo(st);
    } catch (err) { toast(isBn ? 'ড্রাইভ লোড করা যায়নি' : 'Could not load Drive', 'danger', err.message); }
    finally { setLoading(false); }
  }, [isBn, toast]);

  useEffect(() => {
    if (isPending || !session) return;
    fetch('/api/google-token').then(async (r) => {
      if (!r.ok) return setState('need-google');
      const { accessToken } = await r.json();
      setToken(accessToken); setState('ready'); load(accessToken);
    }).catch(() => setState('need-google'));
  }, [session, isPending, load]);

  const connect = async () => {
    const { error } = await authClient.linkSocial({ provider: 'google', callbackURL: '/drive' }).catch((e) => ({ error: e }));
    if (error) toast(isBn ? 'গুগল সংযোগ ব্যর্থ' : 'Google connect failed', 'danger', error.message);
  };

  const run = async (fn, okMsg) => { try { await fn(); toast(okMsg); load(token, q); } catch (err) { toast(isBn ? 'অপারেশন ব্যর্থ' : 'Operation failed', 'danger', err.message); } };

  if (isPending) return <div className="py-16 text-center text-xs text-slate-400">…</div>;

  const shell = (children) => <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 sm:p-8">{children}</div>;

  if (!session) return shell(
    <div className="text-center space-y-4 py-6">
      <HardDrive className="w-10 h-10 text-amber-400 mx-auto" />
      <p className="text-sm text-slate-300">{isBn ? 'ড্রাইভ পোর্টাল ব্যবহার করতে আগে লগইন করুন।' : 'Please log in to use the Drive portal.'}</p>
      <Button as={Link} href="/login?next=/drive" className="bg-emerald-500 text-slate-950 font-bold" startContent={<LogIn className="w-4 h-4" />}>{isBn ? 'লগইন করুন' : 'Log in'}</Button>
    </div>
  );

  if (state === 'checking') return <div className="py-16 text-center text-xs text-slate-400">…</div>;

  if (state === 'need-google') return shell(
    <div className="text-center space-y-4 py-6 max-w-md mx-auto">
      <HardDrive className="w-10 h-10 text-amber-400 mx-auto" />
      <p className="text-sm text-slate-300">{isBn ? 'গুগল ড্রাইভ ব্যবহার করতে আপনার গুগল অ্যাকাউন্ট যুক্ত করুন।' : 'Connect your Google account to use Google Drive.'}</p>
      {googleOn ? <Button onPress={connect} className="bg-amber-500 text-slate-950 font-bold">{isBn ? 'গুগল অ্যাকাউন্ট যুক্ত করুন' : 'Connect Google account'}</Button>
        : <p className="text-xs text-amber-300">{isBn ? 'অ্যাডমিন: .env-এ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ও NEXT_PUBLIC_GOOGLE_ENABLED=true সেট করুন।' : 'Admin: set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and NEXT_PUBLIC_GOOGLE_ENABLED=true in .env.'}</p>}
    </div>
  );

  return shell(
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400 min-w-0">
          <div className="text-white font-bold truncate">{info?.user?.displayName || session.user.name}</div>
          <div className="font-mono truncate">{info?.user?.emailAddress || session.user.email}</div>
          {info?.usage && <div className="mt-1">{isBn ? 'ব্যবহৃত:' : 'Used:'} {fmtSize(info.usage)}{info.limit ? ` / ${fmtSize(info.limit)}` : ''}</div>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { const n = window.prompt(isBn ? 'নতুন ফোল্ডারের নাম:' : 'New folder name:'); if (n?.trim()) run(() => createDriveFolder(token, n.trim()), isBn ? 'ফোল্ডার তৈরি হয়েছে' : 'Folder created'); }} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"><FolderPlus className="w-4 h-4 text-amber-400" />{isBn ? 'ফোল্ডার' : 'Folder'}</button>
          <button type="button" onClick={() => { const n = window.prompt(isBn ? 'স্প্রেডশিটের নাম:' : 'Spreadsheet title:'); if (n?.trim()) run(async () => { const r = await createSpreadsheet(token, n.trim()); window.open(r.url, '_blank', 'noopener'); }, isBn ? 'স্প্রেডশিট তৈরি হয়েছে' : 'Spreadsheet created'); }} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"><FileSpreadsheet className="w-4 h-4 text-emerald-400" />Sheet</button>
          <button type="button" onClick={() => { const n = window.prompt(isBn ? 'ডকুমেন্টের নাম:' : 'Document title:'); if (n?.trim()) run(async () => { const r = await createDocument(token, n.trim()); window.open(r.url, '_blank', 'noopener'); }, isBn ? 'ডকুমেন্ট তৈরি হয়েছে' : 'Document created'); }} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"><FilePlus2 className="w-4 h-4 text-sky-400" />Doc</button>
          <button type="button" onClick={() => fileRef.current?.click()} className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"><Upload className="w-4 h-4" />{isBn ? 'আপলোড' : 'Upload'}</button>
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) run(() => uploadFileToDrive(token, f, f.name), isBn ? 'ফাইল আপলোড হয়েছে' : 'File uploaded'); e.target.value = ''; }} />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); load(token, q); }} className="flex gap-2">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search Drive" placeholder={isBn ? 'ফাইল খুঁজুন...' : 'Search files...'} className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500" /></div>
        <button type="submit" className="px-3 rounded-xl bg-slate-800 text-slate-200 cursor-pointer" aria-label="Refresh"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
      </form>

      {files.length === 0 && !loading ? <p className="text-center text-xs text-slate-400 py-8">{isBn ? 'কোনো ফাইল পাওয়া যায়নি।' : 'No files found.'}</p> : (
        <ul className="space-y-2">
          {files.map((f) => {
            const isFolder = f.mimeType === 'application/vnd.google-apps.folder';
            return (
              <li key={f.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs">
                {isFolder ? <Folder className="w-4 h-4 text-amber-400 shrink-0" /> : <FileText className="w-4 h-4 text-emerald-400 shrink-0" />}
                <span className="text-slate-200 font-medium truncate flex-1">{f.name}</span>
                <span className="text-slate-500 font-mono text-[11px] hidden sm:block">{fmtSize(f.size)}</span>
                {f.webViewLink && <a href={f.webViewLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-slate-800 text-sky-400" aria-label="Open"><ExternalLink className="w-4 h-4" /></a>}
                <button type="button" aria-label="Delete" onClick={() => { if (window.confirm(isBn ? `"${f.name}" স্থায়ীভাবে মুছে ফেলবেন?` : `Permanently delete "${f.name}"?`)) run(() => deleteDriveFile(token, f.id), isBn ? 'মুছে ফেলা হয়েছে' : 'Deleted'); }} className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
