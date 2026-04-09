<?php

namespace App\Http\Controllers;

use App\Models\LegacyMatch;
use Illuminate\Http\Request;

class LegacyMatchesController extends Controller
{
    public function index()
    {
        return response()->json(LegacyMatch::orderByDesc('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'deporte' => 'required|string|max:255',
            'equipo1' => 'required|string|max:255',
            'equipo2' => 'required|string|max:255',
            'fecha' => 'required',
            'arbitro' => 'required|string|max:255',
            'goles1' => 'nullable|integer',
            'goles2' => 'nullable|integer',
            'puntos1' => 'nullable|integer',
            'puntos2' => 'nullable|integer',
            'estado' => 'nullable|in:pendiente,finalizado',
        ]);

        $match = LegacyMatch::create([
            'deporte' => $data['deporte'],
            'equipo1' => $data['equipo1'],
            'equipo2' => $data['equipo2'],
            'fecha' => $data['fecha'],
            'arbitro' => $data['arbitro'],
            'goles1' => $data['goles1'] ?? 0,
            'goles2' => $data['goles2'] ?? 0,
            'puntos1' => $data['puntos1'] ?? 0,
            'puntos2' => $data['puntos2'] ?? 0,
            'estado' => $data['estado'] ?? 'pendiente',
        ]);

        return response()->json($match, 201);
    }

    public function update(Request $request, string $id)
    {
        $match = LegacyMatch::find($id);

        if (! $match) {
            return response()->json(['mensaje' => 'Partido no encontrado'], 404);
        }

        $match->update($request->only([
            'deporte',
            'equipo1',
            'equipo2',
            'goles1',
            'goles2',
            'puntos1',
            'puntos2',
            'fecha',
            'arbitro',
            'estado',
        ]));

        return response()->json($match);
    }
}
