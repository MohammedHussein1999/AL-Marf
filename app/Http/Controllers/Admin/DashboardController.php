<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use App\Models\Instructor;
use App\Models\Enrollment;
use App\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'totalCourses' => Course::count(),
            'totalStudents' => User::where('role', 'student')->count(),
            'totalInstructors' => Instructor::count(),
            'totalEnrollments' => Enrollment::where('status', 'active')->count(),
            'coursesOnline' => Course::where('type', 'online')->count(),
            'coursesOffline' => Course::where('type', 'offline')->count(),
            'averageRating' => Review::avg('rating') ?? 0,
            'revenueThisMonth' => Course::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('price') ?? 0,
        ];

        return Inertia::render('admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
