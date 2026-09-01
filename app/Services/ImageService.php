<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;

class ImageService
{
    /**
     * Process an uploaded image: resize if necessary, compress, convert to .webp format,
     * and save to the target public folder.
     *
     * @param UploadedFile $file
     * @param string $folder Relative path inside public folder (e.g., 'uploads', 'testimonials', 'storage/seo')
     * @param int $quality WebP compression quality (default: 80)
     * @param int $maxWidth Maximum width dimension in pixels (default: 1600)
     * @return array Contains 'path', 'filename', 'initial_size_kb', and 'compressed_size_kb'
     */
    public static function processAndSaveWebp(
        UploadedFile $file,
        string $folder = 'uploads',
        int $quality = 80,
        int $maxWidth = 1600
    ): array {
        $initialSizeKb = round($file->getSize() / 1024, 2);
        $extension = strtolower($file->getClientOriginalExtension());
        
        // Sanitize original filename base
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $sanitizedName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
        
        // Direct move for SVG & GIF to preserve animation and vector properties
        if (in_array($extension, ['svg', 'gif'])) {
            $filename = time() . '_' . $sanitizedName . '.' . $extension;
            $targetDir = public_path(trim($folder, '/'));
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            $file->move($targetDir, $filename);
            $targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
            $finalSizeKb = round(filesize($targetPath) / 1024, 2);
            $url = '/' . trim($folder, '/') . '/' . $filename;

            return [
                'path' => $url,
                'filename' => $filename,
                'initial_size_kb' => $initialSizeKb,
                'compressed_size_kb' => $finalSizeKb,
            ];
        }

        // Generate WebP filename
        $filename = time() . '_' . $sanitizedName . '.webp';
        
        $targetDir = public_path(trim($folder, '/'));
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        $targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;

        // Initialize Intervention ImageManager with GD Driver
        $manager = new ImageManager(new Driver());
        $image = $manager->decodePath($file->getPathname());

        // Scale down if image width exceeds maxWidth while maintaining aspect ratio
        if ($image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        // Encode image to WebP with target quality
        $encoded = $image->encode(new WebpEncoder(quality: $quality));
        $encoded->save($targetPath);

        clearstatcache();
        $finalSizeKb = round(filesize($targetPath) / 1024, 2);
        $url = '/' . trim($folder, '/') . '/' . $filename;

        return [
            'path' => $url,
            'filename' => $filename,
            'initial_size_kb' => $initialSizeKb,
            'compressed_size_kb' => $finalSizeKb,
        ];
    }
}
