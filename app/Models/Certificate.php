<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'issuer',
        'image',
        'date_issued',
    ];

    protected $casts = [
        'title' => 'array',
        'issuer' => 'array',
    ];
}
