<?php

namespace App\Models;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fourmateur extends Model
{

    protected $fillable = [
        'nom',
        'contact',
        'domain',
        'entreprise'
    ];

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }

}
