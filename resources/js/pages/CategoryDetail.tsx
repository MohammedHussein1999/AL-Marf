import { Head, Link } from '@inertiajs/react';
import { BookOpen, ChevronRight, Users } from 'lucide-react';

export default function CategoryDetail() {
    // بيانات ستاتيك للاختبار
    const category = { id: 1, name: 'تطوير الويب', slug: 'web-dev' };
    const courses = [
        {
            id: 1,
            title: 'React من الصفر',
            slug: 'react-basics',
            description: 'تعلم أساسيات React بطريقة عملية.',
            price: 200,
            level: 'beginner',
            enrollments_count: 120,
            instructor: { name: 'محمد علي' },
        },
        {
            id: 2,
            title: 'Laravel للمبتدئين',
            slug: 'laravel-basics',
            description: 'دورة كاملة لتعلم Laravel خطوة بخطوة.',
            price: 0,
            level: 'intermediate',
            enrollments_count: 80,
            instructor: { name: 'أحمد حسن' },
        },
    ];

    return (
        <>
            <Head title={`${category.name} - أكاديمية المعارف`} />

            <div className="min-h-screen bg-gray-50" dir="rtl">
                <nav className="sticky top-0 z-50 bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                                المعارف
                            </span>
                            <BookOpen className="h-8 w-8 text-blue-600" />
                        </Link>
                        <Link
                            href="/categories"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← الفئات
                        </Link>
                    </div>
                </nav>

                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/categories"
                            className="mb-4 inline-flex items-center gap-2 text-blue-100 hover:text-white"
                        >
                            <ChevronRight className="h-4 w-4 rotate-180" />{' '}
                            العودة للفئات
                        </Link>
                        <h1 className="mb-4 text-4xl font-bold">
                            {category.name}
                        </h1>
                        <p className="text-xl opacity-90">
                            {courses.length} دورة متاحة في هذه الفئة
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.slug}`}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                                        <BookOpen className="h-20 w-20 text-white opacity-30 transition group-hover:scale-110" />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
                                            {course.title}
                                        </h3>
                                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                            {course.description}
                                        </p>
                                        {course.instructor && (
                                            <p className="mb-3 text-sm text-gray-600">
                                                <span className="font-semibold">
                                                    المعلم:
                                                </span>{' '}
                                                {course.instructor.name}
                                            </p>
                                        )}
                                        <div className="mb-4 flex items-center justify-between border-b pb-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Users className="h-4 w-4" />
                                                <span>
                                                    {course.enrollments_count}{' '}
                                                    طالب
                                                </span>
                                            </div>
                                            <div className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                                                {course.level === 'beginner'
                                                    ? 'مبتدئ'
                                                    : course.level ===
                                                        'intermediate'
                                                      ? 'متوسط'
                                                      : 'متقدم'}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {course.price === 0
                                                    ? 'مجاني'
                                                    : `${course.price} ر.س`}
                                            </div>
                                            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                                                عرض الدورة
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-xl text-gray-600">
                                لا توجد دورات في هذه الفئة حالياً
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
