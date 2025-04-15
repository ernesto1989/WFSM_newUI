/**
 * Web Socket server configuration file.
*/
const webSocket = require('ws');
const { URL } = require('url');
const users = new Map();

function sendMessageToUser(userId, message) {
    for(var k of users.entries()){
        let key = k[0]; // look for all windows opened by user
        if(key.startsWith(userId)){
            //must be notified
            const ws = users.get(key);
            ws.send(message);
        }
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