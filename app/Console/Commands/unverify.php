<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class unverify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:unverify {user_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = \App\Models\User::find($this->argument('user_id'));
        if (!$user) {
            $this->error('User not found');
            return;
        }

        $user->email_verified_at = null;
        $user->save();

        $this->info('User email unverified');
    }
}
