const express = require('express')
const expressWs = require('express-ws')

const app = express()
let messageCache = []
let usersCache = []

// Decorate the app with web sockets
expressWs(app)

// Client existing connections
const connections = new Set()

// Handler for adding connections
const wsHandler = (ws) => {
  connections.add(ws)

  // Retrive old massages for new conenctions
  messageCache.forEach(msg => ws.send(msg))

  // Massage Handler
  ws.on('message', (message) => {
    // Add to cache and send to all
    messageCache.push(message)
    const parsedMessage = JSON.parse(message);
    if (usersCache.indexOf(parsedMessage.userImage) < 0) {
      usersCache.push(parsedMessage.userImage);
      ws.userImageId = parsedMessage.userImage;
    }
    parsedMessage.usersCache = usersCache
    connections.forEach((conn) => conn.send(JSON.stringify(parsedMessage)))

  })

  // Close chat Handler
  ws.on('close', (e) => {
    usersCache = usersCache.filter(e => e !== ws.userImageId)
    // The closed connection is removed from the set
    connections.delete(ws)
  })
}

// add our websocket handler to the '/chat' route
app.ws('/chat', wsHandler)

// static folder for PROD
app.use(express.static('build'))

// start the server, listening to port 8081
app.listen(8081)
