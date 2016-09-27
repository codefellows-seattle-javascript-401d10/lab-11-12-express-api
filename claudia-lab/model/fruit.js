'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('fruit:fruits');
const storage = require('../lib/storage.js');

const Fruit = module.exports = function(name, texture, color){
  debug('instantiate fruit');
  if (!name) throw createError(400, 'expected name');
  if (!texture) throw createError(400, 'expected texture');
  if (!color) throw createError(400, 'expected color');

  this.id = uuid.v1(); //generates random id
  this.name = name;
  this.texture = texture;
  this.color = color;
};

Fruit.createFruit = function(_fruit) {
  debug('createFruit');
  try {
    let fruit = new Fruit(_fruit.name, _fruit.texture, _fruit.color);
    return storage.createItem('fruit', fruit);
  } catch (err) {
    return Promise.reject(err);
  }
};

Fruit.fetchFruit = function(id){
  debug('fetchfruit');
  return storage.fetchItem('fruit', id);
};

Fruit.updateFruit = function(id, oldfruit) {
  debug('updatefruit');
  return storage.fetchItem('fruit', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( fruit => {
    for (var key in fruit) {
      if (key === 'id') continue; //continues loop if id is present
      if (oldfruit[key]);
      oldfruit[key] = fruit[key];
    }
    return storage.createItem('fruit', fruit);
  });
};

Fruit.deleteFruit = function(id) {
  debug('deletefruit');
  return storage.deleteItem('fruit', id);
};

Fruit.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('fruit');
};
