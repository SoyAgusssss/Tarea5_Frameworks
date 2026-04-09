<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    // Listar todos los clubes
    public function index()
    {
        return Club::all();
    }

    // Crear un nuevo club
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'categoria' => 'required|string|max:50',
        ]);

        $club = Club::create($request->all());
        return response()->json($club, 201);
    }

    // Mostrar un club específico
    public function show($id)
    {
        return Club::findOrFail($id);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required|string|max:255',
        'ciudad' => 'required|string|max:255',
        'categoria' => 'required|string|max:50',
    ]);

    $club = Club::findOrFail($id);
    $club->update($request->only(['nombre', 'ciudad', 'categoria']));

    return response()->json($club, 200);
}

    // Eliminar un club
    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();
        return response()->json(null, 204);
    }
}
