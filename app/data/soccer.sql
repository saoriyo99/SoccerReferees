CREATE DATABASE IF NOT EXISTS soccerdb;

USE soccerdb;

DROP TABLE IF EXISTS referees;

CREATE TABLE referees (
	refereeid int PRIMARY KEY AUTO_INCREMENT ,
    refname varchar(50) UNIQUE NOT NULL,
    age int,
	skillrating int
);

INSERT INTO referees (refereeid, refname, age, skillrating) VALUES 
(1, 'Felix Brych', 37, 90),
(2, 'Ali Banane', 41, 80),
(3, 'Viktor Kassai', 40, 20),
(4, 'Howard Webb', 35,  44),
(5, 'Brian Lavelle', 42,  39),
(6, 'Stephen Chalko', 38, 76);


DROP TABLE IF EXISTS assignments;

CREATE TABLE assignments (
	assignmentid int PRIMARY KEY AUTO_INCREMENT,
    refereeid int NOT NULL,
    gameid int,
    position varchar(45)
);

INSERT INTO assignments (assignmentid, refereeid, gameid, position) VALUES 
(101, 1, 1105, 'Forward'),
(102, 2, 1104, 'Back'),
(103, 3, 1103, 'Middle'),
(104, 4, 1102, 'Middle'),
(105, 5, 1101, 'Back');


DROP TABLE IF EXISTS games;

CREATE TABLE games (
	gameid int PRIMARY KEY AUTO_INCREMENT,
    location varchar(50),
    date_time datetime
);

INSERT INTO games (gameid, location, date_time) VALUES 
(1101, 'Yeagley Field at Armstrong Stadium', '2021-08-12 13:45:00'),
(1102, 'Yeagley Field at Armstrong Stadium', '2021-10-12 15:30:00'),
(1103, 'Kuntz Soccer Stadium', '2020-09-11 20:30:00'),
(1104, 'Woodlawn Field', '2020-11-13 21:00:00'),
(1105, 'Woodlawn Field', '2021-10-09 18:00:00');

ALTER TABLE assignments
ADD COLUMN refstatus enum("Unassigned","Assigned","Tentative","Accepted") 
NOT NULL DEFAULT 'Unassigned';

ALTER TABLE referees
ADD COLUMN refgrade enum("Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10") 
NOT NULL DEFAULT 'Grade 1';