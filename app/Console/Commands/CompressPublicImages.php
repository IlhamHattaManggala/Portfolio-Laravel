<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class CompressPublicImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:compress-public {--max=130 : Maximum file size in KB}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compress all existing images in the public folder to maximum specified size in KB (default 130KB) keeping filenames intact.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '512M');
        $maxKb = (int) $this->option('max');
        $publicDir = public_path();

        $this->info("Scanning images in {$publicDir} to compress down to max {$maxKb} KB...");

        if (!extension_loaded('gd')) {
            $this->error('PHP GD extension is not enabled. Cannot process images.');
            return 1;
        }

        $dirIterator = new RecursiveDirectoryIterator($publicDir);
        $iterator = new RecursiveIteratorIterator($dirIterator);

        $processedCount = 0;
        $compressedCount = 0;
        $savedBytes = 0;

        foreach ($iterator as $file) {
            if (!$file->isFile()) {
                continue;
            }

            $path = $file->getPathname();

            // Skip build directory assets if needed
            if (str_contains($path, DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR)) {
                continue;
            }

            $extension = strtolower($file->getExtension());
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                continue;
            }

            $processedCount++;
            clearstatcache();
            $initialSize = filesize($path);
            $initialSizeKb = round($initialSize / 1024, 2);

            if ($initialSizeKb <= $maxKb) {
                continue;
            }

            $this->compressSingleImage($path, $maxKb);

            clearstatcache();
            $finalSize = filesize($path);
            $finalSizeKb = round($finalSize / 1024, 2);

            $diffKb = round($initialSizeKb - $finalSizeKb, 2);
            $savedBytes += ($initialSize - $finalSize);

            $relativePath = str_replace($publicDir, '', $path);
            $this->line("<info>Compressed:</info> {$relativePath} | <comment>{$initialSizeKb} KB</comment> -> <fg=green>{$finalSizeKb} KB</fg=green> (Saved {$diffKb} KB)");
            $compressedCount++;
        }

        $savedMb = round($savedBytes / (1024 * 1024), 2);
        $this->newLine();
        $this->info("Done! Processed {$processedCount} images. Successfully compressed {$compressedCount} images (Saved total {$savedMb} MB).");

        return 0;
    }

    /**
     * Compress a single image in place.
     */
    private function compressSingleImage(string $filePath, int $maxKb): void
    {
        $imageInfo = @getimagesize($filePath);
        if (!$imageInfo) {
            return;
        }

        $mime = $imageInfo['mime'];
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
        } while ($currentSizeKb > $maxKb && $quality >= 10);

        // Step 3: If PNG remains > maxKb (due to PNG lossless nature), scale and encode as WebP payload under same filename
        if (filesize($filePath) / 1024 > $maxKb) {
            $curWidth = imagesx($srcImage);
            $curHeight = imagesy($srcImage);
            $targetWidth = 1000;

            if ($curWidth > $targetWidth) {
                $targetHeight = (int) round(($curHeight / $curWidth) * $targetWidth);
                $scaled = imagecreatetruecolor($targetWidth, $targetHeight);
                imagecopyresampled($scaled, $srcImage, 0, 0, 0, 0, $targetWidth, $targetHeight, $curWidth, $curHeight);
                imagedestroy($srcImage);
                $srcImage = $scaled;
            }

            $webpQuality = 80;
            do {
                imagewebp($srcImage, $filePath, $webpQuality);
                clearstatcache();
                $currentSizeKb = filesize($filePath) / 1024;
                $webpQuality -= 5;
            } while ($currentSizeKb > $maxKb && $webpQuality >= 20);
        }

        imagedestroy($srcImage);
    }
}
