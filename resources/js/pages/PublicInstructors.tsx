import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Users } from 'lucide-react';

interface Instructor {
    id: number;
    name: string;
    bio: string;
    experience: number;
    specialization: string;
    courses_count: number;
}

interface Props {
    instructors: Instructor[];
}

export default function PublicInstructors() {
    const page = usePage<SharedData & Props>();
    const { instructors } = page.props;

    return (
        <>
            <Head title="المعلمون - أكاديمية المعارف" />

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
                            <Link
                                href="/instructors"
                                className="font-semibold text-blue-600"
                            >
                                المعلمون
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            فريق المعلمين
                        </h1>
                        <p className="text-xl opacity-90">
                            تعلم من أفضل المعلمين والمتخصصين في مختلف المجالات
                        </p>
                    </div>
                </section>

                {/* Instructors Grid */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {instructors.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {instructors.map((instructor) => (
                                <Link
                                    key={instructor.id}
                                    href={`/instructors/${instructor.id}`}
                                    className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
                                >
                                    {/* Avatar Background */}
                                    <div className="flex h-32 w-full items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
                                        <div className="text-6xl font-bold text-white opacity-30">
                                            {instructor.name.charAt(0)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Name */}
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {instructor.name}
                                        </h3>

                                        {/* Specialization */}
                                        <div className="mb-3">
                                            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                                {instructor.specialization}
                                            </span>
                                        </div>

                                        {/* Bio */}
                                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                            {instructor.bio}
                                        </p>

                                        {/* Stats */}
                                        <div className="space-y-2 border-b pb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">
                                                    سنوات الخبرة:
                                                </span>
                                                <span className="font-bold text-blue-600">
                                                    {instructor.experience} سنة
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">
                                                    الدورات:
                                                </span>
                                                <span className="font-bold text-blue-600">
                                                    {instructor.courses_count}{' '}
                                                    دورة
                                                </span>
                                            </div>
                                        </div>

                                        {/* View Button */}
                                        <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                                            عرض دورات المعلم
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-xl text-gray-600">
                                لا يوجد معلمون متاحون
                            </p>
                        </div>
                    )}
                </div>

                {/* Why Our Teachers Section */}
                <section className="mt-12 bg-blue-50 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-center text-3xl font-bold">
                            لماذا معلمونا مميزون؟
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <div className="mb-4 text-4xl">🎓</div>
                                <h3 className="mb-2 text-xl font-bold">
                                    خبرة عملية
                                </h3>
                                <p className="text-gray-600">
                                    معلمون متخصصون بسنوات من الخبرة في مجالاتهم
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <div className="mb-4 text-4xl">📚</div>
                                <h3 className="mb-2 text-xl font-bold">
                                    محتوى عالي الجودة
                                </h3>
                                <p className="text-gray-600">
                                    محاضرات منظمة وشاملة تغطي جميع جوانب التخصص
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <div className="mb-4 text-4xl">💬</div>
                                <h3 className="mb-2 text-xl font-bold">
                                    دعم الطلاب
                                </h3>
                                <p className="text-gray-600">
                                    متابعة مستمرة والإجابة على جميع استفسارات
                                    الطلاب
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
