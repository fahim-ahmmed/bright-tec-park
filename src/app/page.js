import HomeHero from '@/components/home/HomeHero';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeProcess from '@/components/home/HomeProcess';
import HomeTeachers from '@/components/home/HomeTeachers';
import HomeTools from '@/components/home/HomeTools';
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <ScrollReveal><HscOfferBanner /></ScrollReveal>
      </section>
      <CoursesSection showFilters={false} limit={6} showcase />
      <HomeFeatures />
      <HomeProcess />
      <HomeTeachers />
      <TenDayRoadmap />
      <section id="calculator" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <ScrollReveal><FeeCalculator /></ScrollReveal>
      </section>
      <HomeTools />
      <StudentReviews />
      <HomeFinalCTA />
    </>
  );
}
