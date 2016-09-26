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
  console.log(_vehicle);
  try {
    let vehicle = new Vehicle(_vehicle.type, _vehicle.brand, _vehicle.rimSize, _vehicle.topSpeed);
    console.log('storing item...');
    return storage.createItem('vehicle', vehicle);
  } catch (err) {
    return Promise.reject(err);
  }
};

Vehicle.fetchVehicle = function(id){
  debug('fetchVehicle');
  return storage.fetchItem('vehicle', id);
};
