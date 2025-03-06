<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fourmateur extends Model
{
    protected $fillable = [
        'nom',
        'contact',
        'domain',
        'entreprise'
    ];
}
