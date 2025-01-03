<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use App\Models\User;
use App\Notifications\TestNotification;
use App\Notifications\WelcomeNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class SendTestNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'noti:test {userId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a test notification to a user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('userId');
        $user = User::find($userId);

        if (!$user) {
            $this->error('User not found');
            return 1;
        }

        $notification = new WelcomeNotification(['database'], $user);
        Notification::send($user, $notification);

        $this->info('Notification sent successfully');

        return 0;
    }
}
