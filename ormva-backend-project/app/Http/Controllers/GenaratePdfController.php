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
        $data = DB::table('employes')
        ->join( 'participes' , 'participes.employe_id' , '=' , 'employes.id' )
        ->join( 'formations' , 'formations.id' , '=' , 'participes.formation_id' )
        ->where( 'employes.id' , 1 )
        ->where( 'formations.id' , 1 )->get();

        $attestationDetails = [ 'details' => $data ];

        // return $attestationDetails;

        $attestation = Pdf::loadView('pdf.attestation', compact('attestationDetails') );

        return $attestation->stream('attestation.pdf');

    }

    // Methode to generate convocation pdf
    public function convocationPdf(Request $request)
    {

        $formation = Formation::findOrFail(1);

        $employes = $formation->employes;

        $data = [
            'formation' => $formation,
            'employes' => $employes
        ];


        $convocation = Pdf::loadView('pdf.convocation', compact('data'));

        return $convocation->stream('convocation.pdf');
    }

}
