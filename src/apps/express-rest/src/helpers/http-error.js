'use strict';

class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class NotFound extends HttpError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

class Conflict extends HttpError {
  constructor(message) {
    super(message);
    this.code = 409;
  }
}

module.exports = { NotFound, Conflict };
