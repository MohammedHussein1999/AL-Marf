<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'long_description',
        'category_id',
        'instructor_id',
        'type', // 'online' or 'offline'
        'price',
        'image',
        'status', // 'draft', 'published', 'archived'
        'level', // 'beginner', 'intermediate', 'advanced'
        'duration_hours',
        'max_students',
        'start_date',
        'end_date',
        'location', // for offline courses
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'price' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function getEnrolledCount()
    {
        return $this->enrollments()->where('status', 'active')->count();
    }

    public function getAverageRating()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }
}
