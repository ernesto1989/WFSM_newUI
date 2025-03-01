const dataSource = require('../Datasource/MySQLMngr');

//added id 2 toimes in order to use it on W2UI and Python Web Service
const getRegionsQuery = "SELECT id,name FROM u01_regions";
const getRegionByIdQuery = "SELECT id,name FROM u01_regions WHERE id = ?";


/**
 * This method gets the Regions list
 * 
 * @returns the list of Regions in the scenario.
 */
async function getRegions(){
    try{
        let query = getRegionsQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * This method gets a Region by id
 * 
 * @param {*} Region_id the Region id
 * @returns the Region.
 */
async function getRegionById(Region_id){
    try{
        let query = getRegionByIdQuery;
        let params = [Region_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {getRegions,getRegionById}