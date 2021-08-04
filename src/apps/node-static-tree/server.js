'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');

const HOST = '127.0.0.1';
const PORT = 8080;

const STATIC_PATH = path.join(process.cwd(), './static');
const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  js: 'text/javascript; charset=UTF-8',
  css: 'text/css',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg',
  ico: 'image/ico',
  json: 'application/json',
  default: 'text/html; charset=UTF-8',
};

const formatItem = (href, path) => `<li><a href="${href}">${path}</a></li>`;

const indexDirectory = (filePath) => {
  const stream = new Readable({
    read() {
      fs.readdir(filePath, { withFileTypes: true }, (err, items) => {
        if (err) return;
        const relative = '/' + path.relative(STATIC_PATH, filePath);
        const parent = path.join(relative, '..');
        const list = items.map((item) => {
          const itemName = item.name + (item.isDirectory() ? '/' : '');
          const itemHref = path.join(relative, itemName);
          return formatItem(itemHref, itemName);
        });
        this.push(`<h2>Directory ${relative} index:</h2>`);
        this.push(`<ul>${formatItem(parent, '../') + list.join('\n')}<ul>`);
        this.push(null);
      });
    },
  });
  return stream;
};

const serveStatic = async (fileName) => {
  const filePath = path.join(STATIC_PATH, fileName);
  try {
    const stats = await fs.promises.stat(filePath);
    const stream = stats.isFile()
      ? fs.createReadStream(filePath)
      : indexDirectory(filePath);
    return stream;
  } catch (err) {
    return null;
  }
};

const httpError = (code, res) => {
  const message = http.STATUS_CODES[code];
  res.writeHead(code).end(message);
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  if (method === 'GET') {
    const fileName = url.substring(1) || '/';
    const fileStream = await serveStatic(fileName);
    if (fileStream) {
      const fileExt = path.extname(fileName).substring(1);
      const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.default;
      res.writeHead(200, { 'Content-Type': mimeType });
      fileStream.pipe(res);
    } else httpError(404, res);
  } else httpError(405, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
