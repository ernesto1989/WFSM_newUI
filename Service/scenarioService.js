const dataSource = require('../Datasource/MySQLMngr');
const constants = require("../constants");

const getScenariosQuery = 'SELECT z01.scenario_id,z01.cdate,z01.description,z01.type,z01.capacity_units,z01.time_units,z01a.origin_id as parent_id FROM z01_scenarios z01 left join z01_scenarios z01a on z01a.scenario_id = z01.origin_id';
const getScenarioByIdQuery = "SELECT scenario_id,cdate, description, case when `type` = 0 then 'Proposed' when `type` = 1 then 'User Created' when `type` = 0 then 'Proposed' when `type` = 2 then 'Real Time' else 'Other' end as `type`,capacity_units,time_units,origin_id from z01_scenarios s where scenario_id = ?";
const getScenarioTRLQuery = "select a01.node_id, a03.current_vol, a03.min_vol, a03.max_vol, a03.incoming_flow, a03.outcoming_flow, a03.time_to_reach_limit from a03_time_to_reach_limit a03 left join a01_nodes a01 on a01.scenario_id = a03.scenario_id and a01.id = a03.node_id where a03.scenario_id = ? "

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


module.exports = {getScenarios,getScenarioById,getScenarioTRLById};