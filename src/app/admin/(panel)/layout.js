import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin-auth';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = { title: 'অ্যাডমিন প্যানেল | Bengal Institute', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({ children }) {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return <AdminShell email={admin.email}>{children}</AdminShell>;
}