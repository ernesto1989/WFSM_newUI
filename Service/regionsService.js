const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants')

//added id 2 toimes in order to use it on W2UI and Python Web Service
const getRegionsQuery = "SELECT id,name FROM u01_regions";
const getRegionByIdQuery = 'select id,name from u01_regions where id = ?';
const getRegionDetailsQuery =
`
SELECT 
	u01.id as region_id,
	u01.name as region_name,
	u01.description,
	z01.cdate as creation_date,
	z01.cdate as update_date, ## must be provided
	(select count(*) from a01_nodes a01 WHERE a01.scenario_id = z01.scenario_id and a01.region_id = u01.id) as nodes,
	(select count(*) from a02_flows a02 WHERE a02.scenario_id = z01.scenario_id and a02.region_id = u01.id) as flows,
    (select count(*) from u03_users u03 WHERE u03.region_id = u01.id) as users
FROM u01_regions u01 
join z01_scenarios z01 on z01.region_id = u01.id
WHERE u01.id = ? and z01.scenario_id = ?`;


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

async function getRegionById(region_id){
    try{
        let query = getRegionByIdQuery;
        let params = [region_id,constants.BASE_SCENARIO_ID]
        qResult = await dataSource.getDataWithParams(query,params);
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
async function getRegionDetails(region_id){
    try{
        let query = getRegionDetailsQuery;
        let params = [region_id,constants.BASE_SCENARIO_ID]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}



module.exports = {getRegions,getRegionById, getRegionDetails}