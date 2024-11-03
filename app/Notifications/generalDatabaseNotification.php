<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class generalDatabaseNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $body;
    protected $badgeTitle;
    protected $severity;
    protected $action_url;


    public function __construct($title, $body, $badgeTitle, $severity, $action_url)
    {
        $this->title = $title;
        $this->body = $body;
        $this->badgeTitle = $badgeTitle;
        $this->severity = $severity;
        $this->action_url = $action_url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
            'badgeTitle' => $this->badgeTitle,
            'severity' => $this->severity,
            'action_url' => $this->action_url
        ];
    }
}
