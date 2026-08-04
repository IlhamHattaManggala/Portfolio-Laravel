<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
        }

        $blogs = $query->latest()->paginate(6)->withQueryString();

        return Inertia::render('admin/blogs/index', [
            'blogs' => $blogs,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blogs/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'excerpt' => 'required|array',
            'excerpt.id' => 'required|string',
            'excerpt.en' => 'required|string',
            'content' => 'required|array',
            'content.id' => 'required|string',
            'content.en' => 'required|string',
            'featured_image' => 'nullable|string',
            'meta_title' => 'nullable|array',
            'meta_title.id' => 'nullable|string|max:255',
            'meta_title.en' => 'nullable|string|max:255',
            'meta_description' => 'nullable|array',
            'meta_description.id' => 'nullable|string',
            'meta_description.en' => 'nullable|string',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.id' => 'nullable|string',
            'meta_keywords.en' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['id']);
        
        // Ensure slug is unique
        $originalSlug = $validated['slug'];
        $count = 1;
        while (Blog::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count++;
        }

        if ($validated['is_published']) {
            $validated['published_at'] = now();
        }

        Blog::create($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created successfully.');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('admin/blogs/form', [
            'blog' => $blog
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'excerpt' => 'required|array',
            'excerpt.id' => 'required|string',
            'excerpt.en' => 'required|string',
            'content' => 'required|array',
            'content.id' => 'required|string',
            'content.en' => 'required|string',
            'featured_image' => 'nullable|string',
            'meta_title' => 'nullable|array',
            'meta_title.id' => 'nullable|string|max:255',
            'meta_title.en' => 'nullable|string|max:255',
            'meta_description' => 'nullable|array',
            'meta_description.id' => 'nullable|string',
            'meta_description.en' => 'nullable|string',
            'meta_keywords' => 'nullable|array',
            'meta_keywords.id' => 'nullable|string',
            'meta_keywords.en' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if ($blog->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']['en'] ?? $validated['title']['id']);
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Blog::where('slug', $validated['slug'])->where('id', '!=', $blog->id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count++;
            }
        }

        if ($validated['is_published'] && !$blog->is_published) {
            $validated['published_at'] = now();
        }

        $blog->update($validated);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:blogs,id'
        ]);

        Blog::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog articles deleted successfully.');
    }
}
