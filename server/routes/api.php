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

    Route::post("/logout", function () {
        return ["message" => "loggedout"];
    });
});

Route::post("/register", [UserController::class, "store"]);

Route::post("/login", [UserController::class, "login"]);


// {
//     "firstname": "thebest",
//     "lastname": "thebest",
//     "username": "thebest",
//     "birthday": "2004-09-02",
//     "email": "thebest@email.com",
//     "password": "password",
//     "password_confirmation": "password"
// }
