import AdminLayout from '@/layouts/AdminLayout';
import {
    CheckCircle,
    Edit2,
    Mail,
    Phone,
    Plus,
    Trash2,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Instructor {
    id: number;
    name: string;
    email: string;
    phone?: string;
    specialization?: string;
    experience_years: number;
    status: 'active' | 'inactive';
    courses?: any[];
}

interface InstructorsProps {
    instructors: Instructor[];
}

export default function Instructors({ instructors }: InstructorsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredInstructors = instructors
        .filter(
            (instructor) =>
                instructor.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                instructor.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        )
        .filter(
            (instructor) =>
                filterStatus === 'all' || instructor.status === filterStatus,
        );

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'text-green-600' : 'text-red-600';
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            إدارة المدربين
                        </h2>
                        <p className="mt-2 text-gray-600">
                            إدارة وتنظيم فريق المدربين والمحاضرين
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                        إضافة مدرب جديد
                    </button>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="البحث عن مدرب..."
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
                            <option value="active">نشطون</option>
                            <option value="inactive">غير نشطين</option>
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            إجمالي المدربين
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {instructors.length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            المدربين النشطين
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            {
                                instructors.filter((i) => i.status === 'active')
                                    .length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            متوسط سنوات الخبرة
                        </p>
                        <p className="text-3xl font-bold text-blue-600">
                            {(
                                instructors.reduce(
                                    (sum, i) => sum + i.experience_years,
                                    0,
                                ) / instructors.length || 0
                            ).toFixed(1)}
                        </p>
                    </div>
                </div>

                {/* Instructors Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredInstructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Instructor Header */}
                            <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                            {/* Instructor Info */}
                            <div className="relative z-10 -mt-12 p-6">
                                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-gray-300">
                                    <span className="text-4xl font-bold text-gray-600">
                                        {instructor.name.charAt(0)}
                                    </span>
                                </div>

                                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                    {instructor.name}
                                </h3>

                                <div className="mb-3 flex items-center gap-2">
                                    {instructor.status === 'active' ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span
                                        className={`text-sm font-semibold ${getStatusColor(instructor.status)}`}
                                    >
                                        {instructor.status === 'active'
                                            ? 'نشط'
                                            : 'غير نشط'}
                                    </span>
                                </div>

                                <p className="mb-2 text-sm text-gray-600">
                                    {instructor.specialization || 'بدون تخصص'}
                                </p>
                                <p className="mb-4 text-xs text-gray-500">
                                    {instructor.experience_years} سنة خبرة
                                </p>

                                {/* Contact */}
                                <div className="mb-4 space-y-2 border-b border-gray-200 pb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        <a
                                            href={`mailto:${instructor.email}`}
                                            className="truncate hover:underline"
                                        >
                                            {instructor.email}
                                        </a>
                                    </div>
                                    {instructor.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            <a
                                                href={`tel:${instructor.phone}`}
                                                className="hover:underline"
                                            >
                                                {instructor.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Courses */}
                                <div className="mb-4">
                                    <p className="mb-2 text-xs font-semibold text-gray-900">
                                        الدورات:{' '}
                                        {instructor.courses?.length || 0}
                                    </p>
                                    {instructor.courses &&
                                        instructor.courses.length > 0 && (
                                            <div className="space-y-1">
                                                {instructor.courses
                                                    .slice(0, 2)
                                                    .map((course: any) => (
                                                        <p
                                                            key={course.id}
                                                            className="truncate text-xs text-gray-600"
                                                        >
                                                            • {course.title}
                                                        </p>
                                                    ))}
                                                {instructor.courses.length >
                                                    2 && (
                                                    <p className="text-xs text-gray-500">
                                                        +
                                                        {instructor.courses
                                                            .length - 2}{' '}
                                                        أخرى
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100">
                                        <Edit2 className="h-4 w-4" />
                                        تعديل
                                    </button>
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
                                        <Trash2 className="h-4 w-4" />
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredInstructors.length === 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
                        <p className="text-gray-600">
                            لم يتم العثور على مدربين
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
