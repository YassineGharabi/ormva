<?php

namespace App\Http\Controllers;



use App\Models\Formation;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;


class GenaratePdfController extends Controller
{

    // Methode to generate attestation pdf
    public function attestationPdf(Request $request)
    {
        $employe_id = $request->employe_id;
        $formation_id = $request->formation_id;
        // return $employe_id;

        $data = DB::table('employes')
        ->join( 'participes' , 'participes.employe_id' , '=' , 'employes.id' )
        ->join( 'formations' , 'formations.id' , '=' , 'participes.formation_id' )
        ->where( 'employes.id' , $employe_id )
        ->where( 'formations.id' , $formation_id )->get();

        $attestationDetails = [ 'details' => $data ];

        // return $attestationDetails;

        $attestation = Pdf::loadView('pdf.attestation', compact('attestationDetails') );

        return $attestation->download('attestation.pdf');



    }

    // Methode to generate convocation pdf
    public function convocationPdf(Request $request)
    {

        $formation_id = $request->id;

        $formation = Formation::findOrFail($formation_id);

        $employes = $formation->employes;

        $data = [
            'formation' => $formation,
            'employes' => $employes
        ];


        $convocation = Pdf::loadView('pdf.convocation', compact('data'));

        return $convocation->download('convocation.pdf');
    }

}
