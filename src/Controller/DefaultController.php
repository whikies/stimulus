<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\DefaultService;

class DefaultController extends AbstractController
{
    #[Route('/default', name: 'app_default')]
    public function index(DefaultService $defaultService): Response
    {
        $defaultService->index('ffs');
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController::index',
        ]);
    }

    #[Route('/one', name: 'app_one')]
    public function one(): Response
    {
        return $this->render('default/one.html.twig', [
            'controller_name' => 'DefaultController::one',
        ]);
    }

    #[Route('/two', name: 'app_two')]
    public function two(): Response
    {
        return $this->render('default/two.html.twig', [
            'controller_name' => 'DefaultController::two',
        ]);
    }
}
