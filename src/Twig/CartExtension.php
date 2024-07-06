<?php

namespace App\Twig;

use App\Service\CartStorage;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CartExtension extends AbstractExtension
{
    private $cartStorage;

    public function __construct(CartStorage $cartStorage)
    {
        $this->cartStorage = $cartStorage;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('count_cart_items', [$this, 'countCartItems']),
        ];
    }

    public function countCartItems(): int
    {
        $cart = $this->cartStorage->getCart();

        if (!$cart) {
            return 0;
        }

        return $cart->countTotalItems();
    }
}
