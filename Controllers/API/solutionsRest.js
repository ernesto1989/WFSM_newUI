const service = require("../../Service/solutionsService")
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
        const scenarioId = req.params.scenarioId;

        const result = await service.getS02(scenarioId); 

        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.length,
            "records" : result
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

async function solve(req,res){
    try{
        const scenarioId = req.body.scenario_id;

        let nodes = await nodesService.getNodes(scenarioId);
        let flows = await flowsService.getFlows(scenarioId);

        const solution = await axios({
            method: 'get',
            url: 'http://localhost:5000/WF/Solve',
            data:{
                'nodes':nodes,
                'flows':flows
            },
            headers:{'Content-Type':'application/json'}
        });

        let prev_result = await service.deletePreviousSolution(scenarioId);
        let prev_result2 = await service.deleteS02(scenarioId);
        if(prev_result.status && prev_result2.status){
            let result = await service.saveSolutionDetail(scenarioId,solution.data.raw_solution);
            let result2 = await service.saveSolutionS02(scenarioId,solution.data.proposed_flows);
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