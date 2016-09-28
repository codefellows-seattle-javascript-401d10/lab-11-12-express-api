'use strict';

//creating the fruit Router
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('fruit:server');

//app modules
const Fruit = require('../model/fruit.js');

//module constants
const fruitRouter = new Router();

//posts a created list
fruitRouter.post('/api/fruit', jsonParser, function(req, res, next){
  debug('hit route POST /api/fruit');
  Fruit.createFruit(req.body)
  .then(fruit => res.json(fruit)) //res.json sends a stringified version of data
  .catch(err => next(err));
});

//gets a fruit from the server
fruitRouter.get('/api/fruit/:id', function(req, res, next){
  debug('Fruit/:id');
  Fruit.fetchFruit(req.params.id) //using params instead of querystring
  .then( fruit => res.json(fruit))
  .catch( err => next(err));
});

fruitRouter.get('/api/fruit', function(req, res, next){
  Fruit.fetchIDs()
  .then(ids => res.json(ids))
  .catch(next);
});

//updates a fruit with a specific id
fruitRouter.put('/api/fruit/:id', jsonParser, function (req, res, next) {
  debug('Fruit/:id');
  Fruit.updateFruit(req.params.id, req.body)
  .then(fruit => res.json(fruit))
  .catch( err => next(err));
});

//deletes a fruit with a specific id
fruitRouter.delete('/api/fruit/:id', function (req, res, next) {
  debug('Fruit/:id');
  Fruit.deleteFruit(req.params.id)
  .then(() => res.sendStatus(204))
  .catch( err => next(err));
  next();
});

module.exports = fruitRouter;
