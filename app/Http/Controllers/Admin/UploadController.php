<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240', // Allow initial upload up to 10MB
            'folder' => 'nullable|string'
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $folder = $request->input('folder', 'uploads');

            // Sanitize filename
            $sanitizedName = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
            $filename = time() . '_' . $sanitizedName;

            $targetDir = public_path($folder);
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            $targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;

            // Move uploaded file
            $file->move($targetDir, $filename);

            // Compress image down to maximum 130 KB automatically
            $initialSizeKb = round(filesize($targetPath) / 1024, 2);
            $this->compressToMaxKb($targetPath, 130);
            $finalSizeKb = round(filesize($targetPath) / 1024, 2);

            $url = "/" . trim($folder, '/') . "/" . $filename;

            return response()->json([
                'success' => true,
                'path' => $url,
                'initial_size_kb' => $initialSizeKb,
                'compressed_size_kb' => $finalSizeKb
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'No file uploaded'
        ], 400);
    }

    /**
     * Compress an image file to a target maximum size in KB (default: 130 KB).
     */
    private function compressToMaxKb(string $filePath, int $maxKb = 130): void
    {
        if (!extension_loaded('gd')) {
            return;
        }

        clearstatcache();
        $fileSizeKb = filesize($filePath) / 1024;
        if ($fileSizeKb <= $maxKb) {
            return;
        }

        $imageInfo = @getimagesize($filePath);
        if (!$imageInfo) {
            return;
        }

        $mime = $imageInfo['mime'];
        // SVG & GIF skip binary compression
        if ($mime === 'image/svg+xml' || $mime === 'image/gif') {
            return;
        }

        $srcImage = match ($mime) {
            'image/jpeg' => @imagecreatefromjpeg($filePath),
            'image/png'  => @imagecreatefrompng($filePath),
            'image/webp' => @imagecreatefromwebp($filePath),
            default      => null,
        };

        if (!$srcImage) {
            return;
        }

        $width = imagesx($srcImage);
        $height = imagesy($srcImage);

        // Step 1: Resize if dimension is too large (max 1400px)
        $maxDimension = 1400;
        if ($width > $maxDimension || $height > $maxDimension) {
            if ($width > $height) {
                $newWidth = $maxDimension;
                $newHeight = (int) round(($height / $width) * $maxDimension);
            } else {
                $newHeight = $maxDimension;
                $newWidth = (int) round(($width / $height) * $maxDimension);
            }

            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);

            // Handle transparency for PNG & WebP
            if ($mime === 'image/png' || $mime === 'image/webp') {
                imagealphablending($resizedImage, false);
                imagesavealpha($resizedImage, true);
            }

            imagecopyresampled($resizedImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagedestroy($srcImage);
            $srcImage = $resizedImage;
        }

        // Step 2: Quality Compression Loop down to maxKb
        $quality = 85;
        do {
            if ($mime === 'image/png') {
                // PNG compression level (0-9)
                $pngQuality = (int) round((100 - $quality) / 10);
                imagepng($srcImage, $filePath, $pngQuality);
            } else if ($mime === 'image/webp') {
                imagewebp($srcImage, $filePath, $quality);
            } else {
                imagejpeg($srcImage, $filePath, $quality);
            }

            clearstatcache();
            $currentSizeKb = filesize($filePath) / 1024;
            $quality -= 5;
        } while ($currentSizeKb > $maxKb && $quality >= 20);

        imagedestroy($srcImage);
    }
}
