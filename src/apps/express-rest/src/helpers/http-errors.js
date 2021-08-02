'use strict';

const { STATUS_CODES } = require('http');

class HttpError extends Error {
  constructor(message, status) {
    super(message || STATUS_CODES[status]);
    this.status = status;
    this.name = new.target.name;
  }
}

class HttpNotFound extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}

class HttpConflict extends HttpError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = { HttpNotFound, HttpConflict };
