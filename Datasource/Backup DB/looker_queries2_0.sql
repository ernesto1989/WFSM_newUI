-- SIMULATOR MAIN QUERY

SELECT 
	Q01.SCENARIO,
	Q01.DTE,
	Q01.NODES,
	CONCAT(Q01.TOTAL_MIN_VOL, ' ', Q01.CU) AS TOTAL_MIN_VOL,
	CONCAT(Q01.TOTAL_CURRENT_VOL, ' ', Q01.CU) as TOTAL_CURRENT_VOL,
	CONCAT(Q01.TOTAL_MAX_VOL, ' ', Q01.CU) as TOTAL_MAX_VOL,
	CONCAT(Q01.TOTAL_CURRENT_VOL/Q01.TOTAL_MAX_VOL*100, ' %') as CAPACITY_PERC,
	CONCAT(Q01.INCOMING_FLOW, ' ', Q01.CU,'/',Q01.TU) as SYS_INPUT,
    CONCAT(Q01.OUTCOMING_FLOW, ' ', Q01.CU,'/',Q01.TU) as SYS_OUTPUT,
	CASE
		WHEN Q01.SIMULATED > 0 AND Q01.TRL IS NOT NULL THEN CONCAT(Q01.TRL, ' ', Q01.TU)
		WHEN Q01.SIMULATED > 0 AND Q01.TRL IS NULL AND Q01.STABLE_TRL = -1 THEN 'SYS STABLE'
		ELSE 'NON COMP.'
	END AS TRL,
	CASE 
		WHEN Q01.INCOMING_FLOW > Q01.OUTCOMING_FLOW THEN 'FILLING'
		WHEN Q01.INCOMING_FLOW < Q01.OUTCOMING_FLOW THEN 'EMPTYING'
		WHEN Q01.INCOMING_FLOW = Q01.OUTCOMING_FLOW THEN 'SYS. STABLE'
		ELSE 'ERROR'
	END AS SYS_STATE
FROM (
	SELECT 
		CONCAT(z01.scenario_id,(SELECT CONCAT('_',u01.name) from u01_regions u01 where u01.id = z01.region_id) ) as SCENARIO,
		z01.cdate as DTE,
		z01.capacity_units as CU,
		z01.time_units as TU,
		( select COUNT(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as NODES,
		( select sum(a01.min_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_MIN_VOL,
		( select sum(a01.current_vol) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_CURRENT_VOL,
		( select sum(a01.max_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_MAX_VOL,
		( select count(*) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id) as SIMULATED, 
		( SELECT sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.origin = 0 and a02.region_id = z01.region_id) as INCOMING_FLOW,
		( SELECT sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.destiny = 0 and a02.region_id = z01.region_id) as OUTCOMING_FLOW,
		( select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.time_to_reach_limit>=0 and a03.region_id = z01.region_id) as TRL,
		( select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id) as STABLE_TRL
	FROM z01_scenarios z01 
)Q01;


-- SIMULATOR NODES QUERY

SELECT 
	Q01.SCENARIO,
	Q01.NODE,
	Q01.MIN,
	Q01.CURRENT,
	Q01.MAX,
	CONCAT(Q01.NODE_INPUT, ' ', Q01.CU, '/',Q01.TU) as INPUT,
	CONCAT(Q01.NODE_OUTPUT, ' ', Q01.CU, '/',Q01.TU) as OUTPUT,
	CASE 
		WHEN Q01.NODE_INPUT > Q01.NODE_OUTPUT THEN ' FILLING'
		WHEN Q01.NODE_INPUT < Q01.NODE_OUTPUT THEN ' EMPTYING'
		WHEN Q01.NODE_INPUT = Q01.NODE_OUTPUT THEN ' STABLE'
	END AS NODE_STATE,
	CASE 
		WHEN Q01.NODE_TRL = -1 THEN 'STABLE'
		WHEN Q01.NODE_TRL >= 0 THEN CONCAT(Q01.NODE_TRL, ' ',Q01.TU)
		WHEN Q01.NODE_TRL < -1 THEN 'ERROR'
	END AS NODE_TRL
FROM (
	SELECT 
		CONCAT(z01.scenario_id,(SELECT CONCAT('_',u01.name) from u01_regions u01 where u01.id = z01.region_id)) as SCENARIO,
		z01.capacity_units as CU,
		z01.time_units as TU,
		a01.node_id as NODE,
		a03.min_vol as MIN,
		a03.current_vol as CURRENT,
		a03.max_vol as MAX,
		a03.incoming_flow as NODE_INPUT,
		a03.outcoming_flow as NODE_OUTPUT,
		a03.time_to_reach_limit as NODE_TRL
	FROM a03_time_to_reach_limit a03 
	JOIN a01_nodes a01 on a01.scenario_id = a03.scenario_id and a01.id = a03.node_id and a01.region_id = a03.region_id
	JOIN z01_scenarios z01 on z01.scenario_id = a03.scenario_id and z01.region_id = a03.region_id
) Q01;


--SOLUTIONS MAIN QUERY

SELECT 
	Q01.SCENARIO,
	Q01.DTE,
	Q01.NODES,
	CONCAT(Q01.TOTAL_MIN_VOL, ' ', Q01.CU) AS TOTAL_MIN_VOL,
	CONCAT(Q01.TOTAL_CURRENT_VOL, ' ', Q01.CU) as TOTAL_CURRENT_VOL,
	CONCAT(Q01.TOTAL_MAX_VOL, ' ', Q01.CU) as TOTAL_MAX_VOL,
	CONCAT(Q01.TOTAL_CURRENT_VOL/Q01.TOTAL_MAX_VOL*100, ' %') as CAPACITY_PERC,
	CONCAT(Q01.CURRENT_INCOMING_FLOW, ' ', Q01.CU,'/',Q01.TU) as SYS_INPUT,
    CONCAT(Q01.CURRENT_OUTCOMING_FLOW, ' ', Q01.CU,'/',Q01.TU) as SYS_OUTPUT,
	CASE
		WHEN Q01.SIMULATED > 0 AND Q01.TRL IS NOT NULL THEN CONCAT(Q01.TRL, ' ', Q01.TU)
		WHEN Q01.SIMULATED > 0 AND Q01.TRL IS NULL AND Q01.STABLE_TRL = -1 THEN 'SYS STABLE'
		ELSE 'NON COMP.'
	END AS CURRENT_TRL,
	CASE 
		WHEN Q01.CURRENT_INCOMING_FLOW > Q01.CURRENT_OUTCOMING_FLOW THEN 'FILLING'
		WHEN Q01.CURRENT_INCOMING_FLOW < Q01.CURRENT_OUTCOMING_FLOW THEN 'EMPTYING'
		WHEN Q01.CURRENT_INCOMING_FLOW = Q01.CURRENT_OUTCOMING_FLOW THEN 'SYS. STABLE'
		ELSE 'ERROR'
	END AS CURRENT_SYS_STATE,
	CASE
		WHEN Q01.SOLVED > 0 AND Q01.NEW_TRL > 0 THEN CONCAT(Q01.NEW_TRL, ' ',Q01.TU)
		WHEN Q01.SOLVED > 0 AND Q01.NEW_TRL  is NULL AND Q01.STABLE_NEW_TRL = -1 THEN 'STABLE'
		ELSE 'NOT COMPUTED'
	END AS NEW_TRL
FROM(
	SELECT 
		CONCAT(z01.scenario_id,(SELECT CONCAT('_',u01.name) from u01_regions u01 where u01.id = z01.region_id)) as SCENARIO,
		z01.cdate as DTE,
		z01.capacity_units as CU,
		z01.time_units as TU,
		( select COUNT(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as NODES,
		( select sum(a01.min_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_MIN_VOL,
		( select sum(a01.current_vol) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_CURRENT_VOL,
		( select sum(a01.max_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as TOTAL_MAX_VOL,
		( select sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.origin = 0 and a02.region_id = z01.region_id ) as CURRENT_INCOMING_FLOW,
		( select sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.destiny = 0 and a02.region_id = z01.region_id ) as CURRENT_OUTCOMING_FLOW,
		( select count(*) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id) as SIMULATED,
		( select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.time_to_reach_limit>=0 and a03.region_id = z01.region_id) as TRL,
		( select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id) as STABLE_TRL,
		( select count(*) from s01_solution_detail s01 where s01.scenario_id = z01.scenario_id and s01.region_id = z01.region_id) as SOLVED,
		( select min(s01.T) from s01_solution_detail s01 where s01.scenario_id = z01.scenario_id and s01.T >= 0 and s01.region_id = z01.region_id) as NEW_TRL,
		( select min(s01.T) from s01_solution_detail s01 where s01.scenario_id = z01.scenario_id and s01.region_id = z01.region_id) as STABLE_NEW_TRL
	FROM z01_scenarios z01
) Q01;


-- SOLUTIONS DETAILS

SELECT 
	CONCAT(z01.scenario_id,(SELECT CONCAT('_',u01.name) from u01_regions u01 where u01.id = z01.region_id)) as Scenario,
	a01.node_id as NODE,
	CONCAT(s01.NActual, ' ', z01.capacity_units) as CURRENT_VOL,
	CONCAT(s01.E, ' ', z01.capacity_units, '/', z01.time_units) as PROPOSED_INPUT,
	CONCAT(s01.S, ' ', z01.capacity_units, '/', z01.time_units) as PROPOSED_OUTPUT,
	(
		select 
			CASE 
				WHEN a03.time_to_reach_limit >= 0 THEN CONCAT(a03.time_to_reach_limit, ' ', z01.time_units)
				WHEN a03.time_to_reach_limit = -1 THEN 'STABLE'
				ELSE 'NOT COMPUTED'
			END 
		from a03_time_to_reach_limit a03 
		where a03.scenario_id = s01.scenario_id and a03.node_id = s01.No and a03.region_id = s01.region_id 
	) as TRL,
	(
		select 
			CASE 
				WHEN s01.T >= 0 THEN CONCAT(s01.T, ' ', z01.time_units)
				WHEN s01.T = -1 THEN 'STABLE'
				ELSE 'NOT COMPUTED'
			END 
		from s01_solution_detail s01P 
		where s01P.scenario_id = s01.scenario_id and s01P.No = s01.No  and s01P.region_id = s01.region_id 
	)
	 as NEW_TRL
from s01_solution_detail s01
join z01_scenarios z01 on z01.scenario_id = s01.scenario_id and z01.region_id = s01.region_id 
join a01_nodes a01 on a01.scenario_id = s01.scenario_id and a01.id = s01.`No` and a01.region_id = s01.region_id 


-- MAPS

select
    u01.name as REGION,
    a01.node_id as NODE,
    a01.current_vol as CURRENT_VOL,
    CONCAT(a01.Lat,CONCAT(',',a01.Long)) as LOCATION
from a01_nodes a01
join u01_regions u01 on u01.id = a01.region_id
where a01.scenario_id = 'BASE_CONDITION'

select
    u01.name as REGION,
    a01.node_id as NODE,
    a01.current_vol as CURRENT_VOL,
    CONCAT(a01.Lat,CONCAT(',',a01.Long)) as LOCATION
from a01_nodes a01
join u01_regions u01 on u01.id = a01.region_id