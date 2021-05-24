<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;


class AppAccessController extends AbstractController
{
    /**
    * @Route("/app", name="app")
    */


    public function index(UserInterface $user, JWTTokenManagerInterface $JWTManager)
    {
        $tokenjwt = $JWTManager->create($user);
        return $this->render('app_access/admin.html.twig', [
            'controller_name' => 'AppAccessController','title' => 'Mon Projet : Creer une application WEB - Studi', 'tokenjwt' => $tokenjwt
        ]);
    }




}
