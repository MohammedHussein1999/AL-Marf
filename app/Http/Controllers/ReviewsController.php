<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    public function index()
    {
        // احسب التقييمات المتوسطة والإحصائيات
        $reviews = [
            [
                'id' => 1,
                'user' => 'أحمد محمد',
                'course' => 'البرمجة بلغة PHP',
                'rating' => 5,
                'title' => 'دورة رائعة وممتازة جداً',
                'comment' => 'محتوى شامل وشرح واضح جداً. استفدت كثيراً من هذه الدورة.',
                'date' => now()->subDays(2)->toDateTimeString(),
                'approved' => true,
            ],
            [
                'id' => 2,
                'user' => 'فاطمة علي',
                'course' => 'تصميم واجهات المستخدم',
                'rating' => 4,
                'title' => 'محتوى ممتاز',
                'comment' => 'المحتوى ممتاز لكن كان يستحق أن يكون هناك المزيد من التطبيقات العملية.',
                'date' => now()->subDays(5)->toDateTimeString(),
                'approved' => true,
            ],
            [
                'id' => 3,
                'user' => 'محمود السيد',
                'course' => 'تطوير تطبيقات الويب',
                'rating' => 5,
                'title' => 'أفضل دورة على الإطلاق',
                'comment' => 'المعلم شرح كل شيء بشكل مفصل جداً. استحق التقييم الكامل.',
                'date' => now()->subDays(7)->toDateTimeString(),
                'approved' => true,
            ],
            [
                'id' => 4,
                'user' => 'سارة خالد',
                'course' => 'أساسيات JavaScript',
                'rating' => 3,
                'title' => 'جيدة لكن تحتاج تحسينات',
                'comment' => 'المحتوى جيد لكن بعض الأجزاء كانت سريعة جداً.',
                'date' => now()->subDays(10)->toDateTimeString(),
                'approved' => true,
            ],
            [
                'id' => 5,
                'user' => 'عمر حسن',
                'course' => 'قواعد البيانات',
                'rating' => 4,
                'title' => 'دورة متميزة',
                'comment' => 'شرح واضح وأمثلة عملية مفيدة جداً.',
                'date' => now()->subDays(15)->toDateTimeString(),
                'approved' => true,
            ],
        ];

        // احسب المتوسط والإحصائيات
        $ratings = array_column($reviews, 'rating');
        $averageRating = round(array_sum($ratings) / count($ratings), 1);
        $totalReviews = count($reviews);

        // نسبة الرضا
        $satisfactionPercentage = 92;

        return Inertia::render('Reviews', [
            'reviews' => $reviews,
            'averageRating' => $averageRating,
            'totalReviews' => $totalReviews,
            'satisfactionPercentage' => $satisfactionPercentage,
        ]);
    }
}
