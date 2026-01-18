import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Grid3x3 } from 'lucide-react';

export default function PublicCategories() {
    // بيانات ستاتيك للاختبار
    const categories = [
        {
            id: 1,
            name: 'تطوير الويب',
            slug: 'web-dev',
            icon: 'code',
            courses_count: 5,
        },
        {
            id: 2,
            name: 'التصميم',
            slug: 'design',
            icon: 'design',
            courses_count: 3,
        },
        {
            id: 3,
            name: 'الأعمال',
            slug: 'business',
            icon: 'business',
            courses_count: 4,
        },
    ];

    const getCategoryIcon = (icon: string | null) => {
        const iconMap: { [key: string]: string } = {
            code: '💻',
            design: '🎨',
            business: '💼',
            marketing: '📊',
            development: '⚙️',
            writing: '✍️',
            music: '🎵',
            health: '🏥',
        };
        return iconMap[icon || 'code'] || '📚';
    };

    return (
        <>
            <Head title="الفئات - أكاديمية المعارف" />

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
                                className="font-semibold text-blue-600"
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
                            استكشف الفئات
                        </h1>
                        <p className="text-xl opacity-90">
                            اختر من بين مختلف التخصصات والمجالات التدريبية
                        </p>
                    </div>
                </section>

                {/* Categories Grid */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {categories.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="group flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md transition hover:shadow-lg"
                                >
                                    <div className="mb-4 text-6xl transition group-hover:scale-110">
                                        {getCategoryIcon(category.icon)}
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                                        {category.name}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        <span className="font-bold text-blue-600">
                                            {category.courses_count}
                                        </span>{' '}
                                        دورة
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 pt-4 font-semibold text-blue-600 transition group-hover:gap-3">
                                        اكتشف الدورات
                                        <ArrowLeft className="h-4 w-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Grid3x3 className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-xl text-gray-600">
                                لا توجد فئات متاحة
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
