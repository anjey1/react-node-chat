// src/websocket.js

const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8081'

export let send
let onMessageCallback

// initialize the websocket connection
export const startWebsocketConnection = (image) => {
  // A new Websocket connection is initialized with the node server
  const ws = new window.WebSocket('ws://' + host + '/chat') || {}
  let usersCache = [];

  // If the connection is successfully opened, we log to the console
  ws.onopen = (e) => {
    console.log('opened ws connection')
    usersCache.push(image);
  }

  // If the connection is closed, we log that as well, along with
  // the error code and reason for closure
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason)
    usersCache = usersCache.filter(e => e !== image)
  }

  // This callback is called everytime a message is received.
  ws.onmessage = (e) => {
    // The onMessageCallback function is called with the message
    // data as the argument
    onMessageCallback && onMessageCallback(e.data, JSON.parse(e.data).usersCache)
  }

  // We assign the send method of the connection to the exported
  // send variable that we defined earlier
  send = ws.send.bind(ws)
  console.log("send: ", send);
}

// This function is called by our React application to register a callback
// that needs to be called everytime a new message is received
export const registerOnMessageCallback = (fn) => {
  // The callback function is supplied as an argument and assigned to the 
  // `onMessageCallback` variable we declared earlier
  onMessageCallback = fn
}