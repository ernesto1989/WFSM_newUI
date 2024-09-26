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
const api = require("./API/scenariosRest")
const constants = require("../constants")


/*TEMPLATES routes */
router.get(constants.indexURL, templates.index);
router.get(constants.contextURL, templates.homePage);


router.post(constants.contextURL + constants.apiURL+'/getScenario', api.getScenario);

module.exports = router;