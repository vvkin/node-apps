'use strict';

const { HttpNotFound, HttpConflict } = require('../../helpers/http-errors');

const mapping = {
  EntityNotFound: HttpNotFound,
  EntityConflict: HttpConflict,
};

// eslint-disable-next-line no-unused-vars
const mapErrors = (err, req, res, next) => {
  const { message, name } = err;
  const Mapper = mapping[name];
  if (Mapper) {
    next(new Mapper(message));
  } else next(err);
};

module.exports = { mapErrors };
