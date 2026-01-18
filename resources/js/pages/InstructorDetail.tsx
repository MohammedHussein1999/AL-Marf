import { Head } from '@inertiajs/react';
import { BookOpen, Users } from 'lucide-react';

export default function InstructorDetail() {
    // بيانات ثابتة للاختبار
    const instructor = {
        name: 'محمد علي',
        bio: 'مدرس ومطور ويب بخبرة 10 سنوات في بناء تطبيقات الويب والتعلم الإلكتروني.',
        experience: 10,
        specialization: 'تطوير الويب',
        courses: [
            {
                id: 1,
                title: 'React للمبتدئين',
                slug: 'react-beginner',
                price: 0,
                level: 'beginner',
                enrollments_count: 120,
                category: { name: 'تطوير' },
            },
            {
                id: 2,
                title: 'Next.js متقدم',
                slug: 'nextjs-advanced',
                price: 200,
                level: 'advanced',
                enrollments_count: 80,
                category: { name: 'تطوير' },
            },
        ],
    };

    return (
        <>
            <Head title={`${instructor.name} - أكاديمية المعارف`} />

            <div className="min-h-screen bg-gray-50" dir="rtl">
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            {instructor.name}
                        </h1>
                        <p className="text-lg opacity-90">{instructor.bio}</p>
                        <p className="mt-2 text-lg opacity-90">
                            <span className="font-semibold">سنوات الخبرة:</span>{' '}
                            {instructor.experience}
                        </p>
                        <p className="mt-2 text-lg opacity-90">
                            <span className="font-semibold">عدد الدورات:</span>{' '}
                            {instructor.courses.length}
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-3xl font-bold">دورات المعلم</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {instructor.courses.map((course) => (
                            <div
                                key={course.id}
                                className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                            >
                                <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                                    <BookOpen className="h-20 w-20 text-white opacity-30 transition group-hover:scale-110" />
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {course.enrollments_count} طالب
                                        </span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-blue-600">
                                        {course.price === 0
                                            ? 'مجاني'
                                            : `${course.price} ر.س`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
