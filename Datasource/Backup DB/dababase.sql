SET SQL_REQUIRE_PRIMARY_KEY = 0;

CREATE TABLE `a01_nodes` (
  `scenario_id` varchar(20) NOT NULL,
  `id` int NOT NULL,
  `node_id` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `max_capacity` decimal(18,2) DEFAULT NULL,
  `min_capacity` decimal(18,2) DEFAULT NULL,
  `current_vol` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `a01_nodes` VALUES ('ESC-BASE',1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00),('ESC-BASE',2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00),('ESC-BASE',3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00),('ESC-BASE',4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00),('ESC-BASE',5,'N05','Node #05 - For testing',100.00,80.00,100.00),('ESC-BASE',6,'N06','Node #06 - For testing',120.00,100.00,110.00);



CREATE TABLE `a02_flows` (
  `scenario_id` varchar(20) NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `a02_flows` VALUES ('',6,3,3.00,2,'variable',3.00,1.00),('ESC-BASE',0,1,12.00,1,'fijo',0.00,0.00),('ESC-BASE',0,2,15.00,1,'fijo',0.00,0.00),('ESC-BASE',1,3,12.00,2,'variable',15.00,10.00),('ESC-BASE',2,3,15.00,2,'variable',18.00,12.00),('ESC-BASE',3,4,10.00,2,'variable',20.00,10.00),('ESC-BASE',3,5,19.00,2,'variable',20.00,10.00),('ESC-BASE',4,3,1.00,2,'variable',3.00,1.00),('ESC-BASE',4,6,9.00,2,'variable',20.00,8.00),('ESC-BASE',5,6,19.00,2,'variable',20.00,4.00),('ESC-BASE',6,3,1.00,2,'variable',3.00,1.00),('ESC-BASE',6,0,27.00,1,'fijo',0.00,0.00);


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

INSERT INTO `a03_time_to_reach_limit` VALUES ('ESC-BASE',1,100.00,70.00,80.00,12.00,12.00,-1.00),('ESC-BASE',2,150.00,120.00,140.00,15.00,15.00,-1.00),('ESC-BASE',3,130.00,100.00,120.00,29.00,29.00,-1.00),('ESC-BASE',4,120.00,90.00,100.00,10.00,10.00,-1.00),('ESC-BASE',5,100.00,80.00,100.00,19.00,19.00,-1.00),('ESC-BASE',6,120.00,100.00,110.00,28.00,28.00,-1.00);


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


INSERT INTO `s01_solution_detail` VALUES ('ESC-BASE',1,12.00,12.00,0.00,0.00,0.00,0.00,70.00,100.00,80.00,'-1'),('ESC-BASE',2,15.00,15.00,0.00,0.00,0.00,0.00,120.00,150.00,140.00,'-1'),('ESC-BASE',3,29.00,29.00,0.00,0.00,0.00,0.00,100.00,130.00,120.00,'-1'),('ESC-BASE',4,10.00,10.00,0.00,0.00,0.00,0.00,90.00,120.00,100.00,'-1'),('ESC-BASE',5,19.00,19.00,0.00,1.00,0.00,0.00,80.00,100.00,100.00,'-1'),('ESC-BASE',6,28.00,28.00,0.00,0.00,0.00,0.00,100.00,120.00,110.00,'-1');


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


INSERT INTO `s02_proposed_flows` VALUES ('ESC-BASE',1,3,12.00,'variable',15.00,10.00,12.00),('ESC-BASE',2,3,15.00,'variable',18.00,12.00,15.00),('ESC-BASE',3,4,10.00,'variable',20.00,10.00,10.00),('ESC-BASE',3,5,19.00,'variable',20.00,10.00,19.00),('ESC-BASE',4,3,1.00,'variable',3.00,1.00,1.00),('ESC-BASE',4,6,9.00,'variable',20.00,8.00,9.00),('ESC-BASE',5,6,19.00,'variable',20.00,4.00,19.00),('ESC-BASE',6,3,1.00,'variable',3.00,1.00,1.00);



CREATE TABLE `x01_flow_types` (
  `id` int NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `model_name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `x01_flow_types` VALUES (1,'fixed','fijo'),(2,'variable','variable');


CREATE TABLE `x02_capacity_units` (
  `id` int NOT NULL,
  `unit_name` varchar(100) DEFAULT NULL,
  `unit_type` enum('capacity','time') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `x02_capacity_units` VALUES (1,'M3','capacity'),(2,'LTS','capacity'),(3,'DAYS','time'),(4,'HRS','time');


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

INSERT INTO `z01_scenarios` VALUES ('ESC-BASE','2024-07-15 13:21:23','Base Scenario for testing. ',2,'M3','DAYS',NULL);


CREATE PROCEDURE `delete_scenario`(in scenarioId varchar(30))
begin
	delete from a01_nodes where scenario_id = scenarioId;
	delete from a02_flows where scenario_id = scenarioId;
	delete from a03_time_to_reach_limit  where scenario_id = scenarioId;
	delete from s01_solution_detail where scenario_id = scenarioId;
	delete from s02_proposed_flows where scenario_id = scenarioId;
	delete from z01_scenarios where scenario_id = scenarioId;
END