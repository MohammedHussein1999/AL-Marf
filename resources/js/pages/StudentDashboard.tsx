import { Head, Link } from '@inertiajs/react';
import { BookOpen, CheckCircle, Clock, Star } from 'lucide-react';
import { useState } from 'react';

interface EnrolledCourse {
    id: number;
    title: string;
    slug: string;
    progress: number;
    enrollments_count: number;
    category?: { name: string };
    instructor?: { name: string };
}

interface StudentStats {
    totalCourses: number;
    completedCourses: number;
    hoursLearned: number;
    averageRating: number;
}

export default function StudentDashboard() {
    // بيانات ستاتيك
    const auth = { user: { name: 'محمد علي' } };

    const enrolledCourses: EnrolledCourse[] = [
        {
            id: 1,
            title: 'دورة React',
            slug: 'learn-react',
            progress: 40,
            enrollments_count: 15,
            instructor: { name: 'أحمد سمير' },
        },
        {
            id: 2,
            title: 'دورة تصميم واجهات',
            slug: 'ui-design',
            progress: 100,
            enrollments_count: 20,
            instructor: { name: 'سارة حسين' },
        },
        {
            id: 3,
            title: 'دورة تسويق رقمي',
            slug: 'digital-marketing',
            progress: 70,
            enrollments_count: 10,
            instructor: { name: 'محمد علي' },
        },
    ];

    const stats: StudentStats = {
        totalCourses: enrolledCourses.length,
        completedCourses: enrolledCourses.filter((c) => c.progress === 100)
            .length,
        hoursLearned: 120,
        averageRating: 4.5,
    };

    const [activeTab, setActiveTab] = useState('ongoing');

    const ongoingCourses = enrolledCourses.filter((c) => c.progress < 100);
    const completedCourses = enrolledCourses.filter((c) => c.progress === 100);

    return (
        <>
            <Head title="لوحتي - أكاديمية المعارف" />

            <div className="min-h-screen bg-gray-50" dir="rtl">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                                المعارف
                            </span>
                            <BookOpen className="h-8 w-8 text-blue-600" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/courses"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                الدورات
                            </Link>
                            <Link
                                href="/categories"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                الفئات
                            </Link>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span>{auth.user.name}</span>
                                <button className="text-red-600 hover:text-red-700">
                                    خروج
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-2 text-3xl font-bold">
                            مرحباً {auth.user.name}
                        </h1>
                        <p className="text-lg opacity-90">
                            استمر في رحلتك التعليمية معنا
                        </p>
                    </div>
                </section>

                {/* Stats Cards */}
                <div className="mx-auto -mt-8 mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-600">
                                    إجمالي الدورات
                                </h3>
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="text-4xl font-bold text-gray-900">
                                {stats.totalCourses}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                دورات مسجلة
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-600">
                                    دورات مكتملة
                                </h3>
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <p className="text-4xl font-bold text-gray-900">
                                {stats.completedCourses}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                دورات منتهية
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-600">
                                    ساعات التعلم
                                </h3>
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <p className="text-4xl font-bold text-gray-900">
                                {stats.hoursLearned}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                ساعة تعلم
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-600">
                                    متوسط التقييم
                                </h3>
                                <Star className="h-6 w-6 text-yellow-600" />
                            </div>
                            <p className="text-4xl font-bold text-gray-900">
                                {stats.averageRating.toFixed(1)}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                من 5 نجوم
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs & Courses */}
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="mb-6 rounded-lg bg-white shadow-md">
                        <div className="flex gap-4 border-b px-6 py-4">
                            <button
                                onClick={() => setActiveTab('ongoing')}
                                className={`pb-2 font-semibold transition ${
                                    activeTab === 'ongoing'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                دوراتي الحالية ({ongoingCourses.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`pb-2 font-semibold transition ${
                                    activeTab === 'completed'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                دورات مكتملة ({completedCourses.length})
                            </button>
                        </div>

                        {/* Courses Content */}
                        {activeTab === 'ongoing' && (
                            <div className="p-6">
                                {ongoingCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {ongoingCourses.map((course) => (
                                            <Link
                                                key={course.id}
                                                href="#"
                                                className="group flex items-center gap-4 rounded-lg border p-4 transition hover:bg-gray-50"
                                            >
                                                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600">
                                                    <BookOpen className="h-12 w-12 text-white opacity-30" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                                                        {course.title}
                                                    </h3>
                                                    {course.instructor && (
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            المعلم:{' '}
                                                            {
                                                                course
                                                                    .instructor
                                                                    .name
                                                            }
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2 max-w-xs flex-1 rounded-full bg-gray-200">
                                                            <div
                                                                className="h-full rounded-full bg-blue-600 transition"
                                                                style={{
                                                                    width: `${course.progress}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="w-12 text-sm font-semibold text-gray-600">
                                                            {course.progress}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                                                    متابعة
                                                </button>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                        <p className="mb-4 text-gray-600">
                                            لم تسجل في أي دورات حتى الآن
                                        </p>
                                        <Link
                                            href="/courses"
                                            className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                        >
                                            استكشف الدورات
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'completed' && (
                            <div className="p-6">
                                {completedCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {completedCourses.map((course) => (
                                            <Link
                                                key={course.id}
                                                href="#"
                                                className="group flex items-center gap-4 rounded-lg border p-4 transition hover:bg-gray-50"
                                            >
                                                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600">
                                                    <CheckCircle className="h-12 w-12 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                                                        {course.title}
                                                    </h3>
                                                    {course.instructor && (
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            المعلم:{' '}
                                                            {
                                                                course
                                                                    .instructor
                                                                    .name
                                                            }
                                                        </p>
                                                    )}
                                                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        مكتملة بنسبة 100%
                                                    </span>
                                                </div>
                                                <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                                                    الشهادة
                                                </button>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                        <p className="mb-4 text-gray-600">
                                            لم تكمل أي دورات بعد
                                        </p>
                                        <Link
                                            href="/courses"
                                            className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                        >
                                            استكشف الدورات
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Recommended Courses */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-2xl font-bold">
                            دورات قد تهمك
                        </h2>
                        <p className="mb-4 text-gray-600">
                            استكشف دورات جديدة بناءً على اهتماماتك
                        </p>
                        <Link
                            href="/courses"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
                        >
                            استكشف المزيد
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
