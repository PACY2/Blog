<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Mail\TestMail;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::get();
    }

    public function forget_password(Request $request)
    {
        $validated = $request->validate(["email" => ["required", "email"]]);

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
        if (auth("sanctum")->user()->hasVerifiedEmail()) {
            return ["email_verified_at", auth("sanctum")->user()->email_verified_at];
        }

        $request->fulfill();

        return ["email_verified_at", auth("sanctum")->user()->email_verified_at];
    }

    public function resend_verification(Request $request)
    {
        if (auth("sanctum")->user()->hasVerifiedEmail()) {
            return ["message" => "Email is already verified"];
        }

        auth("sanctum")
            ->user()
            ->sendEmailVerificationNotification();

        return ["massage", "Verification email sent"];
    }

    public function profile(Request $request)
    {
        $user = auth("sanctum")->user();
        $user->load("role:id,name");
        return $user;
    }

    public function logout()
    {
        auth('sanctum')->user()->tokens()->delete();
        return ["message" => "Logged out"];
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            "email" => ["required", "email", "exists:users,email"],
            "password" => ["required", "min:8"],
        ]);

        $user = User::where("email", $validated["email"])->first();

        if (!Hash::check($validated["password"], $user->password)) return response(["errors" => ["password" => ["Password is not correct"]]], 400);

        $token = $user->createToken('camado')->plainTextToken;

        $user->load("role:id,name");

        return ["user" => $user, "token" => $token];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => ["required", "min:3"],
            'lastname' => ["required", "min:3"],
            'username' => ["required", "unique:users,username", "min:3"],
            "birthday" => ["required", "date", "min:3"],
            'email' => ["required", "email", "unique:users,email", "min:3"],
            'password' => ["required", "confirmed", "min:8"]
        ]);

        $validated["password"] = bcrypt($validated["password"]);
        $validated["role_id"] = 1;

        $user = User::create($validated);
        $token = $user->createToken("login")->plainTextToken;
        $user->sendEmailVerificationNotification();

        $user->load("role:id,name");

        return ["user" => $user, "token" => $token];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'firstname' => ["nullable", "min:3"],
            'lastname' => ["nullable", "min:3"],
            'username' => ["nullable", "unique:users,username", "min:3"],
            "birthday" => ["nullable", "date", "min:3"],
            'email' => ["nullable", "email", "unique:users,email", "min:3"],
            'password' => ["nullable", "min:8"]
        ]);

        $user = User::findOrFail($id);

        if (isset($validated["password"])) {
            $validated["password"] = bcrypt($validated["password"]);
        }

        $user->update($validated);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        return $user->delete();
    }
}
