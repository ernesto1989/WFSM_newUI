/**
 * Router configuration file for the specific web application.
 * 
 * 1. Imports the corresponding express library and router.
 * 2. Reads the templates handler file
 * 3. Reads the api handler file
 * 4. Defines a Generic Upload File Rest Service that redirects to a specific 
 *    Upload handler
 * 
 * Ernesto Cantú
 * 07/10/2024
 */
const express = require('express');
const router = express.Router();
const templates = require('./Template/templates')
const regionsApi = require("./API/regionsRest")
const scenariosApi = require("./API/scenariosRest")
const usersApi = require("./API/usersRest")
const nodesApi = require("./API/nodesRest")
const flowsApi = require("./API/flowsRest")
const solutionsApi = require("./API/solutionsRest")
const constants = require("../constants")


/*TEMPLATES routes */
router.get(constants.indexURL, templates.index);
router.get(constants.contextURL+'/login', templates.getLogin);
router.get(constants.contextURL+'/logout', templates.logout);
router.get(constants.contextURL, templates.homePage);
router.get(constants.contextURL+'/regions', templates.regionsGrid);
router.get(constants.contextURL+'/users', templates.usersGrid);
router.get(constants.contextURL+'/nodes/:scenarioId', templates.nodesGrid);
router.get(constants.contextURL+'/nodes/:scenarioId/:regionId', templates.nodesGrid);
router.get(constants.contextURL+'/flows/:scenarioId', templates.flowsGrid);
router.get(constants.contextURL+'/flows/:scenarioId/:regionId', templates.flowsGrid);
router.get(constants.contextURL+'/simulator/:scenarioId', templates.simulationView);
router.get(constants.contextURL+'/solution/:scenarioId', templates.solutionsView);

/*API routes */
router.post(constants.contextURL+'/login', templates.postLogin);
router.post(constants.contextURL + constants.apiURL+'/getRegion', regionsApi.getRegion);
router.post(constants.contextURL + constants.apiURL+'/createNewRegion', regionsApi.createNewRegion);
router.post(constants.contextURL + constants.apiURL+'/updateRegions', regionsApi.updateRegions);
router.post(constants.contextURL + constants.apiURL+'/getScenario', scenariosApi.getScenario);
router.post(constants.contextURL + constants.apiURL + '/getScenarioTRL', scenariosApi.getScenarioTRL);
router.post(constants.contextURL + constants.apiURL + '/saveScenario', scenariosApi.saveScenario);
router.post(constants.contextURL + constants.apiURL + '/recalcTRL', scenariosApi.recalcTRL);
router.post(constants.contextURL + constants.apiURL + '/deleteScenario', scenariosApi.deleteScenario);
router.post(constants.contextURL + constants.apiURL + "/getSolution",solutionsApi.getScenarioSolution);
router.post(constants.contextURL + constants.apiURL + '/solve', solutionsApi.solve);

//Grid management
router.get(constants.contextURL + constants.apiURL + "/getRegions",regionsApi.getRegions);
router.get(constants.contextURL + constants.apiURL + "/getUsers",usersApi.getUsers);
router.post(constants.contextURL + constants.apiURL + "/saveUser",usersApi.saveUser);
router.post(constants.contextURL + constants.apiURL + "/changePass",usersApi.changePass);
router.post(constants.contextURL + constants.apiURL + "/deleteUser",usersApi.deleteUser);

router.get(constants.contextURL + constants.apiURL + "/getNodes/:scenarioId",nodesApi.getScenarioNodes);
router.post(constants.contextURL + constants.apiURL + "/saveNode",nodesApi.saveNode);
router.post(constants.contextURL + constants.apiURL + "/deleteNode",nodesApi.deleteNode);

router.get(constants.contextURL + constants.apiURL + "/getFlows/:scenarioId",flowsApi.getScenarioFlows);
router.post(constants.contextURL + constants.apiURL + "/saveFlow",flowsApi.saveFlow);
router.post(constants.contextURL + constants.apiURL + "/deleteFlow",flowsApi.deleteFlow);

module.exports = router;