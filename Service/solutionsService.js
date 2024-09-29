const dataSource = require('../Datasource/MySQLMngr');

const getS02Query = 'select * from s02_optimal_flow_analysis s02 where s02.scenario_id = ?';


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



module.exports = {getS02}