SELECT
	q01.scenario_id,
	q01.cdate as creation_date,
	q01.nodes as scenario_nodes,
	CONCAT(q01.min_vol,' ',q01.capacity_units) as Minimum_Capacity,
	CONCAT(q01.curr_vol,' ',q01.capacity_units) as Current_Volume,
	CONCAT(q01.max_capacity,' ',q01.capacity_units) as Total_Capacity,
	CONCAT((q01.curr_vol/q01.max_capacity*100),'%') as Current_Vol_state,
	CONCAT(q01.Flow_Income,' ',q01.capacity_units,'/',q01.time_units) as Flow_Income,
	CONCAT(q01.Flow_Outcome,' ',q01.capacity_units,'/',q01.time_units) as Flow_Outcome,
	CASE 
		WHEN q01.trl >= 0 THEN CONCAT(trl, ' ', q01.time_units)
		WHEN q01.trl is null and trl_stable = -1 THEN 'STABLE'
		WHEN q01.trl is null and trl_stable is null THEN 'NOT COMPUTED'
	END as TRL_STATE,
	CASE 
		WHEN q01.s_trl >= 0 THEN CONCAT(s_trl, ' ', q01.time_units)
		WHEN q01.s_trl is null and s_trl_stable = -1 THEN 'STABLE'
		WHEN q01.s_trl is null and s_trl_stable is null THEN 'NOT COMPUTED'
	END as S_TRL_STATE
FROM (
	SELECT 
			z01.scenario_id as scenario_id,
			z01.capacity_units,
			z01.time_units,
			z01.cdate,
			(select count(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id) as nodes,
			(select sum(a01.min_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id) as min_vol,
			(select sum(a01.current_vol) from a01_nodes a01 where a01.scenario_id = z01.scenario_id) as curr_vol,
		    (select sum(a01.max_capacity) from a01_nodes a01 where a01.scenario_id = z01.scenario_id) as max_capacity,
		    (select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.time_to_reach_limit >=0) as trl,
		    (select min(a03.time_to_reach_limit) from a03_time_to_reach_limit a03 where a03.scenario_id = z01.scenario_id and a03.time_to_reach_limit < 0) as trl_stable,
		    (select min(s01.T) from s01_solution_detail s01 where s01.scenario_id = z01.scenario_id and s01.T >= 0) as s_trl,
		    (select min(s01.T) from s01_solution_detail s01 where s01.scenario_id = z01.scenario_id and s01.T < 0) as s_trl_stable,
		    (select sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.origin = 0) as Flow_Income,
		    (select sum(a02.current_flow) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.destiny = 0) as Flow_Outcome
	FROM z01_scenarios z01
) q01;


SELECT 
	q01.scenario_id,
	q01.node,
	q01.Min,
	q01.Current,
	q01.Max,
	CASE 
		WHEN q01.CURR_TRL = -1 THEN 'STABLE'
		WHEN q01.CURR_TRL >= 0 THEN q01.CURR_TRL
	END as CURR_TRL,
	CASE 
		WHEN q01.Optimal_TRL = -1 THEN 'STABLE'
		WHEN q01.Optimal_TRL >= 0 THEN q01.Optimal_TRL
	END as Optimal_TRL
FROM
(
	SELECT 
		a01.scenario_id ,
		a01.node_id as Node,
		a01.min_capacity as Min,
		a01.current_vol as Current,
		a01.max_capacity as Max,
		(select a03.incoming_flow from a03_time_to_reach_limit a03 where a03.scenario_id = a01.scenario_id and a03.node_id = a01.id) as CURR_INFLOW,
		(select a03.outcoming_flow from a03_time_to_reach_limit a03 where a03.scenario_id = a01.scenario_id and a03.node_id = a01.id) as CURR_OUTFLOW,
		(select a03.time_to_reach_limit from a03_time_to_reach_limit a03 where a03.scenario_id = a01.scenario_id and a03.node_id = a01.id) as CURR_TRL,
		(select sum(s02.pflow) from s02_proposed_flows s02 where s02.scenario_id = a01.scenario_id and s02.origin = a01.id) as POUTFLOW,
		(select T from s01_solution_detail s01 WHERE s01.scenario_id = a01.scenario_id and s01.No = a01.id) as Optimal_TRL
	FROM a01_nodes a01 
)q01








