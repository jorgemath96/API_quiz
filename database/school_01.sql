-- school1 Database
CREATE DATABASE `school_01`;

-- Use Database
USE `school_01`;

-- First Grade Table
CREATE TABLE `first` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `fname` VARCHAR(100) NOT NULL,
  `lname` VARCHAR(100) NOT NULL,
  `grade` int(11) NOT NULL,
  `group` VARCHAR(100) NOT NULL,
  `cicle` YEAR NOT NULL,
  CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES questions.users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Second Grade Table
CREATE TABLE `second` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `fname` VARCHAR(100) NOT NULL,
  `lname` VARCHAR(100) NOT NULL,
  `grade` int(11) NOT NULL,
  `group` VARCHAR(100) NOT NULL,
  `cicle` YEAR NOT NULL,
  CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES questions.users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Third Grade Table
CREATE TABLE `third` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `fname` VARCHAR(100) NOT NULL,
  `lname` VARCHAR(100) NOT NULL,
  `grade` int(11) NOT NULL,
  `group` VARCHAR(100) NOT NULL,
  `cicle` YEAR NOT NULL,
  CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES questions.users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Quizzes Table
CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `idt` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `group` VARCHAR(100) NOT NULL,
  `tries` int(11) NOT NULL,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES questions.users(id),
  CONSTRAINT fk_idt FOREIGN KEY (idt) REFERENCES questions.ask(idt)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;