import { NextResponse } from 'next/server';
import { findCertificate } from '@/lib/certificates';

export const runtime = 'nodejs';

export async function GET(_req, { params }) {
  const { id } = await params;
  const cert = await findCertificate(id);
  if (!cert) return NextResponse.json({ found: false }, { status: 404 });
  return NextResponse.json({ found: true, certificate: cert });
}
