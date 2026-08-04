<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $testimonials = DB::table('testimonials')->get();

        foreach ($testimonials as $item) {
            $updateData = [];

            $fieldsToTranslate = ['designation', 'company', 'testimonial'];

            foreach ($fieldsToTranslate as $field) {
                $value = $item->{$field};
                if ($value !== null && !str_starts_with($value, '{')) {
                    $updateData[$field] = json_encode(['id' => $value, 'en' => $value]);
                }
            }

            if (!empty($updateData)) {
                DB::table('testimonials')->where('id', $item->id)->update($updateData);
            }
        }
    }

    public function down(): void
    {
        $testimonials = DB::table('testimonials')->get();

        foreach ($testimonials as $item) {
            $updateData = [];

            $fieldsToTranslate = ['designation', 'company', 'testimonial'];

            foreach ($fieldsToTranslate as $field) {
                $value = json_decode($item->{$field}, true);
                if (is_array($value) && isset($value['id'])) {
                    $updateData[$field] = $value['id'];
                }
            }

            if (!empty($updateData)) {
                DB::table('testimonials')->where('id', $item->id)->update($updateData);
            }
        }
    }
};
