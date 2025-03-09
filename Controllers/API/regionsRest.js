const regionsService = require("../../Service/regionsService")

/**
 * Method that gets a scenario by its ID
 * @param {Object} req Request Object
 * @param {Object} res Response to the client.
 */
async function getRegion(req,res){
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

        const region_id = [req.body.region_id];
        const result = await regionsService.getRegionDetails(region_id);

        res.status(200);
        res.json({
            "status"  : "success",
            "records" : {
                region:result,
                //scenario_trl:resultTRL
            }
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }
}

async function getRegions(req,res){
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

        const result = await regionsService.getAllRegions();

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

async function createNewRegion(req,res){
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

        const region_id = req.body.region_id;
        const result = await regionsService.createNewRegion(region_id);

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


async function updateRegions(req,res){
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

        const result = await regionsService.updateRegions();

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

module.exports = {getRegion,getRegions,createNewRegion,updateRegions};