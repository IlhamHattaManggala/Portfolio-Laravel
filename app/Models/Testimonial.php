<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'testimonial',
        'name',
        'designation',
        'company',
        'image',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'designation' => 'array',
        'company' => 'array',
        'testimonial' => 'array',
    ];
}
