<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class verify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:verify {user_id}';

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
        $user = User::findOrFail($this->argument('user_id'));
        $user->markEmailAsVerified();
        $this->info('Email verified for user with ID: ' . $user->id);
    }
}
