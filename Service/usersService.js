/**
 * This file contains the service for the users.
 * 
 * PENDING: Password Encription!
 * Already consuming from database.
 * 
 * Requrie more testing
 * 
 * 02/24/2025
 */
const dataSource = require('../Datasource/MySQLMngr');

const user_query = 
`   SELECT 
        u03.username,
        u03.name,
        u03.password ,
        u03.role_id, 
        u02.name as role_name,
        u03.city_id,
        u01.name as city_name
    from u03_users u03 
    join u02_roles u02 on u02.id = u03.role_id
    left join u01_cities u01 on u01.id = u03.city_id 
    where u03.username = ? and password = ?
`;

async function isValidUser(username, password) {
    try{
        let query = user_query
        let params = [username,password];
        qResult = await dataSource.getDataWithParams(query,params);
        return qResult.rows[0];
        // if (user && user.password === password) {
        //     return user;
        // }
    }catch(err){
        return null;
    }
    
    
}


module.exports = {isValidUser};