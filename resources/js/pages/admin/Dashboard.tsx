import AdminLayout from '@/layouts/AdminLayout';
import { PageProps } from '@inertiajs/react';
import { BookOpen, TrendingUp, Users } from 'lucide-react';

interface DashboardStats {
    totalCourses: number;
    totalStudents: number;
    totalInstructors: number;
    totalEnrollments: number;
    coursesOnline: number;
    coursesOffline: number;
    averageRating: number;
    revenueThisMonth: number;
}

interface DashboardProps extends PageProps {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        {
            title: 'إجمالي الدورات',
            value: stats.totalCourses,
            icon: BookOpen,
            color: 'bg-blue-500',
            lightBg: 'bg-blue-50',
        },
        {
            title: 'الطلاب المسجلين',
            value: stats.totalStudents,
            icon: Users,
            color: 'bg-green-500',
            lightBg: 'bg-green-50',
        },
        {
            title: 'المدربين',
            value: stats.totalInstructors,
            icon: Users,
            color: 'bg-purple-500',
            lightBg: 'bg-purple-50',
        },
        {
            title: 'الالتحاقات النشطة',
            value: stats.totalEnrollments,
            icon: TrendingUp,
            color: 'bg-orange-500',
            lightBg: 'bg-orange-50',
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        لوحة التحكم
                    </h2>
                    <p className="mt-2 text-gray-600">
                        مرحبا بك في لوحة تحكم أكاديمية المعارف
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="mb-2 text-sm text-gray-600">
                                            {card.title}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {card.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`${card.lightBg} rounded-lg p-4`}
                                    >
                                        <Icon
                                            className={`h-8 w-8 ${card.color.replace('bg-', 'text-')}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Course Distribution */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            توزيع الدورات
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-gray-600">
                                        دورات أون لاين
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {stats.coursesOnline}
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{
                                            width: `${(stats.coursesOnline / (stats.coursesOnline + stats.coursesOffline)) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-gray-600">
                                        دورات أوف لاين
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {stats.coursesOffline}
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-green-500"
                                        style={{
                                            width: `${(stats.coursesOffline / (stats.coursesOnline + stats.coursesOffline)) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            مؤشرات الأداء
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-gray-600">
                                    متوسط التقييم
                                </span>
                                <span className="font-semibold text-yellow-500">
                                    {stats.averageRating.toFixed(1)} ⭐
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-gray-600">
                                    الإيرادات هذا الشهر
                                </span>
                                <span className="font-semibold text-green-600">
                                    ${stats.revenueThisMonth}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-gray-600">
                                    معدل الانتساب
                                </span>
                                <span className="font-semibold text-blue-600">
                                    {(
                                        (stats.totalEnrollments /
                                            (stats.totalStudents || 1)) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        الإجراءات السريعة
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <button className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">
                                    إضافة دورة جديدة
                                </p>
                                <p className="text-sm text-gray-600">
                                    إنشاء دورة تدريبية جديدة
                                </p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100">
                            <Users className="h-5 w-5 text-green-600" />
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">
                                    إدارة الطلاب
                                </p>
                                <p className="text-sm text-gray-600">
                                    عرض وإدارة الطلاب المسجلين
                                </p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 transition-colors hover:bg-purple-100">
                            <Users className="h-5 w-5 text-purple-600" />
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">
                                    إدارة المدربين
                                </p>
                                <p className="text-sm text-gray-600">
                                    إضافة وتعديل بيانات المدربين
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
