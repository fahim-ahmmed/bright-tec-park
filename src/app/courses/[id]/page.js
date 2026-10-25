import { notFound } from 'next/navigation';
import CourseDetailView from '@/components/CourseDetailView';
import { COURSES_DATA, getCourseById } from '@/data/mockData';

export function generateStaticParams() {
  return COURSES_DATA.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) return { title: 'কোর্স পাওয়া যায়নি' };
  return { title: `${course.titleBn} | Bengal Institute`, description: course.descriptionBn };
}

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) notFound();
  return <CourseDetailView course={course} />;
}
