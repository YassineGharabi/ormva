<?php

namespace App\Models;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Model;

class Doc_pedagogique extends Model
{
    protected $fillable = [
        'type',
        'file',
        'formation_id'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }


}
