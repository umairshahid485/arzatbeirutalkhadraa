<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $titles = ["SHEESHA MOLASSES","VAPE","HOOKAHS","ACCESSORIES"];

        foreach ($titles as $title) {
            DB::table('categories')->insert([
                'name' => $title,
            ]);
        }
    }
}
