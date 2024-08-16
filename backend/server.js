const http = require('http');
const app = require('./app');

const { initWebSocketServer } = require('./utils/websocket');

const server = http.createServer(app);

initWebSocketServer(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});