'use strict';

class EntityError extends Error {
  constructor(message) {
    super(message);
    this.name = new.target.name;
  }
}

class EntityNotFound extends EntityError {
  constructor(message) {
    super(message);
  }
}

class EntityConflict extends EntityError {
  constructor(message) {
    super(message);
  }
}

module.exports = { EntityNotFound, EntityConflict };
