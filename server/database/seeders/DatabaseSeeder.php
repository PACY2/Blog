<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Database\Seeders\TagSeeder;
use Database\Seeders\RoleSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            // TagSeeder::class,

            RoleSeeder::class
        ]);

        Tag::factory(10)->create();


        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'email' => "camado@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'firstname' => "Choaib",
            'lastname' => "mouhrach",
            'username' => "camado",
            "birthday" => "2003-09-02",
            "role_id" => 1
        ]);

        Post::factory(10)->create();
    }
}
