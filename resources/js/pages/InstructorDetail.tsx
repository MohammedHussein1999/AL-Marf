import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Users } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    slug: string;
    price: number;
    level: string;
    enrollments_count: number;
    category?: { name: string };
}

interface Instructor {
    id: number;
    name: string;
    bio: string;
    experience: number;
    specialization: string;
    courses: Course[];
}

interface Props {
    instructor: Instructor;
}

export default function InstructorDetail() {
    const page = usePage<SharedData & Props>();
    const { instructor } = page.props;

    return (
        <>
            <Head title={`${instructor.name} - أكاديمية المعارف`} />

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
                            href="/instructors"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← المعلمون
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-center gap-8">
                            <div className="bg-opacity-20 flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl font-bold">
                                {instructor.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="mb-4 text-4xl font-bold">
                                    {instructor.name}
                                </h1>
                                <div className="space-y-2">
                                    <p className="text-lg opacity-90">
                                        <span className="font-semibold">
                                            التخصص:
                                        </span>{' '}
                                        {instructor.specialization}
                                    </p>
                                    <p className="text-lg opacity-90">
                                        <span className="font-semibold">
                                            سنوات الخبرة:
                                        </span>{' '}
                                        {instructor.experience} سنة
                                    </p>
                                    <p className="text-lg opacity-90">
                                        <span className="font-semibold">
                                            عدد الدورات:
                                        </span>{' '}
                                        {instructor.courses.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="max-w-2xl text-lg opacity-90">
                            {instructor.bio}
                        </p>
                    </div>
                </section>

                {/* Courses Section */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-3xl font-bold">دورات المعلم</h2>

                    {instructor.courses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {instructor.courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.slug}`}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    {/* Course Image */}
                                    <div className="flex h-40 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                                        <BookOpen className="h-20 w-20 text-white opacity-30 transition group-hover:scale-110" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        {/* Category Badge */}
                                        {course.category && (
                                            <div className="mb-2">
                                                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                                    {course.category.name}
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
                                            {course.title}
                                        </h3>

                                        {/* Stats */}
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

                                        {/* Price and Button */}
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
                                لا توجد دورات متاحة حالياً
                            </p>
                        </div>
                    )}
                </div>

                {/* About Section */}
                <section className="bg-blue-50 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-6 text-2xl font-bold">عن المعلم</h2>
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <p className="mb-6 leading-relaxed text-gray-700">
                                {instructor.bio}
                            </p>

                            <div className="grid grid-cols-1 gap-6 border-t pt-6 md:grid-cols-3">
                                <div>
                                    <p className="mb-2 text-gray-600">
                                        سنوات الخبرة
                                    </p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {instructor.experience}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-gray-600">
                                        عدد الدورات
                                    </p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {instructor.courses.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-gray-600">
                                        عدد الطلاب
                                    </p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {instructor.courses.reduce(
                                            (sum, c) =>
                                                sum + c.enrollments_count,
                                            0,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
