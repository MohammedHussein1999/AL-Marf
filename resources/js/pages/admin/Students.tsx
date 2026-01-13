import AdminLayout from '@/layouts/AdminLayout';
import { CheckCircle, Mail, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    enrollments?: {
        id: number;
        course: { title: string };
        status: string;
        progress_percentage: number;
    }[];
}

interface StudentsProps {
    students: Student[];
}

export default function Students({ students }: StudentsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const filteredStudents = students
        .filter(
            (student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'date') {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            }
            return 0;
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600';
            case 'completed':
                return 'text-blue-600';
            case 'dropped':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        إدارة الطلاب
                    </h2>
                    <p className="mt-2 text-gray-600">
                        إدارة وتتبع جميع الطلاب المسجلين
                    </p>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="البحث عن طالب بالاسم أو البريد الإلكتروني..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="name">ترتيب حسب الاسم</option>
                            <option value="date">
                                ترتيب حسب تاريخ التسجيل
                            </option>
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            إجمالي الطلاب
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {students.length}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">
                            الطلاب النشطين
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            {
                                students.filter((s) =>
                                    s.enrollments?.some(
                                        (e) => e.status === 'active',
                                    ),
                                ).length
                            }
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="mb-2 text-sm text-gray-600">المتدرجين</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {
                                students.filter((s) =>
                                    s.enrollments?.some(
                                        (e) => e.status === 'completed',
                                    ),
                                ).length
                            }
                        </p>
                    </div>
                </div>

                {/* Students Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الطالب
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        البريد الإلكتروني
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        تاريخ التسجيل
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الدورات المسجلة
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                        الحالة
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredStudents.map((student) => {
                                    const activeEnrollments =
                                        student.enrollments?.filter(
                                            (e) => e.status === 'active',
                                        ) || [];
                                    const completedEnrollments =
                                        student.enrollments?.filter(
                                            (e) => e.status === 'completed',
                                        ) || [];

                                    return (
                                        <tr
                                            key={student.id}
                                            className="transition-colors hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">
                                                    {student.name}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="h-4 w-4" />
                                                    <a
                                                        href={`mailto:${student.email}`}
                                                        className="hover:underline"
                                                    >
                                                        {student.email}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(
                                                    student.created_at,
                                                ).toLocaleDateString('ar-EG')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {activeEnrollments.length >
                                                        0 && (
                                                        <span className="text-sm">
                                                            <span className="font-semibold text-green-600">
                                                                {
                                                                    activeEnrollments.length
                                                                }
                                                            </span>{' '}
                                                            نشطة
                                                        </span>
                                                    )}
                                                    {completedEnrollments.length >
                                                        0 && (
                                                        <span className="text-sm">
                                                            <span className="font-semibold text-blue-600">
                                                                {
                                                                    completedEnrollments.length
                                                                }
                                                            </span>{' '}
                                                            مكتملة
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {activeEnrollments.length >
                                                0 ? (
                                                    <span className="flex items-center gap-2 text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        نشط
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2 text-gray-600">
                                                        <XCircle className="h-4 w-4" />
                                                        غير نشط
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-gray-600">
                                لم يتم العثور على طلاب
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
