const dataSource = require('../Datasource/MySQLMngr');

//added id 2 toimes in order to use it on W2UI and Python Web Service
const getNodesQuery = "select id as recid,id,scenario_id,node_id,description,max_capacity,min_capacity,current_vol from a01_nodesC where scenario_id = ? and city_id = ?";
const selectInsertA01 = "INSERT INTO a01_nodesC(scenario_id,id, city_id ,node_id, description, max_capacity, min_capacity, current_vol) SELECT ?, a01.id as id, a01.city_id as city,a01.node_id as node_id,a01.description,a01.max_capacity,a01.min_capacity,a01.current_vol FROM a01_nodesC a01 WHERE a01.scenario_id = ? and city_id = ?";
const insertNodeQuery = "Insert into a01_nodesC(scenario_id,id, city_id, node_id, description, max_capacity, min_capacity, current_vol) Values (?,?,?,?,?,?,?,?)";
const updateNodeQuery = "Update a01_nodesC set node_id = ?, description = ?, max_capacity = ?, min_capacity = ?, current_vol = ? Where scenario_id = ? and id = ? and city_id = ?";
const deleteNodeQuery = "Delete from a01_nodesC where scenario_id = ? and id = ? and city_id = ?";

/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getNodes(scenarioId,city_id){
    try{
        let query = getNodesQuery;
        let params = [scenarioId,city_id]
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
async function copyA01(scenarioObj,city_id){
    try{
        let query = selectInsertA01;
        let params = [scenarioObj.scenario_id,scenarioObj.base_scenario_id,city_id];
        qResult = await dataSource.insertData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function insertNode(node,city_id){
    try{
        let query = insertNodeQuery;
        //scenario_id,id, node_id, description, max_capacity, min_capacity, current_vol
        let params =[node.scenario_id,node.id,city_id,node.node_id,node.description, node.max_capacity,node.min_capacity,node.current_vol];
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


async function updateNode(node,city_id){
    try{
        let query = updateNodeQuery;
        let params = [node.node_id,node.description, node.max_capacity,node.min_capacity,node.current_vol,node.scenario_id,node.id,city_id];
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteNode(node,city_id){
    try{
        let query = deleteNodeQuery;
        let params = [node.scenario_id,node.id,city_id]
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

module.exports = {getNodes,copyA01,insertNode,updateNode,deleteNode}