/**
 * Templates file handler.
 * 
 * It defines async functions to handle template GET requests.
 * Each function handles a single template in the /Ewiki/views
 * folder.
 * 
 * It uses ejs template engine.
 * 
 * Ernesto Cantú
 * 07/10/2024
 */
const constants = require("../../constants")
const scenariosService = require("../../Service/scenarioService")
const nodesService = require("../../Service/nodesService")
const catalogsService = require("../../Service/catalogsService")
const userServices = require("../../Service/usersService")
const regionsService = require("../../Service/regionsService")
const rolesService = require("../../Service/rolesService")

//Scenario Types. Must be checked.
const scenario_type = [
    {id:"1",desc:"Proposed"},
    {id:"2",desc:"Empty"}
]

//Must create catalogs for these three guys
let capacity_units = []
let time_units = []
let types = [];

/**
 * Method that initializes the capacity_units, time_units and types lists.
 */
async function loadLists(){
    types = await catalogsService.getTypes();
    cu = await catalogsService.getCapacityUnits();
    tu = await catalogsService.getTimeUnits();

    for(i=0;i<cu.length;i++)
        capacity_units.push(cu[i].unit_name);

    for(i=0;i<tu.length;i++)
        time_units.push(tu[i].unit_name);
}

loadLists();


/**
 * Index handler. It redirects to the main route of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function index(req,res){
    res.redirect(constants.contextURL);
}

/**
 * Metod that shows the login view.
* @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function getLogin(req,res){
    res.render('login');
}

/**
 * Method thad handles login post requests.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function postLogin(req,res){
    const { username, password } = req.body;

    user = await userServices.isValidUser(username, password);

    // Authenticate user
    if (user) {
        req.session.isLoggedIn = true;

        user.role = { id: user.role_id, name: user.role_name };
        if(user.role_id == 2){
            user.region = { id: user.region_id, name: user.region_name };
        }

        req.session.user = user;

        res.redirect('/WF');
    } else {
        res.redirect('/WF/login');
    }
}

/**
 * Method that handles the logout request.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function logout(req,res){
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/WF/login');
        }
    });
}

/**
 * Redirects to the home page of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            //region: sessionData.user.region.name, 
            role: sessionData.user.role.name
        }
    ]

    if(sessionData.user.role_id == 1){
        // user is admin and should not have a region assigned
        let regions = await regionsService.getRegions();
        res.render('admin', {user_info:session[0], regions_list:regions,base_scenario:constants.BASE_SCENARIO_ID});
        return;
    }

    session[0].region = sessionData.user.region;
    let scenarios = await scenariosService.getScenarios(sessionData.user.region.id);
    res.render('index', {base_scenario:constants.BASE_SCENARIO_ID,user_info:session[0],scenarios_list:scenarios, scenario_types:scenario_type, capacity_units:capacity_units,time_units:time_units});
}


async function index2(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            //region: sessionData.user.region.name, 
            role: sessionData.user.role.name
        }
    ]

    if(sessionData.user.role_id == 1){
        // user is admin and should not have a region assigned
        let regions = await regionsService.getRegions();
        res.render('admin', {user_info:session[0], regions_list:regions,base_scenario:constants.BASE_SCENARIO_ID});
        return;
    }

    session[0].region = sessionData.user.region;
    let scenarios = await scenariosService.getScenarios(sessionData.user.region.id);
    res.render('index2', {base_scenario:constants.BASE_SCENARIO_ID,user_info:session[0],scenarios_list:scenarios, scenario_types:scenario_type, capacity_units:capacity_units,time_units:time_units});
}

async function regionsGrid(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];
    
    if(sessionData.user.role_id == 2){
        res.redirect("/WF")
    }

    let inputRegions = await regionsService.getInputRegions();
    res.render("regions",{regions:inputRegions});
}

async function usersGrid(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];

    
    if(sessionData.user.role_id == 2){
        res.redirect("/WF")
    }

    let regions = await regionsService.getRegions();
    let roles = await rolesService.getRoles();
    res.render("users",{regions:regions,roles:roles});
}

/**
 * Method that shows the nodes view.
 * 
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 */
async function nodesGrid(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];

    if(sessionData.user.role_id == 2){
        session[0].region = sessionData.user.region;
    }else{
        let regionId = req.params.regionId;
        if(!sessionData.user.region || sessionData.user.region.id != regionId){
            let region = await regionsService.getRegionById(regionId);
            sessionData.user.region = region[0];
            sessionData.user.region_id = region[0].id;
            sessionData.user.region_name = region[0].name;
        }
        session[0].region = sessionData.user.region;
    }

    let scenarioId = req.params.scenarioId;
    let units = await scenariosService.getScenarioUnits(scenarioId,session[0].region.id);
    res.render("nodes",{user_info:session[0],scenarioId:scenarioId,base_scenario:constants.BASE_SCENARIO_ID, capacity_units:units[0].capacity_units,time_units:units[0].time_units});
}

/**
 * Method that shows the flows view.
 * 
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 */
async function flowsGrid(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];

    if(sessionData.user.role_id == 2){
        session[0].region = sessionData.user.region;
    }else{
        let regionId = req.params.regionId;
        if(!sessionData.user.region || sessionData.user.region.id != regionId){
            let region = await regionsService.getRegionById(regionId);
            sessionData.user.region = region[0];
            sessionData.user.region_id = region[0].id;
            sessionData.user.region_name = region[0].name;
        }
        session[0].region = sessionData.user.region;
    }

    let scenarioId = req.params.scenarioId;
    let nodes = await nodesService.getNodes(scenarioId,session[0].region.id)
    let units = await scenariosService.getScenarioUnits(scenarioId,session[0].region.id);

    if(!nodes)
        nodes = [];

    res.render("flows",{user_info:session[0],scenarioId:scenarioId,base_scenario:constants.BASE_SCENARIO_ID, capacity_units:units[0].capacity_units,time_units:units[0].time_units, nodes:nodes,flow_types:types});
}

/**
 * Method that shows the simulator's view.
 * 
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 */
async function simulationView(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];

    if(sessionData.user.role_id == 2){
        session[0].region = sessionData.user.region;
    }

    let scenarioId = req.params.scenarioId;
    res.render("simulator",{scenarioId:scenarioId,region_name:sessionData.user.region.name})
}

/**
 * Method that shows the solution's view.
 * 
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 */
async function solutionsView(req,res){
    const sessionData = req.session;

    if (!sessionData.isLoggedIn) {
        return res.redirect('/WF/login');
    }

    let session = [
        {
            username: sessionData.user.username,
            name: sessionData.user.name,
            role: sessionData.user.role
        }
    ];

    if(sessionData.user.role_id == 2){
        session[0].region = sessionData.user.region;
    }

    let scenarioId = req.params.scenarioId;
    res.render("solution",{scenarioId:scenarioId,region_name:sessionData.user.region.name})
}


module.exports = {getLogin,postLogin,logout,index,homePage, index2,regionsGrid,usersGrid,nodesGrid,flowsGrid,simulationView,solutionsView}