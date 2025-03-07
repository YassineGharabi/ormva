<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $values = parent::toArray($request);
        // if(empty($this->doc_pedagogiques))
        // {
        //     $values['doc_pedagogique'] = $this->doc_pedagogiques;
        // }
        return $values;
    }
}
