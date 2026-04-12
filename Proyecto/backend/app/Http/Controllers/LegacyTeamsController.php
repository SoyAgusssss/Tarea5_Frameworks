<?php

namespace App\Http\Controllers;

use App\Models\LegacyTeam;
use Illuminate\Http\Request;

class LegacyTeamsController extends Controller
{
    public function index()
    {
        $teams = LegacyTeam::select(['id', 'nombre', 'deporte', 'capitan'])->get();
        return response()->json($teams)
            ->header('Cache-Control', 'public, max-age=30');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255|unique:teams,nombre',
            'deporte' => 'required|string|max:255',
            'capitan' => 'nullable|string|max:255',
        ]);

        $team = LegacyTeam::create([
            'nombre' => $data['nombre'],
            'deporte' => $data['deporte'],
            'capitan' => $data['capitan'] ?? '',
        ]);

        return response()->json([
            'mensaje' => 'Equipo creado',
            'equipo' => $team,
        ]);
    }
}
