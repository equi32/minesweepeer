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
     * Maneja el intento de autenticación.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        //Genero validación
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        //Verifico validación
        if($validator->fails()){
            //Respuesta
            return $this->sendError(trans('api.invalid_data'), $validator->errors());
        }
        //Tomo las credenciales
        $credentials = $request->only('email', 'password');
        //Intento conectar
        if (!Auth::attempt($credentials)) {
            //Respuesta de login erróneo
            return $this->sendError(trans('auth.failed'));
        }
        //Busco los datos del usuario
        $user = Auth::user();
        //Genero los datos del usuario
        $userResource = new UserResource($user);
        //Genero el token de acceso
        $token = $user->createToken('accessToken')->plainTextToken;
        //Envío respuesta con datos
        return $this->sendResponse([
            'user' => $userResource,
            'token' => $token
        ], trans('api.success'));
    }

    /**
     * Maneja el intento de autenticación.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        //Traigo datos de usuario logueado
        $user = Auth::user();
        //Genero el resource
        $userResource = new UserResource($user);
        //Envío respuesta con datos
        return $this->sendResponse($userResource, trans('api.success'));
    }

}
