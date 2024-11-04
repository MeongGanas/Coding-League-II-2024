<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class unbanUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:unban {argument} {identifier?} {--confirm} {--force} {--skip}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Unban a user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $argument = $this->argument('argument');
        $identifier = $this->argument('identifier') ?? 'id';
        $skipConfirmation = $this->option('confirm') || $this->option('force') || $this->option('skip');

        if (!$argument) {
            $this->error('Please provide identifier and argument');
            return;
        }

        if ($this->argument('identifier') === null) {
            $this->info('Identifier isn\'t provided, defaulting to ID');
        }

        if ($identifier === 'id' && !is_numeric($argument)) {
            $this->error('ID must be a number');
            return;
        }

        if ($identifier === 'email' && !filter_var($argument, FILTER_VALIDATE_EMAIL)) {
            $this->error('Invalid email address');
            return;
        }

        if ($identifier === 'name' && !is_string($argument)) {
            $this->error('Name must be a string');
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

        if ($user->mitra->status === 'Aktif') {
            $this->error('User is already unbanned');
            return;
        }

        $this->info('User found:');
        $this->table(['ID', 'Name', 'Email', 'Role', 'Status'], [
            [$user->id, $user->name, $user->email, $user->role, $user->mitra->status]
        ]);

        if (!$skipConfirmation) {
            if (!$this->confirm('Are you sure you want to unban this user?')) {
                $this->info('Operation cancelled');
                return;
            }
        }

        $user->mitra->status = 'Aktif';
        $user->save();

        $this->info('User has been unbanned');
    }
}
