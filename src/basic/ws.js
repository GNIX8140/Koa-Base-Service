const WSService = (ws) => {
    ws.on('connection', Connection);
}
const Connection = (conn, req) => {
    console.log('WebSocket Connected');
    conn.on('message', Message);
    conn.on('error', Error);
}
const Message = (message) => {
    message = message.toString();
    console.log('WebSocket Message: ', message);
}
const Error = (error) => {
    console.log('WebSocket Error:', error);
}
module.exports = WSService;