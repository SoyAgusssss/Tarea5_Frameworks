<?php

namespace App\Http\Controllers;

use App\Models\LegacyUsuario;
use Illuminate\Http\Request;

class LegacyPlayersController extends Controller
{
    public function index()
    {
        $jugadores = LegacyUsuario::where('rol', 'usuario')
            ->select(['id', 'usuario', 'email', 'rol', 'equipo', 'deporte'])
            ->get();
        return response()->json($jugadores)
            ->header('Cache-Control', 'public, max-age=30');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'usuario' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|max:255',
            'equipo' => 'nullable|string|max:255',
            'deporte' => 'nullable|string|max:255',
        ]);

        $exists = LegacyUsuario::where('usuario', $data['usuario'])
            ->orWhere('email', $data['email'])
            ->exists();

        if ($exists) {
            return response()->json(['mensaje' => 'Usuario o email ya existe'], 400);
        }

        $nuevoJugador = LegacyUsuario::create([
            'usuario' => $data['usuario'],
            'email' => $data['email'],
            'password' => $data['password'],
            'rol' => 'usuario',
            'equipo' => $data['equipo'] ?? '',
            'deporte' => $data['deporte'] ?? '',
        ]);

        return response()->json([
            'mensaje' => 'Jugador registrado',
            'jugador' => $nuevoJugador,
        ], 201);
    }
}
