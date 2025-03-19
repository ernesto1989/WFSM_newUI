SET SQL_REQUIRE_PRIMARY_KEY = 0;

-- wfms.a01_nodes definition

CREATE TABLE a01_nodes (
  scenario_id varchar(20) NOT NULL,
  region_id int,
  id int DEFAULT NULL,
  node_id varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  description varchar(100) DEFAULT NULL,
  max_capacity decimal(18,2) DEFAULT NULL,
  min_capacity decimal(18,2) DEFAULT NULL,
  current_vol decimal(18,2) DEFAULT NULL,
  Lat varchar(100) DEFAULT NULL,
  `Long` varchar(100) DEFAULT NULL
);

-- wfms.a02_flows definition

CREATE TABLE `a02_flows` (
  `scenario_id` varchar(20) NOT NULL,
  `region_id` int NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL
);


-- wfms.a03_time_to_reach_limit definition

CREATE TABLE `a03_time_to_reach_limit` (
  `scenario_id` varchar(20) NOT NULL,
  `region_id` int NOT NULL,
  `node_id` int DEFAULT NULL,
  `max_vol` decimal(18,2) DEFAULT NULL,
  `min_vol` decimal(18,2) DEFAULT NULL,
  `current_vol` decimal(18,2) DEFAULT NULL,
  `incoming_flow` decimal(18,2) DEFAULT NULL,
  `outcoming_flow` decimal(18,2) DEFAULT NULL,
  `time_to_reach_limit` decimal(18,2) DEFAULT NULL
);

-- wfms.s01_solution_detail definition

CREATE TABLE `s01_solution_detail` (
  `scenario_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `region_id` int NOT NULL,
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
  `T` decimal(18,2) DEFAULT NULL
);


-- wfms.s02_proposed_flows definition

CREATE TABLE `s02_proposed_flows` (
  `scenario_id` varchar(20) NOT NULL,
  `region_id` int NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL,
  `pflow` decimal(18,2) DEFAULT NULL
);

-- wfms.u01_regions definition

CREATE TABLE `u01_regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- wfms.u02_roles definition

CREATE TABLE `u02_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- wfms.u03_users definition

CREATE TABLE `u03_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `unsafe_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- wfms.x01_flow_types definition

CREATE TABLE `x01_flow_types` (
  `id` int NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `model_name` varchar(10) DEFAULT NULL
);


-- wfms.x02_capacity_units definition

CREATE TABLE `x02_capacity_units` (
  `id` int NOT NULL,
  `unit_name` varchar(100) DEFAULT NULL,
  `unit_type` enum('capacity','time') DEFAULT NULL
);


-- wfms.z01_scenarios definition

CREATE TABLE `z01_scenarios` (
  `scenario_id` varchar(20) NOT NULL,
  `region_id` int NOT NULL,
  `cdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `capacity_units` varchar(5) DEFAULT 'M3',
  `time_units` varchar(5) DEFAULT 'Hrs',
  `origin_id` varchar(20) DEFAULT NULL,
  `recalc_trl` tinyint DEFAULT '1',
  `recalc_solution` tinyint DEFAULT '1',
  UNIQUE KEY `Scenario_un` (`scenario_id`,`region_id`)
);

CREATE TABLE `i01_regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_id` varchar(5) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `i02_nodes` (
  `region_id` int DEFAULT NULL,
  `id` int DEFAULT NULL,
  `node_id` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `max_capacity` decimal(18,2) DEFAULT NULL,
  `min_capacity` decimal(18,2) DEFAULT NULL,
  `current_vol` decimal(18,2) DEFAULT NULL,
  `Lat` varchar(100) DEFAULT NULL,
  `Long` varchar(100) DEFAULT NULL
);

CREATE TABLE `i03_flows` (
  `region_id` int NOT NULL,
  `origin` int DEFAULT NULL,
  `destiny` int DEFAULT NULL,
  `current_flow` decimal(18,2) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `fmax` decimal(18,2) DEFAULT NULL,
  `fmin` decimal(18,2) DEFAULT NULL
);

INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('BASE_CONDITION',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('BASE_CONDITION',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL),
	 ('BASE_CONDITION',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('BASE_CONDITION',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL),
	 ('BASE_CONDITION',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('BASE_CONDITION',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL),
	 ('Scenario_01',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('Scenario_01',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL),
	 ('Scenario_01',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('Scenario_01',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL);
INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('Scenario_01',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('Scenario_01',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL),
	 ('Scenario_02',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('Scenario_02',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL),
	 ('Scenario_02',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('Scenario_02',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL),
	 ('Scenario_02',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('Scenario_02',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL),
	 ('Scenario_03',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('Scenario_03',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL);
INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('Scenario_03',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('Scenario_03',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL),
	 ('Scenario_03',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('Scenario_03',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL),
	 ('Scenario_04',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('Scenario_04',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL),
	 ('Scenario_04',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('Scenario_04',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL),
	 ('Scenario_04',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('Scenario_04',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL);
INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('BASE_CONDITION',1,1,'Salt_River','Principal reservoir',1500000.00,300000.00,1200000.00,'33.4678','-111.5153'),
	 ('BASE_CONDITION',1,2,'Lake_Mead','reservoir',32236000.00,12000000.00,23500000.00,'36.1332','-114.3786'),
	 ('BASE_CONDITION',1,3,'CAP','Central Arizona Project - Distribution Center',2500000.00,500000.00,2100000.00,'33.4333','-112.0083'),
	 ('BASE_CONDITION',1,4,'Verde_River','Superficial Water catchment',700000.00,100000.00,600000.00,'34.3456','-111.7107'),
	 ('BASE_CONDITION',1,5,'Tucson_Basin','Aquifer',2000000.00,500000.00,1600000.00,'32.2217','-110.9265'),
	 ('BASE_CONDITION',1,6,'Phoenix_AMA','Principal Urban Distribution and Catching',1200000.00,400000.00,900000.00,'33.4484','-112.074'),
	 ('BASE_CONDITION',2,1,'Lake_Livingston','Major reservoir north of Houston',2000000.00,500000.00,1700000.00,'30.7069','-95.0545'),
	 ('BASE_CONDITION',2,2,'Brazos_River','Major river flowing through Central Texas',13000000.00,4000000.00,10500000.00,'31.6728','-97.2076'),
	 ('BASE_CONDITION',2,3,'Trinity_River','Primary water source for Dallas',15000000.00,3500000.00,12000000.00,'32.7732','-97.3517'),
	 ('BASE_CONDITION',2,4,'Edwards_Aquifer','Major underground aquifer for San Antonio',8000000.00,2000000.00,6500000.00,'29.4241','-98.4936');
INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('BASE_CONDITION',2,5,'Lake_Texoma','Large reservoir on the Texas-Oklahoma border',5000000.00,1000000.00,4300000.00,'33.8987','-96.5783'),
	 ('BASE_CONDITION',2,6,'Ogallala_Aquifer','Massive aquifer supplying Lubbock and the Panhandle',15000000.00,3500000.00,12000000.00,'35.8601','-101.9737'),
	 ('BASE_CONDITION',2,7,'Amistad_Dam','International dam on the Rio Grande',3000000.00,800000.00,2500000.00,'29.4516','-101.0516'),
	 ('BASE_CONDITION',2,8,'Falcon_Dam','Key dam on the Rio Grande for water storage',4000000.00,1000000.00,3500000.00,'26.5733','-99.1292'),
	 ('BASE_CONDITION',2,9,'Guadalupe_River','Supplies water to San Antonio',9000000.00,2200000.00,7500000.00,'29.444','-98.6578'),
	 ('BASE_CONDITION',2,10,'Lake_Austin','Critical for municipal and recreational use in Austin',1800000.00,400000.00,1400000.00,'30.2972','-97.8033'),
	 ('BASE_CONDITION',2,11,'Houston','Uses Lake Livingston, extensive municipal and industrial water needs',11000000.00,5500000.00,9000000.00,'29.7604','-95.3698'),
	 ('BASE_CONDITION',2,12,'Waco','Brazos River water for residential, industrial sectors',3200000.00,1600000.00,2700000.00,'31.5493','-97.1467'),
	 ('BASE_CONDITION',2,13,'Dallas','Reliant on Trinity River for diverse urban needs',9000000.00,4500000.00,7500000.00,'32.7767','-96.797'),
	 ('BASE_CONDITION',2,14,'San_Antonio','Edwards Aquifer main water source for city',7500000.00,3750000.00,6250000.00,'29.4241','-98.4936');
INSERT INTO wfms.a01_nodes (scenario_id,region_id,id,node_id,description,max_capacity,min_capacity,current_vol,Lat,`Long`) VALUES
	 ('BASE_CONDITION',2,15,'Plano','Lake Texoma supports suburban growth',2800000.00,1400000.00,2300000.00,'33.0198','-96.6989'),
	 ('BASE_CONDITION',2,16,'Lubbock','Ogallala Aquifer supplies extensive agricultural and urban use',6000000.00,3000000.00,5000000.00,'33.5779','-101.8552'),
	 ('BASE_CONDITION',2,17,'Austin','Sourced from Lake Austin for municipal and leisure uses',4500000.00,2250000.00,3750000.00,'30.2672','-97.7431'),
	 ('Scenario_05',0,1,'N01','Node #01 - Testing Scenario',100.00,70.00,80.00,NULL,NULL),
	 ('Scenario_05',0,2,'N02','Node #02 - Testing Scenario',150.00,120.00,140.00,NULL,NULL),
	 ('Scenario_05',0,3,'N03','Node #03 - Testing Scenario',130.00,100.00,120.00,NULL,NULL),
	 ('Scenario_05',0,4,'N04','Node #04 - Testing Scenario',120.00,90.00,100.00,NULL,NULL),
	 ('Scenario_05',0,5,'N05','Node #05 - For testing',100.00,80.00,100.00,NULL,NULL),
	 ('Scenario_05',0,6,'N06','Node #06 - For testing',120.00,100.00,110.00,NULL,NULL);

	
	
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('BASE_CONDITION',0,0,1,12.00,1,0.00,0.00),
	 ('BASE_CONDITION',0,0,2,15.00,1,0.00,0.00),
	 ('BASE_CONDITION',0,1,3,12.00,2,15.00,10.00),
	 ('BASE_CONDITION',0,2,3,15.00,2,18.00,12.00),
	 ('BASE_CONDITION',0,3,4,10.00,2,20.00,10.00),
	 ('BASE_CONDITION',0,3,5,19.00,2,20.00,10.00),
	 ('BASE_CONDITION',0,4,3,1.00,2,3.00,1.00),
	 ('BASE_CONDITION',0,4,6,9.00,2,20.00,8.00),
	 ('BASE_CONDITION',0,5,6,19.00,2,20.00,4.00),
	 ('BASE_CONDITION',0,6,3,1.00,2,3.00,1.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('BASE_CONDITION',0,6,0,27.00,1,0.00,0.00),
	 ('Scenario_01',0,0,1,17.00,1,0.00,0.00),
	 ('Scenario_01',0,0,2,16.00,1,0.00,0.00),
	 ('Scenario_01',0,1,3,12.00,2,15.00,10.00),
	 ('Scenario_01',0,2,3,15.00,2,18.00,12.00),
	 ('Scenario_01',0,3,4,10.00,2,20.00,10.00),
	 ('Scenario_01',0,3,5,19.00,2,20.00,10.00),
	 ('Scenario_01',0,4,3,1.00,2,3.00,1.00),
	 ('Scenario_01',0,4,6,9.00,2,20.00,8.00),
	 ('Scenario_01',0,5,6,19.00,2,20.00,4.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('Scenario_01',0,6,3,1.00,2,3.00,1.00),
	 ('Scenario_01',0,6,0,27.00,1,0.00,0.00),
	 ('Scenario_02',0,0,1,11.00,1,0.00,0.00),
	 ('Scenario_02',0,0,2,13.00,1,0.00,0.00),
	 ('Scenario_02',0,1,3,12.00,2,15.00,10.00),
	 ('Scenario_02',0,2,3,15.00,2,18.00,12.00),
	 ('Scenario_02',0,3,4,10.00,2,20.00,10.00),
	 ('Scenario_02',0,3,5,19.00,2,20.00,10.00),
	 ('Scenario_02',0,4,3,1.00,2,3.00,1.00),
	 ('Scenario_02',0,4,6,9.00,2,20.00,8.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('Scenario_02',0,5,6,19.00,2,20.00,4.00),
	 ('Scenario_02',0,6,3,1.00,2,3.00,1.00),
	 ('Scenario_02',0,6,0,32.00,1,0.00,0.00),
	 ('Scenario_03',0,0,1,12.00,1,0.00,0.00),
	 ('Scenario_03',0,0,2,15.00,1,0.00,0.00),
	 ('Scenario_03',0,1,3,15.00,2,15.00,10.00),
	 ('Scenario_03',0,2,3,15.00,2,18.00,12.00),
	 ('Scenario_03',0,3,4,10.00,2,20.00,10.00),
	 ('Scenario_03',0,3,5,19.00,2,20.00,10.00),
	 ('Scenario_03',0,4,3,1.00,2,3.00,1.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('Scenario_03',0,4,6,9.00,2,20.00,8.00),
	 ('Scenario_03',0,5,6,19.00,2,20.00,4.00),
	 ('Scenario_03',0,6,3,1.00,2,3.00,1.00),
	 ('Scenario_03',0,6,0,27.00,1,0.00,0.00),
	 ('Scenario_04',0,0,1,12.00,1,0.00,0.00),
	 ('Scenario_04',0,0,2,15.00,1,0.00,0.00),
	 ('Scenario_04',0,1,3,15.00,2,15.00,10.00),
	 ('Scenario_04',0,2,3,17.00,2,18.00,12.00),
	 ('Scenario_04',0,3,4,10.00,2,20.00,10.00),
	 ('Scenario_04',0,3,5,19.00,2,20.00,10.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('Scenario_04',0,4,3,1.00,2,3.00,1.00),
	 ('Scenario_04',0,4,6,9.00,2,20.00,8.00),
	 ('Scenario_04',0,5,6,19.00,2,20.00,4.00),
	 ('Scenario_04',0,6,3,1.00,2,3.00,1.00),
	 ('Scenario_04',0,6,0,27.00,1,0.00,0.00),
	 ('BASE_CONDITION',1,0,4,3500.00,1,0.00,0.00),
	 ('BASE_CONDITION',1,4,6,7500.00,2,10000.00,5000.00),
	 ('BASE_CONDITION',1,1,6,15000.00,2,20000.00,10000.00),
	 ('BASE_CONDITION',1,2,3,30000.00,2,40000.00,25000.00),
	 ('BASE_CONDITION',1,3,5,10500.00,2,12000.00,8000.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('BASE_CONDITION',1,6,0,6000.00,1,0.00,0.00),
	 ('BASE_CONDITION',1,5,0,5000.00,1,0.00,0.00),
	 ('BASE_CONDITION',1,5,0,2000.00,1,0.00,0.00),
	 ('Scenario_05',0,0,1,12.00,1,0.00,0.00),
	 ('Scenario_05',0,0,2,15.00,1,0.00,0.00),
	 ('Scenario_05',0,1,3,12.00,2,15.00,10.00),
	 ('Scenario_05',0,2,3,15.00,2,18.00,12.00),
	 ('Scenario_05',0,3,4,10.00,2,20.00,10.00),
	 ('Scenario_05',0,3,5,19.00,2,20.00,10.00),
	 ('Scenario_05',0,4,3,1.00,2,3.00,1.00);
INSERT INTO wfms.a02_flows (scenario_id,region_id,origin,destiny,current_flow,type_id,fmax,fmin) VALUES
	 ('Scenario_05',0,4,6,9.00,2,20.00,8.00),
	 ('Scenario_05',0,5,6,19.00,2,20.00,4.00),
	 ('Scenario_05',0,6,3,1.00,2,3.00,1.00),
	 ('Scenario_05',0,6,0,27.00,1,0.00,0.00);




INSERT INTO wfms.a03_time_to_reach_limit (scenario_id,region_id,node_id,max_vol,min_vol,current_vol,incoming_flow,outcoming_flow,time_to_reach_limit) VALUES
	 ('BASE_CONDITION',0,1,100.00,70.00,80.00,12.00,12.00,-1.00),
	 ('BASE_CONDITION',0,2,150.00,120.00,140.00,15.00,15.00,-1.00),
	 ('BASE_CONDITION',0,3,130.00,100.00,120.00,29.00,29.00,-1.00),
	 ('BASE_CONDITION',0,4,120.00,90.00,100.00,10.00,10.00,-1.00),
	 ('BASE_CONDITION',0,5,100.00,80.00,100.00,19.00,19.00,-1.00),
	 ('BASE_CONDITION',0,6,120.00,100.00,110.00,28.00,28.00,-1.00),
	 ('Scenario_01',0,1,100.00,70.00,80.00,17.00,12.00,4.00),
	 ('Scenario_01',0,2,150.00,120.00,140.00,16.00,15.00,10.00),
	 ('Scenario_01',0,3,130.00,100.00,120.00,29.00,29.00,-1.00),
	 ('Scenario_01',0,4,120.00,90.00,100.00,10.00,10.00,-1.00);
INSERT INTO wfms.a03_time_to_reach_limit (scenario_id,region_id,node_id,max_vol,min_vol,current_vol,incoming_flow,outcoming_flow,time_to_reach_limit) VALUES
	 ('Scenario_01',0,5,100.00,80.00,100.00,19.00,19.00,-1.00),
	 ('Scenario_01',0,6,120.00,100.00,110.00,28.00,28.00,-1.00),
	 ('Scenario_02',0,1,100.00,70.00,80.00,11.00,12.00,10.00),
	 ('Scenario_02',0,2,150.00,120.00,140.00,13.00,15.00,10.00),
	 ('Scenario_02',0,3,130.00,100.00,120.00,29.00,29.00,-1.00),
	 ('Scenario_02',0,4,120.00,90.00,100.00,10.00,10.00,-1.00),
	 ('Scenario_02',0,5,100.00,80.00,100.00,19.00,19.00,-1.00),
	 ('Scenario_02',0,6,120.00,100.00,110.00,28.00,33.00,2.00),
	 ('Scenario_03',0,1,100.00,70.00,80.00,12.00,15.00,3.33),
	 ('Scenario_03',0,2,150.00,120.00,140.00,15.00,15.00,-1.00);
INSERT INTO wfms.a03_time_to_reach_limit (scenario_id,region_id,node_id,max_vol,min_vol,current_vol,incoming_flow,outcoming_flow,time_to_reach_limit) VALUES
	 ('Scenario_03',0,3,130.00,100.00,120.00,32.00,29.00,3.33),
	 ('Scenario_03',0,4,120.00,90.00,100.00,10.00,10.00,-1.00),
	 ('Scenario_03',0,5,100.00,80.00,100.00,19.00,19.00,-1.00),
	 ('Scenario_03',0,6,120.00,100.00,110.00,28.00,28.00,-1.00),
	 ('Scenario_04',0,1,100.00,70.00,80.00,12.00,15.00,3.33),
	 ('Scenario_04',0,2,150.00,120.00,140.00,15.00,17.00,10.00),
	 ('Scenario_04',0,3,130.00,100.00,120.00,34.00,29.00,2.00),
	 ('Scenario_04',0,4,120.00,90.00,100.00,10.00,10.00,-1.00),
	 ('Scenario_04',0,5,100.00,80.00,100.00,19.00,19.00,-1.00),
	 ('Scenario_04',0,6,120.00,100.00,110.00,28.00,28.00,-1.00);
INSERT INTO wfms.a03_time_to_reach_limit (scenario_id,region_id,node_id,max_vol,min_vol,current_vol,incoming_flow,outcoming_flow,time_to_reach_limit) VALUES
	 ('BASE_CONDITION',1,1,1500000.00,300000.00,1200000.00,NULL,15000.00,60.00),
	 ('BASE_CONDITION',1,2,32236000.00,12000000.00,23500000.00,NULL,30000.00,383.33),
	 ('BASE_CONDITION',1,3,2500000.00,500000.00,2100000.00,30000.00,10500.00,20.51),
	 ('BASE_CONDITION',1,4,700000.00,100000.00,600000.00,3500.00,7500.00,125.00),
	 ('BASE_CONDITION',1,5,2000000.00,500000.00,1600000.00,10500.00,7000.00,114.29),
	 ('BASE_CONDITION',1,6,1200000.00,400000.00,900000.00,22500.00,6000.00,18.18);


INSERT INTO wfms.s01_solution_detail (scenario_id,region_id,`No`,E,S,a,b,`R+`,`R-`,NMin,NMax,NActual,T) VALUES
	 ('BASE_CONDITION',0,1,12.00,12.00,0.00,0.00,0.00,0.00,70.00,100.00,80.00,'-1'),
	 ('BASE_CONDITION',0,2,15.00,15.00,0.00,0.00,0.00,0.00,120.00,150.00,140.00,'-1'),
	 ('BASE_CONDITION',0,3,29.00,29.00,0.00,0.00,0.00,0.00,100.00,130.00,120.00,'-1'),
	 ('BASE_CONDITION',0,4,10.00,10.00,0.00,0.00,0.00,0.00,90.00,120.00,100.00,'-1'),
	 ('BASE_CONDITION',0,5,19.00,19.00,0.00,1.00,0.00,0.00,80.00,100.00,100.00,'-1'),
	 ('BASE_CONDITION',0,6,28.00,28.00,0.00,0.00,0.00,0.00,100.00,120.00,110.00,'-1'),
	 ('Scenario_01',0,1,17.00,15.00,1.00,0.00,0.10,0.00,70.00,100.00,80.00,'10'),
	 ('Scenario_01',0,2,16.00,15.00,1.00,0.00,0.10,0.00,120.00,150.00,140.00,'10'),
	 ('Scenario_01',0,3,32.00,32.00,0.00,0.00,0.00,0.00,100.00,130.00,120.00,'-1'),
	 ('Scenario_01',0,4,12.00,10.00,1.00,0.00,0.10,0.00,90.00,120.00,100.00,'10');
INSERT INTO wfms.s01_solution_detail (scenario_id,region_id,`No`,E,S,a,b,`R+`,`R-`,NMin,NMax,NActual,T) VALUES
	 ('Scenario_01',0,5,20.00,20.00,0.00,1.00,0.00,0.10,80.00,100.00,100.00,'-1'),
	 ('Scenario_01',0,6,29.00,28.00,1.00,0.00,0.10,0.00,100.00,120.00,110.00,'10'),
	 ('Scenario_02',0,1,11.00,11.89,0.00,1.00,0.00,0.09,70.00,100.00,80.00,'11.249999999999995'),
	 ('Scenario_02',0,2,13.00,14.78,0.00,1.00,0.00,0.09,120.00,150.00,140.00,'11.249999999999995'),
	 ('Scenario_02',0,3,28.67,30.44,0.00,1.00,0.00,0.09,100.00,130.00,120.00,'11.250000000000018'),
	 ('Scenario_02',0,4,12.22,13.11,0.00,1.00,0.00,0.09,90.00,120.00,100.00,'11.249999999999995'),
	 ('Scenario_02',0,5,18.22,20.00,0.00,1.00,0.00,0.09,80.00,100.00,100.00,'11.249999999999995'),
	 ('Scenario_02',0,6,32.11,33.00,0.00,1.00,0.00,0.09,100.00,120.00,110.00,'11.25000000000004'),
	 ('Scenario_03',0,1,12.00,12.00,0.00,0.00,0.00,0.00,70.00,100.00,80.00,'-1'),
	 ('Scenario_03',0,2,15.00,15.00,0.00,0.00,0.00,0.00,120.00,150.00,140.00,'-1');
INSERT INTO wfms.s01_solution_detail (scenario_id,region_id,`No`,E,S,a,b,`R+`,`R-`,NMin,NMax,NActual,T) VALUES
	 ('Scenario_03',0,3,29.00,29.00,0.00,0.00,0.00,0.00,100.00,130.00,120.00,'-1'),
	 ('Scenario_03',0,4,10.00,10.00,0.00,0.00,0.00,0.00,90.00,120.00,100.00,'-1'),
	 ('Scenario_03',0,5,19.00,19.00,0.00,1.00,0.00,0.00,80.00,100.00,100.00,'-1'),
	 ('Scenario_03',0,6,28.00,28.00,0.00,0.00,0.00,0.00,100.00,120.00,110.00,'-1'),
	 ('Scenario_04',0,1,12.00,12.00,0.00,0.00,0.00,0.00,70.00,100.00,80.00,'-1'),
	 ('Scenario_04',0,2,15.00,15.00,0.00,0.00,0.00,0.00,120.00,150.00,140.00,'-1'),
	 ('Scenario_04',0,3,29.00,29.00,0.00,0.00,0.00,0.00,100.00,130.00,120.00,'-1'),
	 ('Scenario_04',0,4,10.00,10.00,0.00,0.00,0.00,0.00,90.00,120.00,100.00,'-1'),
	 ('Scenario_04',0,5,19.00,19.00,0.00,1.00,0.00,0.00,80.00,100.00,100.00,'-1'),
	 ('Scenario_04',0,6,28.00,28.00,0.00,0.00,0.00,0.00,100.00,120.00,110.00,'-1');


INSERT INTO wfms.s02_proposed_flows (scenario_id,region_id,origin,destiny,current_flow,`type`,fmax,fmin,pflow) VALUES
	 ('BASE_CONDITION',0,1,3,12.00,'variable',15.00,10.00,12.00),
	 ('BASE_CONDITION',0,2,3,15.00,'variable',18.00,12.00,15.00),
	 ('BASE_CONDITION',0,3,4,10.00,'variable',20.00,10.00,10.00),
	 ('BASE_CONDITION',0,3,5,19.00,'variable',20.00,10.00,19.00),
	 ('BASE_CONDITION',0,4,3,1.00,'variable',3.00,1.00,1.00),
	 ('BASE_CONDITION',0,4,6,9.00,'variable',20.00,8.00,9.00),
	 ('BASE_CONDITION',0,5,6,19.00,'variable',20.00,4.00,19.00),
	 ('BASE_CONDITION',0,6,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_01',0,1,3,12.00,'variable',15.00,10.00,15.00),
	 ('Scenario_01',0,2,3,15.00,'variable',18.00,12.00,15.00);
INSERT INTO wfms.s02_proposed_flows (scenario_id,region_id,origin,destiny,current_flow,`type`,fmax,fmin,pflow) VALUES
	 ('Scenario_01',0,3,4,10.00,'variable',20.00,10.00,12.00),
	 ('Scenario_01',0,3,5,19.00,'variable',20.00,10.00,20.00),
	 ('Scenario_01',0,4,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_01',0,4,6,9.00,'variable',20.00,8.00,9.00),
	 ('Scenario_01',0,5,6,19.00,'variable',20.00,4.00,20.00),
	 ('Scenario_01',0,6,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_02',0,1,3,12.00,'variable',15.00,10.00,11.89),
	 ('Scenario_02',0,2,3,15.00,'variable',18.00,12.00,14.78),
	 ('Scenario_02',0,3,4,10.00,'variable',20.00,10.00,12.22),
	 ('Scenario_02',0,3,5,19.00,'variable',20.00,10.00,18.22);
INSERT INTO wfms.s02_proposed_flows (scenario_id,region_id,origin,destiny,current_flow,`type`,fmax,fmin,pflow) VALUES
	 ('Scenario_02',0,4,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_02',0,4,6,9.00,'variable',20.00,8.00,12.11),
	 ('Scenario_02',0,5,6,19.00,'variable',20.00,4.00,20.00),
	 ('Scenario_02',0,6,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_03',0,1,3,15.00,'variable',15.00,10.00,12.00),
	 ('Scenario_03',0,2,3,15.00,'variable',18.00,12.00,15.00),
	 ('Scenario_03',0,3,4,10.00,'variable',20.00,10.00,10.00),
	 ('Scenario_03',0,3,5,19.00,'variable',20.00,10.00,19.00),
	 ('Scenario_03',0,4,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_03',0,4,6,9.00,'variable',20.00,8.00,9.00);
INSERT INTO wfms.s02_proposed_flows (scenario_id,region_id,origin,destiny,current_flow,`type`,fmax,fmin,pflow) VALUES
	 ('Scenario_03',0,5,6,19.00,'variable',20.00,4.00,19.00),
	 ('Scenario_03',0,6,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_04',0,1,3,15.00,'variable',15.00,10.00,12.00),
	 ('Scenario_04',0,2,3,17.00,'variable',18.00,12.00,15.00),
	 ('Scenario_04',0,3,4,10.00,'variable',20.00,10.00,10.00),
	 ('Scenario_04',0,3,5,19.00,'variable',20.00,10.00,19.00),
	 ('Scenario_04',0,4,3,1.00,'variable',3.00,1.00,1.00),
	 ('Scenario_04',0,4,6,9.00,'variable',20.00,8.00,9.00),
	 ('Scenario_04',0,5,6,19.00,'variable',20.00,4.00,19.00),
	 ('Scenario_04',0,6,3,1.00,'variable',3.00,1.00,1.00);


INSERT INTO wfms.u01_regions (name,description) VALUES
	 ('Demo City','Demo city with no real information used for base exercises and testing'),
	 ('Arizona','Arizona region for demo with 8 nodes'),
	 ('Texas','Texas region for demo with 17 nodes');


INSERT INTO wfms.u02_roles (name) VALUES
	 ('admin'),
	 ('user');

INSERT INTO wfms.u03_users (username,name,password,unsafe_password,role_id,region_id) VALUES
	 ('admin','System Admin','$2b$08$JEM1B4xhLRfNTnHg18qOj.dqmSqmq6e6MUSZndZyxjcGcszdbwWuu','admin',1,NULL),
	 ('demouser','User Demo City','$2b$08$qr8qLT.0.cFE6n9mTCSbcee9fwzGCMCUUeJ23/7Wu6/Jw96/CYi.2','user',2,0),
	 ('az_user','Arizona User','$2b$08$qr8qLT.0.cFE6n9mTCSbcee9fwzGCMCUUeJ23/7Wu6/Jw96/CYi.2','user',2,1),
	 ('tx_user','Texas User','$2b$08$qr8qLT.0.cFE6n9mTCSbcee9fwzGCMCUUeJ23/7Wu6/Jw96/CYi.2','user',2,2),
	 ('ecantuv','Ernesto Cantú','$2b$08$pUjs5o6rtg7Nxy5nAcGiYOnGb6Bp27ORTZcet.OZLiQI6Ciw8DXPa',NULL,1,NULL);

INSERT INTO wfms.x01_flow_types (id,name,model_name) VALUES
	 (1,'fixed','fijo'),
	 (2,'variable','variable');

INSERT INTO wfms.x02_capacity_units (id,unit_name,unit_type) VALUES
	 (1,'M3','capacity'),
	 (2,'LTS','capacity'),
	 (3,'DAYS','time'),
	 (4,'HRS','time');


INSERT INTO wfms.z01_scenarios (scenario_id,region_id,cdate,description,`type`,capacity_units,time_units,origin_id,recalc_trl,recalc_solution) VALUES
	 ('BASE_CONDITION',0,'2024-07-15 13:21:23','Base Scenario for testing. ',2,'M3','DAYS','',0,0),
	 ('BASE_CONDITION',1,'2024-07-15 13:21:23','Base Scenario for testing. AZ',2,'M3','DAYS','',0,0),
	 ('BASE_CONDITION',2,'2024-07-15 13:21:23','TX',2,'M3','DAYS','',0,0),
	 ('Scenario_01',0,'2024-10-31 00:48:00','Fixed Inputs are greater than Fixed outputs',1,'M3','DAYS','BASE_CONDITION',1,1),
	 ('Scenario_02',0,'2024-10-31 01:09:17','The fixed outputs are greater than fixed inputs',1,'M3','DAYS','BASE_CONDITION',1,1),
	 ('Scenario_03',0,'2024-10-31 01:28:57','Scenario with variable inputs greater than variable outputs',1,'M3','DAYS','BASE_CONDITION',1,1),
	 ('Scenario_04',0,'2024-10-31 01:59:34','Internal flows affected',1,'M3','DAYS','BASE_CONDITION',1,1),
	 ('Scenario_05',0,'2025-03-03 22:35:21','testing',1,'M3','DAYS','BASE_CONDITION',1,1);


CREATE PROCEDURE delete_scenario(in scenarioId varchar(30), in regionId int)
begin
	delete from a01_nodes where scenario_id = scenarioId and region_id = regionId;
	delete from a02_flows where scenario_id = scenarioId and region_id = regionId;
	delete from a03_time_to_reach_limit  where scenario_id = scenarioId and region_id = regionId;
	delete from s01_solution_detail where scenario_id = scenarioId and region_id = regionId;
	delete from s02_proposed_flows where scenario_id = scenarioId and region_id = regionId;
	delete from z01_scenarios where scenario_id = scenarioId and region_id = regionId;
END

CREATE PROCEDURE create_new_region(in baseScenarioName varchar(30), in regionId varchar(30))
begin
	
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;
	start transaction;
	
	INSERT INTO u01_regions
	(region_id, name, description)
	select 
		region_id, name, description 
	from i01_regions 
	where region_id = regionId;

	set @genIdD = (select id from u01_regions where region_id = regionId);
		
	

	INSERT INTO z01_scenarios
	(scenario_id, region_id, description, `type`, capacity_units, time_units, recalc_trl, recalc_solution)
	select
		baseScenarioName, @genIdD, 'BASE CONDITION SCENARIO', 0, i01.capacity_units , i01.time_units , 1, 1
	from i01_regions i01 where i01.region_id = regionId;

	select * from z01_scenarios;


	INSERT INTO a01_nodes(scenario_id, region_id, id, node_id, description, max_capacity, min_capacity, current_vol, Lat, `Long`)
	select
		baseScenarioName,
		@genIdD,
		id, 
		node_id,
		description,
		max_capacity,
		min_capacity,
		current_vol,
		Lat,
		`Long`
	FROM i02_nodes where region_id = regionId;
	
	INSERT INTO a02_flows(scenario_id, region_id, origin, destiny, current_flow, type_id, fmax, fmin)
	select
		baseScenarioName,
		@genIdD,
		origin, destiny, current_flow, type_id, fmax, fmin
	from i03_flows where region_id = regionId;	

	select * from z01_scenarios;
	select * from a01_nodes where region_id = @ID;

	commit;
END

CREATE PROCEDURE `update_regions`(in baseScenarioName varchar(30))
BEGIN
	
	UPDATE a01_nodes a01
	SET a01.current_vol = COALESCE((
		SELECT i02.current_vol from i02_nodes i02
		where i02.id = a01.id and i02.region_id = (
			select u01.region_id from u01_regions u01 WHERE u01.id = a01.region_id 
		)
	),a01.current_vol)
	where a01.scenario_id = baseScenarioName and a01.region_id > 0;

	UPDATE a02_flows a02
	SET a02.current_flow = COALESCE((
		SELECT i03.current_flow from i03_flows i03
		where i03.origin = a02.origin and i03.destiny = a02.destiny and i03.region_id = (
			select u01.region_id from u01_regions u01 WHERE u01.id = a02.region_id 
		)
	),a02.current_flow)
	where scenario_id = baseScenarioName and a02.region_id > 0;

	update z01_scenarios z01
	set z01.recalc_trl = 1,z01.recalc_solution = 1 where z01.scenario_id = baseScenarioName
	and z01.region_id > 0;
END
