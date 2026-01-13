import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    FileText,
    LogOut,
    Menu,
    Settings,
    Users,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const page = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen },
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Instructors', href: '/admin/instructors', icon: Users },
        { name: 'Reviews', href: '/admin/reviews', icon: FileText },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const isActive = (href: string) => {
        return page.url.startsWith(href);
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? 'w-64' : 'w-20'
                } flex flex-col bg-gray-800 text-white transition-all duration-300`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-gray-700 bg-gray-900 px-4">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-blue-500" />
                            <span className="text-lg font-bold">المعارف</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 hover:bg-gray-700"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`mx-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                    active
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {sidebarOpen && (
                                    <span className="text-sm">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Menu */}
                <div className="border-t border-gray-700 p-4">
                    <button
                        onClick={() => {
                            // Logout functionality
                            window.location.href = '/logout';
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors hover:bg-gray-700"
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Al-Marf Dashboard
                    </h1>
                    <div className="text-sm text-gray-600">Admin Panel</div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-gray-50 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
