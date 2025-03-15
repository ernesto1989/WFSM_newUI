/**
 * General Web server configuration file.
 * 
 * 1. Imports the express library.
 * 2. Configures ejs as template engine
 * 3. Configures cors and body parser for the server
 * 4. Defines static files folder as /public
 * 5. Imports the web specific project router and configure the server with the router
 * 6. Starts the server in the given port.
 * 
 * Ernesto Cantú
 * 07/10/2024
 */
const constants = require("./constants")
const express = require('express');
const bodyParser = require('body-parser');
const webSocket = require('ws');
const cors = require('cors');
const session = require('express-session');
const router = require("./Controllers/router");

function initWebProject(){
   
    const app = express();
    const server = require('http').createServer(app);
    
    app.set('view engine', 'ejs');
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(express.static('public'));

    app.use (session({
        secret: 'hahi9elakeddao1chhh1shh48',
        resave: false,
        saveUninitialized: false,
    }));
     
    app.use(router);

    //https://www.youtube.com/watch?v=wV-fDdHhGqs&t=30s
    const wss = new webSocket.Server({ server:server }); //create a server from http module to be able to integrate WS support  

    wss.on('connection', ws => {
        console.log("New client connected");
        //ws.send('Welcome New Client!!');

        ws.on('message', message => {
            //message from any client
            console.log(`Received message => ${message}`);
            ws.send(`Hello, you sent => ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });


    server.listen(constants.port, () => {
        console.log(`Waterflow Scenario Manager service running on port ${constants.port}`);
    });

}

module.exports = {initWebProject};