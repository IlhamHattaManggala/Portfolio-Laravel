<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::latest()->paginate(5)
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.id' => 'required|string|max:255',
            'name.en' => 'required|string|max:255',
            'descriptions' => 'required|array',
            'descriptions.id' => 'required|string',
            'descriptions.en' => 'required|string',
            'tipe' => 'required|array',
            'tipe.id' => 'required|string',
            'tipe.en' => 'required|string',
            'library' => 'required|array',
            'image' => 'nullable|string',
            'link' => 'nullable|string|url',
            'video' => 'nullable|string|url',
        ]);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.id' => 'required|string|max:255',
            'name.en' => 'required|string|max:255',
            'descriptions' => 'required|array',
            'descriptions.id' => 'required|string',
            'descriptions.en' => 'required|string',
            'tipe' => 'required|array',
            'tipe.id' => 'required|string',
            'tipe.en' => 'required|string',
            'library' => 'required|array',
            'image' => 'nullable|string',
            'link' => 'nullable|string|url',
            'video' => 'nullable|string|url',
        ]);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:projects,id'
        ]);

        Project::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Projects deleted successfully.');
    }
}
