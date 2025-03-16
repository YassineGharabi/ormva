<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class GenaratePdfController extends Controller
{

    // attestation pdf
    public function generateAttestationPdf()
    {

        $pdf = pdf::loadView('pdf.attestation');
        return $pdf->download('test.pdf');
    }

}
