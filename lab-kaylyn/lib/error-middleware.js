'use strict';

const createError = require('http-errors');
const debug = require('debug')('portfolio:error-middleware');

module.exports = (function(err, req, res, next){
  debug();
  console.error(err.message);
  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});
