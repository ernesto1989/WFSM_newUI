-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: wfms
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `a01_nodes`
--

DROP TABLE IF EXISTS `a01_nodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `a01_nodes` (
  `scenario_id` varchar(20) NOT NULL,
  `id` int NOT NULL,
  `node_id` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `max_capacity` decimal(18,2) DEFAULT NULL,
  `min_capacity` decimal(18,2) DEFAULT NULL,
  `current_vol` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a01_nodes`
--

/*!40000 ALTER TABLE `a01_nodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a02_flows`
--

DROP TABLE IF EXISTS `a02_flows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `a02_flows` (
  `scenario_id` varchar(20) NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a02_flows`
--

/*!40000 ALTER TABLE `a02_flows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a03_time_to_reach_limit`
--

DROP TABLE IF EXISTS `a03_time_to_reach_limit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `a03_time_to_reach_limit` (
  `scenario_id` varchar(20) NOT NULL,
  `node_id` int DEFAULT NULL,
  `max_vol` decimal(18,2) DEFAULT NULL,
  `min_vol` decimal(18,2) DEFAULT NULL,
  `current_vol` decimal(18,2) DEFAULT NULL,
  `incoming_flow` decimal(18,2) DEFAULT NULL,
  `outcoming_flow` decimal(18,2) DEFAULT NULL,
  `time_to_reach_limit` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a03_time_to_reach_limit`
--

/*!40000 ALTER TABLE `a03_time_to_reach_limit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s01_solution_detail`
--

DROP TABLE IF EXISTS `s01_solution_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `s01_solution_detail` (
  `scenario_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `No` int DEFAULT NULL,
  `E` decimal(18,2) DEFAULT NULL,
  `S` decimal(18,2) DEFAULT NULL,
  `a` decimal(18,2) DEFAULT NULL,
  `b` decimal(18,2) DEFAULT NULL,
  `R+` decimal(18,2) DEFAULT NULL,
  `R-` decimal(18,2) DEFAULT NULL,
  `NMin` decimal(18,2) DEFAULT NULL,
  `NMax` decimal(18,2) DEFAULT NULL,
  `NActual` decimal(18,2) DEFAULT NULL,
  `T` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s01_solution_detail`
--

/*!40000 ALTER TABLE `s01_solution_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `s02_proposed_flows`
--

DROP TABLE IF EXISTS `s02_proposed_flows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `s02_proposed_flows` (
  `scenario_id` varchar(20) NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL,
  `pflow` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `s02_proposed_flows`
--

/*!40000 ALTER TABLE `s02_proposed_flows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `z01_scenarios`
--

DROP TABLE IF EXISTS `z01_scenarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `z01_scenarios` (
  `scenario_id` varchar(20) NOT NULL,
  `cdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `capacity_units` varchar(5) DEFAULT 'M3',
  `time_units` varchar(5) DEFAULT 'Hrs',
  `origin_id` varchar(20) DEFAULT NULL,
  UNIQUE KEY `Scenario_un` (`scenario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `z01_scenarios`
--

/*!40000 ALTER TABLE `z01_scenarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'wfms'
--
/*!50003 DROP PROCEDURE IF EXISTS `delete_scenario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `delete_scenario`(in scenarioId varchar(30))
begin

	delete from wfms.a01_nodes where scenario_id = scenarioId;

	delete from wfms.a02_flows where scenario_id = scenarioId;

	delete from wfms.a03_time_to_reach_limit  where scenario_id = scenarioId;

	delete from wfms.s01_solution_detail where scenario_id = scenarioId;

	delete from wfms.s02_proposed_flows where scenario_id = scenarioId;

	delete from wfms.z01_scenarios where scenario_id = scenarioId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
