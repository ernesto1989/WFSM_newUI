const scenarioService = require("../../Service/scenarioService")

const nodesService = require("../../Service/nodesService")
const flowsService = require("../../Service/flowsService")
const axios = require('axios')

async function getScenario(req,res){
    try{
        const id_scenario = params = [req.body.scenario_id];
        const resultScenario = await scenarioService.getScenarioById(id_scenario);
        const resultTRL = await scenarioService.getScenarioTRLById(id_scenario);

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
        const scenario = req.body;
        let total = 0;
        let result = await scenarioService.createEmptyScenario(scenario);

        total = result.changes

        if(scenario.type == 1){
            //Proposed
            let result2 = await nodesService.copyA01(scenario);
            let result3 = await flowsService.copyA02(scenario);

            let nodes = await nodesService.getNodes(scenario.scenario_id);
            let flows = await flowsService.getFlows(scenario.scenario_id);

            const timeToLimit = await axios({
                method: 'get',
                url: 'http://localhost:5000/WF/TimeToLimit',
                data:{
                    'nodes':nodes,
                    'flows':flows
                },
                headers:{'Content-Type':'application/json'}
            });
            
            let result4 = await scenarioService.insertA03(scenario.scenario_id,timeToLimit.data)

            total += result.changes + result2.changes + result3.changes + result4.changes;
        }

        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : total , //change
            "records" : 
            {}
        });

    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

async function deleteScenario(req,res){
    try{
        const scenario_id = params = [req.body.scenario_id];

        let result = await scenarioService.deleteScenario(scenario_id);

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


module.exports = {getScenario,saveScenario,deleteScenario};