<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicCourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::where('status', 'active')
            ->with(['category', 'instructor', 'enrollments'])
            ->withCount('enrollments');

        // البحث
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // التصفية حسب الفئة
        if ($request->has('category') && $request->category) {
            $query->whereHas('category', function ($q) {
                $q->where('slug', request('category'));
            });
        }

        // التصفية حسب المستوى
        if ($request->has('level') && $request->level) {
            $query->where('level', request('level'));
        }

        // الترتيب
        $sortBy = $request->get('sort', 'latest');
        match ($sortBy) {
            'popular' => $query->orderByDesc('enrollments_count'),
            'price_low' => $query->orderBy('price'),
            'price_high' => $query->orderByDesc('price'),
            default => $query->latest(),
        };

        $courses = $query->paginate(12);
        $categories = Category::withCount('courses')->get();
        $instructors = Instructor::withCount('courses')->limit(5)->get();

        return Inertia::render('PublicCourses', [
            'courses' => $courses,
            'categories' => $categories,
            'instructors' => $instructors,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'level' => $request->level,
                'sort' => $sortBy,
            ],
        ]);
    }

    public function show(Course $course)
    {
        $course->load(['category', 'instructor', 'lessons', 'reviews.user', 'enrollments']);

        $rating = $course->reviews()->where('approved', true)->avg('rating') ?? 0;
        $reviewsCount = $course->reviews()->where('approved', true)->count();
        $enrollmentsCount = $course->enrollments()->count();

        return Inertia::render('CourseDetail', [
            'course' => $course,
            'rating' => round($rating, 1),
            'reviewsCount' => $reviewsCount,
            'enrollmentsCount' => $enrollmentsCount,
            'relatedCourses' => Course::where('category_id', $course->category_id)
                ->where('id', '!=', $course->id)
                ->where('status', 'active')
                ->limit(3)
                ->get(),
        ]);
    }

    public function categories()
    {
        $categories = Category::withCount(['courses' => function ($query) {
            $query->where('status', 'active');
        }])->get();

        return Inertia::render('PublicCategories', [
            'categories' => $categories,
        ]);
    }

    public function categoryDetail($slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['courses' => function ($query) {
                $query->where('status', 'active')
                    ->with(['instructor', 'enrollments'])
                    ->withCount('enrollments');
            }])
            ->firstOrFail();

        return Inertia::render('CategoryDetail', [
            'category' => $category,
            'courses' => $category->courses,
        ]);
    }

    public function instructors()
    {
        $instructors = Instructor::withCount(['courses' => function ($query) {
            $query->where('status', 'active');
        }])
            ->with(['courses' => function ($query) {
                $query->where('status', 'active')
                    ->withCount('enrollments');
            }])
            ->get();

        return Inertia::render('PublicInstructors', [
            'instructors' => $instructors,
        ]);
    }

    public function instructorDetail($id)
    {
        $instructor = Instructor::findOrFail($id)
            ->load(['courses' => function ($query) {
                $query->where('status', 'active')
                    ->with(['category', 'enrollments'])
                    ->withCount('enrollments');
            }]);

        return Inertia::render('InstructorDetail', [
            'instructor' => $instructor,
        ]);
    }
}
