'use strict';

//create the person Router
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');

//app modules
const Person = require('../model/person.js');

//module constants
const personRouter = new Router();


personRouter.post('/api/person', jsonParser, function(req, res, next){
  debug('hit route /api/person');
  Person.createPerson(req.body)
  .then (person => res.json(person))
  .catch (err => next(err));
});

personRouter.get('/api/person/:id', function(req, res, next){
  debug('hit route GET /api/person');
  Person.fetchPerson(req.params.id)
  .then(person => res.json(person))
  .catch( err => next(err));
});

//delete data
personRouter.delete('/api/person/:id', function(req, res, next){
  debug ('hit route DELETE /api/person');
  Person.deletePerson(req.params.id)
  .then (() => res.sendStatus(204))
  .catch ( err => next (err));
});



personRouter.put('/api/person/:id', jsonParser, function(req, res, next){
  debug ('hit route PUT /api/person');

  Person.updatePerson(req.params.id, req.body)
  .then ((person) => res.json(person))
  .catch (next);
});

module.exports = personRouter;
