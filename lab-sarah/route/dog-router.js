'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('dog:dog-router');

//app modules
const Dog = require('../model/dog.js');

//module constants
const dogRouter = new Router();


dogRouter.post('/api/dog', jsonParser, function(req, res, next){
  debug('hit route POST /api/dog');
  Dog.createDog(req.body)
  .then(dog => res.json(dog))
  .catch(err => next(err));
});

dogRouter.get('/api/dog/:id', function(req, res, next){
  debug('hit route GET /api/dog');
  Dog.fetchDog(req.params.id)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

// dogRouter.get('/api/dog', function(req, res, next) {
//   Dog.fetchIDs()
//   .then(ids => res.json(ids))
//   .catch(next);
// });

dogRouter.put('/api/dog/:id', jsonParser, function(req, res, next){
  debug('IS THIS EVEN BEING REACHED', req.params.id);
  Dog.updateDog(req.params.id, req.body)
  .then(dog => res.json(dog))
  .catch(err => next(err));
});

dogRouter.delete('/api/dog/:id', function(req, res, next) {
  debug('hit route DELETE /api/dog');
  Dog.deleteDog(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

module.exports = dogRouter;
