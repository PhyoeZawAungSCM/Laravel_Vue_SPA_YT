<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:225',
            'email' => 'required|email',
            'password' => 'required|min:8|string|confirmed'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        if ($user->save()) {
            return response()->json([
                'message' => 'user created successfully',

            ], 201);
        } else {
            return response()->josn([
                'message' => "Some Error occur, please try again",
            ], 500);
        }
    }
    public function login(Request $request)
    {
        $credentials =  $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'remember_me' => 'boolean',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => "Email or Password does not match",
            ], 401);
        }

        $user = $request->user();

        if ($user->role == 'adminstrator') {
            $tokenData = $user->createToken('Personal Access Token', ['adminstrator']);
        } else {
            $tokenData = $user->createToken('Personal Access Token', ['user']);
        }
        $token = $tokenData->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeek(1);
        }
        if ($token->save()) {
            return response()->json([
                'user' => $user,
                'access_token' => $tokenData->accessToken,
                'token_type' => "Bearer",
                'token_scope' => $tokenData->token->scopes[0],
                'expire_at' => Carbon::parse($tokenData->token->expires_at)->toDateTimeString()
            ], 200);
        } else {
            return response()->json([
                'message' => 'some error occur please try again',
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout successfully',
        ], 200);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function resetPasswordRequest(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Please Create a account',
            ], 422);
        }
        $random = rand(111111, 999999);
        $user->verification_code = $random;

        if ($user->save()) {
            $userData = array(
                'email' => $user->email,
                'verification_code' => $user->verification_code,
                'name' => $user->name
            );
            Mail::send('mail', $userData, function ($message) {
                $message->from('noreply@laravel.vue.learning', 'PZA');
                $message->to('john@johndoe.com', 'John Doe');
                // $message->to($userData['email'], $userData['name']);
                $message->subject('Password Reset');
            });

            if (Mail::failures()) {
                return response()->json([
                    'message' => 'Some error occur, please try again'
                ], 500);
            } else {
                return response()->json([
                    'message' => 'Send mail success',
                ], 200);
            }
        }
        return response()->json([
            "message" => "Mail send"
        ], 200);
    }
    public function resetPassword(Request $request)
    {
        ///return response()->json($request->all());
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|confirmed|min:8',
            'verification_code' => 'required|min:6|integer',
        ]);
        $user = User::where('email', $request->email)->where('verification_code', $request->verification_code)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Please Create a account',
            ], 422);
        }
        $user->password = bcrypt($request->password);
        $user->verification_code = Null;

        if ($user->save()) {
            return response()->json([
                'message' => 'password reset success',
            ], 200);
        } else {
            return response()->json([
                "message" => "Some Error occur please try again"
            ], 500);
        }
    }
}
