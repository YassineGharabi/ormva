<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;
use App\Http\Requests\EmployeRequest;
use App\Http\Resources\EmployeResource;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EmployeResource::collection(Employe::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeRequest $request)
    {
        $fields = $request->validated();

        $employe = Employe::create($fields);

        return new EmployeResource($employe);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employe $employe)
    {
        return new EmployeResource($employe);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeRequest $request, Employe $employe)
    {
        $fields = $request->validated();

        $employe->fill($fields)->save();

        return new EmployeResource($employe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employe $employe)
    {
        $employe->delete();

        return [
            'id' => $employe->id ,
            'message' => 'Suppression effectuée avec succès',
        ];
    }
}
