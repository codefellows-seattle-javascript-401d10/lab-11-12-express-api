'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('cat:server');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Cat = require('./model/cat');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/', function(req, res){
  debug('Hit route /home');
  res.json({greeting: 'Welcome to CatAPI 2.0; now 100% Express-ier'});
});

app.post('/api/cat', jsonParser, function(req, res, next) {
  debug('Hit route POST /api/cat');
  Cat.createCat(req.body)
  .then(cat => res.json(cat))
  .catch(err => next(err));
});

app.use(function(err, req, res, next) {
  debug('Hit error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});
