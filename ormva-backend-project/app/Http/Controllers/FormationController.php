<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    $date_d = Carbon::parse($request->date_d)->format('Y-m-d');
    $date_fin = Carbon::parse($request->date_f)->format('Y-m-d');

    // Check if any participant is already assigned to a formation in the specified date range
    $exists = DB::table('participes')
        ->join('formations', 'formations.id', '=', 'participes.formation_id')
        ->join('employes', 'employes.id', '=', 'participes.employe_id') // Join the employes table to get their names
        ->whereIn('participes.employe_id', $ids)
        ->where(function ($query) use ($date_d, $date_fin) {
            $query->whereBetween('formations.date_debut', [$date_d, $date_fin]) // Case 1
                  ->orWhereBetween('formations.date_fin', [$date_d, $date_fin]) // Case 2
                  ->orWhere(function ($q) use ($date_d, $date_fin) { // Case 3
                      $q->where('formations.date_debut', '<=', $date_d)
                        ->where('formations.date_fin', '>=', $date_fin);
                  });
        })
        ->select('employes.nom_complet') // Select the employee names
        ->get();

    // If any participant is already registered, return their names
    if ($exists->isEmpty()) {

        $formation = Formation::findOrFail($request->id);

        // Attach the selected employees to the formation
        $formation->employes()->attach($ids, [
            'note' => '???',
            'presence' => false
        ]);

        return $formation::with('employes')->find($request->id);

    } else {
        // Get the names of the participants already enrolled during these dates
        $names = $exists->pluck('nom_complet'); // Get the names from the result

        return response()->json([
            'message' => 'Un ou plusieurs participants sont déjà inscrits dans une formation pendant ces dates.',
            'participants' => $names // Include the names in the response
        ], 400);
    }
}




    // this function remove an employe from a formation
    public function removeEmployeFromFormation(Request $request)
    {

        $formation = Formation::findOrFail($request->id);

        $formation->employes()->detach($request->employe_id);

        return [
            'id' => $request->employe_id ,
            'message' => 'Retiré de cette formation avec succès'
        ];

    }


    // this function update exists row in participes
    public function updateEmployeInFormation(Request $request)
    {

        $formation = Formation::findOrFail($request->id);

        $formation->employes()->updateExistingPivot( $request->employe_id , [
            'presence' => $request->presence == 'Pre' ? true : false ,
            'note' => $request->note
        ] );

        return $formation::with('employes')->find($request->employe_id);

    }






}
