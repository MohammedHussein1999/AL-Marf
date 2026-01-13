# دليل سريع - أكاديمية المعارف

## 🚀 الأوامر الأساسية

### تشغيل التطبيق

```bash
# تثبيت المتطلبات
composer install
npm install

# تشغيل الهجرات
php artisan migrate

# بدء خادم التطوير
php artisan serve

# تجميع الأصول (في نافذة أخرى)
npm run dev
```

### الوصول للتطبيق

```
الصفحة الرئيسية: http://localhost:8000
لوحة التحكم:   http://localhost:8000/admin/dashboard
تسجيل الدخول:  http://localhost:8000/login
```

---

## 👤 إنشاء حسابات اختبار

### من خلال Tinker

```bash
php artisan tinker
```

```php
# إنشاء مسؤول
User::create([
    'name' => 'Admin',
    'email' => 'admin@almarf.com',
    'password' => bcrypt('password'),
    'role' => 'admin'
]);

# إنشاء طالب
User::create([
    'name' => 'Student',
    'email' => 'student@almarf.com',
    'password' => bcrypt('password'),
    'role' => 'student'
]);

# إنشاء مدرب
$instructor = Instructor::create([
    'name' => 'Instructor',
    'email' => 'instructor@almarf.com',
    'specialization' => 'Web Development',
    'experience_years' => 5
]);
User::create([
    'name' => 'Instructor',
    'email' => 'instructor@almarf.com',
    'password' => bcrypt('password'),
    'role' => 'instructor'
]);
```

---

## 📁 هيكل المشروع السريع

```
AL-Marf/
├── app/Models/              → نماذج البيانات (8 ملفات)
├── app/Http/Controllers/Admin/  → متحكمات الإدارة (6 ملفات)
├── resources/js/
│   ├── layouts/AdminLayout.tsx
│   └── pages/admin/          → صفحات الإدارة (7 ملفات)
├── database/migrations/      → الهجرات (8 ملفات)
├── routes/web.php           → المسارات
└── docs/
    ├── ADMIN_DASHBOARD_SETUP.md
    ├── API_DOCUMENTATION.md
    ├── COMPLETION_SUMMARY.md
    ├── ARCHITECTURE.md
    └── PROJECT_STATUS.md
```

---

## 🔑 المسارات الرئيسية

### مسارات الإدارة

| المسار               | الوصف           |
| -------------------- | --------------- |
| `/admin/dashboard`   | لوحة البيانات   |
| `/admin/courses`     | إدارة الدورات   |
| `/admin/students`    | إدارة الطلاب    |
| `/admin/instructors` | إدارة المدربين  |
| `/admin/reviews`     | إدارة التقييمات |
| `/admin/settings`    | الإعدادات       |

### مسارات عامة

| المسار       | الوصف           |
| ------------ | --------------- |
| `/`          | الصفحة الرئيسية |
| `/login`     | تسجيل الدخول    |
| `/register`  | التسجيل الجديد  |
| `/dashboard` | لوحة المستخدم   |

---

## 🗄️ النماذج والعلاقات

### User (المستخدم)

```php
has_many: Enrollments
has_many: Reviews
has_many: LessonCompletions
```

### Course (الدورة)

```php
belongs_to: Category
belongs_to: Instructor
has_many: Enrollments
has_many: Lessons
has_many: Reviews
```

### Instructor (المدرب)

```php
has_many: Courses
has_many: Lessons
```

### Lesson (الدرس)

```php
belongs_to: Course
belongs_to: Instructor
has_many: LessonCompletions
```

---

## 🧪 الاختبار والتطوير

### تشغيل الاختبارات

```bash
php artisan test
```

### معاينة البريد

```bash
php artisan tinker
Mail::peek(Mail::mailable(...)->send())
```

### مسح الكاش

```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

---

## 🎨 التخصيص

### تغيير الألوان

في `resources/js/layouts/AdminLayout.tsx`:

```tsx
// الألوان الحالية
const colors = {
    primary: 'blue-600',
    secondary: 'gray-800',
    // غيّر حسب الحاجة
};
```

### تغيير اللغة

جميع النصوص في الصفحات باللغة العربية:

```tsx
// مثال
<h1>إدارة الدورات</h1>  // عربي
<h1>Courses Management</h1>  // إنجليزي
```

---

## 📊 البيانات والتقارير

### الوصول إلى البيانات

```php
// الدورات الكاملة
Course::whereStatus('published')->count();

// الطلاب النشطين
Enrollment::whereStatus('active')->count();

// الإيرادات
Course::sum('price');

// التقييمات
Review::avg('rating');
```

---

## 🔒 الأمان والصلاحيات

### التحقق من الدور

```php
// في المتحكم
if (auth()->user()->role === 'admin') {
    // السماح بالوصول
}

// في Blade
@if (auth()->user()->role === 'admin')
    // محتوى إداري فقط
@endif
```

---

## 🚀 نشر التطبيق

### قائمة التحقق قبل النشر

- [ ] تشغيل جميع الاختبارات
- [ ] مراجعة الأمان
- [ ] تحديث ملف `.env` للإنتاج
- [ ] تشغيل `php artisan migrate --force`
- [ ] تفعيل HTTPS
- [ ] ضبط جدران الحماية
- [ ] إعداد النسخ الاحتياطية

### أوامر النشر

```bash
# تحضير الإنتاج
php artisan config:cache
php artisan route:cache
php artisan view:cache

# تثبيت الأصول
npm run build
```

---

## 🐛 استكشاف الأخطاء

### فحص السجلات

```bash
# إظهار آخر 50 سطر
tail -f storage/logs/laravel.log

# أو استخدم Telescope
php artisan telescope:install
```

### أوضاع التصحيح

```php
// في .env
APP_DEBUG=true  // في التطوير
APP_DEBUG=false // في الإنتاج
```

---

## 📚 الموارد الإضافية

### الوثائق المرفقة

1. `ADMIN_DASHBOARD_SETUP.md` - دليل الإعداد الكامل
2. `API_DOCUMENTATION.md` - توثيق جميع النقاط النهائية
3. `ARCHITECTURE.md` - شرح البنية المعمارية
4. `COMPLETION_SUMMARY.md` - ملخص شامل

### روابط مفيدة

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✅ قائمة التحقق الأساسية

- [ ] تثبيت المتطلبات
- [ ] تشغيل الهجرات
- [ ] إنشاء حساب إداري
- [ ] الوصول لداشبورد الإدارة
- [ ] اختبار صفحات الإدارة
- [ ] التحقق من البيانات

---

## 📞 الدعم والمساعدة

### في حالة المشاكل

1. تحقق من `storage/logs/laravel.log`
2. جرب `php artisan migrate:refresh` (في التطوير فقط)
3. امسح الكاش: `php artisan cache:clear`
4. جرب `npm install` و `npm run dev` مجدداً

### بدء جديد (في التطوير فقط)

```bash
php artisan migrate:refresh --seed
php artisan cache:clear
npm run dev
```

---

**آخر تحديث**: 13 يناير 2025

**💡 نصيحة**: احفظ هذا الملف واستخدمه كمرجع سريع!
