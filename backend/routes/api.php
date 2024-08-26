<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReviewController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('reviews',[ReviewController::class, 'index']);

Route::post('/example' , function (Request $request) {
    return response()->json([
        'message' => 'データが送信されました！',
        'data' => $request->all()
    ]);
});

Route::post('reviews' , [ReviewController::class,'store']);