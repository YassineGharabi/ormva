<?php

namespace App\Http\Controllers;

use App\Models\Fourmateur;
use Illuminate\Http\Request;
use App\Http\Requests\FourmateurRequest;
use App\Http\Resources\FourmateurResource;

class FourmateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FourmateurResource::collection(Fourmateur::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FourmateurRequest $request)
    {
        $fields = $request->validated();

        $fourmateur = Fourmateur::create($fields);

        return new FourmateurResource($fourmateur);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fourmateur $fourmateur)
    {
        return new FourmateurResource($fourmateur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FourmateurRequest $request, Fourmateur $fourmateur)
    {
        $fields = $request->validated();

        $fourmateur->fill($fields)->save();

        return new FourmateurResource($fourmateur);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fourmateur $fourmateur)
    {
        $fourmateur->delete();

        return [
            'id' => $fourmateur->id ,
            'message' => 'Suppression effectuée avec succès',
        ];

    }
}
