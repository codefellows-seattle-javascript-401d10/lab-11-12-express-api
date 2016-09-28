'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('dog:dog-router');

//app modules
const Dog = require('../model/dog.js');

//module constants
const dogRouter = new Router();


dogRouter.post('/api/dog', jsonParser, function(req, res, next){
  debug('WHAT ABOUT THISSSSSSSSSSSS');
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

dogRouter.get('/api/dog', function(req, res, next) {
  Dog.fetchIDs()
  .then(ids => res.json(ids))
  .catch(next);
});

dogRouter.put('/api/dog/:id', jsonParser, function(req, res, next){
  debug('IS THIS EVEN BEING REACHED', req.params.id);
  //THIS IS NOT BEING REACHED
//or something wrong here
//you want to send whole dog object associated with this req.params.id, but i don't know how to get access to that. send get request?
  Dog.updateDog(req.params.id)
  // .then(dog => console.log('dog after updateDog is called in dogRouter.pu in dog-router', dog))
  .then(dog => res.json(dog))
  .catch(err => next(err));
  next();

  // Dog.createDog(req.body);
});

dogRouter.delete('api/dog', function(req, res, next) {
  debug('hit route DELETE /api/dog');
  Dog.deleteDog(req.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

module.exports = dogRouter;
