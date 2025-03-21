const dataSource = require('../Datasource/MySQLMngr');
const constants = require("../constants");

const getScenariosQuery = 
`   SELECT 
        z01.scenario_id,
        z01.cdate,
        z01.description,
        z01.type,
        x03.description as description_type,
        z01.capacity_units,
        z01.time_units,
        z01a.scenario_id as origin_id,
        (select count(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as nodes,
        (select count(*) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.region_id = z01.region_id) as flows, 
        z01.recalc_trl, 
        z01.recalc_solution, 
        COALESCE(
            (SELECT CASE WHEN sim >= 1 then 'Simulated' WHEN sim = 0 then 'Uncomputed' END AS simulated 
            FROM (SELECT count(*) as sim FROM a03_time_to_reach_limit a03 WHERE a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id GROUP BY a03.scenario_id) AS psol),
            'Uncomputed') AS Proposed_Solution,
        COALESCE(
            (SELECT CASE WHEN sol >= 1 then 'Solved' WHEN sol = 0 then 'Unsolved' END AS Solved 
            FROM (SELECT count(*) as sol FROM s02_proposed_flows sd WHERE sd.scenario_id = z01.scenario_id and sd.region_id = z01.region_id GROUP BY sd.scenario_id) AS sdetail),
            'Unsolved') AS Optimal_Solution  
    FROM z01_scenarios z01 
    left join z01_scenarios z01a on z01a.scenario_id = z01.origin_id and z01a.region_id  = z01.region_id
    join x03_scenario_types x03 on x03.id = z01.type
    where z01.region_id = ?
    order by z01.cdate asc
`;

const getScenarioByIdQuery = 
`   SELECT 
        z01.scenario_id,
        z01.cdate,
        z01.description,
        z01.type,
        x03.description as description_type,
        z01.capacity_units,
        z01.time_units,
        z01a.scenario_id as origin_id,
        (select count(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id and a01.region_id = z01.region_id) as nodes,
        (select count(*) from a02_flows a02 where a02.scenario_id = z01.scenario_id and a02.region_id = z01.region_id) as flows, 
        z01.recalc_trl, 
        z01.recalc_solution, 
        COALESCE(
            (SELECT CASE WHEN sim >= 1 then 'Simulated' WHEN sim = 0 then 'Uncomputed' END AS simulated 
            FROM (SELECT count(*) as sim FROM a03_time_to_reach_limit a03 WHERE a03.scenario_id = z01.scenario_id and a03.region_id = z01.region_id GROUP BY a03.scenario_id) AS psol),
            'Uncomputed') AS Proposed_Solution,
        COALESCE(
            (SELECT CASE WHEN sol >= 1 then 'Solved' WHEN sol = 0 then 'Unsolved' END AS Solved 
            FROM (SELECT count(*) as sol FROM s02_proposed_flows sd WHERE sd.scenario_id = z01.scenario_id and sd.region_id = z01.region_id GROUP BY sd.scenario_id) AS sdetail),
            'Unsolved') AS Optimal_Solution 
    FROM z01_scenarios z01 
    left join z01_scenarios z01a on z01a.scenario_id = z01.origin_id and z01a.region_id = z01.region_id
    join x03_scenario_types x03 on x03.id = z01.type
    where z01.scenario_id = ? and z01.region_id = ?
    order by z01.cdate asc
`;

const getScenarioTRLQuery = 
`   SELECT 
        a01.node_id, 
        a03.current_vol, 
        a03.min_vol, 
        a03.max_vol, 
        a03.incoming_flow, 
        a03.outcoming_flow, 
        CASE 
            WHEN a03.time_to_reach_limit = -1 THEN 'Stable' 
            ELSE a03.time_to_reach_limit 
        END as time_to_reach_limit 
    FROM a03_time_to_reach_limit a03 
    LEFT JOIN a01_nodes a01 ON a01.scenario_id = a03.scenario_id AND a01.id = a03.node_id AND a01.region_id = a03.region_id 
    WHERE a03.scenario_id = ? AND a03.region_id = ?
`;

const insertNewScenario = "INSERT into z01_scenarios(scenario_id, region_id, description, `type`, capacity_units, time_units, origin_id) VALUES (?,?,?,?,?,?,?)";
const insertCalcA03 = "INSERT INTO a03_time_to_reach_limit(scenario_id,region_id, node_id, max_vol, min_vol, current_vol, incoming_flow, outcoming_flow, time_to_reach_limit) VALUES ?";
const deleteScenarioQuery = "call delete_scenario(?,?)"; 
const deleteA03Query = "delete from a03_time_to_reach_limit where scenario_id = ? and region_id = ?";
const scenarioUnitsQuery = "select capacity_units,time_units from z01_scenarios z01 where scenario_id = ? and region_id = ?";

const updateTRLFlag = 'UPDATE z01_scenarios SET recalc_trl = ? WHERE scenario_id = ? and region_id = ?';

/**
 * Service that obtains the whole Scenario's list
 * 
 * @returns a list of available scenarios in the Database.
 */
async function getScenarios(region_id){
    try{
        let query = getScenariosQuery;
        let params = [region_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * This method obtains a scenario object by its id.
 * 
 * @param {String} scenarioId The scenario Id
 * @returns the scenario object
 */
async function getScenarioById(scenarioId,region_id){
    try{
        let query = getScenarioByIdQuery;
        let params = [scenarioId,region_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * Gets Scenario's Time To Reach Limit info.
 * 
 * @param {String} scenarioId the scenario id
 * @returns the Real Time Info.
 */
async function getScenarioTRLById(scenarioId,region_id){
    try{
        let query = getScenarioTRLQuery;
        let params = [scenarioId,region_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}


// CREATE Scenario Services

/**
 * Creates a scenario row on the database.
 * 
 * @param {Object} scenarioObj a Scenario object with all the scenario info.
 * @returns A Query Result object.
 */
async function createEmptyScenario(scenarioObj, region_id){
    try{
        let query = insertNewScenario;
        let params = [scenarioObj.scenario_id,region_id, scenarioObj.description,parseInt(scenarioObj.type),scenarioObj.capacity_units,scenarioObj.time_units,scenarioObj.base_scenario_id]
        qResult = await dataSource.insertData(query,params);
        return qResult;
    }catch(err){
       return err;
    }
 }


 /**
  * Service that deletes a scenario by its ID
  * @param {Sting} scenarioId The scenario ID
  * @returns The confirmation of deleted scenario
  */
async function deleteScenario(scenarioId,region_id){
    try{
        let query = deleteScenarioQuery;
        let params = [scenarioId,region_id];

        qResult = await dataSource.getDataWithParams(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteA03(scenarioId,region_id){
    try{
        let query = deleteA03Query;
        let params = [scenarioId,region_id];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

/**
 * Makes the real time calc for the given scenario.
 * 
 * @param {*} scenarioObj Scenario origin
 * @returns A query Result object
 */
async function insertA03(scenarioId,a03List,region_id){
    try{
        let query = insertCalcA03;
        let elements = []
        let element = []
        for(i=0;i<a03List.length;i++){
            let json = JSON.parse(a03List[i])
            element = [scenarioId, region_id, json.id, json.max_vol, json.min_vol,json.current_vol, json.income_flow, json.outcome_flow, json.time_to_reach_limit]
            elements.push(element)
        }
        qResult = await dataSource.bulkInsertData(query,elements);
        return qResult;
    }catch(err){
        return err;
    }
}

async function getScenarioUnits(scenarioId,region_id){
    try{
        let query = scenarioUnitsQuery;
        let params = [scenarioId,region_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return err;
    }
}

async function updateScenarioTRLFlag(flag,scenarioId,region_id){
    try{
        let query = updateTRLFlag;
        let params = [flag,scenarioId,region_id];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}
module.exports = {getScenarios,getScenarioById,getScenarioTRLById,createEmptyScenario,deleteScenario,deleteA03,insertA03,getScenarioUnits,updateScenarioTRLFlag};