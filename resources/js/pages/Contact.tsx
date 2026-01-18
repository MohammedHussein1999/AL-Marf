import { Head, Link } from '@inertiajs/react';
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
                {/* Navigation */}
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

                {/* Hero */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">تواصل معنا</h1>
                        <p className="text-xl opacity-90">
                            نحن هنا للإجابة على جميع أسئلتك
                        </p>
                    </div>
                </section>

                {/* Contact Info */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
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

                    {/* Contact Form & Social */}
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="rounded-lg bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                أرسل لنا رسالة
                            </h2>
                            <form className="space-y-4">
                                {['name', 'email', 'subject', 'message'].map(
                                    (field, i) => (
                                        <div key={i}>
                                            <label className="mb-2 block text-sm font-semibold text-gray-900">
                                                {field === 'name'
                                                    ? 'الاسم'
                                                    : field === 'email'
                                                      ? 'البريد الإلكتروني'
                                                      : field === 'subject'
                                                        ? 'الموضوع'
                                                        : 'الرسالة'}
                                            </label>
                                            {field !== 'message' ? (
                                                <input
                                                    type={
                                                        field === 'email'
                                                            ? 'email'
                                                            : 'text'
                                                    }
                                                    value={
                                                        formData[
                                                            field as keyof typeof formData
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            [field]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    placeholder={
                                                        field === 'name'
                                                            ? 'اسمك الكامل'
                                                            : field === 'email'
                                                              ? 'بريدك الإلكتروني'
                                                              : field ===
                                                                  'subject'
                                                                ? 'موضوع الرسالة'
                                                                : 'اكتب رسالتك هنا...'
                                                    }
                                                    rows={
                                                        field === 'message'
                                                            ? 5
                                                            : undefined
                                                    }
                                                />
                                            ) : (
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            message:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={5}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    placeholder="اكتب رسالتك هنا..."
                                                />
                                            )}
                                        </div>
                                    ),
                                )}
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <Send className="h-5 w-5" /> إرسال الرسالة
                                </button>
                            </form>
                        </div>

                        {/* Social Media */}
                        <div className="rounded-lg bg-white p-8 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                تابعنا على التواصل الاجتماعي
                            </h2>
                            <div className="space-y-4">
                                {socialLinks.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50`}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
