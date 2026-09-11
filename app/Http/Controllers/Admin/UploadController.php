<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'folder' => 'nullable|string'
        ]);

        try {
            if ($request->hasFile('file')) {
                $folder = $request->input('folder', 'uploads');
                $result = ImageService::processAndSaveWebp($request->file('file'), $folder, quality: 80, maxWidth: 1600);

                return response()->json([
                    'success' => true,
                    'path' => $result['path'],
                    'initial_size_kb' => $result['initial_size_kb'],
                    'compressed_size_kb' => $result['compressed_size_kb']
                ]);
            }

            return response()->json([
                'success' => false,
                'error' => 'No file uploaded'
            ], 400);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Upload Error: ' . $e->getMessage(), [
                'exception' => $e
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
