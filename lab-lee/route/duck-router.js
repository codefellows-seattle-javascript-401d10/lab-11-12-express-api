'use strict';

// create the note router
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('duck:server');
const duckRouter = new Router();

const Duck = require('../model/duck');

duckRouter.get('/api/duck/:id', function(req, res, next) {
  debug('hit route GET /api/duck/:id');
  Duck.fetchDuck(req.params.id)
    .then( duck => res.json(duck))
    .catch (err => next(err));
});

duckRouter.get('/api/duck/all', function(req, res, next) {
  Duck.fetchDuckIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

duckRouter.post('/api/duck', jsonParser, function(req, res, next) {
  debug('hit route POST /api/duck');
  Duck.createDuck(req.body)
  .then(duck => res.json(duck))
  .catch(err => next(err));
});


duckRouter.delete('/api/duck/:id', function(req, res, next) {
  debug('hit route DELETE /api/duck');
  Duck.deleteDuck(req.params.id)
  .then( duck => res.json(duck))
  .catch(err => next(err));
});

duckRouter.put('/api/duck/:id', jsonParser, function(req, res, next) {
  debug('hit route PUT /api/duck/:id');
  Duck.updateDuck(req.params.id, req.body)
  .then(duck => res.json(duck))
  .catch(next);
});

module.exports = duckRouter;
