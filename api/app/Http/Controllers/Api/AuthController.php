<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

use App\Http\Resources\UserResource;

use Auth;
use Validator;

class AuthController extends ApiController
{
    /**
     * User authentication
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        //Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        //Check validation
        if($validator->fails()){
            //Respuesta
            return $this->sendError(trans('api.invalid_data'), $validator->errors());
        }
        //Take credentials
        $credentials = $request->only('email', 'password');
        //Login
        if (!Auth::attempt($credentials)) {
            //Respuesta de login erróneo
            return $this->sendError(trans('auth.failed'));
        }
        //User data
        $user = Auth::user();
        //Genero los datos del usuario
        $userResource = new UserResource($user);
        //Generate token
        $token = $user->createToken('accessToken')->plainTextToken;
        //Response
        return $this->sendResponse([
            'user' => $userResource,
            'token' => $token
        ], trans('api.success'));
    }

    /**
     * User register
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        //Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:100',
            'email' => 'required|email|max:100|unique:users,email',
            'password' => 'required|confirmed'
        ]);
        //Check validation
        if($validator->fails()){
            //Response
            return $this->sendError(trans('api.invalid_data'), $validator->errors());
        }
        //Create object
        $object = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ];
        //Create user
        $user = User::create($object);
        //Generate data
        $userResource = new UserResource($user);
        //Generate token
        $token = $user->createToken('accessToken')->plainTextToken;
        //Reponse
        return $this->sendResponse([
            'user' => $userResource,
            'token' => $token
        ], trans('api.success'));
    }

    /**
     * User data
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        //Bring user data
        $user = Auth::user();
        //Generate resource
        $userResource = new UserResource($user);
        //Response
        return $this->sendResponse($userResource, trans('api.success'));
    }

}
