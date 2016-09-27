'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('FruitsList:fruits');
const storage = require('../lib/storage.js');

const FruitsList = module.exports = function(title, fruit, date){
  debug('instantiate FruitsList');
  if (!title) throw createError(400, 'expected title');
  if (!fruit) throw createError(400, 'expected fruit');
  if (!date) throw createError(400, 'expected date');

  this.id = uuid.v1();
  this.title = title;
  this.fruit = fruit;
  this.date = date;
};

FruitsList.createFruitsList = function(_fruitslist) {
  debug('createFruitsList');
  try {
    let fruitslist = new FruitsList(_fruitslist.title, _fruitslist.fruit, _fruitslist.date);
    return storage.createItem('fruitslist', fruitslist);
  } catch (err) {
    return Promise.reject(err);
  }
};

FruitsList.fetchFruitsList = function(id){
  debug('fetchFruitsList');
  return storage.fetchItem('fruitslist', id);
};

FruitsList.updateFruitsList = function(id, item) {
  debug('updateFruitsList');
  return storage.updateItem('fruitslist', id, item);
};

FruitsList.deleteFruitsList = function(id) {
  debug('deleteFruitsList');
  return storage.deleteItem('fruitslist', id);
};
