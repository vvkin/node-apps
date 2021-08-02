'use strict';

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  const { status = 500 } = err;
  const message = status !== 500 ? err.message : 'Internal Server Error';
  res.status(status).json({ message, status });
};

module.exports = { handleErrors };
