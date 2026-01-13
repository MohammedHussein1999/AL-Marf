<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $enrolledCourses = $user->enrollments()
            ->with(['course' => function ($query) {
                $query->with(['category', 'instructor', 'lessons'])
                    ->withCount('enrollments');
            }])
            ->get()
            ->map(function ($enrollment) {
                $completedLessons = $enrollment->user->lessonCompletions()
                    ->whereIn('lesson_id', $enrollment->course->lessons->pluck('id'))
                    ->count();

                $totalLessons = $enrollment->course->lessons->count();
                $progress = $totalLessons > 0 ? ($completedLessons / $totalLessons) * 100 : 0;

                return [
                    'id' => $enrollment->course->id,
                    'title' => $enrollment->course->title,
                    'slug' => $enrollment->course->slug,
                    'progress' => intval($progress),
                    'enrollments_count' => $enrollment->course->enrollments_count,
                    'category' => $enrollment->course->category,
                    'instructor' => $enrollment->course->instructor,
                ];
            });

        $stats = [
            'totalCourses' => $enrolledCourses->count(),
            'completedCourses' => $enrolledCourses->where('progress', 100)->count(),
            'hoursLearned' => intval($enrolledCourses->sum(fn($c) => 0)), // حساب ساعات التعلم
            'averageRating' => 4.5, // متوسط التقييم
        ];

        return Inertia::render('StudentDashboard', [
            'enrolledCourses' => $enrolledCourses->values(),
            'stats' => $stats,
        ]);
    }
}
