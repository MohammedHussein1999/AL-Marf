import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, TrendingUp, Users } from 'lucide-react';
import NavigationMenuDemo from './nav';
// import Navbar from '@/components/Navbar';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="أكاديمية المعارف">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-linear-to-b from-blue-50 to-white"
                dir="rtl"
            >
                {/* Navigation Bar with Glassmorphism */}
                {/* <Navbar auth={auth} /> */}
                <NavigationMenuDemo/>
                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                                أكاديمية المعارف للتعليم الإلكتروني
                            </h1>
                            <p className="mb-8 text-xl text-gray-600">
                                منصة تعليمية متكاملة توفر دورات تدريبية متخصصة
                                في مجالات مختلفة مع أساتذة متمرسين وجودة تعليم
                                عالية.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href={register()}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                                >
                                    ابدأ الآن
                                </Link>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-blue-50"
                                >
                                    دخول
                                </Link>
                            </div>
                        </div>
                        <div className="hidden items-center justify-center lg:flex">
                            <div className="flex h-80 w-80 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl">
                                <BookOpen className="h-40 w-40 text-white opacity-50" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-blue-50 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900">
                                لماذا اختيارنا
                            </h2>
                            <p className="text-xl text-gray-600">
                                نوفر تجربة تعليمية مميزة وفريدة
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg bg-white p-8 shadow-md transition hover:shadow-lg">
                                <BookOpen className="mb-4 h-12 w-12 text-blue-600" />
                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                    مئات الدورات
                                </h3>
                                <p className="text-gray-600">
                                    دورات متنوعة في مختلف التخصصات والمجالات
                                    الاحترافية
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-md transition hover:shadow-lg">
                                <Users className="mb-4 h-12 w-12 text-blue-600" />
                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                    معلمون متخصصون
                                </h3>
                                <p className="text-gray-600">
                                    فريق من الأساتذة الخبراء والمتخصصين في
                                    مجالاتهم
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-md transition hover:shadow-lg">
                                <TrendingUp className="mb-4 h-12 w-12 text-blue-600" />
                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                    تعلم مرن
                                </h3>
                                <p className="text-gray-600">
                                    تعلم بسرعتك الخاصة وفي الوقت المناسب لك طوال
                                    اليوم
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-md transition hover:shadow-lg">
                                <Award className="mb-4 h-12 w-12 text-blue-600" />
                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                    شهادات معتمدة
                                </h3>
                                <p className="text-gray-600">
                                    احصل على شهادات موثوقة عند إكمال كل دورة
                                    تدريبية
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-blue-600">
                                500+
                            </div>
                            <p className="text-lg text-gray-600">
                                دورة تدريبية
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-blue-600">
                                50+
                            </div>
                            <p className="text-lg text-gray-600">معلم متخصص</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-blue-600">
                                10K+
                            </div>
                            <p className="text-lg text-gray-600">طالب متعلم</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="mb-6 text-4xl font-bold">
                            هل أنت مستعد لبدء رحلتك التعليمية
                        </h2>
                        <p className="mb-8 text-xl opacity-90">
                            انضم إلى آلاف الطلاب الذين يتعلمون معنا واطور
                            مهاراتك الآن
                        </p>
                        <Link
                            href={register()}
                            className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition hover:bg-gray-100"
                        >
                            التسجيل المجاني
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div>
                                <h3 className="mb-4 text-xl font-bold">
                                    أكاديمية المعارف
                                </h3>
                                <p className="text-gray-400">
                                    منصة تعليمية متطورة تسعى لتطوير مهارات
                                    الأفراد والمحترفين
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-4 text-lg font-bold">
                                    الروابط السريعة
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>
                                        <Link
                                            href={register()}
                                            className="transition hover:text-white"
                                        >
                                            تسجيل جديد
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={login()}
                                            className="transition hover:text-white"
                                        >
                                            دخول
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition hover:text-white"
                                        >
                                            عن الأكاديمية
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="transition hover:text-white"
                                        >
                                            اتصل بنا
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 text-lg font-bold">
                                    معلومات التواصل
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>البريد: info@almaarif.com</li>
                                    <li>الهاتف: +966 123 456 789</li>
                                    <li>العنوان: المملكة العربية السعودية</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                            <p>
                                &copy; 2025 أكاديمية المعارف. جميع الحقوق
                                محفوظة.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
