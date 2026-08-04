<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experience/index', [
            'experiences' => Experience::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experience/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'company_name' => 'required|array',
            'company_name.id' => 'required|string|max:255',
            'company_name.en' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'icon_bg' => 'nullable|string',
            'date_range' => 'required|array',
            'date_range.id' => 'required|string',
            'date_range.en' => 'required|string',
            'points' => 'required|array',
            'points.id' => 'required|array',
            'points.en' => 'required|array',
        ]);

        Experience::create($validated);

        return redirect()->route('admin.experience.index')->with('success', 'Experience created successfully.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experience/form', [
            'experience' => $experience
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'company_name' => 'required|array',
            'company_name.id' => 'required|string|max:255',
            'company_name.en' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'icon_bg' => 'nullable|string',
            'date_range' => 'required|array',
            'date_range.id' => 'required|string',
            'date_range.en' => 'required|string',
            'points' => 'required|array',
            'points.id' => 'required|array',
            'points.en' => 'required|array',
        ]);

        $experience->update($validated);

        return redirect()->route('admin.experience.index')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->route('admin.experience.index')->with('success', 'Experience deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:experiences,id'
        ]);

        Experience::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.experience.index')->with('success', 'Experiences deleted successfully.');
    }
}
