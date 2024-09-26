const scenarioService = require("../../Service/scenarioService")


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




module.exports = {getScenario};