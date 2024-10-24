<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;

class WelcomeNotification extends Notification
{
    use Queueable;

    protected $via;
    protected $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($via, $user)
    {
        $this->via = $via;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return $this->via ?? ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Selamat datang ke ' . Config::get('app.name') . '!')
            ->greeting('Halo, ' . $this->user->name . '!')
            ->line('Selamat datang ke ' . Config::get('app.name') . '!')
            ->action('Klik di sini untuk melihat profil', url('/profile'))
            ->line('Terima kasih telah bergabung dengan kami!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $severity = 'info';
        $actionUrl = url('/');

        return [
            'title' => 'Selamat datang ke ' . Config::get('app.name'),
            'body' => $this->user->name . ', Klik untuk membuka profil',
            'badgeTitle' => 'Akun',
            'severity' => $severity,
            'action_url' => $actionUrl ?? null,
        ];
    }
}
