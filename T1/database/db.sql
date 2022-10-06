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


INSERT INTO roles(name) values("admin");
INSERT INTO roles(name) values("regular");
INSERT INTO roles(name) values("guest");

INSERT INTO users(full_name, username, password, `role`) values (
	"admin root", 
	"admin", 
	"qwe123", 
	(SELECT id FROM roles WHERE name LIKE 'admin')
);

INSERT INTO users(full_name, username, password, `role`) values (
	"Ubiratan Junior", 
	"bira", 
	"qwe123", 
	(SELECT id FROM roles WHERE name LIKE 'regular')
);

INSERT INTO users(full_name, username, password, `role`) values (
	"Geovane Oliveira", 
	"xeo", 
	"qwe123", 
	(SELECT id FROM roles WHERE name LIKE 'regular')
);

INSERT INTO users(full_name, username, password, `role`) values (
	"guest", 
	"guest", 
	"guest", 
	(SELECT id FROM roles WHERE name LIKE 'guest')
);