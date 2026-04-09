<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\Request;

class JugadorController extends Controller
{
    // Listar todos los jugadores
    public function index()
    {
        return Jugador::with('club')->get();
    }

    // Crear un nuevo jugador
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'posicion' => 'required|string|max:50',
            'dorsal' => 'required|integer|min:1|max:99',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $jugador = Jugador::create($request->all());
        return response()->json($jugador, 201);
    }

    // Mostrar un jugador específico
    public function show($id)
    {
        return Jugador::with('club')->findOrFail($id);
    }

    // Actualizar un jugador
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'posicion' => 'required|string|max:50',
            'dorsal' => 'required|integer|min:1|max:99',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $jugador = Jugador::findOrFail($id);
        $jugador->update($request->only(['nombre', 'posicion', 'dorsal', 'club_id']));

        return response()->json($jugador, 200);
    }

    // Eliminar un jugador
    public function destroy($id)
    {
        $jugador = Jugador::findOrFail($id);
        $jugador->delete();
        return response()->json(null, 204);
    }
}

