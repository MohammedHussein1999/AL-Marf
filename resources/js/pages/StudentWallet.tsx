import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    CreditCard,
    Download,
    History,
    Upload,
    Wallet,
} from 'lucide-react';

interface WalletTransaction {
    id: number;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
}

interface Props {
    balance: number;
    transactions: WalletTransaction[];
    totalSpent: number;
}

export default function StudentWallet() {
    const page = usePage<SharedData & Props>();
    const { auth } = page.props;
    const { balance, transactions, totalSpent } = page.props;

    return (
        <>
            <Head title="محفظتي - أكاديمية المعارف" />

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
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">
                                {auth.user?.name}
                            </span>
                            <form method="POST" action="/logout">
                                <button className="text-red-600 hover:text-red-700">
                                    خروج
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-2 text-3xl font-bold">محفظتي</h1>
                        <p className="text-lg opacity-90">
                            إدارة رصيدك والمعاملات المالية
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Balance Card */}
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white shadow-lg lg:col-span-2">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">
                                    رصيدك الحالي
                                </h2>
                                <Wallet className="h-10 w-10 opacity-50" />
                            </div>
                            <div className="mb-4 text-5xl font-bold">
                                {balance.toFixed(2)} ر.س
                            </div>
                            <p className="text-blue-100">
                                الرصيد المتاح للإنفاق على الدورات والخدمات
                            </p>
                        </div>

                        {/* Stats Card */}
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="space-y-4">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">
                                        إجمالي الإنفاق
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {totalSpent.toFixed(2)} ر.س
                                    </p>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="mb-1 text-sm text-gray-600">
                                        المعاملات
                                    </p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {transactions.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <button className="flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold text-white transition hover:bg-green-700">
                            <Upload className="h-5 w-5" />
                            شحن الرصيد
                        </button>
                        <button className="flex items-center justify-center gap-3 rounded-lg bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700">
                            <Download className="h-5 w-5" />
                            سحب الأموال
                        </button>
                    </div>

                    {/* Transactions */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-center gap-3">
                            <History className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl font-bold">
                                سجل المعاملات
                            </h2>
                        </div>

                        {transactions.length > 0 ? (
                            <div className="space-y-4">
                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between rounded-lg border p-4 transition hover:bg-gray-50"
                                    >
                                        {/* Left */}
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                                    transaction.type ===
                                                    'credit'
                                                        ? 'bg-green-100'
                                                        : 'bg-red-100'
                                                }`}
                                            >
                                                {transaction.type ===
                                                'credit' ? (
                                                    <Upload
                                                        className={`h-6 w-6 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                                                    />
                                                ) : (
                                                    <Download className="h-6 w-6 text-red-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {transaction.description}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(
                                                        transaction.date,
                                                    ).toLocaleDateString(
                                                        'ar-SA',
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div
                                            className={`text-xl font-bold ${
                                                transaction.type === 'credit'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {transaction.type === 'credit'
                                                ? '+'
                                                : '-'}
                                            {transaction.amount.toFixed(2)} ر.س
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <CreditCard className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                <p className="text-gray-600">
                                    لا توجد معاملات حتى الآن
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-blue-50 p-6">
                            <h3 className="mb-2 font-bold text-blue-900">
                                💡 نصيحة
                            </h3>
                            <p className="text-sm text-blue-800">
                                شحّن رصيدك الآن واستمتع بخصومات حصرية على
                                الدورات
                            </p>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-6">
                            <h3 className="mb-2 font-bold text-yellow-900">
                                🎁 عروض
                            </h3>
                            <p className="text-sm text-yellow-800">
                                احصل على رصيد إضافي عند كل شحنة بقيمة 500 ر.س
                                فأكثر
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-50 p-6">
                            <h3 className="mb-2 font-bold text-green-900">
                                ✅ آمان
                            </h3>
                            <p className="text-sm text-green-800">
                                جميع المعاملات المالية محمية وآمنة بكل الطرق
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
