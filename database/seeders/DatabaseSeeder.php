<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Instructor;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء مستخدم مسؤول
        $admin = User::create([
            'name' => 'المدير',
            'email' => 'admin@almaarif.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // إنشاء عدة طلاب
        $students = [];
        for ($i = 1; $i <= 5; $i++) {
            $students[] = User::create([
                'name' => "طالب $i",
                'email' => "student$i@almaarif.com",
                'password' => Hash::make('password'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]);
        }

        // إنشاء فئات
        $categories = [
            ['name' => 'البرمجة', 'slug' => 'programming', 'icon' => 'code'],
            ['name' => 'التصميم', 'slug' => 'design', 'icon' => 'design'],
            ['name' => 'ريادة الأعمال', 'slug' => 'entrepreneurship', 'icon' => 'business'],
            ['name' => 'التسويق الرقمي', 'slug' => 'digital-marketing', 'icon' => 'marketing'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // إنشاء معلمين
        $instructors = [];
        $instructorData = [
            ['name' => 'أحمد محمد', 'email' => 'ahmed@almaarif.com', 'bio' => 'متخصص في البرمجة وتطوير الويب', 'experience_years' => 10, 'specialization' => 'تطوير الويب'],
            ['name' => 'فاطمة علي', 'email' => 'fatima@almaarif.com', 'bio' => 'مصممة جرافيك وواجهات المستخدم', 'experience_years' => 8, 'specialization' => 'التصميم'],
            ['name' => 'عمر سالم', 'email' => 'omar@almaarif.com', 'bio' => 'رائد أعمال وخبير في الاستثمار', 'experience_years' => 15, 'specialization' => 'ريادة الأعمال'],
            ['name' => 'هند إبراهيم', 'email' => 'hind@almaarif.com', 'bio' => 'متخصصة في التسويق الرقمي', 'experience_years' => 7, 'specialization' => 'التسويق'],
        ];

        foreach ($instructorData as $data) {
            $instructors[] = Instructor::create($data);
        }

        // إنشاء دورات
        $coursesData = [
            [
                'title' => 'البرمجة بلغة PHP من الصفر',
                'slug' => 'php-basics',
                'description' => 'تعلم البرمجة بلغة PHP من البداية',
                'long_description' => 'دورة شاملة لتعلم البرمجة بلغة PHP تغطي جميع الأساسيات والمتقدمة',
                'category_id' => 1,
                'instructor_id' => 1,
                'price' => 99.99,
                'level' => 'beginner',
                'type' => 'online',
                'status' => 'published',
            ],
            [
                'title' => 'تصميم واجهات المستخدم الحديثة',
                'slug' => 'modern-ui-design',
                'description' => 'تصميم واجهات جميلة وسهلة الاستخدام',
                'long_description' => 'دورة متقدمة في تصميم واجهات المستخدم باستخدام أحدث الأدوات',
                'category_id' => 2,
                'instructor_id' => 2,
                'price' => 149.99,
                'level' => 'intermediate',
                'type' => 'online',
                'status' => 'published',
            ],
            [
                'title' => 'كيفية بدء مشروعك الخاص',
                'slug' => 'start-your-business',
                'description' => 'خطوات عملية لبدء مشروع ناجح',
                'long_description' => 'دورة شاملة تغطي جميع جوانب بدء مشروع من الفكرة إلى التنفيذ',
                'category_id' => 3,
                'instructor_id' => 3,
                'price' => 199.99,
                'level' => 'beginner',
                'type' => 'online',
                'status' => 'published',
            ],
            [
                'title' => 'التسويق عبر وسائل التواصل الاجتماعي',
                'slug' => 'social-media-marketing',
                'description' => 'استراتيجيات التسويق الفعالة على السوشيال ميديا',
                'long_description' => 'دورة عملية تعلمك كيفية التسويق بفعالية على جميع منصات التواصل',
                'category_id' => 4,
                'instructor_id' => 4,
                'price' => 129.99,
                'level' => 'intermediate',
                'type' => 'online',
                'status' => 'published',
            ],
            [
                'title' => 'React.js المتقدم',
                'slug' => 'advanced-react',
                'description' => 'تعلم React.js بشكل متقدم',
                'long_description' => 'دورة متقدمة في React.js تغطي الـ Hooks والـ State Management',
                'category_id' => 1,
                'instructor_id' => 1,
                'price' => 199.99,
                'level' => 'advanced',
                'type' => 'online',
                'status' => 'published',
            ],
            [
                'title' => 'Figma للمصممين',
                'slug' => 'figma-design',
                'description' => 'احترف التصميم باستخدام Figma',
                'long_description' => 'دورة شاملة في Figma من الأساسيات إلى المشاريع الحقيقية',
                'category_id' => 2,
                'instructor_id' => 2,
                'price' => 0,
                'level' => 'beginner',
                'type' => 'online',
                'status' => 'published',
            ],
        ];

        $courses = [];
        foreach ($coursesData as $data) {
            $courses[] = Course::create($data);
        }

        // إنشاء دروس لكل دورة
        foreach ($courses as $course) {
            for ($i = 1; $i <= 5; $i++) {
                Lesson::create([
                    'course_id' => $course->id,
                    'title' => "درس $i: " . $course->title,
                    'slug' => "lesson-$i-" . $course->id,
                    'video_url' => 'https://example.com/video' . $i,
                    'duration_minutes' => rand(30, 120),
                    'order' => $i,
                ]);
            }
        }

        // إنشاء تسجيلات للطلاب
        foreach ($students as $student) {
            $randomCourses = collect($courses)->random(rand(2, 4));
            foreach ($randomCourses as $course) {
                Enrollment::create([
                    'user_id' => $student->id,
                    'course_id' => $course->id,
                    'status' => 'active',
                    'progress_percentage' => rand(0, 100),
                ]);
            }
        }
    }
}
