<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class PengajuanNotification extends Notification
{
    /**
     * Create a new notification instance.
     */

    protected object $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Surat Pengajuan Kerjasama Baru: ' . $this->data->full_name)
            ->view('emails.pengajuan', ['data' => $this->data]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Surat Pengajuan Kerjasama',
            'body' => 'Surat pengajuan kerjasama baru telah diajukan, silahkan cek email anda',
            'badgeTitle' => 'CSR',
            'severity' => 'info',
            'action_url' => null
        ];
    }
}
