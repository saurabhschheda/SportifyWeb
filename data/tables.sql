-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 29, 2017 at 12:59 AM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Sportify`
--

-- --------------------------------------------------------

--
-- Table structure for table `League`
--

CREATE TABLE `League` (
  `ID` varchar(17) NOT NULL,
  `Name` varchar(16) NOT NULL,
  `Country` varchar(7) NOT NULL,
  `UEFACoefficient` decimal(5,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `League`
--

INSERT INTO `League` (`ID`, `Name`, `Country`, `UEFACoefficient`) VALUES
('sr:tournament:17', 'Premier League', 'England', '14.928'),
('sr:tournament:23', 'Serie A', 'Italy', '14.250'),
('sr:tournament:34', 'Ligue 1', 'France', '14.416'),
('sr:tournament:35', 'Bundesliga', 'Germany', '14.571'),
('sr:tournament:8', 'Primera Division', 'Spain', '20.142');

-- --------------------------------------------------------

--
-- Table structure for table `Match`
--

CREATE TABLE `Match` (
  `ID` varchar(17) NOT NULL,
  `Home` varchar(17) NOT NULL,
  `Away` varchar(17) NOT NULL,
  `League` varchar(17) NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Venue` varchar(17) DEFAULT NULL,
  `HomeGoals` int(11) DEFAULT NULL,
  `AwayGoals` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Player`
--

CREATE TABLE `Player` (
  `ID` varchar(17) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Age` int(11) NOT NULL,
  `Team` varchar(17) NOT NULL,
  `Position` varchar(10) NOT NULL,
  `JerseyNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Team`
--

CREATE TABLE `Team` (
  `ID` varchar(17) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `League` varchar(17) NOT NULL,
  `Position` int(11) NOT NULL,
  `Manager` varchar(30) NOT NULL,
  `Color1` varchar(6) NOT NULL,
  `Color2` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Venue`
--

CREATE TABLE `Venue` (
  `ID` varchar(17) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Latitude` decimal(10,0) NOT NULL,
  `Longitude` decimal(10,0) NOT NULL,
  `City` varchar(15) NOT NULL,
  `Country` varchar(15) NOT NULL,
  `Capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `League`
--
ALTER TABLE `League`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Country` (`Country`);

--
-- Indexes for table `Match`
--
ALTER TABLE `Match`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Player`
--
ALTER TABLE `Player`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Team` (`Team`);

--
-- Indexes for table `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Position` (`Position`),
  ADD UNIQUE KEY `League` (`League`),
  ADD UNIQUE KEY `Position_2` (`Position`);

--
-- Indexes for table `Venue`
--
ALTER TABLE `Venue`
  ADD PRIMARY KEY (`ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Player`
--
ALTER TABLE `Player`
  ADD CONSTRAINT `Player_ibfk_1` FOREIGN KEY (`Team`) REFERENCES `Team` (`ID`);

--
-- Constraints for table `Team`
--
ALTER TABLE `Team`
  ADD CONSTRAINT `Team_ibfk_1` FOREIGN KEY (`League`) REFERENCES `League` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
