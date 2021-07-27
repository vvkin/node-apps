'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8080;
const STATIC_DIR = './static';

const httpError = (code, res) => {
  const message = http.STATUS_CODES[code];
  res.writeHead(code).end(message);
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === 'GET') {
    const fileName = url.substring(1) || 'index.html';
    const filePath = path.join(STATIC_DIR, fileName);
    fs.readFile(filePath, (err, content) => {
      if (err) httpError(404, res);
      res.end(content);
    });
  } else httpError(405, res);
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
