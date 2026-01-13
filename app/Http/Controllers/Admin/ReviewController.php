<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(): Response
    {
        $reviews = Review::with(['user', 'course'])
            ->latest()
            ->get()
            ->toArray();

        return Inertia::render('admin/Reviews', [
            'reviews' => $reviews,
        ]);
    }
}
