const dataSource = require('../Datasource/MySQLMngr');

const getTypesQuery = 'SELECT id as type_id,name as type FROM x01_flow_types'

async function getTypes(scenarioId){
    try{
        let query = getTypesQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {
    getTypes
}