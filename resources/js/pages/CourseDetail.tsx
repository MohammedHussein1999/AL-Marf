import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    ChevronRight,
    Clock,
    Star,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Lesson {
    id: number;
    title: string;
    video_url: string;
    duration: number;
    order: number;
}

interface Review {
    id: number;
    user: { name: string };
    rating: number;
    comment: string;
    created_at: string;
}

interface RelatedCourse {
    id: number;
    title: string;
    slug: string;
    price: number;
    enrollments_count: number;
    instructor?: { name: string };
}

interface Course {
    id: number;
    title: string;
    description: string;
    long_description: string;
    price: number;
    level: string;
    type: string;
    lessons: Lesson[];
    reviews: Review[];
    category?: { name: string };
    instructor?: { id: number; name: string; bio: string };
}

interface Props {
    course: Course;
    rating: number;
    reviewsCount: number;
    enrollmentsCount: number;
    relatedCourses: RelatedCourse[];
}

export default function CourseDetail() {
    const page = usePage<SharedData & Props>();
    const { course, rating, reviewsCount, enrollmentsCount, relatedCourses } =
        page.props;
    const { auth } = page.props;
    const [activeTab, setActiveTab] = useState('overview');

    const totalDuration = course.lessons.reduce(
        (sum, lesson) => sum + (lesson.duration || 0),
        0,
    );
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;

    return (
        <>
            <Head title={`${course.title} - أكاديمية المعارف`} />

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
                        <Link
                            href="/courses"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← الدورات
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Left Content */}
                            <div className="lg:col-span-2">
                                {course.category && (
                                    <div className="mb-4">
                                        <span className="bg-opacity-20 rounded-full bg-white px-3 py-1 text-sm font-semibold">
                                            {course.category.name}
                                        </span>
                                    </div>
                                )}
                                <h1 className="mb-4 text-4xl font-bold">
                                    {course.title}
                                </h1>
                                <p className="mb-6 text-lg opacity-90">
                                    {course.description}
                                </p>

                                {/* Stats */}
                                <div className="mb-6 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-yellow-400" />
                                        <span className="font-semibold">
                                            {rating} ({reviewsCount} تقييم)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <span className="font-semibold">
                                            {enrollmentsCount} طالب
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        <span className="font-semibold">
                                            {hours > 0 ? `${hours} ساعة` : ''}{' '}
                                            {minutes > 0
                                                ? `${minutes} دقيقة`
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Instructor */}
                                {course.instructor && (
                                    <Link
                                        href={`/instructors/${course.instructor.id}`}
                                        className="bg-opacity-10 hover:bg-opacity-20 inline-block rounded-lg bg-white px-4 py-2 transition"
                                    >
                                        <div className="font-semibold">
                                            المعلم: {course.instructor.name}
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Right Sidebar - Price Card */}
                            <div className="h-fit rounded-lg bg-white p-6 text-gray-900">
                                <div className="mb-4 text-4xl font-bold text-blue-600">
                                    {course.price === 0
                                        ? 'مجاني'
                                        : `${course.price} ر.س`}
                                </div>
                                <button
                                    className={`mb-3 w-full rounded-lg py-3 font-semibold transition ${
                                        auth.user
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {auth.user ? 'التحقيق الآن' : 'تسجيل للبدء'}
                                </button>
                                <button className="w-full rounded-lg border-2 border-gray-300 py-3 font-semibold transition hover:border-gray-400">
                                    مشاركة
                                </button>

                                {/* Course Info */}
                                <div className="mt-6 space-y-3 border-t pt-6">
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm">
                                            {course.lessons.length} درس
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm">
                                            شهادة معتمدة
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">
                                            {course.type === 'online'
                                                ? '🌐 أون لاين'
                                                : '📍 حضور'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Tabs */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            <div className="mb-6 flex gap-4 border-b">
                                {['overview', 'lessons', 'reviews'].map(
                                    (tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-3 font-semibold transition ${
                                                activeTab === tab
                                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            {tab === 'overview'
                                                ? 'نظرة عامة'
                                                : tab === 'lessons'
                                                  ? 'الدروس'
                                                  : 'التقييمات'}
                                        </button>
                                    ),
                                )}
                            </div>

                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="rounded-lg bg-white p-6 shadow-md">
                                    <h2 className="mb-4 text-2xl font-bold">
                                        وصف الدورة
                                    </h2>
                                    <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                                        {course.long_description ||
                                            course.description}
                                    </p>

                                    {course.instructor && (
                                        <div className="mt-8 border-t pt-8">
                                            <h3 className="mb-4 text-xl font-bold">
                                                عن المعلم
                                            </h3>
                                            <div className="rounded-lg bg-blue-50 p-6">
                                                <p className="mb-2 text-lg font-bold">
                                                    {course.instructor.name}
                                                </p>
                                                <p className="text-gray-700">
                                                    {course.instructor.bio}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Lessons Tab */}
                            {activeTab === 'lessons' && (
                                <div className="rounded-lg bg-white p-6 shadow-md">
                                    <h2 className="mb-6 text-2xl font-bold">
                                        محتوى الدورة
                                    </h2>
                                    <div className="space-y-3">
                                        {course.lessons.map((lesson, index) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900">
                                                        {lesson.title}
                                                    </p>
                                                    {lesson.duration && (
                                                        <p className="text-sm text-gray-600">
                                                            {lesson.duration}{' '}
                                                            دقيقة
                                                        </p>
                                                    )}
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                                <div className="rounded-lg bg-white p-6 shadow-md">
                                    <h2 className="mb-6 text-2xl font-bold">
                                        التقييمات ({reviewsCount})
                                    </h2>
                                    {course.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {course.reviews.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="border-b pb-4 last:border-b-0"
                                                >
                                                    <div className="mb-2 flex items-start justify-between">
                                                        <p className="font-semibold text-gray-900">
                                                            {review.user.name}
                                                        </p>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${
                                                                            i <
                                                                            review.rating
                                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                                : 'text-gray-300'
                                                                        }`}
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">
                                                        {review.comment}
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {new Date(
                                                            review.created_at,
                                                        ).toLocaleDateString(
                                                            'ar-SA',
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">
                                            لا توجد تقييمات حتى الآن
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Related Courses */}
                        <div>
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h3 className="mb-4 text-lg font-bold">
                                    دورات ذات صلة
                                </h3>
                                <div className="space-y-4">
                                    {relatedCourses.map((relatedCourse) => (
                                        <Link
                                            key={relatedCourse.id}
                                            href={`/courses/${relatedCourse.slug}`}
                                            className="block rounded-lg border p-3 transition hover:bg-gray-50"
                                        >
                                            <p className="mb-2 line-clamp-2 font-semibold text-gray-900">
                                                {relatedCourse.title}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-blue-600">
                                                    {relatedCourse.price === 0
                                                        ? 'مجاني'
                                                        : `${relatedCourse.price} ر.س`}
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    {
                                                        relatedCourse.enrollments_count
                                                    }{' '}
                                                    طالب
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
