const dataSource = require('../Datasource/MySQLMngr');

const getS02Query = 
`    SELECT 
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS recid,
        ROW_NUMBER() OVER(PARTITION BY 'scenario_id' ) AS id,
        s02.scenario_id, 
        s02.origin,
        coalesce(a01o.node_id,'IN') as origin_node, 
        s02.destiny, 
        coalesce(a01d.node_id,'OUT') as destiny_node,
        s02.current_flow,
        s02.\`type\`,
        coalesce(fmax,0) as fmax,
        coalesce(fmin,0) as fmin,
        coalesce(pflow,0) as pflow 
    FROM s02_proposed_flowsC s02 
    left join a01_nodesC a01o on a01o.scenario_id = s02.scenario_id and a01o.id = s02.origin and a01o.city_id = s02.city_id 
    left join a01_nodesC a01d on a01d.scenario_id = s02.scenario_id and a01d.id = s02.destiny and a01d.city_id = s02.city_id 
    WHERE s02.scenario_id = ? and s02.city_id = ?
`;

const solutionDetailDelete = "DELETE FROM s01_solution_detailC where scenario_id = ? and city_id = ?";
const s02DetailDelete = "DELETE FROM s02_proposed_flowsC where scenario_id = ? and city_id = ?";
const solutionDetailInsert = "INSERT INTO s01_solution_detailC(scenario_id, city_id, `No`, E, S, a, b, `R+`, `R-`, NMin, NMax, NActual, T) VALUES ?";
const solutionPFInsert = "INSERT INTO s02_proposed_flowsC(scenario_id, city_id, origin, destiny, current_flow, `type`, fmax, fmin, pflow) VALUES ?";


/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getS02(scenarioId,city_id){
    try{
        let query = getS02Query;
        let params = [scenarioId, city_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}



async function deletePreviousSolution(scenarioId,city_id){
    try{
        let query = solutionDetailDelete;
        let params = [scenarioId,city_id];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteS02(scenarioId,city_id){
    try{
        let query = s02DetailDelete;
        let params = [scenarioId,city_id];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function saveSolutionDetail(scenarioId,sol,city_id){
    try{
        let query = solutionDetailInsert;
        //iterate over solution elements
        let elements = [];
        let element = [];

        for(i=0;i<sol.length;i++){
            let obj = JSON.parse(sol[i]);
            //INSERT INTO s01_solution_detailC(scenario_id, city_id, `No`, E, S, a, b, `R+`, `R-`, NMin, NMax, NActual, T) VALUES ?
            element = [scenarioId, city_id, obj.no,obj.e, obj.s, obj.a, obj.b, obj.r, obj._r, obj.nmin, obj.nmax, obj.nactual, obj.t ]
            elements.push(element)
        }

         qResult = await dataSource.bulkInsertData(query,elements);
        return qResult;
        return [];
    }catch(err){
        return [];
    }
}

async function saveSolutionS02(scenarioId,proposed_flows,city_id){
    try{
        let query = solutionPFInsert;
        //iterate over solution elements
        let elements = [];
        let element = [];

        for(i=0;i<proposed_flows.length;i++){
            let obj = JSON.parse(proposed_flows[i]);
            
            //INSERT INTO s02_proposed_flows(scenario_id, origin, destiny, current_flow, `type`, fmax, fmin, pflow)
            element = [scenarioId, city_id, obj.origin,obj.destiny, obj.currentf, obj.type, obj.fmax, obj.fmin, obj.proposed]
            elements.push(element)
        }

        qResult = await dataSource.bulkInsertData(query,elements);
        return qResult;
        return [];
    }catch(err){
        return [];
    }
}



module.exports = {getS02,deletePreviousSolution,deleteS02,saveSolutionDetail,saveSolutionS02}