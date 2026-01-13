<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // بيانات وهمية للمحفظة
        $balance = 500.00;
        $totalSpent = 1250.50;

        $transactions = [
            [
                'id' => 1,
                'type' => 'credit',
                'amount' => 500,
                'description' => 'شحن رصيد',
                'date' => now()->subDays(5)->toDateTimeString(),
            ],
            [
                'id' => 2,
                'type' => 'debit',
                'amount' => 99.99,
                'description' => 'دورة: البرمجة بلغة PHP',
                'date' => now()->subDays(3)->toDateTimeString(),
            ],
            [
                'id' => 3,
                'type' => 'debit',
                'amount' => 149.99,
                'description' => 'دورة: تصميم واجهات المستخدم',
                'date' => now()->subDay()->toDateTimeString(),
            ],
            [
                'id' => 4,
                'type' => 'credit',
                'amount' => 100,
                'description' => 'رصيد هدية',
                'date' => now()->subDays(7)->toDateTimeString(),
            ],
        ];

        return Inertia::render('StudentWallet', [
            'balance' => $balance,
            'totalSpent' => $totalSpent,
            'transactions' => $transactions,
        ]);
    }
}
