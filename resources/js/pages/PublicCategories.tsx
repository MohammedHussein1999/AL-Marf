import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Grid3x3 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    courses_count: number;
}

interface Props {
    categories: Category[];
}

export default function PublicCategories() {
    const page = usePage<SharedData & Props>();
    const { categories } = page.props;

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
                                    {/* Icon */}
                                    <div className="mb-4 text-6xl transition group-hover:scale-110">
                                        {getCategoryIcon(category.icon)}
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                                        {category.name}
                                    </h3>

                                    {/* Courses Count */}
                                    <p className="mb-4 text-gray-600">
                                        <span className="font-bold text-blue-600">
                                            {category.courses_count}
                                        </span>{' '}
                                        دورة
                                    </p>

                                    {/* Learn More */}
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

                {/* CTA Section */}
                <section className="mt-12 bg-blue-50 py-12">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-4 text-3xl font-bold">جاهز للبدء؟</h2>
                        <p className="mb-6 text-lg text-gray-600">
                            اختر أي دورة من اختيارك وابدأ رحلتك التعليمية الآن
                        </p>
                        <Link
                            href="/courses"
                            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            استكشف جميع الدورات
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
