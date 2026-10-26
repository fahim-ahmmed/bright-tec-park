import HomeHero from '@/components/home/HomeHero';
import HomeNotices from '@/components/home/HomeNotices';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeProcess from '@/components/home/HomeProcess';
import HomeTeachers from '@/components/home/HomeTeachers';
import HomeTools from '@/components/home/HomeTools';
import HomeFAQ from '@/components/home/HomeFAQ';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import HscOfferBanner from '@/components/HscOfferBanner';
import CoursesSection from '@/components/CoursesSection';
import TenDayRoadmap from '@/components/TenDayRoadmap';
import FeeCalculator from '@/components/FeeCalculator';
import StudentReviews from '@/components/StudentReviews';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeNotices />
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><HscOfferBanner /></ScrollReveal>
        </div>
      </section>
      <CoursesSection showFilters={false} limit={6} showcase />
      <HomeFeatures />
      <HomeProcess />
      <HomeTeachers />
      <TenDayRoadmap heading="h2" />
      <section id="calculator" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal><FeeCalculator /></ScrollReveal>
      </section>
      <HomeTools />
      <StudentReviews />
      <HomeFAQ />
      <HomeFinalCTA />
    </>
  );
}