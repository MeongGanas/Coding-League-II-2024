<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StatusNotification extends Notification
{
    use Queueable;

    protected $via;
    protected $user;
    protected $status;
    protected $reason;
    protected $laporan;

    public function __construct($via, $user, $status, $reason, $laporan)
    {
        $this->via = $via;
        $this->user = $user;
        $this->status = $status;
        $this->reason = $reason;
        $this->laporan = $laporan;
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
        $actionUrls = [
            'Diterima' => url('/mitra/laporan/' . $this->laporan->id),
            'Revisi' => url('/mitra/laporan/' . $this->laporan->id),
            'Ditolak' => null
        ];

        $statusText = [
            'Revisi' => 'Laporan perlu direvisi',
            'Diterima' => 'Laporan telah diterima',
            'Ditolak' => 'Laporan ditolak'
        ];

        $lineText = [
            'Revisi' => 'perlu direvisi',
            'Diterima' => 'telah diterima',
            'Ditolak' => 'ditolak'
        ];

        return (new MailMessage)
            ->subject($statusText[$this->status] . ': ' . $this->laporan->name)
            ->greeting('Halo, ' . $this->user->name)
            ->line('Anda menerima notifikasi ini karena laporan ' . $this->laporan->name . ' ' . $lineText[$this->status] . '.')
            ->line($this->status === 'Diterima' ? null : 'Alasan: ' . $this->reason ?? 'Alasan tidak disebutkan.')
            ->action('Klik di sini untuk melihat laporan', $actionUrls[$this->status] ?? null)
            ->line('Terima kasih telah menggunakan aplikasi kami!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $severity = [
            'Diterima' => 'success',
            'Revisi' => 'warning',
            'Ditolak' => 'error'
        ];

        $statusText = [
            'Diterima' => 'Laporan telah diterima!',
            'Revisi' => 'Laporan perlu direvisi!',
            'Ditolak' => 'Laporan ditolak!'
        ];

        $actionUrls = [
            'Diterima' => url('/mitra/laporan/' . $this->laporan->id),
            'Revisi' => url('/mitra/laporan/' . $this->laporan->id),
            'Ditolak' => null
        ];

        return [
            'title' => 'Laporan ' . strtolower($this->laporan->name),
            'body' => $this->reason ?? null,
            'badgeTitle' => $statusText[$this->status],
            'severity' => $severity[$this->status],
            'action_url' => $actionUrls[$this->status] ?? null,
        ];
    }
}
