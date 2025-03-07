<?php

namespace App\Models;

use App\Models\Employe;
use App\Models\Fourmateur;
use App\Models\Doc_pedagogique;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = [
        'intitule',
        'description',
        'date_debut',
        'date_fin',
        'duree',
        'lieu',
        'nombre_max',
        'status',
        'formateur_id'
    ];

    public function doc_pedagogiques()
    {
        return $this->hasMany(Doc_pedagogique::class);
    }

    public function employes()
    {
        return $this->belongsToMany(Employe::class , 'participes')->withPivot('note','presence');
    }

    public function formateur()
    {
        return $this->belongsTo(Fourmateur::class);
    }
}
