const flowsService = require("../../Service/flowsService")

/**
 * Method that returns the list of nodes from a specific scenario.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getScenarioFlows(req,res){
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

        const scenarioId = req.params.scenarioId;
        const city_id = sessionData.user.city.id;
        const result = await flowsService.getFlows(scenarioId,city_id); 

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


async function saveFlow(req,res){
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

        let flow = req.body;
        const city_id = sessionData.user.city.id;
        let result;
        if(flow.new_record === 'false'){
            //update
            result = await flowsService.updateFlow(flow,city_id);  
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.length,
                "records" : []
            });          
        }else{
            //insert
            result = await flowsService.insertFlow(flow,city_id);
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.changes,
                "records" : []
            });
        }
        
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

async function deleteFlow(req,res){
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
        const city_id = sessionData.user.city.id;
        let flow = req.body;
        let result = await flowsService.deleteFlow(flow,city_id);
       
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes,
            "records" : []
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}


module.exports = {getScenarioFlows,saveFlow,deleteFlow};