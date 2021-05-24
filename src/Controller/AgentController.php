<?php
namespace App\Controller;
use App\Entity\Agent;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
class AgentController extends AbstractController
{
    /**
     * @Route("/Agent")
     */
    public function createAgent(): Response
    {
        $Agent = new Agent();
        $Agent->setAgentname('');
        $Agent->setAgentsurname('');
        $Agent->setAgentbirthdate('');
        $Agent->setAgentcodename('');
        $Agent->setAgentnationality('');

        $entityManger = $this->getDoctrine()->getManager();
        $entityManger->persist($Agent);
        $entityManger->flush();
        
    }
}