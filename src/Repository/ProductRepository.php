<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * Search by category and/or term
     *
     * @return Product[]
     */
    public function search(?Category $category, ?string $term)
    {
        $qb = $this->createQueryBuilder('product');

        if ($category) {
            $qb->andWhere('product.category = :category')
                ->setParameter('category', $category);
        }

        if ($term) {
            $qb->andWhere('product.name LIKE :term OR product.description LIKE :term')
                ->setParameter('term', '%' . $term . '%');
        }

        return $qb
            ->getQuery()
            ->execute();
    }

    public function findFeatured(): ?Product
    {
        return $this->createQueryBuilder('product')
            ->leftJoin('product.colors', 'color')
            ->andWhere('color.id IS NOT NULL')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
