<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(): Response
    {
        $students = User::where('role', 'student')
            ->with(['enrollments.course'])
            ->latest()
            ->get()
            ->toArray();

        return Inertia::render('admin/Students', [
            'students' => $students,
        ]);
    }
}
