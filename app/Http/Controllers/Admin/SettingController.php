<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use App\Services\ImageService;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        return Inertia::render('admin/settings/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.key' => 'required|string',
            'updates.*.value' => 'nullable|string',
        ]);

        foreach ($validated['updates'] as $update) {
            Setting::updateOrCreate(
                ['key' => $update['key']],
                ['value' => $update['value']]
            );
        }

        return back()->with('success', 'Settings updated successfully.');
    }

    public function uploadResume(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('public/resumes');
            $publicPath = Storage::url($path);

            Setting::updateOrCreate(
                ['key' => 'resume_path'],
                ['value' => $publicPath]
            );

            return response()->json([
                'success' => true,
                'path' => $publicPath
            ]);
        }

        return response()->json(['success' => false, 'error' => 'No file uploaded'], 400);
    }

    public function uploadOgImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,jpg,png,webp,gif|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $result = ImageService::processAndSaveWebp($request->file('file'), 'storage/seo', quality: 85, maxWidth: 1200);

            Setting::updateOrCreate(
                ['key' => 'og_image'],
                ['value' => $result['path']]
            );

            return response()->json([
                'success' => true,
                'path' => $result['path']
            ]);
        }

        return response()->json(['success' => false, 'error' => 'No file uploaded'], 400);
    }
}


