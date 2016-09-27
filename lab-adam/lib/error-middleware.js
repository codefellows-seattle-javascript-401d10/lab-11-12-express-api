
const createError = require('http-errors');
const debug = require('debug')('vehicle:server');

module.exports = function(err, req, res, next){
  if (err.status) {
    debug('user error');
    res.status(err.status).send(err.name);
    return;
  }
  debug('server error');
  err = createError(500, err.name);
  res.status(err.status).send(err.name);
  next();
};
