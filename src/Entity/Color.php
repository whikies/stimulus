<?php

namespace App\Entity;

use App\Repository\ColorRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ColorRepository::class)]
class Color
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $name = null;

    #[ORM\Column(length: 6)]
    private ?string $hexColor = null;

    public function __construct(string $name, string $hexColor)
    {
        $this->name = $name;
        $this->hexColor = $hexColor;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getHexColor(): ?string
    {
        return $this->hexColor;
    }

    public function setHexColor(string $hexColor): static
    {
        $this->hexColor = $hexColor;

        return $this;
    }

    public function getRed(): string
    {
        return hexdec(substr($this->hexColor, 0, 2));
    }

    public function getGreen(): string
    {
        return hexdec(substr($this->hexColor, 2, 2));
    }

    public function getBlue(): string
    {
        return hexdec(substr($this->hexColor, 4, 2));
    }

    public function __toString(): string
    {
        return (string) $this->getHexColor();
    }
}
