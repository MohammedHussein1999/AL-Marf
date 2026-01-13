# بنية نظام أكاديمية المعارف

## الهيكل العام للتطبيق

```
AL-Marf (أكاديمية المعارف)
│
├── Frontend (React/Inertia)
│   ├── Pages
│   │   ├── Public Pages
│   │   │   ├── Welcome.tsx
│   │   │   └── Dashboard.tsx (المستخدم العادي)
│   │   │
│   │   └── Admin Pages (لوحة التحكم)
│   │       ├── Dashboard.tsx (لوحة البيانات)
│   │       ├── Courses.tsx (إدارة الدورات)
│   │       ├── Students.tsx (إدارة الطلاب)
│   │       ├── Instructors.tsx (إدارة المدربين)
│   │       ├── Reviews.tsx (إدارة التقييمات)
│   │       └── Settings.tsx (الإعدادات)
│   │
│   └── Layouts
│       ├── AdminLayout.tsx (تخطيط الإدارة)
│       └── AppLayout.tsx (تخطيط التطبيق العام)
│
├── Backend (Laravel)
│   │
│   ├── Models (النماذج)
│   │   ├── User.php
│   │   ├── Course.php
│   │   ├── Category.php
│   │   ├── Instructor.php
│   │   ├── Enrollment.php
│   │   ├── Lesson.php
│   │   ├── LessonCompletion.php
│   │   └── Review.php
│   │
│   ├── Controllers
│   │   ├── Admin/
│   │   │   ├── DashboardController.php
│   │   │   ├── CourseController.php
│   │   │   ├── StudentController.php
│   │   │   ├── InstructorController.php
│   │   │   ├── ReviewController.php
│   │   │   └── SettingsController.php
│   │   │
│   │   ├── Auth/ (Fortify)
│   │   │   ├── LoginController.php
│   │   │   ├── RegisterController.php
│   │   │   └── ...
│   │   │
│   │   └── Settings/
│   │       ├── PasswordController.php
│   │       └── ProfileController.php
│   │
│   ├── Routes
│   │   ├── web.php (المسارات الرئيسية + مسارات الإدارة)
│   │   ├── settings.php
│   │   └── console.php
│   │
│   └── Middleware
│       └── Authenticate.php
│
├── Database
│   ├── Migrations
│   │   ├── 2025_01_13_120000_add_role_to_users_table.php
│   │   ├── 2025_01_13_120100_create_categories_table.php
│   │   ├── 2025_01_13_120200_create_instructors_table.php
│   │   ├── 2025_01_13_120300_create_courses_table.php
│   │   ├── 2025_01_13_120400_create_enrollments_table.php
│   │   ├── 2025_01_13_120500_create_lessons_table.php
│   │   ├── 2025_01_13_120600_create_lesson_completions_table.php
│   │   └── 2025_01_13_120700_create_reviews_table.php
│   │
│   ├── Factories
│   │   └── UserFactory.php
│   │
│   └── Seeders
│       └── DatabaseSeeder.php
│
├── Config
│   ├── app.php
│   ├── auth.php
│   ├── database.php
│   ├── fortify.php
│   ├── inertia.php
│   └── ...
│
└── Resources
    ├── CSS
    │   └── app.css (Tailwind)
    │
    ├── JS
    │   ├── app.tsx
    │   ├── ssr.tsx
    │   ├── layouts/
    │   ├── pages/
    │   ├── components/
    │   ├── hooks/
    │   ├── types/
    │   └── lib/
    │
    └── Views
        └── app.blade.php
```

---

## الجداول والعلاقات

```
┌─────────────────────────────────────────────────────────────┐
│                        Users (المستخدمون)                   │
├─────────────────────────────────────────────────────────────┤
│ id | name | email | password | role | created_at | ...      │
│    |      |       |          |      |            |          │
│    └──────┬──────────────────┘      │            │          │
│           │                         │            │          │
└────┬──────┴─────────────────┬───────┴────┬───────┴──────────┘
     │                        │            │
     │ (student)       (instructor)  (admin)
     │                        │
     │                        ▼
     │          ┌──────────────────────────┐
     │          │  Instructors             │
     │          ├──────────────────────────┤
     │          │ id | name | email | ...  │
     │          └──────────────────────────┘
     │                  △
     │                  │ has_many
     │          ┌───────┴────────┐
     │          ▼                ▼
     │    ┌──────────────────────────────────┐
     │    │  Courses                         │
     │    ├──────────────────────────────────┤
     │    │ id | title | category_id        │
     │    │    | instructor_id | type       │
     │    │    | status | price | ...       │
     │    └──────────────────────────────────┘
     │        △  △           │  │
     │        │  │           │  └─────────────┐
     │        │  │           │                │
     │   belongs_to │    has_many       has_many
     │        │     │         │                │
     │    Category  │    ┌────┴──────────┐    │
     │        │     │    │              │    │
     │        │     │    ▼              ▼    ▼
     │        │     └─ Lessons      Reviews
     │        │           │            │
     │        │           │       belongs_to
     │        │      has_many          │
     │        │           │            │
     └────────┼──────┬────┴────────────┴──────┐
              │      │                        │
              │  has_many              belongs_to
              │      │                        │
              │      ▼                        ▼
              │   Enrollments ◄─────────── Users (Students)
              │      │
              │      └────────────┐
              │                   │
              │              has_many
              │                   │
              │                   ▼
              │        LessonCompletions
              │
              └──────────────────────────────────┐
                                                 │
                                            has_many
                                                 │
                                                 ▼
                                         Reviews (التقييمات)
```

---

## تدفق البيانات والعمليات

### 1. عملية التسجيل والدخول

```
User (يملأ النموذج)
        │
        ▼
Fortify Register Controller
        │
        ▼
User Model (حفظ في قاعدة البيانات)
        │
        ▼
Auth Guard (تعيين الجلسة)
        │
        ▼
Dashboard (إعادة التوجيه)
```

### 2. عملية الالتحاق بالدورة

```
Student (اختيار دورة)
        │
        ▼
Course Detail Page
        │
        ▼
Enroll Request
        │
        ▼
EnrollmentController (إنشاء)
        │
        ▼
Enrollment Model (حفظ السجل)
        │
        ▼
Dashboard (تحديث الحالة)
```

### 3. عملية تقييم الدورة

```
Student (كتابة المراجعة)
        │
        ▼
Review Form
        │
        ▼
ReviewController (حفظ)
        │
        ▼
Review Model (status: pending)
        │
        ▼
Admin Dashboard (عرض قيد الانتظار)
        │
        ▼
Admin (الموافقة/الرفض)
        │
        ▼
Update Review Status
        │
        ▼
Published on Course Page
```

---

## المسارات والمصادقة

### المسارات العامة (بدون تسجيل):

```
GET  /                    - الصفحة الرئيسية
GET  /login               - صفحة الدخول
GET  /register            - صفحة التسجيل
```

### المسارات المحمية (مع تسجيل):

```
GET  /dashboard           - لوحة التحكم الشخصية
GET  /settings/profile    - إعدادات الملف الشخصي
GET  /settings/password   - تغيير كلمة المرور
```

### مسارات الإدارة (Admin فقط):

```
GET  /admin/dashboard     - لوحة البيانات الإدارية
GET  /admin/courses       - إدارة الدورات
GET  /admin/students      - إدارة الطلاب
GET  /admin/instructors   - إدارة المدربين
GET  /admin/reviews       - إدارة التقييمات
GET  /admin/settings      - إعدادات النظام
```

---

## العلاقات بين النماذج

### User

```
User
├── has_many → Enrollments
├── has_many → Reviews (through Enrollments)
└── has_many → LessonCompletions
```

### Course

```
Course
├── belongs_to → Category
├── belongs_to → Instructor
├── has_many → Enrollments
├── has_many → Lessons
└── has_many → Reviews
```

### Instructor

```
Instructor
├── has_many → Courses
└── has_many → Lessons
```

### Lesson

```
Lesson
├── belongs_to → Course
├── belongs_to → Instructor
└── has_many → LessonCompletions
```

### Enrollment

```
Enrollment
├── belongs_to → User
└── belongs_to → Course
```

### Review

```
Review
├── belongs_to → User
└── belongs_to → Course
```

---

## دورة الحياة للبيانات

### إنشاء دورة:

```
1. Admin يدخل لوحة التحكم
2. ينقر على "إضافة دورة جديدة"
3. يملأ النموذج (العنوان، الوصف، الفئة، إلخ)
4. يختار النوع (أون لاين / أوف لاين)
5. يحفظ الدورة
6. يتم إنشاء سجل في جدول Courses
7. تظهر الدورة في القائمة
```

### تسجيل الطالب:

```
1. Student يدخل موقع الأكاديمية
2. يتصفح الدورات المتاحة
3. يختار دورة ويضغط "التحاق"
4. يتم إنشاء سجل Enrollment
5. يتم تعيين الحالة: pending
6. Admin يوافق على الالتحاق
7. تتغير الحالة إلى: active
8. يظهر في لوحة تحكم الطالب
```

### تقدم الطالب:

```
1. Student يكمل الدرس الأول
2. ينقر "تم إكمال الدرس"
3. يتم حفظ LessonCompletion
4. يتم حساب Progress Percentage
5. يظهر في Enrollment
6. عند إكمال جميع الدروس
7. تتغير حالة Enrollment إلى: completed
8. يحصل على الشهادة (اختياري)
```

---

## نظام الأدوار والصلاحيات

```
┌─────────────┬──────────────┬──────────────┬──────────────┐
│    Student  │ Instructor   │     Admin    │    Guest     │
├─────────────┼──────────────┼──────────────┼──────────────┤
│ • التحاق    │ • إنشاء      │ • إدارة      │ • عرض        │
│   بالدورات │   دورات      │   شاملة      │   العام      │
│             │             │              │              │
│ • التقييم   │ • رفع        │ • إدارة      │ • البحث       │
│             │   الدروس     │   المستخدمين│              │
│             │             │              │              │
│ • المراجعة  │ • تتبع       │ • الإحصائيات│ • التسجيل    │
│             │   التقدم     │   والتقارير│ • الدخول     │
│             │             │              │              │
│ • الشهادات  │ • الملف      │ • الإعدادات │ • الاستفسار  │
│   (عند)     │   الشخصي     │   الكاملة    │              │
│             │             │              │              │
└─────────────┴──────────────┴──────────────┴──────────────┘
```

---

## آلية الحفظ والمزامنة

```
Frontend (React)
    │
    └─ Inertia Request
            │
            ▼
Backend (Laravel)
    │
    ├─ Route Dispatch
    │
    ├─ Controller
    │
    ├─ Model (Business Logic)
    │
    ├─ Database Query (Eloquent)
    │
    └─ Database (SQLite)
            │
            ▼
        Save Data
            │
            ▼
    Return Response
            │
            ├─ JSON Data
            │
            └─ Props
                    │
                    ▼
            Frontend Component
                    │
                    ▼
            Re-render UI
```

---

## الملفات الرئيسية والمسئولية

| الملف                   | المسؤولية                      |
| ----------------------- | ------------------------------ |
| web.php                 | تعريف جميع المسارات            |
| DashboardController.php | إحصائيات وبيانات لوحة البيانات |
| CourseController.php    | إدارة دورة الحياة للدورات      |
| Course.php              | منطق الدورة وعلاقاتها          |
| AdminLayout.tsx         | تخطيط واجهة الإدارة            |
| Dashboard.tsx           | عرض الإحصائيات                 |
| Courses.tsx             | عرض وإدارة الدورات             |
| Migrations              | إنشاء والحفاظ على البنية       |

---

**تم إعداد البنية بعناية لضمان سهولة الصيانة والتطوير! ✨**
