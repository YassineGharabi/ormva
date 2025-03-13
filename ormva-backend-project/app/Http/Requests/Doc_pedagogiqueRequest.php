<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Doc_pedagogiqueRequest extends FormRequest
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
            'type' => 'required',
            'file' => 'required|file|mimes:doc,docx,xls,xlsx,pdf|max:5000',
            'formation_id' => 'required'
        ];

    }
}
