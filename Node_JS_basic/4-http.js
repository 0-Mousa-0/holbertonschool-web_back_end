const http = require('http');

const PORT = 1245;

// Instantiates the core server infrastructure
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello Holberton School!');
});

app.listen(PORT);

module.exports = app;