<?php

namespace App\Console\Commands;

use App\Models\Mitra;
use App\Models\User;
use Illuminate\Console\Command;

class deleteAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'account:delete {email}';

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
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->delete();
            $this->info('User deleted successfully');
        } else {
            $this->error('User not found');
        }
        $mitra = Mitra::where('email', $email)->first();
        if ($mitra) {
            $mitra->delete();
            $this->info('Mitra deleted successfully');
        } else {
            $this->error('Mitra not found');
        }
    }
}
