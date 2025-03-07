<?php

namespace App\Models;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Model;

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
