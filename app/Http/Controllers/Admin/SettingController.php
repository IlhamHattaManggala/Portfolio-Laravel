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
            $file = $request->file('file');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
            $filename = time() . '_' . $sanitizedName . '.pdf';
            
            $targetDir = public_path('assets/resumes');
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            
            $file->move($targetDir, $filename);
            $publicPath = '/assets/resumes/' . $filename;

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
            $result = ImageService::processAndSaveWebp($request->file('file'), 'assets/seo', quality: 85, maxWidth: 1200);

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


