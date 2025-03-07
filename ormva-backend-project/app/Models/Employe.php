<?php

namespace App\Models;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    protected $fillable = [
        'nom_complet',
        'matricule',
        'cin',
        'email',
        'service',
        'bureau'
    ];

    public function formations()
    {
        return $this->belongsToMany(Formation::class , 'participe')->withPivot('note','presence');
    }

}
