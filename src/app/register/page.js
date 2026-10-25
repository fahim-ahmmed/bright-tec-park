import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getServerSession } from '@/lib/auth';

export const metadata = { title: 'Register | Bengal Institute' };
export const dynamic = 'force-dynamic';

export default async function Page() {
  let session = null;
  try { session = await getServerSession(); } catch {}
  if (session) redirect('/student');
  return (
    <div className="px-4 py-10 sm:py-16">
      <Suspense fallback={null}>
        <AuthForm mode="register" />
      </Suspense>
    </div>
  );
}
