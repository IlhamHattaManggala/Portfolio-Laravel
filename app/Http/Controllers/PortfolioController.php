<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

use App\Services\ImageService;

class PortfolioController extends Controller
{
    public function index()
    {
        $packages = Cache::remember('all_public_packages', 3600, function () {
            $allPackages = [];

            // 1. Fetch Packagist packages (PHP / Laravel)
            try {
                $response = Http::timeout(5)->get('https://packagist.org/search.json?q=manggala');
                if ($response->successful()) {
                    $results = $response->json('results', []);
                    foreach ($results as $item) {
                        if (str_starts_with($item['name'], 'manggala/')) {
                            $allPackages[] = [
                                'name' => $item['name'],
                                'description' => $item['description'] ?? '',
                                'url' => $item['url'] ?? "https://packagist.org/packages/{$item['name']}",
                                'repository' => $item['repository'] ?? '',
                                'downloads' => $item['downloads'] ?? 0,
                                'favers' => $item['favers'] ?? 0,
                                'type' => 'composer',
                            ];
                        }
                    }
                }
            } catch (\Throwable $e) {
                // Ignore API failures
            }

            if (empty(array_filter($allPackages, fn($p) => ($p['type'] ?? '') === 'composer'))) {
                $allPackages[] = [
                    'name' => 'manggala/laravel-dashboard-builder',
                    'description' => 'Production-ready open-source dashboard builder package for Laravel applications.',
                    'url' => 'https://packagist.org/packages/manggala/laravel-dashboard-builder',
                    'repository' => 'https://github.com/IlhamHattaManggala/laravel-dashboard-builder',
                    'downloads' => 5,
                    'favers' => 1,
                    'type' => 'composer',
                ];
                $allPackages[] = [
                    'name' => 'manggala/laravel-manifest',
                    'description' => 'Production-ready, schema-driven, UI-agnostic configuration platform for Laravel applications.',
                    'url' => 'https://packagist.org/packages/manggala/laravel-manifest',
                    'repository' => 'https://github.com/IlhamHattaManggala/laravel-settings',
                    'downloads' => 1,
                    'favers' => 1,
                    'type' => 'composer',
                ];
            }

            // 2. Fetch NPM packages (@manggala31)
            try {
                $npmResponse = Http::timeout(5)->get('https://registry.npmjs.org/-/v1/search?text=%40manggala31&size=20');
                if ($npmResponse->successful()) {
                    $objects = $npmResponse->json('objects', []);
                    foreach ($objects as $obj) {
                        $pkg = $obj['package'] ?? [];
                        if (!empty($pkg['name']) && str_starts_with($pkg['name'], '@manggala31/')) {
                            $dlCount = 0;
                            try {
                                $dlResp = Http::timeout(3)->get("https://api.npmjs.org/downloads/point/last-month/" . rawurlencode($pkg['name']));
                                if ($dlResp->successful()) {
                                    $dlCount = $dlResp->json('downloads', 0);
                                }
                            } catch (\Throwable $dlErr) {}

                            $allPackages[] = [
                                'name' => $pkg['name'],
                                'description' => $pkg['description'] ?? '',
                                'url' => $pkg['links']['npm'] ?? "https://www.npmjs.com/package/{$pkg['name']}",
                                'repository' => $pkg['links']['repository'] ?? "https://github.com/IlhamHattaManggala",
                                'downloads' => $dlCount,
                                'favers' => 0,
                                'type' => 'npm',
                            ];
                        }
                    }
                }
            } catch (\Throwable $e) {
                // Ignore API failures
            }

            $npmFallbackNames = array_column(array_filter($allPackages, fn($p) => ($p['type'] ?? '') === 'npm'), 'name');
            $defaultNpm = [
                [
                    'name' => '@manggala31/react-spotlight',
                    'description' => 'Production-ready, keyboard-driven Command Palette (Cmd+K / Ctrl+K) React component with fuzzy search, group actions, and seamless customization.',
                    'url' => 'https://www.npmjs.com/package/@manggala31/react-spotlight',
                    'repository' => 'https://github.com/IlhamHattaManggala/react-spotlight',
                    'downloads' => 12,
                    'favers' => 0,
                    'type' => 'npm',
                ],
                [
                    'name' => '@manggala31/react-datatable',
                    'description' => 'Production-ready, keyboard-navigable, server-driven Data Table package for React, Inertia.js, and Next.js applications.',
                    'url' => 'https://www.npmjs.com/package/@manggala31/react-datatable',
                    'repository' => 'https://github.com/IlhamHattaManggala/react-datatable',
                    'downloads' => 8,
                    'favers' => 0,
                    'type' => 'npm',
                ],
                [
                    'name' => '@manggala31/react-status-page',
                    'description' => 'Production-ready, self-hosted application health diagnostics and status page package for React, Inertia.js, and Next.js applications.',
                    'url' => 'https://www.npmjs.com/package/@manggala31/react-status-page',
                    'repository' => 'https://github.com/IlhamHattaManggala/react-status-page',
                    'downloads' => 5,
                    'favers' => 0,
                    'type' => 'npm',
                ],
                [
                    'name' => '@manggala31/react-dashboard-grid',
                    'description' => 'Production-ready, customizable drag-and-drop dashboard grid component for React, Inertia.js, and Next.js applications.',
                    'url' => 'https://www.npmjs.com/package/@manggala31/react-dashboard-grid',
                    'repository' => 'https://github.com/IlhamHattaManggala/react-dashboard-grid',
                    'downloads' => 15,
                    'favers' => 0,
                    'type' => 'npm',
                ],
                [
                    'name' => '@manggala31/schema-form-react',
                    'description' => 'Production-ready, JSON Schema-driven dynamic form generator component for React, Inertia.js, and Next.js applications.',
                    'url' => 'https://www.npmjs.com/package/@manggala31/schema-form-react',
                    'repository' => 'https://github.com/IlhamHattaManggala/schema-form-react',
                    'downloads' => 10,
                    'favers' => 0,
                    'type' => 'npm',
                ],
            ];

            foreach ($defaultNpm as $npmPkg) {
                if (!in_array($npmPkg['name'], $npmFallbackNames)) {
                    $allPackages[] = $npmPkg;
                }
            }

            return $allPackages;
        });

        $githubStats = Cache::remember('github_user_stats_v2', 3600, function () {
            $stats = [
                'public_repos' => 25,
                'followers' => 12,
                'total_stars' => 8,
                'top_languages' => [
                    ['name' => 'TypeScript', 'percentage' => 45, 'color' => '#3178c6'],
                    ['name' => 'PHP', 'percentage' => 30, 'color' => '#4F5D95'],
                    ['name' => 'Dart', 'percentage' => 15, 'color' => '#00B4AB'],
                    ['name' => 'JavaScript', 'percentage' => 10, 'color' => '#f1e05a'],
                ],
            ];

            try {
                $userResp = Http::timeout(5)->withHeaders([
                    'User-Agent' => 'PortfolioApp'
                ])->get('https://api.github.com/users/IlhamHattaManggala');

                if ($userResp->successful()) {
                    $userData = $userResp->json();
                    $stats['public_repos'] = $userData['public_repos'] ?? 25;
                    $stats['followers'] = $userData['followers'] ?? 12;
                }

                $reposResp = Http::timeout(5)->withHeaders([
                    'User-Agent' => 'PortfolioApp'
                ])->get('https://api.github.com/users/IlhamHattaManggala/repos?per_page=100');

                if ($reposResp->successful()) {
                    $repos = $reposResp->json();
                    $stars = 0;
                    $langCounts = [];
                    foreach ($repos as $repo) {
                        $stars += $repo['stargazers_count'] ?? 0;
                        $lang = $repo['language'] ?? null;
                        if ($lang) {
                            $langCounts[$lang] = ($langCounts[$lang] ?? 0) + 1;
                        }
                    }
                    $stats['total_stars'] = $stars;

                    if (!empty($langCounts)) {
                        arsort($langCounts);
                        $totalLangs = array_sum($langCounts);
                        $colors = [
                            'TypeScript' => '#3178c6',
                            'PHP' => '#4F5D95',
                            'Dart' => '#00B4AB',
                            'JavaScript' => '#f1e05a',
                            'Blade' => '#f7523f',
                            'CSS' => '#563d7c',
                            'HTML' => '#e34c26',
                        ];
                        $topLangs = [];
                        foreach (array_slice($langCounts, 0, 4) as $lang => $count) {
                            $topLangs[] = [
                                'name' => $lang,
                                'percentage' => round(($count / $totalLangs) * 100),
                                'color' => $colors[$lang] ?? '#8b5cf6'
                            ];
                        }
                        $stats['top_languages'] = $topLangs;
                    }
                }
            } catch (\Throwable $e) {
                // Ignore API failures
            }

            return $stats;
        });

        return Inertia::render('welcome', [
            'data' => [
                'skills' => Skill::all(),
                'projects' => Project::all(),
                'experiences' => Experience::all(),
                'certificates' => Certificate::all(),
                'packages' => $packages,
                'githubStats' => $githubStats,
                'testimonials' => Testimonial::where('is_approved', true)->get(),
                'blogs' => Blog::where('is_published', true)->orderBy('published_at', 'desc')->take(3)->get(),
                'resumePath' => Setting::where('key', 'resume_path')->first()?->value ?? '#',
                'contactEmail' => Setting::where('key', 'contact_email')->first()?->value ?? 'hello@ilhamhatta.com',
                'location' => Setting::where('key', 'location')->first()?->value ?? 'Jakarta, Indonesia',
                'seo' => [
                    'title' => Setting::where('key', 'meta_title')->first()?->value ?? 'Ilham Hatta Manggala | Portofolio & Personal Website',
                    'description' => Setting::where('key', 'meta_description')->first()?->value ?? 'Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer. Temukan proyek unggulan, riwayat pengalaman kerja, sertifikasi, dan blog artikel teknologi terbaru.',
                    'keywords' => Setting::where('key', 'meta_keywords')->first()?->value ?? 'Ilham Hatta Manggala, IHM, Portofolio Ilham Hatta Manggala, Full Stack Developer, Flutter Developer, Laravel Developer, Web Developer, Mobile Developer, Indonesia',
                    'author' => Setting::where('key', 'meta_author')->first()?->value ?? 'Ilham Hatta Manggala',
                    'ogImage' => Setting::where('key', 'og_image')->first()?->value ?? null,
                ],
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

    public function showPackage(string $vendor, string $package)
    {
        $fullName = "{$vendor}/{$package}";
        $isNpm = str_starts_with($vendor, '@') || str_starts_with($fullName, '@manggala31/');
        $cacheKey = "package_detail_" . md5($fullName);

        $packageDetails = Cache::remember($cacheKey, 3600, function () use ($vendor, $package, $fullName, $isNpm) {
            $info = [
                'name' => $fullName,
                'description' => '',
                'repository' => '',
                'url' => $isNpm ? "https://www.npmjs.com/package/{$fullName}" : "https://packagist.org/packages/{$fullName}",
                'downloads' => 0,
                'favers' => 0,
                'readme' => '',
                'type' => $isNpm ? 'npm' : 'composer',
            ];

            if ($isNpm) {
                try {
                    $npmUrl = "https://registry.npmjs.org/" . rawurlencode($fullName);
                    $response = Http::timeout(5)->get($npmUrl);
                    if ($response->successful()) {
                        $pkgData = $response->json();
                        $info['description'] = $pkgData['description'] ?? '';
                        $repo = $pkgData['repository']['url'] ?? '';
                        $repo = preg_replace('/^git\+/', '', $repo);
                        $repo = preg_replace('/\.git$/', '', $repo);
                        $info['repository'] = $repo;
                    }
                } catch (\Throwable $e) {}

                try {
                    $dlResp = Http::timeout(3)->get("https://api.npmjs.org/downloads/point/last-month/" . rawurlencode($fullName));
                    if ($dlResp->successful()) {
                        $info['downloads'] = $dlResp->json('downloads', 0);
                    }
                } catch (\Throwable $e) {}
            } else {
                $packagistUrl = "https://packagist.org/packages/{$fullName}.json";
                try {
                    $response = Http::timeout(5)->get($packagistUrl);
                    if ($response->successful()) {
                        $pkgData = $response->json('package', []);
                        $info['description'] = $pkgData['description'] ?? '';
                        $info['repository'] = $pkgData['repository'] ?? '';
                        $info['downloads'] = $pkgData['downloads']['total'] ?? 0;
                        $info['favers'] = $pkgData['favers'] ?? 0;
                    }
                } catch (\Throwable $e) {}
            }

            // Fallback repositories if needed
            $repoUrl = $info['repository'];
            if (empty($repoUrl)) {
                $cleanPkgName = str_replace('@manggala31/', '', $package);
                $repoUrl = "https://github.com/IlhamHattaManggala/{$cleanPkgName}";
                $info['repository'] = $repoUrl;
            }

            $info['readme_id'] = '';

            // Check local Indonesian docs fallback first
            $cleanVendor = ltrim($vendor, '@');
            $localIdDoc = resource_path("docs/{$cleanVendor}/{$package}/id.md");
            if (file_exists($localIdDoc)) {
                $info['readme_id'] = file_get_contents($localIdDoc);
            }

            if ($repoUrl) {
                $parsedUrl = parse_url($repoUrl);
                $path = trim($parsedUrl['path'] ?? '', '/');
                if (!empty($path)) {
                    $rawUrl = "https://raw.githubusercontent.com/{$path}/main/README.md";
                    try {
                        $readmeResponse = Http::timeout(5)->get($rawUrl);
                        if ($readmeResponse->successful()) {
                            $info['readme'] = $readmeResponse->body();
                        } else {
                            $rawMasterUrl = "https://raw.githubusercontent.com/{$path}/master/README.md";
                            $readmeMasterResponse = Http::timeout(5)->get($rawMasterUrl);
                            if ($readmeMasterResponse->successful()) {
                                $info['readme'] = $readmeMasterResponse->body();
                            }
                        }
                    } catch (\Throwable $e) {
                        // Ignore README fetch error
                    }

                    // Also try fetching README.id.md from GitHub if available
                    if (empty($info['readme_id'])) {
                        try {
                            $rawIdUrl = "https://raw.githubusercontent.com/{$path}/main/README.id.md";
                            $readmeIdResp = Http::timeout(5)->get($rawIdUrl);
                            if ($readmeIdResp->successful()) {
                                $info['readme_id'] = $readmeIdResp->body();
                            }
                        } catch (\Throwable $e) {
                            // Ignore
                        }
                    }
                }
            }

            return $info;
        });

        return Inertia::render('Packages/Show', [
            'package' => $packageDetails,
            'resumePath' => Setting::where('key', 'resume_path')->first()?->value ?? '#',
        ]);
    }

    public function storeMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        Message::create($validated);

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
            $result = ImageService::processAndSaveWebp($request->file('image'), 'uploads/testimonials', quality: 85, maxWidth: 800);
            $imagePath = $result['path'];
        }

        Testimonial::create([
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
