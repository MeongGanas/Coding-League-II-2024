<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class banUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:ban {identifier} {argument} {--confirm} {--force} {--skip}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ban a user';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $identifier = $this->argument('identifier');
        $argument = $this->argument('argument');
        $skipConfirmation = $this->option('confirm') || $this->option('force') || $this->option('skip');

        if (!$identifier || !$argument) {
            $this->error('Please provide identifier and argument');
            return;
        }

        $allowedIdentifiers = ['id', 'email', 'name'];

        if (!in_array($identifier, $allowedIdentifiers)) {
            $this->error('Invalid identifier. Allowed identifiers are: ' . implode(', ', $allowedIdentifiers));
            return;
        }

        $user = User::where($identifier, $argument)->first();

        if (!$user) {
            $this->error('Cannot find user where ' . $identifier . ' = ' . $argument);
            return;
        }

        if ($user->role !== 'mitra') {
            $this->error('User is not a mitra');
            return;
        }

        if ($user->mitra->status === 'Non-Aktif') {
            $this->error('User is already banned');
            return;
        }

        $this->info('User found:');
        $this->table(['ID', 'Name', 'Email', 'Role', 'Status'], [
            [$user->id, $user->name, $user->email, $user->role, $user->mitra->status]
        ]);

        if (!$skipConfirmation) {
            if (!$this->confirm('Are you sure you want to ban this user?')) {
                $this->info('Operation cancelled');
                return;
            }
        }

        $user->mitra->status = 'Non-Aktif';
        $user->save();

        $this->info('User has been banned');
    }
}
