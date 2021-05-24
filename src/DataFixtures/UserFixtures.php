<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;

class UserFixtures extends Fixture
{

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
          
    }

    public function load(ObjectManager $manager)
    {
        $user = new User;

        $user->setEmail('dmarcais@yahoo.com');
        $user->setPassword($this->passwordEncoder->encodePassword( $user , 'toto'));
 
        $manager->persist($user);
  
        $manager->flush();
    }
}
