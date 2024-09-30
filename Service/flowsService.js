const dataSource = require('../Datasource/MySQLMngr');

const getFlowsQuery = "SELECT ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS recid,ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS id,a02.scenario_id, a02.origin,coalesce(a01o.node_id,'IN') as origin_node, a02.destiny, coalesce(a01d.node_id,'OUT') as destiny_node,a02.current_flow,a02.`type`,coalesce(fmax,0) as fmax,coalesce(fmin,0) as fmin FROM a02_flows a02 left join a01_nodes a01o on a01o.scenario_id = a02.scenario_id and a01o.id = a02.origin left join a01_nodes a01d on a01d.scenario_id = a02.scenario_id and a01d.id = a02.destiny WHERE a02.scenario_id = ?";
const selectInsertA02 = 'INSERT INTO a02_flows(scenario_id, origin, destiny, current_flow, `type`, fmax, fmin) SELECT ?,origin, destiny, COALESCE(current_flow,0), `type`, COALESCE(fmax,0), COALESCE(fmin,0) FROM a02_flows a02 WHERE a02.scenario_id = ?';

/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getFlows(scenarioId){
    try{
        let query = getFlowsQuery;
        let params = [scenarioId]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * Makes a copy of A02 table from a scenario origin to scenario destiny
 * @param {*} scenarioObj Scenario origin
 * @returns A query Result object
 */
async function copyA02(scenarioObj){
    try{
        let query = selectInsertA02;
        let params = [scenarioObj.scenario_id,scenarioObj.base_scenario_id];
        qResult = await dataSource.insertData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


module.exports = {getFlows,copyA02}