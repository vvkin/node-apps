'use strict';

const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.end('<h1>WS Chat</h1>');
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
