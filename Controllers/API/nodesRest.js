const nodesService = require("../../Service/nodesService")



/**
 * Method that returns the list of nodes from a specific scenario.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getScenarioNodes(req,res){
    try{
        const scenarioId = req.params.scenarioId;

        const result = await nodesService.getNodes(scenarioId); 

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

module.exports={getScenarioNodes}