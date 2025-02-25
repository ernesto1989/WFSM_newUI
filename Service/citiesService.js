const dataSource = require('../Datasource/MySQLMngr');

//added id 2 toimes in order to use it on W2UI and Python Web Service
const getCitiesQuery = "SELECT id,name FROM u01_cities";
const getCityByIdQuery = "SELECT id,name FROM u01_cities WHERE id = ?";


/**
 * This method gets the cities list
 * 
 * @returns the list of cities in the scenario.
 */
async function getCities(){
    try{
        let query = getCitiesQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

/**
 * This method gets a city by id
 * 
 * @param {*} city_id the city id
 * @returns the city.
 */
async function getCityById(city_id){
    try{
        let query = getCityByIdQuery;
        let params = [city_id]
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {getCities,getCityById}