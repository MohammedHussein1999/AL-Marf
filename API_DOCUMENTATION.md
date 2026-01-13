# API Documentation - Al-Marf Admin Dashboard

## نظرة عامة

هذا المستند يوضح جميع نقاط النهاية (Endpoints) المتاحة في لوحة التحكم الإدارية لأكاديمية المعارف.

## المتطلبات

- المصادقة مطلوبة لجميع المسارات (`auth` middleware)
- التحقق من البريد الإلكتروني مطلوب (`verified` middleware)
- البادئة: `/admin`

## مسارات لوحة البيانات

### الحصول على بيانات لوحة البيانات

```
GET /admin/dashboard
```

**الرد:**

```json
{
    "stats": {
        "totalCourses": 15,
        "totalStudents": 234,
        "totalInstructors": 8,
        "totalEnrollments": 145,
        "coursesOnline": 10,
        "coursesOffline": 5,
        "averageRating": 4.5,
        "revenueThisMonth": 5000
    }
}
```

## مسارات الدورات (Courses)

### قائمة الدورات

```
GET /admin/courses
```

**البيانات المرجعة:**

```json
[
  {
    "id": 1,
    "title": "تعلم React",
    "slug": "learn-react",
    "description": "دورة شاملة في React",
    "category": {
      "id": 1,
      "name": "البرمجة"
    },
    "instructor": {
      "id": 1,
      "name": "أحمد محمد"
    },
    "type": "online",
    "price": 299.99,
    "status": "published",
    "level": "intermediate",
    "duration_hours": 40,
    "enrollments": [...]
  }
]
```

### إضافة دورة جديدة

```
POST /admin/courses
```

**البيانات المطلوبة:**

```json
{
    "title": "تعلم React",
    "slug": "learn-react",
    "description": "دورة شاملة في React",
    "category_id": 1,
    "instructor_id": 1,
    "type": "online",
    "price": 299.99,
    "status": "draft",
    "level": "intermediate",
    "duration_hours": 40,
    "max_students": 50,
    "start_date": "2025-02-01",
    "end_date": "2025-03-01"
}
```

### عرض تفاصيل الدورة

```
GET /admin/courses/{id}
```

**البيانات المرجعة:**

```json
{
  "id": 1,
  "title": "تعلم React",
  "slug": "learn-react",
  "description": "دورة شاملة في React",
  "category": {...},
  "instructor": {...},
  "type": "online",
  "price": 299.99,
  "status": "published",
  "level": "intermediate",
  "duration_hours": 40,
  "max_students": 50,
  "enrollments": [...],
  "lessons": [...],
  "reviews": [...]
}
```

### تعديل دورة

```
PATCH /admin/courses/{id}
```

**البيانات المطلوبة:** (نفس بيانات الإضافة)

### حذف دورة

```
DELETE /admin/courses/{id}
```

## مسارات الطلاب (Students)

### قائمة الطلاب

```
GET /admin/students
```

**البيانات المرجعة:**

```json
[
    {
        "id": 1,
        "name": "محمود علي",
        "email": "mahmoud@example.com",
        "phone": "+966501234567",
        "created_at": "2025-01-10",
        "enrollments": [
            {
                "id": 1,
                "course": {
                    "id": 1,
                    "title": "تعلم React"
                },
                "status": "active",
                "progress_percentage": 45
            }
        ]
    }
]
```

### البحث والفلترة

```
GET /admin/students?search=محمود&status=active&sort=name
```

**معاملات الاستعلام:**

- `search`: نص البحث (الاسم أو البريد الإلكتروني)
- `status`: حالة الالتحاق (active, completed, dropped)
- `sort`: ترتيب النتائج (name, date)

## مسارات المدربين (Instructors)

### قائمة المدربين

```
GET /admin/instructors
```

**البيانات المرجعة:**

```json
[
    {
        "id": 1,
        "name": "أحمد محمد",
        "email": "ahmad@example.com",
        "phone": "+966501234567",
        "specialization": "تطوير الويب",
        "experience_years": 8,
        "status": "active",
        "courses": [
            {
                "id": 1,
                "title": "تعلم React"
            }
        ]
    }
]
```

### إضافة مدرب جديد

```
POST /admin/instructors
```

**البيانات المطلوبة:**

```json
{
    "name": "أحمد محمد",
    "email": "ahmad@example.com",
    "phone": "+966501234567",
    "bio": "متخصص في تطوير الويب",
    "specialization": "تطوير الويب",
    "experience_years": 8,
    "qualifications": "بكالوريوس علوم الحاسب",
    "status": "active"
}
```

### تعديل مدرب

```
PATCH /admin/instructors/{id}
```

### حذف مدرب

```
DELETE /admin/instructors/{id}
```

## مسارات التقييمات (Reviews)

### قائمة التقييمات

```
GET /admin/reviews
```

**البيانات المرجعة:**

```json
[
    {
        "id": 1,
        "user": {
            "id": 1,
            "name": "محمود علي"
        },
        "course": {
            "id": 1,
            "title": "تعلم React"
        },
        "rating": 5,
        "comment": "دورة رائعة جداً",
        "status": "pending",
        "created_at": "2025-01-10"
    }
]
```

### الموافقة على تقييم

```
PATCH /admin/reviews/{id}/approve
```

**البيانات المطلوبة:**

```json
{
    "status": "approved"
}
```

### رفض تقييم

```
PATCH /admin/reviews/{id}/reject
```

**البيانات المطلوبة:**

```json
{
    "status": "rejected"
}
```

### حذف تقييم

```
DELETE /admin/reviews/{id}
```

## مسارات الفئات (Categories)

### قائمة الفئات

```
GET /admin/categories
```

### إضافة فئة

```
POST /admin/categories
```

**البيانات المطلوبة:**

```json
{
    "name": "البرمجة",
    "slug": "programming",
    "description": "دورات برمجة حديثة",
    "icon": "code"
}
```

### تعديل فئة

```
PATCH /admin/categories/{id}
```

### حذف فئة

```
DELETE /admin/categories/{id}
```

## مسارات الالتحاقات (Enrollments)

### قائمة الالتحاقات

```
GET /admin/enrollments
```

### قبول التحاق

```
PATCH /admin/enrollments/{id}/approve
```

### رفض التحاق

```
PATCH /admin/enrollments/{id}/reject
```

### إلغاء التحاق

```
DELETE /admin/enrollments/{id}
```

## مسارات الدروس (Lessons)

### قائمة دروس الدورة

```
GET /admin/courses/{courseId}/lessons
```

### إضافة درس

```
POST /admin/courses/{courseId}/lessons
```

**البيانات المطلوبة:**

```json
{
    "title": "مقدمة في React",
    "description": "تعرف على أساسيات React",
    "content": "محتوى الدرس",
    "video_url": "https://youtube.com/...",
    "duration_minutes": 45,
    "order": 1
}
```

### تعديل درس

```
PATCH /admin/lessons/{id}
```

### حذف درس

```
DELETE /admin/lessons/{id}
```

## مسارات الإعدادات (Settings)

### الحصول على الإعدادات

```
GET /admin/settings
```

### تحديث الإعدادات

```
PATCH /admin/settings
```

**البيانات المطلوبة:**

```json
{
    "siteName": "أكاديمية المعارف",
    "siteEmail": "info@almarf.com",
    "sitePhone": "+966501234567",
    "siteDescription": "أكاديمية متخصصة في التعليم الإلكتروني",
    "address": "المملكة العربية السعودية",
    "mainColor": "#3b82f6",
    "secondaryColor": "#06b6d4",
    "enableRegistration": true,
    "requireEmailVerification": true,
    "maxCourseStudents": 100,
    "maintenanceMode": false
}
```

## رموز الأخطاء والحالات

### رموز النجاح

- `200`: تم بنجاح
- `201`: تم الإنشاء بنجاح
- `204`: تم الحذف بنجاح

### رموز الأخطاء

- `400`: طلب غير صحيح
- `401`: غير مصرح (غير مسجل دخول)
- `403`: ممنوع الوصول
- `404`: لم يتم العثور على المورد
- `422`: خطأ في التحقق من البيانات
- `500`: خطأ في الخادم

## أمثلة الاستجابة

### النجاح

```json
{
  "success": true,
  "message": "تم العملية بنجاح",
  "data": {...}
}
```

### الخطأ

```json
{
    "success": false,
    "message": "حدث خطأ ما",
    "errors": {
        "email": ["البريد الإلكتروني موجود بالفعل"]
    }
}
```

## محدودية التدفق (Rate Limiting)

- **الحد الأقصى للطلبات**: 60 طلب لكل دقيقة
- **رسالة الخطأ**: `429 Too Many Requests`

## الترتيب والعرض

### معاملات الترتيب

```
GET /admin/courses?sort=title&order=asc
GET /admin/courses?sort=created_at&order=desc
```

### العرض والتقسيم

```
GET /admin/courses?page=1&per_page=15
```

## التصفية المتقدمة

### حسب التاريخ

```
GET /admin/courses?from_date=2025-01-01&to_date=2025-01-31
```

### حسب السعر

```
GET /admin/courses?min_price=100&max_price=500
```

### حسب الحالة

```
GET /admin/courses?status=published,active
```

---

**آخر تحديث**: 13 يناير 2025
