'use strict';

const createError = require('http-errors');
const debug = require('debug')('book:error-middleware');

module.exports = function(err, req, res, next){
  console.error(err);

  if(err.status){
    debug('user error');
    return res.status(err.status).send(err.name);
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
