<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LegacyAuthController;
use App\Http\Controllers\LegacyMatchesController;
use App\Http\Controllers\LegacyPlayersController;
use App\Http\Controllers\LegacyTeamsController;

/*
| API LEGACY (compatibilidad con frontend Angular actual)
*/
Route::prefix('auth')->group(function () {
    Route::post('/login', [LegacyAuthController::class, 'login']);
    Route::post('/register', [LegacyAuthController::class, 'register']);
    Route::get('/rol/{rol}', [LegacyAuthController::class, 'getByRole']);
    Route::get('/', [LegacyAuthController::class, 'index']);
});

Route::get('/teams', [LegacyTeamsController::class, 'index']);
Route::post('/teams', [LegacyTeamsController::class, 'store']);

Route::get('/players', [LegacyPlayersController::class, 'index']);
Route::post('/players', [LegacyPlayersController::class, 'store']);

Route::get('/matches', [LegacyMatchesController::class, 'index']);
Route::post('/matches', [LegacyMatchesController::class, 'store']);
Route::put('/matches/{id}', [LegacyMatchesController::class, 'update']);

/*
| AUTENTICACIÓN
*/
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
| CLUBES
*/
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{club}', [ClubController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/clubs', [ClubController::class, 'store']);
    Route::put('/clubs/{club}', [ClubController::class, 'update']);
    Route::delete('/clubs/{club}', [ClubController::class, 'destroy']);
});

/*
| JUGADORES
*/
Route::get('/jugadores', [JugadorController::class, 'index']);
Route::get('/jugadores/{jugador}', [JugadorController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/jugadores', [JugadorController::class, 'store']);
    Route::put('/jugadores/{jugador}', [JugadorController::class, 'update']);
    Route::delete('/jugadores/{jugador}', [JugadorController::class, 'destroy']);
});

/*
| LIGAS
*/
Route::get('/ligas', [LigaController::class, 'index']);
Route::get('/ligas/{liga}', [LigaController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/ligas', [LigaController::class, 'store']);
    Route::put('/ligas/{liga}', [LigaController::class, 'update']);
    Route::delete('/ligas/{liga}', [LigaController::class, 'destroy']);
});

/*
| PARTIDOS
*/
Route::get('/partidos', [PartidoController::class, 'index']);
Route::get('/partidos/{partido}', [PartidoController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/partidos', [PartidoController::class, 'store']);
    Route::put('/partidos/{partido}', [PartidoController::class, 'update']);
    Route::delete('/partidos/{partido}', [PartidoController::class, 'destroy']);
});


