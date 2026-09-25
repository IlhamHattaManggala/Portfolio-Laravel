<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Inline script to detect system/stored dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const stored = localStorage.getItem('appearance');
                const appearance = stored || '{{ $appearance ?? "system" }}';
                const isDark = appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme --}}
        <style>
            html {
                background-color: #ffffff;
                color-scheme: light;
            }

            html.dark {
                background-color: #050505;
                color-scheme: dark;
            }
        </style>

        <link rel="icon" href="/images/profile.webp" type="image/webp">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600&display=swap" rel="stylesheet" />

        @php
            $defaultSettings = \Illuminate\Support\Facades\Cache::remember('site_seo_settings', 60, function () {
                try {
                    return \App\Models\Setting::whereIn('key', [
                        'meta_title', 'meta_description', 'meta_keywords', 'meta_author', 'og_image'
                    ])->pluck('value', 'key');
                } catch (\Throwable $e) {
                    return collect();
                }
            });

            $seoTitle = $seo['title'] ?? $defaultSettings['meta_title'] ?? config('app.name', 'Ilham Hatta Manggala | Portofolio & Personal Website');
            $seoDesc = $seo['description'] ?? $defaultSettings['meta_description'] ?? 'Portofolio profesional Ilham Hatta Manggala - Full Stack Web & Mobile Developer.';
            $seoKeywords = $seo['keywords'] ?? $defaultSettings['meta_keywords'] ?? 'Ilham Hatta Manggala, Full Stack Developer, Laravel, React, Flutter';
            $seoAuthor = $seo['author'] ?? $defaultSettings['meta_author'] ?? 'Ilham Hatta Manggala';
            $rawImage = $seo['image'] ?? $defaultSettings['og_image'] ?? '/images/profile.webp';
            $seoImage = str_starts_with($rawImage, 'http') ? $rawImage : url($rawImage);
            $seoUrl = $seo['url'] ?? url()->current();
            $seoType = $seo['type'] ?? 'website';
            $seoPublishedAt = $seo['published_at'] ?? null;
            $seoSchema = $seo['schema'] ?? null;

            if (!$seoSchema && ($seoType === 'website' || request()->is('/'))) {
                $seoSchema = [
                    '@context' => 'https://schema.org',
                    '@type' => 'Person',
                    'name' => $seoAuthor,
                    'url' => url('/'),
                    'jobTitle' => 'Full Stack & Mobile Developer',
                    'sameAs' => [
                        'https://github.com/IlhamHattaManggala',
                        'https://www.linkedin.com/in/ilham-hatta-manggala',
                        'https://instagram.com/runtahhhh__',
                    ],
                ];
            }
        @endphp

        <!-- Primary Meta Tags -->
        <meta name="description" content="{{ $seoDesc }}">
        <meta name="keywords" content="{{ $seoKeywords }}">
        <meta name="author" content="{{ $seoAuthor }}">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ $seoUrl }}">

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="{{ $seoType }}">
        <meta property="og:url" content="{{ $seoUrl }}">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDesc }}">
        <meta property="og:image" content="{{ $seoImage }}">
        <meta property="og:image:alt" content="{{ $seoTitle }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Ilham Hatta Manggala') }}">
        @if($seoPublishedAt)
        <meta property="article:published_time" content="{{ $seoPublishedAt }}">
        <meta property="article:author" content="{{ $seoAuthor }}">
        @endif

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ $seoUrl }}">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDesc }}">
        <meta name="twitter:image" content="{{ $seoImage }}">

        <!-- Structured Data (JSON-LD) -->
        @if($seoSchema)
        <script type="application/ld+json">
            {!! json_encode($seoSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
        </script>
        @endif

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $seoTitle }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
