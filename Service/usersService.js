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

const userQquery = 
`   SELECT 
        u03.username,
        u03.name,
        u03.password ,
        u03.role_id, 
        u02.name as role_name,
        u03.region_id,
        u01.name as region_name
    from u03_users u03 
    join u02_roles u02 on u02.id = u03.role_id
    left join u01_regions u01 on u01.id = u03.region_id 
    where u03.username = ? and password = ?
`;

const getUsersQuery = 
`   SELECT 
        u03.id as recid,
        u03.username,
        u03.name,
        u03.password ,
        u03.role_id, 
        u02.name as role_name,
        u03.region_id,
        u01.name as region_name
    from u03_users u03 
    join u02_roles u02 on u02.id = u03.role_id
    left join u01_regions u01 on u01.id = u03.region_id 
`;


async function isValidUser(username, password) {
    try{
        let query = userQquery
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


async function getUsers(){
    try{
        let query = getUsersQuery;
        qResult = await dataSource.getData(query);
        return qResult.rows;
    }catch(err){
        return [];
    }
}

module.exports = {isValidUser,getUsers};