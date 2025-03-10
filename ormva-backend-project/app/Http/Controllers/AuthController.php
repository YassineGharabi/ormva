<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(UserRequest $request){


        $fields = $request->validated();

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);

        $user = User::where( 'email' , $request->email )->first();

        // if user with this email not exist in db or password not match return error
        if(!$user || !Hash::check( $request->password , $user->password )){
            return [
                'errors' => [
                    'email'=> ['The provided credentials are incorrect.']
                ]
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user ,
            'token' => $token->plainTextToken
        ];

    }

    public function logout(Request $request){
        // delete all tokens that belong to this user
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.'
        ];

    }


}
