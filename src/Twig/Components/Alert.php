<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
class Alert
{
    public string $type = 'success';
    public string $message;

    public function getAlertClass(): string
    {
        return match ($this->type) {
            'success' => 'green',
            'danger' => 'red',
            'warning' => 'yellow'
        };
    }
}
