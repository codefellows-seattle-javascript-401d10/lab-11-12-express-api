'use strict';

module.exports = function(req, res, next){
  res.append('Access-Control-Allow-Origin', '*'); //sets new header for us
  next();
};
