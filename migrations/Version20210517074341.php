<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517074341 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agents (id INT AUTO_INCREMENT NOT NULL, missions_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, codename INT NOT NULL, nationality VARCHAR(255) NOT NULL, INDEX IDX_9596AB6E17C042CF (missions_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE agents_speciality (agents_id INT NOT NULL, speciality_id INT NOT NULL, INDEX IDX_1D699DCF709770DC (agents_id), INDEX IDX_1D699DCF3B5A08D7 (speciality_id), PRIMARY KEY(agents_id, speciality_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contacts (id INT AUTO_INCREMENT NOT NULL, missions_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, codename VARCHAR(255) NOT NULL, nationality VARCHAR(255) NOT NULL, INDEX IDX_3340157317C042CF (missions_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE missions (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, codename VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, begindate DATE NOT NULL, enddate DATE DEFAULT NULL, speciality VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE speciality (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stashs (id INT AUTO_INCREMENT NOT NULL, missions_id INT DEFAULT NULL, codename INT NOT NULL, adress VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_81231F8517C042CF (missions_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE target (id INT AUTO_INCREMENT NOT NULL, missions_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, birthdate DATE NOT NULL, codename VARCHAR(255) NOT NULL, nationality VARCHAR(255) NOT NULL, INDEX IDX_466F2FFC17C042CF (missions_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, is_verified TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE agents ADD CONSTRAINT FK_9596AB6E17C042CF FOREIGN KEY (missions_id) REFERENCES missions (id)');
        $this->addSql('ALTER TABLE agents_speciality ADD CONSTRAINT FK_1D699DCF709770DC FOREIGN KEY (agents_id) REFERENCES agents (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE agents_speciality ADD CONSTRAINT FK_1D699DCF3B5A08D7 FOREIGN KEY (speciality_id) REFERENCES speciality (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE contacts ADD CONSTRAINT FK_3340157317C042CF FOREIGN KEY (missions_id) REFERENCES missions (id)');
        $this->addSql('ALTER TABLE stashs ADD CONSTRAINT FK_81231F8517C042CF FOREIGN KEY (missions_id) REFERENCES missions (id)');
        $this->addSql('ALTER TABLE target ADD CONSTRAINT FK_466F2FFC17C042CF FOREIGN KEY (missions_id) REFERENCES missions (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agents_speciality DROP FOREIGN KEY FK_1D699DCF709770DC');
        $this->addSql('ALTER TABLE agents DROP FOREIGN KEY FK_9596AB6E17C042CF');
        $this->addSql('ALTER TABLE contacts DROP FOREIGN KEY FK_3340157317C042CF');
        $this->addSql('ALTER TABLE stashs DROP FOREIGN KEY FK_81231F8517C042CF');
        $this->addSql('ALTER TABLE target DROP FOREIGN KEY FK_466F2FFC17C042CF');
        $this->addSql('ALTER TABLE agents_speciality DROP FOREIGN KEY FK_1D699DCF3B5A08D7');
        $this->addSql('DROP TABLE agents');
        $this->addSql('DROP TABLE agents_speciality');
        $this->addSql('DROP TABLE contacts');
        $this->addSql('DROP TABLE missions');
        $this->addSql('DROP TABLE speciality');
        $this->addSql('DROP TABLE stashs');
        $this->addSql('DROP TABLE target');
        $this->addSql('DROP TABLE user');
    }
}
