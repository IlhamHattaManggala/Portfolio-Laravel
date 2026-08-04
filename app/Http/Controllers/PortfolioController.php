<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $packages = Cache::remember('packagist_manggala_packages', 3600, function () {
            try {
                $response = Http::timeout(5)->get('https://packagist.org/search.json?q=manggala');
                if ($response->successful()) {
                    $results = $response->json('results', []);
                    $filtered = array_values(array_filter($results, function ($item) {
                        return str_starts_with($item['name'], 'manggala/');
                    }));
                    if (!empty($filtered)) {
                        return $filtered;
                    }
                }
            } catch (\Throwable $e) {
                // Fallback to static defaults if offline or request fails
            }

            return [
                [
                    'name' => 'manggala/laravel-dashboard-builder',
                    'description' => 'Production-ready open-source dashboard builder package for Laravel applications.',
                    'url' => 'https://packagist.org/packages/manggala/laravel-dashboard-builder',
                    'repository' => 'https://github.com/IlhamHattaManggala/laravel-dashboard-builder',
                    'downloads' => 5,
                    'favers' => 1
                ],
                [
                    'name' => 'manggala/laravel-manifest',
                    'description' => 'Production-ready, schema-driven, UI-agnostic configuration platform for Laravel applications.',
                    'url' => 'https://packagist.org/packages/manggala/laravel-manifest',
                    'repository' => 'https://github.com/IlhamHattaManggala/laravel-settings',
                    'downloads' => 1,
                    'favers' => 1
                ]
            ];
        });

        return Inertia::render('welcome', [
            'data' => [
                'skills' => Skill::all(),
                'projects' => Project::all(),
                'experiences' => Experience::all(),
                'certificates' => Certificate::all(),
                'packages' => $packages,
                'testimonials' => Testimonial::where('is_approved', true)->get(),
                'blogs' => Blog::where('is_published', true)->orderBy('published_at', 'desc')->take(3)->get(),
                'resumePath' => Setting::where('key', 'resume_path')->first()?->value ?? '#',
                'contactEmail' => Setting::where('key', 'contact_email')->first()?->value ?? 'hello@ilhamhatta.com',
                'location' => Setting::where('key', 'location')->first()?->value ?? 'Jakarta, Indonesia',
            ]
        ]);
    }

    public function indexBlog(Request $request)
    {
        $query = Blog::where('is_published', true)->orderBy('published_at', 'desc');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Blog/Index', [
            'blogs' => $query->paginate(9)->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function showBlog(Blog $blog)
    {
        $blog->increment('views');
        
        return Inertia::render('Blog/Show', [
            'blog' => $blog
        ]);
    }

    public function storeMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        \App\Models\Message::create($validated);

        return response()->json(['message' => 'Success']);
    }

    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'testimonial' => 'required|string',
            'image' => 'nullable|image|max:2048', // Allow up to 2MB image
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Using standard Laravel upload to public storage.
            $path = $request->file('image')->store('testimonials', 'public');
            $imagePath = '/storage/' . $path;
        }

        \App\Models\Testimonial::create([
            'name' => $validated['name'],
            'company' => ['id' => $validated['company'], 'en' => ''],
            'designation' => ['id' => $validated['designation'], 'en' => ''],
            'testimonial' => ['id' => $validated['testimonial'], 'en' => ''],
            'image' => $imagePath,
            'is_approved' => false, // Will be approved by admin
        ]);

        return response()->json(['message' => 'Success']);
    }

    public function terminalData()
    {
        return response()->json([
            'skills' => Skill::all(),
            'projects' => Project::all(),
            'experiences' => Experience::all(),
            'certificates' => Certificate::all(),
            'contactEmail' => Setting::where('key', 'contact_email')->first()?->value ?? 'hello@ilhamhatta.com',
            'location' => Setting::where('key', 'location')->first()?->value ?? 'Jakarta, Indonesia',
        ]);
    }

    public function sitemap()
    {
        $blogs = Blog::where('is_published', true)->orderBy('published_at', 'desc')->get();
        
        $content = view('sitemap', [
            'blogs' => $blogs,
        ]);

        return response($content, 200)
            ->header('Content-Type', 'text/xml');
    }
}
