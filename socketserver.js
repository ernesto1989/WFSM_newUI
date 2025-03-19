/**
 * Web Socket server configuration file.
*/
const webSocket = require('ws');
const { URL } = require('url');
const users = new Map();

function sendMessageToUser(userId, message) {
    const ws = users.get(userId);
    if (ws) {
        ws.send(message);
    } else {
        console.log(`User ${userId} not connected`);
    }
}

function initWebSocket(server){
    //https://www.youtube.com/watch?v=wV-fDdHhGqs&t=30s
    const wss = new webSocket.Server({ server:server }); //gonna share the server with the web server

    wss.on('connection', (ws,req) => {
        console.log("New client connected");

        const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
        const userId = params.get('userId');

        if (!userId) {
            console.log('Connection rejected: No userId provided');
            ws.close();
            return;
        }
    
        // Store the WebSocket connection with userId as the key
        users.set(userId, ws);
        console.log(`User ${userId} connected`);


        ws.on('message', message => {
            //message from any client
            console.log(`Received message => ${message}`);
            ws.send(`Hello, you sent => ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}


module.exports = {initWebSocket,sendMessageToUser};