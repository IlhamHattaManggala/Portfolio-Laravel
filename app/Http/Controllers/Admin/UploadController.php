<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'folder' => 'nullable|string'
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $folder = $request->input('folder', 'uploads');

            // Define the filename
            $filename = time() . '_' . $file->getClientOriginalName();

            // Move file directly to public directory
            $file->move(public_path($folder), $filename);

            // Return the direct URL
            $url = "/" . $folder . "/" . $filename;

            return response()->json([
                'success' => true,
                'path' => $url
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'No file uploaded'
        ], 400);
    }
}
