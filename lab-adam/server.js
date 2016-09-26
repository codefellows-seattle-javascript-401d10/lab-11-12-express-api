'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('vehicle:server');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Vehicle = require('./model/vehicle.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(jsonParser);

app.get('/', function(req, res, next){
  debug('hit route GET /api/vehicle');
  res.json({msg: 'hello'});
  next();
});

app.get('/api/vehicle', function(req, res, next){
  debug('hit route GET /api/vehicle');
  Vehicle.fetchVehicle(req.query.id)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

app.post('/api/vehicle', jsonParser, function(req, res, next){
  console.log(req);
  debug('hit route POST /api/vehicle');
  Vehicle.createVehicle(req.body)
  .then(vehicle => res.json(vehicle))
  .catch(err => next(err));
});

app.use(function(err, req, res, next){
  console.error(err.message);
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
