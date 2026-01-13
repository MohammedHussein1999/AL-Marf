import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Twitter,
    Youtube,
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://facebook.com/almaarif',
            color: 'hover:text-blue-600',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: 'https://twitter.com/almaarif',
            color: 'hover:text-blue-400',
        },
        {
            name: 'Instagram',
            icon: Instagram,
            url: 'https://instagram.com/almaarif',
            color: 'hover:text-pink-600',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/company/almaarif',
            color: 'hover:text-blue-700',
        },
        {
            name: 'YouTube',
            icon: Youtube,
            url: 'https://youtube.com/@almaarif',
            color: 'hover:text-red-600',
        },
    ];

    const contactInfo = [
        { icon: Phone, title: 'الهاتف', value: '+966 123 456 789' },
        {
            icon: Mail,
            title: 'البريد الإلكتروني',
            value: 'contact@almaarif.com',
        },
        {
            icon: MapPin,
            title: 'العنوان',
            value: 'الرياض، المملكة العربية السعودية',
        },
    ];

    return (
        <>
            <Head title="تواصل معنا - أكاديمية المعارف" />

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
                            href="/"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← الرئيسية
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">تواصل معنا</h1>
                        <p className="text-xl opacity-90">
                            نحن هنا للإجابة على جميع أسئلتك
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Contact Info Cards */}
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="rounded-lg bg-white p-6 text-center shadow-md transition hover:shadow-lg"
                            >
                                <div className="mb-4 flex justify-center">
                                    <info.icon className="h-12 w-12 text-blue-600" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                    {info.title}
                                </h3>
                                <p className="text-gray-600">{info.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="rounded-lg bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                أرسل لنا رسالة
                            </h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        الاسم
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="اسمك الكامل"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="بريدك الإلكتروني"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        الموضوع
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subject: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="موضوع الرسالة"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        الرسالة
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        rows={5}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="اكتب رسالتك هنا..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <Send className="h-5 w-5" />
                                    إرسال الرسالة
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="rounded-lg bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                تابعنا على التواصل الاجتماعي
                            </h2>
                            <p className="mb-8 text-gray-600">
                                تابع حساباتنا للحصول على أحدث المحتوى التعليمي
                                والعروض الخاصة
                            </p>

                            <div className="space-y-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
                                    >
                                        <social.icon
                                            className={`h-8 w-8 text-gray-600 transition group-hover:scale-110 ${social.color}`}
                                        />
                                        <span className="flex-1 text-lg font-semibold text-gray-900">
                                            {social.name}
                                        </span>
                                        <span className="text-gray-400">→</span>
                                    </a>
                                ))}
                            </div>

                            {/* Office Hours */}
                            <div className="mt-8 border-t pt-8">
                                <h3 className="mb-4 font-bold text-gray-900">
                                    ساعات العمل
                                </h3>
                                <div className="space-y-2 text-gray-600">
                                    <p>السبت - الأربعاء: 9:00 - 18:00</p>
                                    <p>الخميس: 9:00 - 15:00</p>
                                    <p>الجمعة: مغلق</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="rounded-lg bg-white p-8 shadow-md">
                        <h2 className="mb-6 text-2xl font-bold">
                            الأسئلة الشائعة
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-2 font-bold text-gray-900">
                                    كم وقت الرد على الرسائل؟
                                </h3>
                                <p className="text-gray-600">
                                    نرد على جميع الرسائل خلال 24 ساعة من
                                    استقبالها
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-bold text-gray-900">
                                    هل هناك دعم فني 24/7؟
                                </h3>
                                <p className="text-gray-600">
                                    نعم، فريق الدعم لدينا متاح طوال أيام الأسبوع
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-bold text-gray-900">
                                    كيف أبلّغ عن مشكلة؟
                                </h3>
                                <p className="text-gray-600">
                                    يمكنك التواصل عبر البريد أو الهاتف أو
                                    النموذج أعلاه
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-bold text-gray-900">
                                    ماذا عن عروض الشراكة؟
                                </h3>
                                <p className="text-gray-600">
                                    أرسل لنا رسالة بعنوان "شراكة" وسنرد عليك
                                    قريباً
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
