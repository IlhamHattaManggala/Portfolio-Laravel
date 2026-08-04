<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Project extends Model
{
    protected $fillable = [
        'name',
        'descriptions',
        'tipe',
        'library',
        'image',
        'link',
        'video',
    ];

    protected $casts = [
        'name' => 'array',
        'library' => 'array',
        'descriptions' => 'array',
        'tipe' => 'array',
    ];
}
