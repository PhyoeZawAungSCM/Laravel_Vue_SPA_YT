<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'phyoezawaung',
            'email'=>'phyoezawaung9696@gmail.com',
            'password'=>bcrypt('12345678'),
            'role'=>'adminstrator'
        ]);
    }
}
