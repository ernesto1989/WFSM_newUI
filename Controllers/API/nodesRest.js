const nodesService = require("../../Service/nodesService")
const flowsService = require("../../Service/flowsService")


/**
 * Method that returns the list of nodes from a specific scenario.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getScenarioNodes(req,res){
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
        const region_id = sessionData.user.region.id;
        const result = await nodesService.getNodes(scenarioId,region_id); 

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

/**
 * Endpoint that handles Nodes table modifications.
 * 
 * Changes can be:
 * a) New records -> New Records must be identified and sotred
 * b) Updates
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function saveNode(req,res){
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

        let node = req.body;
        const region_id = sessionData.user.region.id;
        let result;
        if(!node.new_record){
            //update
            result = await nodesService.updateNode(node,region_id);  
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.length,
                "records" : []
            });          
        }else{
            //insert
            result = await nodesService.insertNode(node,region_id);
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

async function deleteNode(req,res){
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
        
        let node = req.body;
        const region_id = sessionData.user.region.id;
        let result = await nodesService.deleteNode(node,region_id);
        await flowsService.deleteFlowsByNodeIn(node,region_id);
        await flowsService.deleteFlowsByNodeOut(node,region_id);
       
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

module.exports={getScenarioNodes, saveNode,deleteNode}