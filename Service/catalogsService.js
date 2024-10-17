const dataSource = require('../Datasource/MySQLMngr');

const getTypesQuery = 'SELECT id as type_id,name as type FROM x01_flow_types'
const getCapacityUnitsQuery = "SELECT unit_name FROM x02_capacity_units WHERE unit_type = 'capacity'";
const getTimeUnitsQuery = "SELECT unit_name FROM x02_capacity_units WHERE unit_type = 'time'";

async function getTypes(){
    try{
        let query = getTypesQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getCapacityUnits(){
    try{
        let query = getCapacityUnitsQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

async function getTimeUnits(){
    try{
        let query = getTimeUnitsQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {
    getTypes,getCapacityUnits,getTimeUnits
}