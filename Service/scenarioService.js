const dataSource = require('../Datasource/MySQLMngr');
const constants = require("../constants");

const getScenariosQuery = 'SELECT z01.scenario_id,z01.cdate,z01.description,z01.type,z01.capacity_units,z01.time_units,z01a.origin_id as parent_id,(select count(*) from a01_nodes a01 where a01.scenario_id = z01.scenario_id) as nodes,(select count(*) from a02_flows a02 where a02.scenario_id = z01.scenario_id) as flows,COALESCE((SELECT CASE WHEN sol >= 1 then "Solved" WHEN sol = 0 then "Unsolved" END AS Solved FROM (SELECT count(*) as sol FROM s02_optimal_flow_analysis sd WHERE sd.scenario_id = z01.scenario_id GROUP BY sd.scenario_id) AS sdetail),"Unsolved") AS Status FROM z01_scenarios z01 left join z01_scenarios z01a on z01a.scenario_id = z01.origin_id';
const getScenarioByIdQuery = "SELECT scenario_id,cdate, description, case when `type` = 0 then 'Proposed' when `type` = 1 then 'User Created' when `type` = 0 then 'Proposed' when `type` = 2 then 'Real Time' else 'Other' end as `type`,capacity_units,time_units,origin_id from z01_scenarios s where scenario_id = ?";
const getScenarioTRLQuery = "select a01.node_id, a03.current_vol, a03.min_vol, a03.max_vol, a03.incoming_flow, a03.outcoming_flow, a03.time_to_reach_limit from a03_time_to_reach_limit a03 left join a01_nodes a01 on a01.scenario_id = a03.scenario_id and a01.id = a03.node_id where a03.scenario_id = ? "
const insertNewScenario = 'INSERT into z01_scenarios(scenario_id, description, `type`, capacity_units, time_units, origin_id) VALUES (?,?,?,?,?,?)';
const insertCalcA03 = 'INSERT INTO a03_time_to_reach_limit(scenario_id, node_id, max_vol, min_vol, current_vol, incoming_flow, outcoming_flow, time_to_reach_limit) VALUES ?';
const deleteScenarioQuery = "call delete_scenario(?)";
const deleteA03Query = "delete from a03_time_to_reach_limit where scenario_id = ?";
const scenarioUnitsQuery = "select capacity_units,time_units from z01_scenarios z01 where scenario_id = ?";


/**
 * Service that obtains the whole Scenario's list
 * 
 * @returns a list of available scenarios in the Database.
 */
async function getScenarios(){
    try{
        let query = getScenariosQuery;
        qResult = await dataSource.getData(query);
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
async function getScenarioById(scenarioId){
    try{
        let query = getScenarioByIdQuery;
        let params = [scenarioId]
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
async function getScenarioTRLById(scenarioId){
    try{
        let query = getScenarioTRLQuery;
        let params = [scenarioId]
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
async function createEmptyScenario(scenarioObj){
    try{
        let query = insertNewScenario;
        let params = [scenarioObj.scenario_id, scenarioObj.description,parseInt(scenarioObj.type),scenarioObj.capacity_units,scenarioObj.time_units,scenarioObj.base_scenario_id]
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
async function deleteScenario(scenarioId){
    try{
        let query = deleteScenarioQuery;
        let params = [scenarioId];

        qResult = await dataSource.getDataWithParams(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteA03(scenarioId){
    try{
        let query = deleteA03Query;
        let params = [scenarioId];
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
async function insertA03(scenarioId,a03List){
    try{
        let query = insertCalcA03;
        let elements = []
        let element = []
        for(i=0;i<a03List.length;i++){
            let json = JSON.parse(a03List[i])
            element = [scenarioId, json.id, json.max_vol, json.min_vol,json.current_vol, json.income_flow, json.outcome_flow, json.time_to_reach_limit]
            elements.push(element)
        }
        qResult = await dataSource.bulkInsertData(query,elements);
        return qResult;
    }catch(err){
        return err;
    }
}

async function getScenarioUnits(scenarioId){
    try{
        let query = scenarioUnitsQuery;
        let params = [scenarioId]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return err;
    }
}

module.exports = {getScenarios,getScenarioById,getScenarioTRLById,createEmptyScenario,deleteScenario,deleteA03,insertA03,getScenarioUnits};