<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\FourmateurController;
use App\Http\Controllers\Doc_pedagogiqueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('fourmateurs',FourmateurController::class);
Route::apiResource('employes',EmployeController::class);
Route::apiResource('formations',FormationController::class);
Route::apiResource('doc_pedagogiques',Doc_pedagogiqueController::class);

Route::get('/assign-employe',[EmployeController::class,'assignEmployeToFormation']);

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
