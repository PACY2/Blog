<?php

use App\Http\Controllers\AuthController;
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

// Authenticated requests only
Route::group(["middleware" => ["auth:sanctum"]], function () {

    // Posts: Crud operations 
    Route::apiResource("posts", PostController::class);

    // Users: Crud operations { show }
    Route::apiResource("users", UserController::class)->except([
        "show"
    ]);

    // handle_profile [ GET, PATCH, DELETE ]
    Route::get("/profile", [AuthController::class, "profile"]);
    Route::patch("/profile", [AuthController::class, "update_profile"]);
    Route::delete("/profile", [AuthController::class, "destroy_profile"]);

    // Email verification
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, "verify"])
        ->middleware('signed')->name('verification.verify');
    Route::post('/email/verification-notification', [AuthController::class, "resend_verification"])
        ->middleware('throttle:6,1')->name('verification.send');

    // logout
    Route::post("/logout", [AuthController::class, "logout"]);
});

// Authentication
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);

// forget-password
Route::post("/forget-password", [AuthController::class, "forget_password"])->name("password.email");
Route::get("/reset-password/{token}", [AuthController::class, "reset_password"])->name("password.reset");
Route::post("/reset-password", [AuthController::class, "update_password"])->name("password.update");

// profile_by_id
Route::get("/users/{id}", [AuthController::class, "profile_id"]);
