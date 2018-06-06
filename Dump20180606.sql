-- MySQL dump 10.13  Distrib 5.7.22, for Win64 (x86_64)
--
-- Host: localhost    Database: studiehuis_dev
-- ------------------------------------------------------
-- Server version	5.7.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(20) NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'boelens','$2b$10$i0My6jZtK60UxI6LGEImK.EfKFnZWsXcstGTicBIRHTAv5d0RQEwO');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clock_in_account`
--

DROP TABLE IF EXISTS `clock_in_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clock_in_account` (
  `clock_in_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`clock_in_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clock_in_account`
--

LOCK TABLES `clock_in_account` WRITE;
/*!40000 ALTER TABLE `clock_in_account` DISABLE KEYS */;
INSERT INTO `clock_in_account` VALUES (1,'studiehuis','$2b$10$2DsMe.vN3Tz9Vs49w0QjlOQXtXEDMBfstYmUSDgf1HMR8IHQK.kOG'),(2,'mediatheek','$2b$10$jYphx/CG5JTL8GQjj17j0.23KwuGxmCcMWc5KSZ7jGUAP0DkHzj3O');
/*!40000 ALTER TABLE `clock_in_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clock_in_sessions`
--

DROP TABLE IF EXISTS `clock_in_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clock_in_sessions` (
  `student_number` int(11) NOT NULL,
  `clock_in_id` int(11) NOT NULL,
  `logged_in_time` datetime NOT NULL,
  `logged_out_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `clock_in_session_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`clock_in_session_id`),
  KEY `clock_in_id` (`clock_in_id`),
  CONSTRAINT `clock_in_sessions_ibfk_1` FOREIGN KEY (`clock_in_id`) REFERENCES `clock_in_account` (`clock_in_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clock_in_sessions`
--

LOCK TABLES `clock_in_sessions` WRITE;
/*!40000 ALTER TABLE `clock_in_sessions` DISABLE KEYS */;
INSERT INTO `clock_in_sessions` VALUES (129329,1,'2018-06-04 17:04:37','2018-06-05 19:11:11',38),(129000,1,'2018-06-06 17:20:06','2018-06-06 18:37:00',39),(129329,1,'2018-06-06 17:19:58','2018-06-06 18:37:00',40),(130666,2,'2018-06-06 17:51:25','2018-06-06 18:37:00',41);
/*!40000 ALTER TABLE `clock_in_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currently_logged_in`
--

DROP TABLE IF EXISTS `currently_logged_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currently_logged_in` (
  `student_number` int(11) NOT NULL,
  `log_in_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `clock_in_id` int(11) NOT NULL,
  PRIMARY KEY (`student_number`),
  KEY `clock_in_id` (`clock_in_id`),
  CONSTRAINT `currently_logged_in_ibfk_1` FOREIGN KEY (`clock_in_id`) REFERENCES `clock_in_account` (`clock_in_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currently_logged_in`
--

LOCK TABLES `currently_logged_in` WRITE;
/*!40000 ALTER TABLE `currently_logged_in` DISABLE KEYS */;
/*!40000 ALTER TABLE `currently_logged_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor`
--

DROP TABLE IF EXISTS `mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mentor` (
  `mentor_id` int(11) NOT NULL AUTO_INCREMENT,
  `front_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`mentor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
INSERT INTO `mentor` VALUES (1,'j','Ottens','$2b$10$koU3nZQa6QDWK3CY5vz2vOl5aS4jWZq0SAittlovmFKHVBT76//0S'),(2,'E','Doelman','$2b$10$HMLgm3X/gXqnQelmYEhtTueJ7V/3kg347XIljego24wJffOfSxcoe');
/*!40000 ALTER TABLE `mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor_class`
--

DROP TABLE IF EXISTS `mentor_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mentor_class` (
  `mentor_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `mentor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mentor_class_id`),
  KEY `mentor_id` (`mentor_id`),
  CONSTRAINT `mentor_class_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `mentor` (`mentor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor_class`
--

LOCK TABLES `mentor_class` WRITE;
/*!40000 ALTER TABLE `mentor_class` DISABLE KEYS */;
INSERT INTO `mentor_class` VALUES (1,'VW5C',1),(2,'VW5B',2);
/*!40000 ALTER TABLE `mentor_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `student_number` int(11) NOT NULL,
  `weekly_hours` int(11) NOT NULL DEFAULT '0',
  `made_minutes` bigint(20) NOT NULL DEFAULT '0',
  `should_hours` int(11) NOT NULL DEFAULT '0',
  `hash` varchar(100) NOT NULL,
  `mentor_class_id` int(11) NOT NULL DEFAULT '0',
  `front_name` varchar(20) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  PRIMARY KEY (`student_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (129000,2,45,0,'$2b$10$vesDLRmgnEd/VBOO4oTckujhdCktHYQOAUXDrJeHh7EyVqQJ9u/TK',2,'jesper','benus'),(129329,3,90,0,'$2b$10$yGleT5wltiTYFRZaMbGEWuA08EwZ5Bw.vZ7tfBcWVTj9Ab8xpN/Le',1,'jelte','boelens'),(129999,3,0,0,'$2b$10$bFul.bmNsXqVtrMqBNtqTOmWa3oZwDPEP/aemiJ8sNonrKpzkJ3WC',2,'Stan','Berends'),(130666,5,45,0,'$2b$10$vesDLRmgnEd/VBOO4oTckujhdCktHYQOAUXDrJeHh7EyVqQJ9u/TK',1,'siebren','boelens');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-06 18:39:37
