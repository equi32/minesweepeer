<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GamesController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Login
Route::post('login', [AuthController::class, 'authenticate']);

//Datos de usuario
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'user']);
//Games
Route::group(['prefix' => 'games', 'middleware' => 'auth:sanctum'], function(){
    //List
    Route::get('/', [GamesController::class, 'index']);
    //Store
    Route::post('/', [GamesController::class, 'store']);
    //Get
    Route::get('/{id}', [GamesController::class, 'show']);
    //Update
    Route::put('/{id}', [GamesController::class, 'update']);
    //Destroy
    Route::delete('/{id}', [GamesController::class, 'destroy']);
});
