'use strict';

const Router = require('express').Router;
const debug = require('debug')('pizza:pizza-router');
const jsonParser = require('body-parser').json();

const Pizza = require('../model/pizza.js');

const pizzaRouter = new Router();


pizzaRouter.get('/api/pizza/:id', function(req, res, next){
  debug('hit route GET /api/pizza');
  Pizza.fetchPizza(req.params.id)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

pizzaRouter.post('/api/pizza', jsonParser, function(req, res, next){
  debug('hit route POST /api/pizza');
  Pizza.createPizza(req.body)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

pizzaRouter.put('/api/pizza/:id', jsonParser, function(req, res, next){
  debug('hit route PUT /api/pizza');
  Pizza.updatePizza(req.params.id, req.body)
  .then( pizza => res.json(pizza))
  .catch( err => next(err));
});

pizzaRouter.delete('/api/pizza/:id', function(req, res, next){
  debug('hit route DELETE /api/pizza');
  Pizza.deletePizza(req.params.id)
  .then(() => res.status(204).send())
  .catch( err => next(err));
});

module.exports = pizzaRouter;
