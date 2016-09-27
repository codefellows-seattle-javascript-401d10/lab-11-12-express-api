'use strict';

const Router = require('express').Router;
const debug = require('debug')('vehicle:vehicle-router');
const jsonParser = require('body-parser').json();
const Vehicle = require('../model/vehicle.js');
const storage = require('../lib/storage.js');

const noteRouter = new Router();

noteRouter.get('/', function(req, res, next){
  debug('hit route GET /api/vehicle');
  res.json({msg: 'hello'});
  next();
});

noteRouter.get('/api/vehicle/:id', function(req, res, next){
  debug('hit route GET /api/vehicle');
  if (req.params.id) {
    Vehicle.fetchVehicle(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(err => next(err));
  } else {
    storage.availIDs('vehicle')
    .then(data => res.send(data));
  }
});

noteRouter.put('/api/vehicle/:id', jsonParser, function(req, res, next){
  debug('hit route PUT /api/vehicle');
  Vehicle.updateVehicle(req.params.id, req.body)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

noteRouter.post('/api/vehicle', jsonParser, function(req, res, next){
  debug('hit route POST /api/vehicle');
  Vehicle.createVehicle(req.body)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

noteRouter.delete('/api/vehicle/:id', jsonParser, function(req, res, next){
  debug('hit route DELETE /api/vehicle');
  Vehicle.deleteVehicle(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(err));
});

module.exports = noteRouter;
