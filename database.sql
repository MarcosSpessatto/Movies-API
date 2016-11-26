-- MySQL Workbench Synchronization
-- Generated: 2016-11-23 20:42
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: marcos

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `database` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `database`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(200) NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `database`.`rent` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `movie` INT(11) NOT NULL,
  `user` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rent_movies_idx` (`movie` ASC),
  INDEX `fk_rent_users1_idx` (`user` ASC),
  CONSTRAINT `fk_rent_movies`
    FOREIGN KEY (`movie`)
    REFERENCES `database`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rent_users1`
    FOREIGN KEY (`user`)
    REFERENCES `database`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `database`.`movies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(300) NOT NULL,
  `director` VARCHAR(300) NOT NULL,
  `copies` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `database`.`tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `token` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into database.movies(title, director, copies) values ('Batman', ' Director', 5);
insert into database.movies(title, director, copies) values ('Pânico', ' Director', 7);
insert into database.movies(title, director, copies) values ('Hannibal', ' Director', 2);
insert into database.movies(title, director, copies) values ('The secret', ' Director', 9);
insert into database.movies(title, director, copies) values ('Um Álibi perfeito', ' Director', 3);
insert into database.movies(title, director, copies) values ('Batman', ' Director', 5);
insert into database.movies(title, director, copies) values ('Detroit Rock city', ' Director', 2);
insert into database.movies(title, director, copies) values ('Click', ' Director', 3);
insert into database.movies(title, director, copies) values ('Atividade paranormal', ' Director', 5);
insert into database.movies(title, director, copies) values ('Inatividade paranormal', ' Director', 4);
insert into database.movies(title, director, copies) values ('O massacre da seera elétrica', ' Director', 5);

-- marcos.defendicc@gmail.com password -> marcos
-- admin@admin.com password -> admin
insert into database.users(name, email, password) values('marcos', 'marcos.defendicc@gmail.com', 'c5e3539121c4944f2bbe097b425ee774');
insert into database.users(name, email, password) values('admin', 'admin@admin.com', '21232f297a57a5a743894a0e4a801fc3');

insert into database.rent(user, movie) values(1, 1);
insert into database.rent(user, movie) values(1, 2);
insert into database.rent(user, movie) values(1, 2);
