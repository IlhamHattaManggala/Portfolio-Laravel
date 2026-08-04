<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $projects = DB::table('projects')->get();

        foreach ($projects as $project) {
            // Check if it's already JSON (starts with {)
            $desc = $project->descriptions;
            $tipe = $project->tipe;

            if (!str_starts_with($desc, '{')) {
                $newDesc = json_encode(['id' => $desc, 'en' => $desc]);
                DB::table('projects')->where('id', $project->id)->update(['descriptions' => $newDesc]);
            }

            if (!str_starts_with($tipe, '{')) {
                $newTipe = json_encode(['id' => $tipe, 'en' => $tipe]);
                DB::table('projects')->where('id', $project->id)->update(['tipe' => $newTipe]);
            }
        }
    }

    public function down(): void
    {
        $projects = DB::table('projects')->get();

        foreach ($projects as $project) {
            $desc = json_decode($project->descriptions, true);
            $tipe = json_decode($project->tipe, true);

            if (is_array($desc) && isset($desc['id'])) {
                DB::table('projects')->where('id', $project->id)->update(['descriptions' => $desc['id']]);
            }

            if (is_array($tipe) && isset($tipe['id'])) {
                DB::table('projects')->where('id', $project->id)->update(['tipe' => $tipe['id']]);
            }
        }
    }
};
