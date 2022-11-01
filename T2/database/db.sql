CREATE DATABASE `svp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `svp`;

-- svp.roles definition

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_FK` (`role`),
  CONSTRAINT `user_FK` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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


INSERT INTO roles(id, name) values(1, "guest");
INSERT INTO roles(id, name) values(2, "regular");
INSERT INTO roles(id, name) values(3,"admin");

INSERT INTO users(id, full_name, username, email, password, `role`) values (
	1,
  "admin", 
	"admin", 
  "email@email.com",
	"pbkdf2:sha256:260000$DSpxlbHUsiuiJSCg$fcd8bf3857b5ecaaf15ab1dd13b7cd7c32d5e6a20174413f1d642ff521d63cfb", 
	(SELECT id FROM roles WHERE name LIKE 'admin')
);

--admin password = r00tp4ss