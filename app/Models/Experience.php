<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'company_name',
        'icon',
        'icon_bg',
        'date_range',
        'points',
    ];

    protected $casts = [
        'title' => 'array',
        'company_name' => 'array',
        'date_range' => 'array',
        'points' => 'array',
    ];
}
