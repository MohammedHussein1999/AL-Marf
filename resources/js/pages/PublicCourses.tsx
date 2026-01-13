import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookOpen, Search, Users } from 'lucide-react';
import { useState } from 'react';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    price: number;
    level: string;
    enrollments_count: number;
    category_id: number;
    instructor_id: number;
    category?: { id: number; name: string };
    instructor?: { id: number; name: string };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    courses_count: number;
}

interface Props {
    courses: {
        data: Course[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
        level: string;
        sort: string;
    };
}

export default function PublicCourses() {
    const page = usePage<SharedData & Props>();
    const { courses, categories, filters } = page.props;
    const [searchValue, setSearchValue] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(
        filters.category || '',
    );
    const [selectedLevel, setSelectedLevel] = useState(filters.level || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'latest');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/courses', {
            search: searchValue,
            category: selectedCategory,
            level: selectedLevel,
            sort: sortBy,
        });
    };

    const levels = [
        { value: 'beginner', label: 'مبتدئ' },
        { value: 'intermediate', label: 'متوسط' },
        { value: 'advanced', label: 'متقدم' },
    ];

    const sorts = [
        { value: 'latest', label: 'الأحدث' },
        { value: 'popular', label: 'الأكثر شهرة' },
        { value: 'price_low', label: 'السعر: الأقل أولاً' },
        { value: 'price_high', label: 'السعر: الأعلى أولاً' },
    ];

    return (
        <>
            <Head title="الدورات التدريبية - أكاديمية المعارف" />

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
                                className="font-semibold text-blue-600"
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
                                className="text-gray-600 hover:text-gray-900"
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
                            استكشف دوراتنا التدريبية
                        </h1>
                        <p className="text-xl opacity-90">
                            اختر من بين مئات الدورات المتخصصة في مختلف المجالات
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Search and Filter */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="space-y-4">
                            {/* Search Bar */}
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="ابحث عن دورة..."
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    بحث
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">جميع الفئات</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedLevel}
                                    onChange={(e) =>
                                        setSelectedLevel(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">جميع المستويات</option>
                                    {levels.map((level) => (
                                        <option
                                            key={level.value}
                                            value={level.value}
                                        >
                                            {level.label}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    {sorts.map((sort) => (
                                        <option
                                            key={sort.value}
                                            value={sort.value}
                                        >
                                            {sort.label}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchValue('');
                                        setSelectedCategory('');
                                        setSelectedLevel('');
                                        setSortBy('latest');
                                        router.get('/courses');
                                    }}
                                    className="rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-300"
                                >
                                    إعادة تعيين
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            تم العثور على{' '}
                            <span className="font-bold text-gray-900">
                                {courses.total}
                            </span>{' '}
                            دورة
                        </p>
                    </div>

                    {/* Courses Grid */}
                    {courses.data.length > 0 ? (
                        <>
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {courses.data.map((course) => (
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

                                            {/* Description */}
                                            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                                {course.description}
                                            </p>

                                            {/* Instructor */}
                                            {course.instructor && (
                                                <p className="mb-3 text-sm text-gray-600">
                                                    <span className="font-semibold">
                                                        المعلم:
                                                    </span>{' '}
                                                    {course.instructor.name}
                                                </p>
                                            )}

                                            {/* Stats */}
                                            <div className="mb-4 flex items-center justify-between border-b pb-4">
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        {
                                                            course.enrollments_count
                                                        }{' '}
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

                            {/* Pagination */}
                            {courses.last_page > 1 && (
                                <div className="mb-8 flex justify-center gap-2">
                                    {courses.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded-lg px-3 py-2 ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-xl text-gray-600">
                                لم يتم العثور على دورات مطابقة
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
