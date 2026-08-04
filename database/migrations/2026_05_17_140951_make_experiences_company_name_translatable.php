<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $experiences = DB::table('experiences')->get();

        foreach ($experiences as $exp) {
            $companyName = $exp->company_name;

            $updateData = [];

            if (!str_starts_with($companyName, '{')) {
                $updateData['company_name'] = json_encode(['id' => $companyName, 'en' => $companyName]);
            }

            if (!empty($updateData)) {
                DB::table('experiences')->where('id', $exp->id)->update($updateData);
            }
        }
    }

    public function down(): void
    {
        $experiences = DB::table('experiences')->get();

        foreach ($experiences as $exp) {
            $companyName = json_decode($exp->company_name, true);

            $updateData = [];

            if (is_array($companyName) && isset($companyName['id'])) {
                $updateData['company_name'] = $companyName['id'];
            }

            if (!empty($updateData)) {
                DB::table('experiences')->where('id', $exp->id)->update($updateData);
            }
        }
    }
};
