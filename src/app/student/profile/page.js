import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import ProfileForm from '@/components/student/ProfileForm';

export const metadata = { title: 'আমার প্রোফাইল | Bengal Institute' };
export const dynamic = 'force-dynamic';

export default async function StudentProfilePage() {
  let session = null;
  try { session = await getServerSession(); } catch {}
  if (!session) redirect('/login?next=/student/profile');
  const { name, email, image } = session.user;
  return <ProfileForm user={{ name, email, image: image || null }} />;
}