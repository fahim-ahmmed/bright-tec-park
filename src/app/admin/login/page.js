import { redirect } from 'next/navigation';
import { getAdmin, adminConfigured } from '@/lib/admin-auth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata = { title: 'অ্যাডমিন লগইন | Bengal Institute', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect('/admin');
  return <AdminLoginForm configured={adminConfigured()} />;
}