<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Instructor;
use Inertia\Inertia;
use Inertia\Response;

class InstructorController extends Controller
{
    public function index(): Response
    {
        $instructors = Instructor::with('courses')
            ->latest()
            ->get()
            ->toArray();

        return Inertia::render('admin/Instructors', [
            'instructors' => $instructors,
        ]);
    }
}
