CREATE DATABASE IF NOT EXISTS soccerdb;

USE soccerdb;

DROP TABLE IF EXISTS referees;

CREATE TABLE referees (
	refereeid int PRIMARY KEY AUTO_INCREMENT ,
    name varchar(50) UNIQUE NOT NULL,
    age int,
	grade varchar(30),
	status varchar(45),
	skillrating int
);

INSERT INTO referees (refereeid, name, age, grade, status, skillrating) VALUES 
(1, 'Felix Brych', 37, 'Grade 9', 'Assigned', 90),
(2, 'Ali Banane', 41, 'Grade 8', 'Unassigned', 80),
(3, 'Viktor Kassai', 40, 'Grade 10', 'Tentative', 20),
(4, 'Howard Webb', 35, 'Grade 5', 'Accepted', 44),
(5, 'Brian Lavelle', 42, 'Grade 2', 'Accepted', 39),
(6, 'Stephen Chalko', 38, 'Grade 6', 'Assigned', 76);


DROP TABLE IF EXISTS assignments;

CREATE TABLE assignments (
	assignmentid int PRIMARY KEY AUTO_INCREMENT ,
    refereeid int UNIQUE NOT NULL,
    gameid int
);

INSERT INTO assignments (assignmentid, refereeid, gameid) VALUES 
(101, 1, 1105),
(102, 2, 1104),
(103, 3, 1103),
(104, 4, 1102),
(105, 5, 1101);


DROP TABLE IF EXISTS games;

CREATE TABLE games (
	gameid int PRIMARY KEY AUTO_INCREMENT ,
    location varchar(50),
    date_time varchar(48)
);

INSERT INTO games (gameid, location, date_time) VALUES 
(1101, 'Yeagley Field at Armstrong Stadium', '2021-08-12 13:45:00'),
(1102, 'Yeagley Field at Armstrong Stadium', '2021-10-12 15:30:00'),
(1103, 'Kuntz Soccer Stadium', '2020-09-11 20:30:00'),
(1104, 'Woodlawn Field', '2020-11-13 21:00:00'),
(1105, 'Woodlawn Field', '2021-10-09 18:00:00');