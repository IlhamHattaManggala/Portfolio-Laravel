<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $certificates = DB::table('certificates')->get();

        foreach ($certificates as $cert) {
            $title = $cert->title;
            $issuer = $cert->issuer;

            $updateData = [];

            if (!str_starts_with($title, '{')) {
                $updateData['title'] = json_encode(['id' => $title, 'en' => $title]);
            }

            if (!str_starts_with($issuer, '{')) {
                $updateData['issuer'] = json_encode(['id' => $issuer, 'en' => $issuer]);
            }

            if (!empty($updateData)) {
                DB::table('certificates')->where('id', $cert->id)->update($updateData);
            }
        }
    }

    public function down(): void
    {
        $certificates = DB::table('certificates')->get();

        foreach ($certificates as $cert) {
            $title = json_decode($cert->title, true);
            $issuer = json_decode($cert->issuer, true);

            $updateData = [];

            if (is_array($title) && isset($title['id'])) {
                $updateData['title'] = $title['id'];
            }

            if (is_array($issuer) && isset($issuer['id'])) {
                $updateData['issuer'] = $issuer['id'];
            }

            if (!empty($updateData)) {
                DB::table('certificates')->where('id', $cert->id)->update($updateData);
            }
        }
    }
};
