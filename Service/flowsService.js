const dataSource = require('../Datasource/MySQLMngr');

/*
    During the development process of Demo including Cities and Roles, I found out that W2UI did not support Id = 0 for dropdown lists so
    I implemented a workaround to use the value a +1 on the id as a reference to the IN and OUT nodes. 
    This is the reason for the coalesce function in the query.
*/
const getFlowsQuery = 
`    SELECT 
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS recid, 
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS id, 
        a02.scenario_id, 
        case 
            when a02.origin = 0 then (select count(*) + 1 from a01_nodes a01 where a01.scenario_id = a02.scenario_id and a01.city_id = a02.city_id) 
            else a02.origin 
        end  as origin, 
        coalesce(a01o.node_id,'IN') as origin_node, 
        case 
            when a02.destiny = 0 then (select count(*) + 1 from a01_nodes a01 where a01.scenario_id = a02.scenario_id and a01.city_id = a02.city_id) 
            else a02.destiny 
        end as destiny, 
        coalesce(a01d.node_id,'OUT') as destiny_node, 
        a02.current_flow,
        x01.id as type_id, 
        x01.name as type,
        x01.model_name as model_type,
        coalesce(fmax,0) as fmax,
        coalesce(fmin,0) as fmin 
    FROM a02_flows a02 
    left join a01_nodes a01o on a01o.scenario_id = a02.scenario_id and a01o.id = a02.origin and a01o.id = a02.origin and a01o.city_id = a02.city_id
    left join a01_nodes a01d on a01d.scenario_id = a02.scenario_id and a01d.id = a02.destiny and a01d.id = a02.destiny and a01d.city_id = a02.city_id 
    left join x01_flow_types x01 on x01.id = a02.type_id 
    WHERE a02.scenario_id = ? and a02.city_id = ?
`;

const getFlowsQuery2 = 
`    SELECT 
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS recid, 
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS id, 
        a02.scenario_id, 
        a02.origin as origin, 
        coalesce(a01o.node_id,'IN') as origin_node, 
        a02.destiny as destiny, 
        coalesce(a01d.node_id,'OUT') as destiny_node, 
        a02.current_flow,
        x01.id as type_id, 
        x01.name as type,
        x01.model_name as model_type,
        coalesce(fmax,0) as fmax,
        coalesce(fmin,0) as fmin 
    FROM a02_flows a02 
    left join a01_nodes a01o on a01o.scenario_id = a02.scenario_id and a01o.id = a02.origin and a01o.id = a02.origin and a01o.city_id = a02.city_id
    left join a01_nodes a01d on a01d.scenario_id = a02.scenario_id and a01d.id = a02.destiny and a01d.id = a02.destiny and a01d.city_id = a02.city_id 
    left join x01_flow_types x01 on x01.id = a02.type_id 
    WHERE a02.scenario_id = ? and a02.city_id = ?
`;

const selectInsertA02 = "INSERT INTO a02_flows(scenario_id,city_id, origin, destiny, current_flow, type_id, fmax, fmin) SELECT ?, city_id, origin, destiny, COALESCE(current_flow,0), type_id, COALESCE(fmax,0), COALESCE(fmin,0) FROM a02_flows a02 WHERE a02.scenario_id = ? and a02.city_id = ?";
const insertFlowQuery = "Insert into a02_flows(scenario_id, city_id,origin, destiny, current_flow,type_id,fmax,fmin) Values (?,?,?,?,?,?,?,?)";
const updateFlowQuery = "Update a02_flows set current_flow = ?, fmax = ?, fmin = ? Where scenario_id = ? and origin = ? and destiny = ? and city_id = ?";
const deleteFlowQuery = "Delete from a02_flows where scenario_id = ? and origin = ? and destiny = ? and city_id = ?";


/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getFlows(scenarioId,city_id, model = false){
    try{
        let query = '';
        /*Required for window dropdown lists to work fine*/
        if(!model){
            query = getFlowsQuery;
        }else{
            query = getFlowsQuery2;
        }
        
        let params = [scenarioId,city_id]
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
async function copyA02(scenarioObj,city_id){
    try{
        let query = selectInsertA02;
        let params = [scenarioObj.scenario_id,scenarioObj.base_scenario_id,city_id];
        qResult = await dataSource.insertData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


async function insertFlow(flow,city_id){
    try{
        let query = insertFlowQuery;
        //scenario_id,origin, destiny, current_flow,type,fmax,fmin
        let params =[flow.scenario_id, city_id,flow.origin,flow.destiny,flow.current_flow, flow.type,flow.fmax,flow.fmin];
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


async function updateFlow(flow,city_id){
    try{
        let query = updateFlowQuery;
        //Update a02_flows set current_flow = ?, fmax = ?, fmin = ? Where scenario_id = ? and origin = ? and destiny = ?
        let params = [flow.current_flow,flow.fmax,flow.fmin,flow.scenario_id,flow.origin,flow.destiny, city_id];
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteFlow(flow,city_id){
    try{
        let query = deleteFlowQuery;
        let params = [flow.scenario_id,flow.origin,flow.destiny,city_id]
        
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}


module.exports = {getFlows,copyA02,insertFlow,updateFlow,deleteFlow}