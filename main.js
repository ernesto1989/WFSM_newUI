/**
 * Water flow scenario manager
 * 
 * Water Management System
 * 
 * 07/15/2024
 * 
 * Ernesto Cantú
 */

const server = require("./webserver")
server.initWebProject();


//encoded params for looker studio - simulator: 
//'%7B%22ds0.scenario_id%22%3A%22ESC-BASE%22%2C%22ds1.scenario_id%22%3A%22ESC-BASE%22%7D'
//%7B%22ds1.scenario_id%22%3A%22ESC-BASE%22%7D
//%7B%22ds1.scenario_id%22%3A%22Scenario_01%22%7D
/*

    <iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/2becc779-cf30-4a7d-9b37-9363fc1acdb1/page/4wIIE" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>

    <iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/2becc779-cf30-4a7d-9b37-9363fc1acdb1/page/4wIIE?params=%7B%22ds1.scenario_id%22%3A%22Scenario_01%22%7D" frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
*/