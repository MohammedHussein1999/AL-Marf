<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function index(): Response
    {
        $courses = Course::with(['category', 'instructor', 'enrollments'])
            ->latest()
            ->get()
            ->toArray();

        return Inertia::render('admin/Courses', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course): Response
    {
        $course->load(['category', 'instructor', 'enrollments', 'lessons', 'reviews']);

        return Inertia::render('admin/CourseDetail', [
            'course' => $course,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/CreateCourse');
    }

    public function edit(Course $course): Response
    {
        $course->load(['category', 'instructor']);

        return Inertia::render('admin/EditCourse', [
            'course' => $course,
        ]);
    }
}
