'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('pizza:server');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Pizza = require('./model/pizza');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/api/pizza', function(req, res, next){
  debug('hit route GET /api/pizza');
  Pizza.fetchPizza(req.query.id)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

app.post('/api/pizza', jsonParser, function(req, res, next){
  debug('hit route POST /api/pizza');
  Pizza.createPizza(req.body)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

app.put('/api/pizza', jsonParser, function(req, res, next){
  debug('hit route PUT /api/pizza');
  Pizza.updatePizza(req.query.id, req.body)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

app.delete('/api/pizza', function(req, res, next){
  debug('hit route DELETE /api/pizza');
  Pizza.deletePizza(req.query.id)
  .then()
  .catch( err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
