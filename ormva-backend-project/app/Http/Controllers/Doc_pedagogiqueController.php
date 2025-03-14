<?php

namespace App\Http\Controllers;

use App\Models\Doc_pedagogique;
use Illuminate\Http\Request;
use App\Http\Requests\Doc_pedagogiqueRequest;
use App\Http\Resources\Doc_pedagogiqueResource;

class Doc_pedagogiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Doc_pedagogiqueResource::collection(Doc_pedagogique::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Doc_pedagogiqueRequest $request)
    {

        $fields = $request->validated();

        if($request->hasfile('file')){

            $fields['file'] = $request->file('file')->store('documents','public');

            return Doc_pedagogique::create($fields);

        }
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


        // test if request has file to update with if its not return the same file
        if($request->hasfile('file')){
            $fields['file'] = $request->file('file')->store('documents','public');
        }else{
            $fields['file'] = $doc_pedagogique->file;
        }

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

    // doccument lies a une formation

    public function getdocs(Request $request){
        $doc = Doc_pedagogique::with('formation')->where( 'formation_id' , '=' , $request->id )->get();
        // $doc = Doc_pedagogique::where( 'formation_id' , '=' , $request->id )->get();
        return Doc_pedagogiqueResource::collection($doc);
    }


}
