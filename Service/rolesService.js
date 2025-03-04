const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants')

//added id 2 toimes in order to use it on W2UI and Python Web Service
const getRolsQuery = "SELECT id,name FROM u02_roles";



/**
 * This method gets the Regions list
 * 
 * @returns the list of Regions in the scenario.
 */
async function getRoles(){
    try{
        let query = getRolsQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {getRoles}