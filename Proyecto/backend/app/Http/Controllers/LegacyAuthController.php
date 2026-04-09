<?php

namespace App\Http\Controllers;

use App\Models\LegacyUsuario;
use Illuminate\Http\Request;

class LegacyAuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = LegacyUsuario::where('usuario', $data['usuario'])->first();

        if (! $user) {
            return response()->json(['mensaje' => 'Usuario no encontrado'], 404);
        }

        if ($user->password !== $data['password']) {
            return response()->json(['mensaje' => 'Contraseña incorrecta'], 401);
        }

        return response()->json([
            'mensaje' => 'Login correcto',
            'usuario' => $user,
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'usuario' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|max:255',
            'rol' => 'nullable|in:usuario,admin,capitan,arbitro',
            'equipo' => 'nullable|string|max:255',
            'deporte' => 'nullable|string|max:255',
        ]);

        $exists = LegacyUsuario::where('usuario', $data['usuario'])
            ->orWhere('email', $data['email'])
            ->exists();

        if ($exists) {
            return response()->json(['mensaje' => 'Usuario o email ya existe'], 400);
        }

        $nuevoUsuario = LegacyUsuario::create([
            'usuario' => $data['usuario'],
            'email' => $data['email'],
            'password' => $data['password'],
            'rol' => $data['rol'] ?? 'usuario',
            'equipo' => $data['equipo'] ?? '',
            'deporte' => $data['deporte'] ?? '',
        ]);

        return response()->json([
            'mensaje' => 'Usuario registrado',
            'usuario' => $nuevoUsuario,
        ], 201);
    }

    public function index()
    {
        return response()->json(LegacyUsuario::all());
    }

    public function getByRole(string $rol)
    {
        return response()->json(LegacyUsuario::where('rol', $rol)->get());
    }
}
