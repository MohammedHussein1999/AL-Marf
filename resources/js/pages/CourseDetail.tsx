import { Head } from '@inertiajs/react';
import { Clock, Star, Users } from 'lucide-react';
import { useState } from 'react';

export default function CourseDetail() {
    // بيانات ثابتة للاختبار
    const course = {
        id: 1,
        title: 'دورة React للمبتدئين',
        description: 'تعلم أساسيات React خطوة بخطوة.',
        long_description:
            'هذه الدورة تغطي كل ما تحتاجه لتبدأ في تطوير واجهات تفاعلية باستخدام React، مع أمثلة وتمارين عملية.',
        price: 0,
        level: 'beginner',
        type: 'online',
        lessons: [
            {
                id: 1,
                title: 'مقدمة عن React',
                duration: 30,
                video_url: '',
                order: 1,
            },
            {
                id: 2,
                title: 'JSX والمكونات',
                duration: 45,
                video_url: '',
                order: 2,
            },
            {
                id: 3,
                title: 'State و Props',
                duration: 60,
                video_url: '',
                order: 3,
            },
        ],
        reviews: [
            {
                id: 1,
                user: { name: 'أحمد' },
                rating: 5,
                comment: 'رائع جدًا!',
                created_at: '2026-01-01',
            },
            {
                id: 2,
                user: { name: 'سارة' },
                rating: 4,
                comment: 'مفيد وممتع',
                created_at: '2026-01-05',
            },
        ],
        category: { name: 'تطوير الويب' },
        instructor: {
            id: 1,
            name: 'محمد علي',
            bio: 'مدرس ومطور ويب بخبرة 10 سنوات',
        },
    };

    const rating = 4.5;
    const reviewsCount = course.reviews.length;
    const enrollmentsCount = 150;
    const relatedCourses = [
        {
            id: 2,
            title: 'Next.js متقدم',
            slug: 'nextjs-advanced',
            price: 200,
            enrollments_count: 80,
        },
        {
            id: 3,
            title: 'Node.js للمبتدئين',
            slug: 'nodejs-beginner',
            price: 0,
            enrollments_count: 120,
        },
    ];

    const auth = { user: { id: 1, name: 'Mohammed' } }; // يمكنك وضع null لتجربة حالة غير مسجل الدخول
    const [activeTab, setActiveTab] = useState('overview');

    const totalDuration = course.lessons.reduce(
        (sum, lesson) => sum + (lesson.duration || 0),
        0,
    );
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;

    return (
        <>
            <Head title={`${course.title} - أكاديمية المعارف`} />

            <div className="min-h-screen bg-gray-50" dir="rtl">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="mb-4 text-4xl font-bold">
                            {course.title}
                        </h1>
                        <p className="mb-6 text-lg opacity-90">
                            {course.description}
                        </p>
                        <div className="flex items-center gap-4">
                            <Star className="h-5 w-5 fill-yellow-400" />
                            <span>
                                {rating} ({reviewsCount} تقييم)
                            </span>
                            <Users className="h-5 w-5" />
                            <span>{enrollmentsCount} طالب</span>
                            <Clock className="h-5 w-5" />
                            <span>
                                {hours > 0 ? `${hours} ساعة` : ''}{' '}
                                {minutes > 0 ? `${minutes} دقيقة` : ''}
                            </span>
                        </div>
                        <p className="mt-4 font-semibold">
                            المعلم: {course.instructor.name}
                        </p>
                    </div>
                </section>

                {/* Tabs */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-6 flex gap-4 border-b">
                        {['overview', 'lessons', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 font-semibold transition ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                {tab === 'overview'
                                    ? 'نظرة عامة'
                                    : tab === 'lessons'
                                      ? 'الدروس'
                                      : 'التقييمات'}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'overview' && (
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-2xl font-bold">
                                وصف الدورة
                            </h2>
                            <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                                {course.long_description}
                            </p>
                        </div>
                    )}

                    {activeTab === 'lessons' && (
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">الدروس</h2>
                            {course.lessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className="mb-2 flex items-center gap-4"
                                >
                                    <div className="font-bold">{index + 1}</div>
                                    <div>
                                        {lesson.title} - {lesson.duration} دقيقة
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-6 text-2xl font-bold">
                                التقييمات ({reviewsCount})
                            </h2>
                            {course.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="mb-2 border-b pb-2"
                                >
                                    <p className="font-semibold">
                                        {review.user.name}
                                    </p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Related Courses */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <h3 className="mb-4 text-lg font-bold">دورات ذات صلة</h3>
                    <div className="space-y-4">
                        {relatedCourses.map((rc) => (
                            <div key={rc.id} className="rounded-lg border p-3">
                                <p>{rc.title}</p>
                                <p>
                                    {rc.price === 0
                                        ? 'مجاني'
                                        : `${rc.price} ر.س`}{' '}
                                    - {rc.enrollments_count} طالب
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
