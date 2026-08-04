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
            $name = $project->name;

            if (!str_starts_with($name, '{')) {
                $newName = json_encode(['id' => $name, 'en' => $name]);
                DB::table('projects')->where('id', $project->id)->update(['name' => $newName]);
            }
        }
    }

    public function down(): void
    {
        $projects = DB::table('projects')->get();

        foreach ($projects as $project) {
            $name = json_decode($project->name, true);

            if (is_array($name) && isset($name['id'])) {
                DB::table('projects')->where('id', $project->id)->update(['name' => $name['id']]);
            }
        }
    }
};
