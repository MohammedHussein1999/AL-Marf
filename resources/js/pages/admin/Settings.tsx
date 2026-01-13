import AdminLayout from '@/layouts/AdminLayout';
import { Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        siteName: 'أكاديمية المعارف',
        siteEmail: 'info@almarf.com',
        sitePhone: '+966XXXXXXXXX',
        siteDescription:
            'أكاديمية متخصصة في التعليم الإلكتروني والدورات التدريبية المهنية',
        address: 'المملكة العربية السعودية',
        mainColor: '#3b82f6',
        secondaryColor: '#06b6d4',
        enableRegistration: true,
        requireEmailVerification: true,
        maxCourseStudents: 100,
        maintenanceMode: false,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            setSettings({
                ...settings,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setSettings({
                ...settings,
                [name]: value,
            });
        }
    };

    const handleSave = () => {
        // Save settings
        alert('تم حفظ الإعدادات بنجاح');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        إعدادات النظام
                    </h2>
                    <p className="mt-2 text-gray-600">
                        إدارة إعدادات الموقع والنظام
                    </p>
                </div>

                {/* General Settings */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                        الإعدادات العامة
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                اسم الموقع
                            </label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                الوصف
                            </label>
                            <textarea
                                name="siteDescription"
                                value={settings.siteDescription}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    name="siteEmail"
                                    value={settings.siteEmail}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    رقم الهاتف
                                </label>
                                <input
                                    type="tel"
                                    name="sitePhone"
                                    value={settings.sitePhone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                العنوان
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                        الشكل والألوان
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                اللون الأساسي
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    name="mainColor"
                                    value={settings.mainColor}
                                    onChange={handleChange}
                                    className="h-10 w-16 cursor-pointer rounded-lg border border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={settings.mainColor}
                                    onChange={handleChange}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                اللون الثانوي
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    name="secondaryColor"
                                    value={settings.secondaryColor}
                                    onChange={handleChange}
                                    className="h-10 w-16 cursor-pointer rounded-lg border border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={settings.secondaryColor}
                                    onChange={handleChange}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Settings */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                        إعدادات الميزات
                    </h3>
                    <div className="space-y-4">
                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="enableRegistration"
                                checked={settings.enableRegistration}
                                onChange={handleChange}
                                className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">
                                السماح بالتسجيل الجديد
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="requireEmailVerification"
                                checked={settings.requireEmailVerification}
                                onChange={handleChange}
                                className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">
                                تطلب تحقق من البريد الإلكتروني
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">
                                وضع الصيانة
                            </span>
                        </label>
                    </div>
                </div>

                {/* Limits Settings */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                        الحدود والقيود
                    </h3>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">
                            الحد الأقصى للطلاب في الدورة
                        </label>
                        <input
                            type="number"
                            name="maxCourseStudents"
                            value={settings.maxCourseStudents}
                            onChange={handleChange}
                            min="1"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            الحد الأقصى للطلاب المسموح بهم في كل دورة
                        </p>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        <Save className="h-5 w-5" />
                        حفظ الإعدادات
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
