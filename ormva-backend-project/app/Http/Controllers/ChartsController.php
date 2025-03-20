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

    // taux de presence pour tout formation
    public function tauxDePresenceParToutFormation()
    {

        $data = DB::table('formations')
        ->join( 'participes' , 'participes.formation_id' , '=' , 'formations.id')
        ->join( 'employes' , 'employes.id' , '=' , 'participes.employe_id' )
        ->select( 'formations.intitule' , DB::raw('COUNT(employes.id) as nbr_participants') )
        ->groupBy('formations.intitule')->get();

        $total = DB::table('participes')->count(); // Total number of participations

        if ($total == 0) {
            return response()->json([
                'presence_percentage' => 0,
                'absence_percentage' => 0
            ]);
        }

        $presence = DB::table('participes')
            ->where('presence', true)
            ->count(); // Count of presence

        $absence = $total - $presence; // Count of absence

        // Calculate percentages
        $presencePercentage = ($presence / $total) * 100;
        $absencePercentage = ($absence / $total) * 100;

        return response()->json([
            'Presence' => round($presencePercentage, 2),
            'Absence' => round($absencePercentage, 2)
        ]);


    }

    // Nombre de formation par annees

    public function nombreDeFormationParAnnee()
    {
        $data1 = DB::table('formations')
        ->whereBetween( 'date_debut' , [ '2021-01-01' , '2021-12-31' ] )
        ->count();
        $data2 = DB::table('formations')
        ->whereBetween( 'date_debut' , [ '2022-01-01' , '2022-12-31' ] )
        ->count();
        $data3 = DB::table('formations')
        ->whereBetween( 'date_debut' , [ '2023-01-01' , '2023-12-31' ] )
        ->count();
        $data4 = DB::table('formations')
        ->whereBetween( 'date_debut' , [ '2024-01-01' , '2024-12-31' ] )
        ->count();
        $data5 = DB::table('formations')
        ->whereBetween( 'date_debut' , [ '2025-01-01' , '2025-12-31' ] )
        ->count();

        return [
            'annee1' => $data1 ,
            'annee2' => $data2 ,
            'annee3' => $data3 ,
            'annee4' => $data4 ,
            'annee5' => $data5 ,
        ];
    }



}
