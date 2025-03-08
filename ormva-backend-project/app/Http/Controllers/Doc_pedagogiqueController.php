<?php

namespace App\Http\Controllers;

use App\Models\Doc_pedagogique;
use Illuminate\Http\Request;
use App\Http\Requests\Doc_pedagogiqueRequest;

class Doc_pedagogiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Doc_pedagogique::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Doc_pedagogiqueRequest $request)
    {
        $fields = $request->validated();

        $document = Doc_pedagogique::create($fields);

        return $document ;
    }

    /**
     * Display the specified resource.
     */
    public function show(Doc_pedagogique $doc_pedagogique)
    {
        return $doc_pedagogique;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Doc_pedagogiqueRequest $request, Doc_pedagogique $doc_pedagogique)
    {
        $fields = $request->validated();

        $doc_pedagogique->update($fields);

        return $doc_pedagogique;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doc_pedagogique $doc_pedagogique)
    {
        $doc_pedagogique->delete();

        return [
            'id' => $doc_pedagogique->id ,
            'message' => 'Suppression effectuée avec succès',
        ];
    }
}
