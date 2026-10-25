import { notFound } from 'next/navigation';
import CertificateView from '@/components/CertificateView';
import { findCertificate } from '@/lib/certificates';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'অফিশিয়াল সার্টিফিকেট | Bengal Institute', robots: { index: false } };

export default async function CertificatePage({ params }) {
  const { id } = await params;
  const cert = await findCertificate(decodeURIComponent(id));
  if (!cert) notFound();
  return <CertificateView cert={cert} />;
}
