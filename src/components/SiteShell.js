'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppChatFAB from '@/components/WhatsAppChatFAB';

// Public site chrome (navbar/footer/WhatsApp) is hidden inside /admin.
export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return <div className="min-h-screen bg-slate-950">{children}</div>;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppChatFAB />
    </div>
  );
}