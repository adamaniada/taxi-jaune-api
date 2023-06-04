CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');



CREATE TABLE Users (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    phoneNumber varchar(40) NOT NULL,
    password text NOT NULL,
    user_type varchar(40) DEFAULT NULL,
    role varchar(40) DEFAULT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

CREATE TABLE Requettes (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    mobile_user_id bigint(21) UNSIGNED NOT NULL,
    taxi_user_id bigint(21) UNSIGNED NOT NULL,
    lieu_depart varchar(150) NOT NULL,
    lieu_arrive varchar(150) NOT NULL,
    heure_depart time NOT NULL,
    distance varchar(10) NOT NULL,
    prix DECIMAL(7,2) UNSIGNED NOT NULL,
    agree_or_desagree_at datetime DEFAULT NULL,
    status varchar(40) DEFAULT NULL,
    paid_at datetime DEFAULT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

CREATE TABLE Locations (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id bigint(21) UNSIGNED NOT NULL,
    latitude varchar(50) NOT NULL,
    longitude varchar(50) NOT NULL,
    altitude varchar(50) NOT NULL,
    speed varchar(10) NOT NULL,
    heart varchar(10) NOT NULL,
    name varchar(50) NOT NULL,
    description text,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

CREATE TABLE Notifications (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id bigint(21) UNSIGNED NOT NULL,
    description text,
    status boolean DEFAULT false,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

CREATE TABLE Favoris (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    mobile_user_id bigint(21) UNSIGNED NOT NULL,
    taxi_user_id bigint(21) UNSIGNED NOT NULL,
    commentaires text,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

CREATE TABLE Notes (
    id bigint(21) UNSIGNED NOT NULL AUTO_INCREMENT,
    mobile_user_id bigint(21) UNSIGNED NOT NULL,
    taxi_user_id bigint(21) UNSIGNED DEFAULT NULL,
    notes varchar(40) NOT NULL,
    commentaires text,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

