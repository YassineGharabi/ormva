<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\FourmateurController;
use App\Http\Controllers\GenaratePdfController;
use App\Http\Controllers\Doc_pedagogiqueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){

Route::apiResource('fourmateurs',FourmateurController::class);
Route::apiResource('employes',EmployeController::class);
Route::apiResource('formations',FormationController::class);

// participant routes
Route::get('/formation-participant/{id}',[FormationController::class,'formationParticipant']);
Route::post('/assign-employe/{id}',[FormationController::class,'assignEmployeToFormation']);
Route::put('/update-employe/{id}',[FormationController::class,'updateEmployeInFormation']);
Route::post('/remove-employe/{id}',[FormationController::class,'removeEmployeFromFormation']);

// suivre formation routes
Route::get('/employe-formations/{id}',[EmployeController::class,'getEmployeFormationsById']);

// docs routes
Route::apiResource('doc_pedagogiques',Doc_pedagogiqueController::class);

// get docs belongs to a formation
Route::get('/getdocs/{id}',[Doc_pedagogiqueController::class,'getdocs']);




});

Route::get('/attestation-pdf',[GenaratePdfController::class,'generateAttestationPdf']);

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
