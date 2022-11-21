<?php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Contracts\Auth\MustVerifyEmail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::apiResource("posts", PostController::class);
    Route::apiResource("users", UserController::class);

    Route::get('/email/verify/{id}/{hash}', [UserController::class, "verify"])
        ->middleware('signed')->name('verification.verify');

    Route::post('/email/verification-notification', [UserController::class, "resend_verification"])
        ->middleware('throttle:6,1')->name('verification.send');

    Route::get("/profile", [UserController::class, "profile"]);

    Route::post("/logout", [UserController::class, "logout"]);
});

Route::post("/register", [UserController::class, "store"]);

Route::post("/login", [UserController::class, "login"]);

Route::post("/forget-password", [UserController::class, "forget_password"])->name("password.email");

Route::get("/reset-password/{token}", [UserController::class, "reset_password"])->name("password.reset");

Route::post("/reset-password", [UserController::class, "update_password"])->name("password.update");
