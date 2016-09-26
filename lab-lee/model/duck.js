'use strict';

const uuid = require('uuid');
const createError = require ('http-errors');
const debug = require('debug')('duck:duck');
const storage = require('../lib/storage');

const Duck = module.exports = function(name, color, feathers) {
  debug('instantiate duck');
  if (!name) throw createError(400, 'expected name');
  if (!color) throw createError(400, 'expected color');
  if (!feathers) throw createError(400, 'expected num of feathers');

  this.name = name;
  this.color = color;
  this.feathers = feathers;
  this.id = uuid.v1();
};

Duck.createDuck = function(_duck) {
  debug('createDuck');
  try {
    let duck = new Duck(_duck.name, _duck.color, _duck.feathers);
    return storage.createItem('duck', duck);
  } catch (err) {
    return Promise.reject(err);
  }
};

Duck.fetchDuck = function(id) {
  debug('fetchDuck');
  return storage.fetchItem('duck', id);
};

Duck.deleteDuck = function(id) {
  debug('deleteDuck');
  return storage.deleteItem('duck', id);
};
