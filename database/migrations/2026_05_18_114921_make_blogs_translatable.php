<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $blogs = DB::table('blogs')->get();

        foreach ($blogs as $blog) {
            $updateData = [];

            $fieldsToTranslate = ['title', 'excerpt', 'content', 'meta_title', 'meta_description', 'meta_keywords'];

            foreach ($fieldsToTranslate as $field) {
                $value = $blog->{$field};
                if ($value !== null && !str_starts_with($value, '{')) {
                    $updateData[$field] = json_encode(['id' => $value, 'en' => $value]);
                }
            }

            if (!empty($updateData)) {
                DB::table('blogs')->where('id', $blog->id)->update($updateData);
            }
        }
    }

    public function down(): void
    {
        $blogs = DB::table('blogs')->get();

        foreach ($blogs as $blog) {
            $updateData = [];

            $fieldsToTranslate = ['title', 'excerpt', 'content', 'meta_title', 'meta_description', 'meta_keywords'];

            foreach ($fieldsToTranslate as $field) {
                $value = json_decode($blog->{$field}, true);
                if (is_array($value) && isset($value['id'])) {
                    $updateData[$field] = $value['id'];
                }
            }

            if (!empty($updateData)) {
                DB::table('blogs')->where('id', $blog->id)->update($updateData);
            }
        }
    }
};
