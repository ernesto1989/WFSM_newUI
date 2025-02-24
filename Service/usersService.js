/**
 * This file contains the service for the users.
 * 
 * currently, as it has no database, it only validates the user
 * and password against a hardcoded value.
 * 
 * also manages roles and cities.
 */

const cities = [];
const roles = [];
const users = [];

async function initcities() {
    cities[0] = { id: 0, name: 'demo city' };
    cities[1] = { id: 1, name: 'Az' };
}

const initRoles = async () => {
    roles[0] = { id: 0, name: 'admin' };
    roles[1] = { id: 1, name: 'user' };
}
const initUsers = async () => {
    users["admin"] = { id: 0, username: 'admin', name:'Administrador', password: 'admin', role_id: 0 };
    users["demouser"] ={ id: 1, username: 'demouser', name:'Demo User', password: 'user', city_id: 0, role_id: 1 };
    users["az_user"] ={ id: 1, username: 'az_user', name:'Arizona User', password: 'user', city_id: 1, role_id: 1 };
}

initcities();
initRoles();
initUsers();

async function isValidUser(username, password) {
    let user = users[username];
    if (user && user.password === password) {
        return user;
    }
    return null;
}


module.exports = {cities, roles, users,isValidUser};