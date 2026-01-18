<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\InstructorController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\PublicCourseController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::inertia('test', 'nav');
// Public Courses Routes
Route::prefix('courses')->name('courses.')->group(function () {
    Route::get('/', [PublicCourseController::class, 'index'])->name('index');
    Route::get('{course:slug}', [PublicCourseController::class, 'show'])->name('show');
});

// Public Categories Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [PublicCourseController::class, 'categories'])->name('index');
        Route::get('{category:slug}', [PublicCourseController::class, 'categoryDetail'])->name('show');
    });

    // Public Instructors Routes
    // Route::prefix('instructors')->name('instructors.')->group(function () {
    //     Route::get('/', [PublicCourseController::class, 'instructors'])->name('index');
    //     Route::get('{instructor}', [PublicCourseController::class, 'instructorDetail'])->name('show');
    // });

    // Public Reviews Route
    Route::get('/reviews', [ReviewsController::class, 'index'])->name('reviews');

    // Public Contact Routes
    Route::prefix('contact')->name('contact.')->group(function () {
        Route::get('/', [ContactController::class, 'index'])->name('index');
        Route::post('/', [ContactController::class, 'store'])->name('store');
    });

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        // Student Dashboard
        Route::get('student-dashboard', [StudentDashboardController::class, 'index'])->name('student-dashboard');

        // Student Wallet
        Route::get('wallet', [WalletController::class, 'index'])->name('wallet');
    });

    // Admin Routes
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Courses
    Route::prefix('courses')->name('courses.')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('index');
        Route::get('create', [CourseController::class, 'create'])->name('create');
        Route::get('{course}', [CourseController::class, 'show'])->name('show');
        Route::get('{course}/edit', [CourseController::class, 'edit'])->name('edit');
    });

    // Students
    Route::get('students', [StudentController::class, 'index'])->name('students');

    // Instructors
    Route::get('instructors', [InstructorController::class, 'index'])->name('instructors');

    // Reviews
    Route::get('reviews', [ReviewController::class, 'index'])->name('reviews');

    // Settings
    Route::get('settings', [SettingsController::class, 'index'])->name('settings');
});

require __DIR__ . '/settings.php';
