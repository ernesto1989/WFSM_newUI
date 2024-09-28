const dataSource = require('../Datasource/MySQLMngr');

const getNodesQuery = 'select id as recid,node_id,description,max_capacity,min_capacity,current_vol from a01_nodes where scenario_id = ?';
const selectInsertA01 = 'INSERT INTO a01_nodes(scenario_id,id, node_id, description, max_capacity, min_capacity, current_vol) SELECT ?, a01.id as id, a01.node_id as node_id,a01.description,a01.max_capacity,a01.min_capacity,a01.current_vol FROM a01_nodes a01 WHERE a01.scenario_id = ?';


/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getNodes(scenarioId){
    try{
        let query = getNodesQuery;
        let params = [scenarioId]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * Makes a copy of A01 table from a scenario origin to scenario destiny
 * @param {*} scenarioObj Scenario origin
 * @returns A query Result object
 */
async function copyA01(scenarioObj){
    try{
        let query = selectInsertA01;
        let params = [scenarioObj.scenario_id,scenarioObj.base_scenario_id];
        qResult = await dataSource.insertData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


module.exports = {getNodes,copyA01}