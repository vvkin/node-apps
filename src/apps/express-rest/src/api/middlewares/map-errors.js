'use strict';

const { EntityError } = require('../../helpers/entity-errors');
const { HttpNotFound, HttpConflict } = require('../../helpers/http-errors');

const mapping = {
  EntityNotFound: HttpNotFound,
  EntityConflict: HttpConflict,
};

const mapErrors = (err, req, res, next) => {
  if (err instanceof EntityError) {
    const { message, name } = err;
    next(new mapping[name](message));
  } else next(err);
};

module.exports = { mapErrors };
