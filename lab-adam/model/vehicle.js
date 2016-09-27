'use strict';

const createError = require('http-errors');
const debug = require('debug')('vehicle:vehicle');
const uuid = require('node-uuid');
const storage = require('../lib/storage.js');

const Vehicle = module.exports = function(type, brand, rimSize, topSpeed){
  debug('instantiate vehicle');
  if (!type) throw createError(400, 'expected type');
  if (!brand) throw createError(400, 'expected brand');
  this.rimSize = rimSize;
  this.type = type;
  this.brand = brand;
  this.topSpeed = topSpeed;
  this.id = uuid.v1();
};

Vehicle.createVehicle = function(_vehicle) {
  debug('createVehicle');
  try {
    let vehicle = new Vehicle(_vehicle.type, _vehicle.brand, _vehicle.rimSize, _vehicle.topSpeed);
    return storage.createItem('vehicle', vehicle);
  } catch (err) {
    return Promise.reject(err);
  }
};

Vehicle.fetchVehicle = function(id){
  debug('fetchVehicle');
  try {
    return storage.fetchItem('vehicle', id);
  } catch (err) {
    return storage.availIDs('vehicle');
  }
};

Vehicle.updateVehicle = function(id, _vehicle){
  debug('modifyVehicle');
  return storage.fetchItem('vehicle', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(vehicle => {
    for (var key in vehicle){
      if (key === 'id') continue;
      if (_vehicle[key]) vehicle[key] = _vehicle[key];
    }
    return storage.createItem('vehicle', vehicle);
  });
};

Vehicle.deleteVehicle = function(id){
  debug('deleteVehicle');
  return storage.deleteItem('vehicle', id);
};
