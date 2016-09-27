'use strict';

const uuid = require('uuid');
const createError = require ('http-errors');
const debug = require('debug')('duck:duck');
const storage = require('../lib/storage');

const newDate = new Date();

const Duck = module.exports = function(name, color, feathers, id) {
  debug('instantiate duck');
  if (!name) throw createError(400, 'expected name');
  if (!color) throw createError(400, 'expected color');
  if (!feathers) throw createError(400, 'expected num of feathers');

  this.name = name;
  this.color = color;
  this.feathers = feathers;
  this.id = id || uuid.v1().substring(0, 8);
  this.dateCreated = (newDate.getMonth()+1) + ', ' + newDate.getDate() + ', ' + newDate.getFullYear();
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

Duck.fetchDuckIDs = function(){
  debug('fetchDuckIDs');
  return storage.fetchAll('duck');
};

Duck.deleteDuck = function(id) {
  debug('deleteDuck');
  return storage.deleteItem('duck', id);
};

Duck.updateDuck = function(id, _duck) {
  debug('updateDuck');
  return storage.fetchItem('duck', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( duck => {
    for (var key in duck) {
      if (key === 'id') continue;
      if (_duck[key]) duck[key] = _duck[key];
    }
    return storage.createItem('duck', duck);
  });
};
