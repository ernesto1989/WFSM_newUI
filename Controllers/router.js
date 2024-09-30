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
const scenariosApi = require("./API/scenariosRest")
const nodesApi = require("./API/nodesRest")
const flowsApi = require("./API/flowsRest")
const solutionsApi = require("./API/solutionsRest")
const constants = require("../constants")


/*TEMPLATES routes */
router.get(constants.indexURL, templates.index);
router.get(constants.contextURL, templates.homePage);
router.get(constants.contextURL+'/nodes/:scenarioId', templates.nodesGrid);
router.get(constants.contextURL+'/flows/:scenarioId', templates.flowsGrid);
router.get(constants.contextURL+'/solution/:scenarioId', templates.solutionsView);



router.post(constants.contextURL + constants.apiURL+'/getScenario', scenariosApi.getScenario);
router.post(constants.contextURL + constants.apiURL + '/saveScenario', scenariosApi.saveScenario);
router.post(constants.contextURL + constants.apiURL + '/recalcTRL', scenariosApi.recalcTRL);
router.post(constants.contextURL + constants.apiURL + '/deleteScenario', scenariosApi.deleteScenario);

router.get(constants.contextURL + constants.apiURL + "/getNodes/:scenarioId",nodesApi.getScenarioNodes);
router.get(constants.contextURL + constants.apiURL + "/getFlows/:scenarioId",flowsApi.getScenarioFlows);
router.get(constants.contextURL + constants.apiURL + "/getSolution/:scenarioId",solutionsApi.getScenarioSolution);

module.exports = router;