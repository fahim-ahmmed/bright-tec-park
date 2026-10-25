import CoursesSection from '@/components/CoursesSection';

export const metadata = {
  title: 'কোর্সসমূহ | Bengal Computer Training Institute',
  description: 'কম্পিউটার অফিস অ্যাপ্লিকেশন, এআই ও ফ্রিল্যান্সিং, গ্রাফিক ডিজাইন, ওয়েব ডিজাইন, সাইবার সিকিউরিটি ও আরও ৮টি কোর্স।',
};

export default function CoursesPage() {
  return <CoursesSection showFilters showcase />;
}
