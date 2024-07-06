<?php

namespace App\Service;

use App\Entity\Cart;
use App\Entity\CartItem;
use App\Repository\ColorRepository;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\RequestStack;

class CartStorage
{
    private $requestStack;
    private $productRepository;
    private $colorRepository;

    public function __construct(RequestStack $requestStack, ProductRepository $productRepository, ColorRepository  $colorRepository)
    {
        $this->requestStack = $requestStack;
        $this->productRepository = $productRepository;
        $this->colorRepository = $colorRepository;
    }

    public function getCart(): ?Cart
    {
        $key = self::getKey();
        if (!$this->requestStack->getSession()->has($key)) {
            return null;
        }
        $cart = $this->requestStack->getSession()->get($key);

        if (!$cart instanceof Cart) {
            throw new \InvalidArgumentException('Wrong cart type');
        }

        // create new so if we modify it, but don't want to save back, it's
        // not automatically modified in the session
        $newCart = new Cart();
        // refresh the Products from the database
        foreach ($cart->getItems() as $item) {
            $newCart->addItem(new CartItem(
                $this->productRepository->find($item->getProduct()),
                $item->getQuantity(),
                $item->getColor() ? $this->colorRepository->find($item->getColor()) : null
            ));
        }

        return $newCart;
    }

    public function getOrCreateCart(): Cart
    {
        return $this->getCart() ?: new Cart();
    }

    public function save(Cart $cart)
    {
        $this->requestStack->getSession()->set(self::getKey(), $cart);
    }

    public function clearCart()
    {
        $this->requestStack->getSession()->remove(self::getKey());
    }

    private static function getKey(): string
    {
        return sprintf('_cart_storage');
    }
}
