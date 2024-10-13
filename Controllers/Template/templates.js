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


const scenario_type = [
    //{id:"0",desc:"Real Time"},
    {id:"1",desc:"Proposed"},
    {id:"2",desc:"Empty"}
]

//Must create catalogs for these three guys
const capacity_units = [
    "M3", "LTS"
]

const time_units = [
    "MINS", "HRS","DAYS"
]

let types = ['fijo','variable'];



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
 * Redirects to the home page of the project.
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    let session = [
        {
            username: "ecantuv",
            name: "Ernesto Cantú"
        }
    ]
    
    let scenarios = await scenariosService.getScenarios();

    res.render('index', {user_info:session[0],scenarios_list:scenarios, scenario_types:scenario_type, capacity_units:capacity_units,time_units:time_units});
}

/**
 * Method that shows the nodes view.
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 */
async function nodesGrid(req,res){
    let scenarioId = req.params.scenarioId;
    let units = await scenariosService.getScenarioUnits(scenarioId);
    res.render("nodes",{scenarioId:scenarioId, capacity_units:units[0].capacity_units,time_units:units[0].time_units, node_types:types});
}

async function flowsGrid(req,res){
    let scenarioId = req.params.scenarioId;
    let nodes = await nodesService.getNodes(scenarioId)
    let units = await scenariosService.getScenarioUnits(scenarioId);

    if(!nodes)
        nodes = [];

    res.render("flows",{scenarioId:scenarioId, capacity_units:units[0].capacity_units,time_units:units[0].time_units, nodes:nodes,flow_types:types});
}

async function solutionsView(req,res){
    let scenarioId = req.params.scenarioId;
    res.render("solution",{scenarioId:scenarioId})
}


module.exports = {index,homePage,nodesGrid,flowsGrid,solutionsView}