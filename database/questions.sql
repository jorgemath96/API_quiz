-- Questions Database
CREATE DATABASE `questions`;

-- Use Database
USE `questions`;

-- Users Table
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `school` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Schools Table
CREATE TABLE `schools` (
  `ident` VARCHAR(10) NOT NULL PRIMARY KEY,
  `school` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Asks Table
CREATE TABLE `asks` (
  `num` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `idt` INT(11) NOT NULL,
  `ask` VARCHAR(100) NOT NULL,
  `r1` VARCHAR(255) NOT NULL,
  `r2` VARCHAR(255) NOT NULL,
  `r3` VARCHAR(255) NOT NULL,
  `r4` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Insert Users
-- LOAD DATA LOCAL INFILE '/home/bluehat/Proyectos/Node_JS/APIs/05-Proof/src/uploads/Users.csv' INTO TABLE `users` FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- Insert Topics
LOAD DATA LOCAL INFILE '/home/bluehat/Proyectos/Node_JS/APIs/05-Proof/src/uploads/Topics.csv' INTO TABLE `topics` FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';

-- Insert Schools
INSERT INTO `schools` VALUES ('school_01', 'Secundaria #1'), ('school_02', 'Secundaria #2');