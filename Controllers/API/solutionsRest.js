const service = require("../../Service/solutionsService")
const scenarioService = require("../../Service/scenarioService")
const nodesService = require("../../Service/nodesService")
const flowsService = require("../../Service/flowsService")
const axios = require('axios')

/**
 * Method that returns the list of nodes from a specific scenario.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getScenarioSolution(req,res){
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

        const scenarioId = req.body.scenario_id;
        const city_id = sessionData.user.city.id;
        const scenario = await scenarioService.getScenarioById(scenarioId,city_id)
        const result = await service.getS02(scenarioId,city_id); 

        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.length,
            "records" : {
                'scenario':scenario,
                'solution':result
            }
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

async function solve(req,res){
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
        
        const scenarioId = req.body.scenario_id;
        const city_id = sessionData.user.city.id;
        let nodes = await nodesService.getNodes(scenarioId,city_id);
        let flows = await flowsService.getFlows(scenarioId,city_id,true);

        const solution = await axios({
            method: 'get',
            url: 'http://localhost:5000/WF/Solve',
            data:{
                'nodes':nodes,
                'flows':flows
            },
            headers:{'Content-Type':'application/json'}
        });

        let prev_result = await service.deletePreviousSolution(scenarioId,city_id);
        let prev_result2 = await service.deleteS02(scenarioId,city_id);
        if(prev_result.status && prev_result2.status){
            let result = await service.saveSolutionDetail(scenarioId,solution.data.raw_solution,city_id);
            let result2 = await service.saveSolutionS02(scenarioId,solution.data.proposed_flows,city_id);
            if(result.status && result2.status){
                res.status(200);
                res.json({
                    "status"  : "success",
                    "total"   : 1 , //change
                    "records" : 
                    {}
                });
            }else{
                res.status(500);
                res.json({
                    "status"  : "error",
                    "total"   : 0 , //change
                    "records" : 
                    {}
                });
            }
        }else{
            res.status(500);
            res.json({
                "status"  : "error",
                "total"   : 0 , //change
                "records" : 
                {}
            });
        }   
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

module.exports={getScenarioSolution,solve}