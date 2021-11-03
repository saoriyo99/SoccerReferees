CREATE DATABASE IF NOT EXISTS soccerdb;

USE soccerdb;

DROP TABLE IF EXISTS referees;

CREATE TABLE referees (
	refereeid int PRIMARY KEY AUTO_INCREMENT ,
    refname varchar(50) UNIQUE NOT NULL,
    age int,
	refgrade varchar(30),
	skillrating int
);

INSERT INTO referees (refereeid, refname, age, refgrade, skillrating) VALUES 
(1, 'Felix Brych', 37, 'Grade 9', 90),
(2, 'Ali Banane', 41, 'Grade 8', 80),
(3, 'Viktor Kassai', 40, 'Grade 10', 20),
(4, 'Howard Webb', 35, 'Grade 5', 44),
(5, 'Brian Lavelle', 42, 'Grade 2', 39),
(6, 'Stephen Chalko', 38, 'Grade 6', 76);


DROP TABLE IF EXISTS assignments;

CREATE TABLE assignments (
	assignmentid int PRIMARY KEY AUTO_INCREMENT,
    refereeid int UNIQUE NOT NULL,
    gameid int,
    position varchar(45),
	refstatus varchar(45)
);

INSERT INTO assignments (assignmentid, refereeid, gameid, position, refstatus) VALUES 
(101, 1, 1105, "Forward", 'Assigned'),
(102, 2, 1104, "Back", 'Unassigned'),
(103, 3, 1103, "Middle", 'Tentative'),
(104, 4, 1102, "Middle", 'Accepted'),
(105, 5, 1101, "Back", 'Accepted');


DROP TABLE IF EXISTS games;

CREATE TABLE games (
	gameid int PRIMARY KEY AUTO_INCREMENT ,
    location varchar(50),
    date_time datetime
);

INSERT INTO games (gameid, location, date_time) VALUES 
(1101, 'Yeagley Field at Armstrong Stadium', '2021-08-12 13:45:00'),
(1102, 'Yeagley Field at Armstrong Stadium', '2021-10-12 15:30:00'),
(1103, 'Kuntz Soccer Stadium', '2020-09-11 20:30:00'),
(1104, 'Woodlawn Field', '2020-11-13 21:00:00'),
(1105, 'Woodlawn Field', '2021-10-09 18:00:00');