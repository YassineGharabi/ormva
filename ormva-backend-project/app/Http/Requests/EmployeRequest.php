<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeRequest extends FormRequest
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
            'nom_complet' => 'required|max:255',
            'matricule' => 'required|max:255',
            'cin' => 'required|max:255',
            'email' => 'required|email',
            'service' => 'required|max:255',
            'bureau' => 'required|max:255'
        ];
    }
}
