<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $experiences = DB::table('experiences')->get();

        foreach ($experiences as $experience) {
            $title = $experience->title;
            $dateRange = $experience->date_range;
            $points = $experience->points;

            $updateData = [];

            if (!str_starts_with($title, '{')) {
                $updateData['title'] = json_encode(['id' => $title, 'en' => $title]);
            }

            if (!str_starts_with($dateRange, '{')) {
                $updateData['date_range'] = json_encode(['id' => $dateRange, 'en' => $dateRange]);
            }

            // points is stored as JSON array. e.g. ["point 1", "point 2"]
            // If it starts with [ we know it's an array and not an object
            if (str_starts_with($points, '[')) {
                $pointsArray = json_decode($points, true) ?? [];
                $updateData['points'] = json_encode(['id' => $pointsArray, 'en' => $pointsArray]);
            }

            if (!empty($updateData)) {
                DB::table('experiences')->where('id', $experience->id)->update($updateData);
            }
        }
    }

    public function down(): void
    {
        $experiences = DB::table('experiences')->get();

        foreach ($experiences as $experience) {
            $title = json_decode($experience->title, true);
            $dateRange = json_decode($experience->date_range, true);
            $points = json_decode($experience->points, true);

            $updateData = [];

            if (is_array($title) && isset($title['id'])) {
                $updateData['title'] = $title['id'];
            }

            if (is_array($dateRange) && isset($dateRange['id'])) {
                $updateData['date_range'] = $dateRange['id'];
            }

            if (is_array($points) && isset($points['id'])) {
                $updateData['points'] = json_encode($points['id']);
            }

            if (!empty($updateData)) {
                DB::table('experiences')->where('id', $experience->id)->update($updateData);
            }
        }
    }
};
