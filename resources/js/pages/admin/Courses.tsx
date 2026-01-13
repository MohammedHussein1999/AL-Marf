import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Course {
    id: number;
    title: string;
    slug: string;
    category?: {
        name: string;
    };
    instructor?: {
        name: string;
    };
    type: 'online' | 'offline';
    price: number;
    status: 'draft' | 'published' | 'archived';
    level: string;
    duration_hours: number;
    enrollments?: any[];
}

interface CoursesProps {
    courses: Course[];
}

export default function Courses({ courses }: CoursesProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'all' || course.status === filterStatus;
        const matchesType = filterType === 'all' || course.type === filterType;

        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        return type === 'online'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800';
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            إدارة الدورات
                        </h2>
                        <p className="mt-2 text-gray-600">
                            إدارة جميع الدورات التدريبية
                        </p>
                    </div>
                    <Link
                        href="/admin/courses/create"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <Plus className="h-5 w-5" />
                        إضافة دورة جديدة
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <input
                            type="text"
                            placeholder="البحث عن دورة..."
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
                            <option value="draft">مسودة</option>
                            <option value="published">منشورة</option>
                            <option value="archived">مؤرشفة</option>
                        </select>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">جميع الأنواع</option>
                            <option value="online">أون لاين</option>
                            <option value="offline">أوف لاين</option>
                        </select>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الدورة
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        النوع
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الفئة
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        المدرب
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        السعر
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الطلاب
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCourses.map((course) => (
                                    <tr
                                        key={course.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {course.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {course.slug}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getTypeColor(
                                                    course.type,
                                                )}`}
                                            >
                                                {course.type === 'online'
                                                    ? 'أون لاين'
                                                    : 'أوف لاين'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {course.category?.name || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {course.instructor?.name || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            ${course.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(course.status)}`}
                                            >
                                                {course.status ===
                                                    'published' && 'منشورة'}
                                                {course.status === 'draft' &&
                                                    'مسودة'}
                                                {course.status === 'archived' &&
                                                    'مؤرشفة'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {course.enrollments?.length || 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/courses/${course.id}`}
                                                    className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                                                    title="عرض التفاصيل"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/courses/${course.id}/edit`}
                                                    className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                                                    title="تعديل"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                                                    title="حذف"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'هل أنت متأكد من حذف هذه الدورة؟',
                                                            )
                                                        ) {
                                                            // Delete action would go here
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-gray-600">
                                لم يتم العثور على دورات
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
