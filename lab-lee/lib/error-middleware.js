'use strict';

const createError = require('http-errors');
const debug = require('debug')('duck:server');

module.exports = function(err, req, res, next) {
  debug();
  console.error(err.message);

  if (err.status) {
    return res.status(err.status).send(err.name);
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
