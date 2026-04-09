<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    // Listar todos los partidos
    public function index()
    {
        return Partido::with(['liga', 'clubLocal', 'clubVisitante'])->get();
    }

    // Crear un nuevo partido
    public function store(Request $request)
    {
        $request->validate([
            'liga_id' => 'required|exists:ligas,id',
            'club_local_id' => 'required|exists:clubs,id',
            'club_visitante_id' => 'required|exists:clubs,id|different:club_local_id',
            'fecha' => 'required|date',
            'resultado' => 'nullable|string|max:10',
        ]);

        $partido = Partido::create($request->all());
        return response()->json($partido, 201);
    }

    // Mostrar un partido específico
    public function show($id)
    {
        return Partido::with(['liga', 'clubLocal', 'clubVisitante'])->findOrFail($id);
    }

    // Actualizar un partido
    public function update(Request $request, $id)
    {
        $partido = Partido::findOrFail($id);
        $partido->update($request->all());
        return response()->json($partido, 200);
    }

    // Eliminar un partido
    public function destroy($id)
    {
        $partido = Partido::findOrFail($id);
        $partido->delete();
        return response()->json(null, 204);
    }
}

