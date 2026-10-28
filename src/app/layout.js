import '@gravity-ui/uikit/styles/styles.css';
import './globals.css';
import { Hind_Siliguri, Outfit } from 'next/font/google';
import Script from 'next/script';
import Providers from './providers';
import SiteShell from '@/components/SiteShell';

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata = {
  title: 'Bengal Computer Training Institute - Kushtia | BTEB Approved (Code: 27117)',
  description:
    'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট - সিঙ্গার মোড়, আজিজুর রহমান সুপার মার্কেট (জনতা ব্যাংক ভবন), কুষ্টিয়া। বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত সরকারি ও ফ্রিল্যান্সার ক্যারিয়ার সেন্টার।',
  openGraph: {
    title: 'Bengal Computer Training Institute - Kushtia',
    description:
      'জনতা ব্যাংক ভবনের ১ম তলা, সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া। আধুনিক কম্পিউটার ল্যাব, প্র্যাকটিক্যাল প্রশিক্ষণ ও BTEB অনুমোদিত সার্টিফিকেট।',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { width: 'device-width', initialScale: 1 };

const themeInit = `(function(){try{var s=localStorage.getItem('bengal_theme');var r=document.documentElement;if(s==='light'){r.classList.add('light');r.setAttribute('data-theme','light')}else{r.classList.add('dark');r.setAttribute('data-theme','dark')}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${hind.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-black`}
      >
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}