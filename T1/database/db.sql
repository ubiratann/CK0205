CREATE DATABASE `svp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `svp`;

-- svp.roles definition

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- svp.files definition

CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `s3_link` varchar(900) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- svp.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(900) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_FK` (`role`),
  CONSTRAINT `user_FK` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- svp.objects definition

CREATE TABLE `objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `owner` int DEFAULT NULL,
  `file` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `object_FK` (`owner`),
  KEY `objects_FK` (`file`),
  CONSTRAINT `objects_FK` FOREIGN KEY (`file`) REFERENCES `files` (`id`),
  CONSTRAINT `objects_FK_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- svp.validations definition

CREATE TABLE `validations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `validated` tinyint(1) NOT NULL,
  `object` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `validations_FK` (`object`),
  CONSTRAINT `validations_FK` FOREIGN KEY (`object`) REFERENCES `objects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;