'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('vehicle:server');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const storage = require('./lib/storage.js');

const Vehicle = require('./model/vehicle.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/', function(req, res, next){
  debug('hit route GET /api/vehicle');
  res.json({msg: 'hello'});
  next();
});

app.get('/api/vehicle', function(req, res, next){
  debug('hit route GET /api/vehicle');
  Vehicle.fetchVehicle(req.query.id)
  .then(vehicle => res.json(vehicle))
  // .catch(function(err){
  //   // res.send(storage.availIDs('vehicle'));
  //   err.body = storage.availIDs('vehicle')
  //   console.log(err.body);
  // })
  .catch(err => next(err));
});

app.put('/api/vehicle', jsonParser, function(req, res, next){
  debug('hit route PUT /api/vehicle');
  Vehicle.modifyVehicle(req.query.id, req.body)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

app.post('/api/vehicle', jsonParser, function(req, res, next){
  debug('hit route POST /api/vehicle');
  Vehicle.createVehicle(req.body)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

app.delete('/api/vehicle', jsonParser, function(req, res, next){
  debug('hit route DELETE /api/vehicle');
  Vehicle.deleteVehicle(req.query.id)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

app.use(function(err, req, res, next){
  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }
  err = createError(500, err.name);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, function(){
  debug(`server up on ${PORT}`);
});
