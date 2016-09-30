'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('dog:dog-model');
const storage = require('../lib/storage.js');

const Dog = module.exports = function(name, breed, color) {
  debug('instantiate dog');
  if (!name) throw createError(400, 'expected name');
  if (!breed) throw createError(400, 'expected breed');
  if (!color) throw createError(400, 'expected color');

  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;
  this.color = color;
};

Dog.createDog = function(_dog) {
  debug('createDog');
  try {
    let dog = new Dog(_dog.name, _dog.breed, _dog.color);
    return storage.createItem('dog', dog);
  } catch (err) {
    return Promise.reject(err);
  }
};

Dog.fetchDog = function(id){
  debug('fetchDog');
  return storage.fetchItem('dog', id);
};

Dog.updateDog = function(id, _dog ){
  debug('updateDog');
  return storage.fetchItem('dog', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(newdog => {
    for (var key in newdog){
      if (key === 'id') continue;
      if (_dog[key]) newdog[key] = _dog[key];
    }
    return storage.createItem('dog', newdog);
  });
};

Dog.deleteDog = function(id){
  debug('deleteDog');
  return storage.deleteItem('dog', id);
};

Dog.fetchIDs = function(){
  debug('fetchIDs');
  return storage.availableIDs('dog');
};
