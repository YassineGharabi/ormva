<?php

namespace App\Http\Controllers;

use App\Models\Fourmateur;
use Illuminate\Http\Request;
use App\Http\Requests\FourmateurRequest;

class FourmateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Fourmateur::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FourmateurRequest $request)
    {
        $fields = $request->validated();

        $fourmateur = Fourmateur::create($fields);

        return [
            'fourmateur' => $fourmateur,
            'message' => 'formateur créé avec succès'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Fourmateur $fourmateur)
    {
        return $fourmateur;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FourmateurRequest $request, Fourmateur $fourmateur)
    {
        $fields = $request->validated();

        $fourmateur->fill($fields)->save();

        return [
            'fourmateur' => $fourmateur,
            'message' => 'Modification effectuée avec succès'
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fourmateur $fourmateur)
    {
        //
    }
}
