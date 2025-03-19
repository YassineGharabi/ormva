<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use App\Models\Formation;
use App\Models\Fourmateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartsController extends Controller
{

    public function totalCount()
    {

        return response()->json([
            'formations_n_total' => Formation::count(),
            'employes_n_total' => Employe::count(),
            'fourmateurs_n_total' => Fourmateur::count(),
        ], 200);

    }


    //  Retrieve the number of participants for each training session
    public function nombreDeParticipantsParFormation()
    {
        $data = DB::table('formations')
        ->join( 'participes' , 'participes.formation_id' , '=' , 'formations.id')
        ->join( 'employes' , 'employes.id' , '=' , 'participes.employe_id' )
        ->select( 'formations.intitule' , DB::raw('COUNT(employes.id) as nbr_participants') )
        ->groupBy('formations.intitule')->get();

        return response()->json( $data , 200 );
    }

}
