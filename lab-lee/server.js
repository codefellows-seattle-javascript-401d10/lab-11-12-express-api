'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('note:server');
const jsonParser = require('body-parser').json();

// app modules
const Duck = require('./model/duck');
// const storage = require('./lib/storage');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/hello', function(req, res, next) {
  res.json({msg: 'Hey there.'});
  next();
});

app.get('/api/duck', function(req, res, next) {
  debug('hit route GET /api/duck');
  Duck.fetchDuck(req.query.id)
  .then( duck => res.join(duck))
  .catch (err => next(err));
});

app.post('/api/duck', jsonParser, function(req, res, next) {
  debug('hit route POST /api/duck');
  Duck.createDuck(req.body)
  .then(duck => res.json(duck))
  .catch(err => next(err));
});

app.delete('/api/note', function(req, res, next) {
  debug('hit route DELETE /api/duck');
  Duck.deleteDuck(req.query.id)
  .then()
  .catch(err => next(err));
});

app.use(function(err, req, res) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    return res.status(err.status).send(err.name);
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, function(){
  debug(`server up at PORT: ${PORT}`);
});
