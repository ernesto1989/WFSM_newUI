const scenarioService = require("../../Service/scenarioService")

const nodesService = require("../../Service/nodesService")
const flowsService = require("../../Service/flowsService")
const socketServer = require("../../socketserver");
const axios = require('axios')

/**
 * Method that gets a scenario by its ID
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getScenario(req,res){
    try{
        const sessionData = req.session;

        if (!sessionData.isLoggedIn) {
            res.status(401);
            res.json({
                "status"  : "failed",
                "error"   : "Unauthorized"
            });
            return;
        }

        const region_id = sessionData.user.region.id;
        const id_scenario = params = [req.body.scenario_id];
        const resultScenario = await scenarioService.getScenarioById(id_scenario,region_id);
        //const resultTRL = await scenarioService.getScenarioTRLById(id_scenario);

        res.status(200);
        res.json({
            "status"  : "success",
            "records" : {
                scenario_details:resultScenario,
                //scenario_trl:resultTRL
            }
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

/**
 * Method that gets the Scenario's time to reach the limit, acoording to the nodes and flows.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getScenarioTRL(req,res){
    try{
        const sessionData = req.session;

        if (!sessionData.isLoggedIn) {
            res.status(401);
            res.json({
                "status"  : "failed",
                "error"   : "Unauthorized"
            });
            return;
        }

        const region_id = sessionData.user.region.id;
        const id_scenario = params = [req.body.scenario_id];
        const resultScenario = await scenarioService.getScenarioById(id_scenario,region_id);
        const resultTRL = await scenarioService.getScenarioTRLById(id_scenario,region_id);

        res.status(200);
        res.json({
            "status"  : "success",
            "records" : {
                scenario_details:resultScenario,
                scenario_trl:resultTRL
            }
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

/**
 * The save scenario method creates a copy of a given Scenario into a new scenario object.
 * 
 * NOTE: It should be renamed and maybe redistributed into different parts
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function saveScenario(req,res){
    try{
        const sessionData = req.session;

        if (!sessionData.isLoggedIn) {
            res.status(401);
            res.json({
                "status"  : "failed",
                "error"   : "Unauthorized"
            });
            return;
        }

        const region_id = sessionData.user.region.id;
        const scenario = req.body;
        let total = 0;
        let result = await scenarioService.createEmptyScenario(scenario,region_id);
        let msg = '';
        total = result.changes;

        if(scenario.type == 1){
            //Proposed
            let result2 = await nodesService.copyA01(scenario,region_id);
            let result3 = await flowsService.copyA02(scenario,region_id);

            let nodes = await nodesService.getNodes(scenario.scenario_id,region_id);
            let flows = await flowsService.getFlows(scenario.scenario_id,region_id);
            let timeToLimit;
            let result4;
            
            try{
                timeToLimit = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/WF/TimeToLimit',
                    data:{
                        'nodes':nodes,
                        'flows':flows
                    },
                    headers:{'Content-Type':'application/json'}
                });
                result4 = await scenarioService.insertA03(scenario.scenario_id,timeToLimit.data,region_id);
            }catch(err){
                msg = 'OSF Service Unavailable';
            }

            if(result4)
                total += result2.changes + result3.changes + result4.changes;
            else{
                total += result2.changes + result3.changes;
                await scenarioService.updateScenarioTRLFlag(0,scenario.scenario_id,region_id);
            }
        }

        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : total , //change
            "records" : 
            {},
            "message":msg
        });
        let message = {action:'update_scenario',scenario_id:scenario.scenario_id};
        socketServer.sendMessageToUser(sessionData.user.username,JSON.stringify(message));
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}


async function recalcTRL(req,res){
    try{
        const sessionData = req.session;

        if (!sessionData.isLoggedIn) {
            res.status(401);
            res.json({
                "status"  : "failed",
                "error"   : "Unauthorized"
            });
            return;
        }

        const scenario = req.body;
        const region_id = sessionData.user.region.id;
        let nodes = await nodesService.getNodes(scenario.scenario_id,region_id);
        let flows = await flowsService.getFlows(scenario.scenario_id,region_id);

        const timeToLimit = await axios({
            method: 'get',
            url: 'http://localhost:4000/WF/TimeToLimit',
            data:{
                'nodes':nodes,
                'flows':flows
            },
            headers:{'Content-Type':'application/json'}
        });
        
        let r1 = await scenarioService.deleteA03(scenario.scenario_id,region_id);
        let r = await scenarioService.insertA03(scenario.scenario_id,timeToLimit.data,region_id)
        await scenarioService.updateScenarioTRLFlag(0,scenario.scenario_id,region_id);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : r.changes , //change
            "records" : 
            {}
        });

    }catch(error){
        console.log(error);
        res.status(200);
        res.json({
            "status"  : "failed",
            "error"   : "Service not available"
        });
    }
}

/**
 * Method that deletes a scenario.
 * @param {Object} req Request Object.
 * @param {Object} res Response Object.
 */
async function deleteScenario(req,res){
    try{
        const sessionData = req.session;

        if (!sessionData.isLoggedIn) {
            res.status(401);
            res.json({
                "status"  : "failed",
                "error"   : "Unauthorized"
            });
            return;
        }
        
        const scenario_id = params = [req.body.scenario_id];
        const region_id = sessionData.user.region.id;
        let result = await scenarioService.deleteScenario(scenario_id,region_id);

        res.status(200);
        res.json({
            "status"  : "success",
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}


module.exports = {getScenario,getScenarioTRL,saveScenario,recalcTRL,deleteScenario};