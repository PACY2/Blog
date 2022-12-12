<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function profile_id($id)
    {
        $auth = User::findOrFail(auth("sanctum")->user()->id);

        if (auth("sanctum")->check() && $auth->can("view", User::findOrFail($id))) {

            $user = $auth;
        } else {

            $user = User::select(["id",  "username", "role_id"])->findOrFail($id);
        }

        if ($user) {

            $user->load("role:id,name", "posts");
            $user->loadCount("posts");

            return $user;
        }

        return response(["message" => "User Not Found"], 404);
    }

    public function profile()
    {

        $id = auth('sanctum')->user()->id;
        $user = User::findOrFail($id);
        $user->load("role:id,name", "posts");
        $user->loadCount('posts');

        return $user;
    }

    public function update_profile(Request $request)
    {
        $validated = $request->validate([
            'firstname' => ["nullable", "min:3"],
            'lastname' => ["nullable", "min:3"],
            'username' => ["nullable", "unique:users,username", "min:3"],
            "birthday" => ["nullable", "date", "min:3"],
            'email' => ["nullable", "email", "unique:users,email", "min:3"],
            'current_password' => ["required", "current_password", "min:8"],
            'password' => ["nullable", "confirmed", "min:8"]
        ]);

        if (isset($validated["password"])) {
            $validated["password"] = bcrypt($validated["password"]);
        }

        $user = User::findOrFail(auth("sanctum")->user()->id);

        if ($request->hasFile("profile")) {
            if ($user->profile) {
                Storage::disk("public")->delete($user->profile);
            }

            $path = $request->file("profile")->store("user/profiles", "public");
            $validated["profile"] = $path;
        }

        if ($request->hasFile("cover")) {

            if ($user->cover) {
                Storage::disk("public")->delete($user->cover);
            }

            $path = $request->file("cover")->store("user/covers", "public");
            $validated["cover"] = $path;
        }

        $user->update($validated);

        return $this->profile($request);
    }

    public function destroy_profile(Request $request)
    {
        $request->validate([
            "password" => ["required", "min:8", "current_password"]
        ]);

        try {
            $user = User::findOrFail(auth('sanctum')->user()->id);
            $user->tokens()->delete();
            $user->delete();
            return response(['message' => "Account deleted successfully"], 200);
        } catch (\Exception $err) {
            return response(["message" => "Deleting account failed"], 400);
        }
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstname' => ["required", "min:3"],
            'lastname' => ["required", "min:3"],
            'username' => ["required", "unique:users,username", "min:3"],
            "birthday" => ["required", "date", "min:3"],
            'email' => ["required", "email", "unique:users,email", "min:3"],
            'password' => ["required", "confirmed", "min:8"]
        ]);

        if ($request->hasFile("profile")) {
            $path = $request->file("profile")->store("user/profiles", "public");
            $validated["profile"] = $path;
        }

        if ($request->hasFile("cover")) {
            $path = $request->file("cover")->store("user/covers", "public");
            $validated["cover"] = $path;
        }

        $validated["password"] = bcrypt($validated["password"]);
        $validated["role_id"] = 1;


        $user = User::create($validated);
        $token = $user->createToken("login")->plainTextToken;
        $user->sendEmailVerificationNotification();

        $user->load("role:id,name");

        return ["user" => $user, "token" => $token];
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => ["required", "email", "exists:users,email"],
            "password" => ["required", "min:8"],
        ]);

        $user = User::where("email", $validated["email"])->first();

        if ($user) {
            if (!Hash::check($validated["password"], $user->password)) return response(["errors" => ["password" => ["Password is not correct"]]], 400);
            $token = $user->createToken('camado')->plainTextToken;
            $user->load("role:id,name");
            return ["user" => $user, "token" => $token];
        } else {
            return response(["message" => "User not found"], 404);
        }
    }

    public function logout()
    {
        $user = User::findOrFail(auth("sanctum")->user()->id);
        $user->tokens()->delete();
        return ["message" => "Logged out"];
    }

    public function forget_password(Request $request)
    {
        $validated = $request->validate(["email" => ["required", "email", "exists:users,email"]]);

        $user = User::where("email", $validated["email"])->first();

        if ($user) {
            Password::sendResetLink($validated);
        }
    }

    public function reset_password($token, Request $request)
    {
        $validated = $request->validate(["email" => ["required", "email", "exists:users,email"]]);

        $record = DB::table("password_resets")->select("token")->where("email", $validated["email"])->first();

        try {
            return Hash::check($token, $record->token) ? [] : abort(400);
        } catch (\Exception $err) {
            abort(400);
        }
    }

    public function update_password(Request $request)
    {
        $validated = $request->validate([
            "token" => ["required"],
            "email" => ["required", "email", "exists:users,email"],
            "password" => ["required", "min:8", "confirmed"]
        ]);

        $status = Password::reset($validated, function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
            event(new PasswordReset(($user)));
        });

        return $status === Password::PASSWORD_RESET ? ["message" => "password updated"] : response(["message" => 'An error occured'], 400);
    }

    public function verify(EmailVerificationRequest $request)
    {
        $user = User::findOrFail(auth("sanctum")->user())->id;

        if ($user->hasVerifiedEmail()) {
            return ["email_verified_at", $user->email_verified_at];
        }

        $request->fulfill();

        return ["email_verified_at", $user->email_verified_at];
    }

    public function resend_verification()
    {
        $user = User::findOrFail(auth("sanctum")->user())->id;

        if ($user->hasVerifiedEmail()) {
            return ["message" => "Email is already verified"];
        }

        $user->sendEmailVerificationNotification();

        return ["massage", "Verification email sent"];
    }
}
