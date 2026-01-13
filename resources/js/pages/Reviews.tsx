import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, MessageSquare, Search, Star } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    user: { name: string; email: string };
    course: { title: string; slug: string };
    rating: number;
    comment: string;
    created_at: string;
    approved: boolean;
}

interface Props {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

export default function Reviews() {
    const page = usePage<SharedData & Props>();
    const { reviews, averageRating, totalReviews } = page.props;
    const [searchValue, setSearchValue] = useState('');
    const [filterRating, setFilterRating] = useState<number | null>(null);

    const filteredReviews = reviews.filter((review) => {
        const matchesSearch =
            review.course.title.includes(searchValue) ||
            review.user.name.includes(searchValue);
        const matchesRating = filterRating
            ? review.rating === filterRating
            : true;
        return matchesSearch && matchesRating;
    });

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage:
            (reviews.filter((r) => r.rating === rating).length / totalReviews) *
            100,
    }));

    return (
        <>
            <Head title="آراء العملاء - أكاديمية المعارف" />

            <div className="min-h-screen bg-gray-50" dir="rtl">
                {/* Glassmorphism Navigation */}
                <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/30 shadow-sm backdrop-blur-md">
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
                        <h1 className="mb-4 text-4xl font-bold">
                            آراء عملائنا
                        </h1>
                        <p className="text-xl opacity-90">
                            اطلع على تقييمات الطلاب لدوراتنا
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Rating Overview */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Average Rating */}
                        <div className="rounded-lg bg-white p-8 text-center shadow-md">
                            <div className="mb-2 text-5xl font-bold text-blue-600">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="mb-2 flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < Math.round(averageRating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600">متوسط التقييم</p>
                        </div>

                        {/* Total Reviews */}
                        <div className="rounded-lg bg-white p-8 text-center shadow-md">
                            <div className="mb-2 text-5xl font-bold text-green-600">
                                {totalReviews}
                            </div>
                            <p className="text-gray-600">تقييم كلي</p>
                        </div>

                        {/* Satisfaction Rate */}
                        <div className="rounded-lg bg-white p-8 text-center shadow-md">
                            <div className="mb-2 text-5xl font-bold text-orange-600">
                                {(
                                    (reviews.filter((r) => r.rating >= 4)
                                        .length /
                                        totalReviews) *
                                    100
                                ).toFixed(0)}
                                %
                            </div>
                            <p className="text-gray-600">نسبة الرضا</p>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-2xl font-bold">
                            توزيع التقييمات
                        </h2>
                        <div className="space-y-4">
                            {ratingDistribution.map(
                                ({ rating, count, percentage }) => (
                                    <div
                                        key={rating}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="flex w-20 items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full bg-yellow-400 transition"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="w-12 text-right text-sm text-gray-600">
                                            {count}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ابحث عن دورة أو طالب..."
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                            </div>

                            <select
                                value={filterRating || ''}
                                onChange={(e) =>
                                    setFilterRating(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : null,
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">جميع التقييمات</option>
                                <option value="5">5 نجوم</option>
                                <option value="4">4 نجوم فما فوق</option>
                                <option value="3">3 نجوم فما فوق</option>
                                <option value="2">2 نجم فما فوق</option>
                                <option value="1">1 نجم فما فوق</option>
                            </select>

                            <button
                                onClick={() => {
                                    setSearchValue('');
                                    setFilterRating(null);
                                }}
                                className="rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-300"
                            >
                                إعادة تعيين
                            </button>
                        </div>
                    </div>

                    {/* Reviews List */}
                    {filteredReviews.length > 0 ? (
                        <div className="space-y-6">
                            {filteredReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
                                >
                                    {/* Header */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <p className="font-bold text-gray-900">
                                                {review.user.name}
                                            </p>
                                            <Link
                                                href={`/courses/${review.course.slug}`}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                {review.course.title}
                                            </Link>
                                        </div>
                                        <div className="text-right">
                                            <div className="mb-2 flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {new Date(
                                                    review.created_at,
                                                ).toLocaleDateString('ar-SA')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <p className="leading-relaxed text-gray-700">
                                        {review.comment}
                                    </p>

                                    {/* Status */}
                                    {!review.approved && (
                                        <div className="mt-4 inline-block rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-600">
                                            قيد المراجعة
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <MessageSquare className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <p className="text-xl text-gray-600">
                                لا توجد تقييمات تطابق البحث
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
