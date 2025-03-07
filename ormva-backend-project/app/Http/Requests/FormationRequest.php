<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'intitule' => 'required|max:255',
            'description' => 'required',
            'date_debut' => 'required|date' ,
            'date_fin' => 'required|date|after:date_debut',
            'duree' => 'integer|min:1',
            'lieu' => 'required|max:255',
            'nombre_max' => 'integer|min:1',
            'status' => 'max:255',
            'formateur_id'=> 'required|exists:fourmateurs,id',
        ];
    }
}
