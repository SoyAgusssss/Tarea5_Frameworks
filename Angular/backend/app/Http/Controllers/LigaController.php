<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;

class LigaController extends Controller
{
    // Listar todas las ligas
    public function index()
    {
        return Liga::all();
    }

    // Crear una nueva liga
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'deporte' => 'required|string|max:50',
            'temporada' => 'required|string|max:20',
        ]);

        $liga = Liga::create($request->all());
        return response()->json($liga, 201);
    }

    // Mostrar una liga específica
    public function show($id)
    {
        return Liga::findOrFail($id);
    }

    // Actualizar una liga
    public function update(Request $request, $id)
    {
        $liga = Liga::findOrFail($id);
        $liga->update($request->all());
        return response()->json($liga, 200);
    }

    // Eliminar una liga
    public function destroy($id)
    {
        $liga = Liga::findOrFail($id);
        $liga->delete();
        return response()->json(null, 204);
    }
}

