<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // هنا يمكنك حفظ الرسالة في قاعدة البيانات أو إرسالها عبر البريد الإلكتروني
        // مثال: بإرسال بريد
        // Mail::to('contact@almarf.com')->send(new ContactMail($validated));

        return back()->with('success', 'تم استلام رسالتك بنجاح. سنتواصل معك قريباً.');
    }
}
