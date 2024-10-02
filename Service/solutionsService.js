const dataSource = require('../Datasource/MySQLMngr');

const getS02Query = 'select * from s02_optimal_flow_analysis s02 where s02.scenario_id = ?';
const solutionDetailDelete = 'DELETE FROM s01_solution_detail where scenario_id = ?';
const s02DetailDelete = 'DELETE FROM s02_optimal_flow_analysis where scenario_id = ?';
const solutionDetailInsert = 'INSERT INTO s01_solution_detail(scenario_id, `No`, E, S, a, b, `R+`, `R-`, NMin, NMax, NActual, T) VALUES ?'
const solutionSelectInsert = 'INSERT INTO s02_optimal_flow_analysis(scenario_id, node_id, max_vol, min_vol, current_vol, incoming_flow, outcoming_flow, time_to_reach_limit, is_filling) select s01.scenario_id,s01.`No`,s01.NMax,s01.NMin,s01.NActual,s01.E,s01.S,s01.T,case when (s01.`R+` = 1 and s01.`R-` = 0) then 1 when (s01.`R-` = 1 and s01.`R+` = 0) then 0 else -1 end from s01_solution_detail s01 where s01.scenario_id = ?'


/**
 * This method gets the nodes list
 * 
 * @param {*} scenarioId the scenario id
 * @returns the list of nodes in the scenario.
 */
async function getS02(scenarioId){
    try{
        let query = getS02Query;
        let params = [scenarioId]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}



async function deletePreviousSolution(scenarioId){
    try{
        let query = solutionDetailDelete;
        let params = [scenarioId];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function deleteS02(scenarioId){
    try{
        let query = s02DetailDelete;
        let params = [scenarioId];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}

async function saveSolutionDetail(scenarioId,sol){
    try{
        let query = solutionDetailInsert;
        //iterate over solution elements
        let elements = [];
        let element = [];

        for(i=0;i<sol.length;i++){
            let obj = JSON.parse(sol[i]);
            //INSERT INTO s01_solution_detail(scenario_id, `No`, E, S, a, b, `R+`, `R-`, NMin, NMax, NActual, T) VALUES ?
            element = [scenarioId, obj.no,obj.e, obj.s, obj.a, obj.b, obj.r, obj._r, obj.nmin, obj.nmax, obj.nactual, obj.t ]
            elements.push(element)
        }

         qResult = await dataSource.bulkInsertData(query,elements);
        return qResult;
        return [];
    }catch(err){
        return [];
    }
}

async function saveSolutionS02(scenarioId){
    try{
        let query = solutionSelectInsert;
        let params = [scenarioId];
        qResult = await dataSource.updateData(query,params);
        return qResult;
    }catch(err){
        return err;
    }
}



module.exports = {getS02,deletePreviousSolution,deleteS02,saveSolutionDetail,saveSolutionS02}