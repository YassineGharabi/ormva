<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participe extends Model
{
    protected $fillable = [
        'formation_id',
        'employe_id',
        'note',
        'presence'
    ];
}
