<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix'=>'auth'],function(){
    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']);
    Route::post('reset-password-request',[AuthController::class,'resetPasswordRequest']);
    Route::post('reset-password',[AuthController::class,'resetPassword']);
    Route::group(['middleware'=>'auth:api'],function(){
        Route::post('logout',[AuthController::class,'logout']);
        Route::get('profile',[AuthController::class,'profile']);
    });
});

Route::group(['middleware'=>'auth:api'],function(){
    Route::group(['middleware' => 'scope:user,adminstrator'],function(){
        Route::get('/get-categories',[CategoryController::class,'getCategories']);
        Route::resource('products',ProductController::class);
    });
});

Route::resource('category',CategoryController::class)->middleware(['auth:api','scope:adminstrator']);