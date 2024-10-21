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
        let node = req.body;
        let result;
        if(!node.new_record){
            //update
            result = await nodesService.updateNode(node);  
            res.status(200);
            res.json({
                "status"  : "success",
                "total"   : result.length,
                "records" : []
            });          
        }else{
            //insert
            result = nodesService.insertNode(node);
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
        let node = req.body;
        let result = nodesService.deleteNode(node);
       
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