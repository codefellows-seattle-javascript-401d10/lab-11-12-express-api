'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('cat:cat-routes');
const Cat = require('../model/cat');
const catRouter = new Router();

catRouter.get('/api/cat/:id', function(req, res, next) {
  debug('Hit route GET /api/cat');
  debug('refactored id: ', req.params.id);
  Cat.fetchCat(req.params.id)
  .then(cat => res.json(cat))
  .catch(err => next(err));
});

catRouter.post('/api/cat', jsonParser, function(req, res, next) {
  debug('Hit route POST /api/cat');
  Cat.createCat(req.body)
  .then(cat => res.json(cat))
  .catch(err => next(err));
});

catRouter.put('/api/cat/:id', jsonParser, function(req, res, next) {
  debug('Hit route PUT /api/cat');
  Cat.updateCat(req.params.id, req.body)
  .then(note => res.json(note))
  .catch(err => next(err));
});

catRouter.delete('/api/cat', function(req, res, next) {
  debug('Hit route DELETE /api/cat');
  Cat.deleteCat(req.query.id)
  .then(cat => res.json(cat))
  .catch(err => next(err));
});

module.exports = catRouter;
