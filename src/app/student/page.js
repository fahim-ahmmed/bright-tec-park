import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import StudentDashboard from '@/components/StudentDashboard';

export const metadata = { title: 'শিক্ষার্থী ড্যাশবোর্ড | Bengal Institute' };
export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  let session = null;
  try { session = await getServerSession(); } catch {}
  if (!session) redirect('/login?next=/student');
  const { name, email, image } = session.user;
  return <StudentDashboard user={{ name, email, image: image || null }} />;
}
