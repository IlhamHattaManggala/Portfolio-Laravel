<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projectCount' => Project::count(),
                'blogCount' => Blog::count(),
                'certCount' => Certificate::count(),
                'messageCount' => Message::count(),
                'totalViews' => Blog::sum('views'),
            ],
            'recentMessages' => Message::latest()->take(5)->get(),
        ]);
    }
}
