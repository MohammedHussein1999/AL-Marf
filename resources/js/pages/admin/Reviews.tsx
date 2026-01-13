import AdminLayout from '@/layouts/AdminLayout';
import { CheckCircle, Clock, Star, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    user: { name: string };
    course: { title: string };
    rating: number;
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

interface ReviewsProps {
    reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredReviews = reviews
        .filter(
            (review) =>
                review.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                review.course.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        )
        .filter(
            (review) =>
                filterStatus === 'all' || review.status === filterStatus,
        );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'rejected':
                return <XCircle className="h-5 w-5 text-red-600" />;
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-600" />;
            default:
                return null;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'approved':
                return 'موافق عليه';
            case 'rejected':
                return 'مرفوض';
            case 'pending':
                return 'قيد الانتظار';
            default:
                return status;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        إدارة التقييمات
                    </h2>
                    <p className="mt-2 text-gray-600">
                        مراجعة والموافقة على تقييمات الدورات والمراجعات
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            إجمالي التقييمات
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {reviews.length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            قيد الانتظار
                        </p>
                        <p className="text-3xl font-bold text-yellow-600">
                            {
                                reviews.filter((r) => r.status === 'pending')
                                    .length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            موافق عليها
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            {
                                reviews.filter((r) => r.status === 'approved')
                                    .length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            متوسط التقييم
                        </p>
                        <div className="flex items-center gap-1">
                            <p className="text-3xl font-bold text-yellow-500">
                                {(
                                    reviews.reduce(
                                        (sum, r) => sum + r.rating,
                                        0,
                                    ) / (reviews.length || 1)
                                ).toFixed(1)}
                            </p>
                            <Star className="h-6 w-6 fill-current text-yellow-500" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="البحث عن تقييم..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">جميع الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="approved">موافق عليها</option>
                            <option value="rejected">مرفوضة</option>
                        </select>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {filteredReviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            {/* Review Header */}
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {review.course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        بواسطة {review.user.name}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(review.status)}
                                    <span className="text-sm font-semibold text-gray-600">
                                        {getStatusText(review.status)}
                                    </span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-4 flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < review.rating
                                                ? 'fill-current text-yellow-500'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    {review.rating}/5
                                </span>
                            </div>

                            {/* Comment */}
                            <p className="mb-4 leading-relaxed text-gray-700">
                                {review.comment}
                            </p>

                            {/* Date */}
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    {new Date(
                                        review.created_at,
                                    ).toLocaleDateString('ar-EG')}
                                </p>

                                {/* Actions */}
                                {review.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <button className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-100">
                                            الموافقة
                                        </button>
                                        <button className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
                                            الرفض
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredReviews.length === 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
                        <p className="text-gray-600">
                            لم يتم العثور على تقييمات
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
