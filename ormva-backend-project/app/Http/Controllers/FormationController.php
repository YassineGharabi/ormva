<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use App\Http\Requests\FormationRequest;
use App\Http\Resources\FormationResource;

class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // using Eager Loading for performence for return for each formation thier formateur
        return FormationResource::collection(Formation::with('formateur')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormationRequest $request)
    {
        $fields = $request->validated();

        $formation = Formation::create($fields);

        return new FormationResource($formation);
    }

    /**
     * Display the specified resource.
     */
    public function show(Formation $formation)
    {
        return $formation::with('formateur')->where( 'id' , '=' , $formation->id )->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormationRequest $request, Formation $formation)
    {
        $fields = $request->validated();

        $formation->update($fields);

        return new FormationResource($formation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formation $formation)
    {
        $formation->delete();

        return [
            'id' => $formation->id ,
            'message' => 'Suppression effectuée avec succès',
        ];

    }

    public function formationParticipant(Request $request)
    {
        return Formation::with('employes')->find($request->id);
    }


    // this function assign an employe to a formation
    public function assignEmployeToFormation(Request $request)
    {
        $ids = $request->selectedEmployes;

        $formation = Formation::findOrFail($request->id);

        $formation->employes()->attach($ids,[
            'note' => '???' ,
            'presence' => false
        ]);

        return $formation::with('employes')->find($request->id);

    }






}
