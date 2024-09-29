const flowsService = require("../../Service/flowsService")

/**
 * Method that returns the list of nodes from a specific scenario.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getScenarioFlows(req,res){
    try{
        const scenarioId = req.params.scenarioId;

        const result = await flowsService.getFlows(scenarioId); 

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


module.exports = {getScenarioFlows};