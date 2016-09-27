'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('dog:dog');
const storage = require('../lib/storage.js');

const Dog = module.exports = function(id, name, breed, color) {
  debug('instantiate dog');
  if (!name) throw createError(400, 'expected name');
  if (!breed) throw createError(400, 'expected breed');
  if (!color) throw createError(400, 'expected color');
  if (!id) {
    this.id = uuid.v1();
  } else {
    this.id = id;
  }
  // if (!id) this.id = uuid.v1();
  // this.id = id;
  this.name = name;
  this.breed = breed;
  this.color = color;
};

// const Dog = module.exports = function(dog) {
//   debug('instantiate dog');
//   // if (!id) this.id = uuid.v1();
//   if (!dog.name) throw createError(400, 'expected name');
//   if (!dog.breed) throw createError(400, 'expected breed');
//   if (!dog.color) throw createError(400, 'expected color');
//
//   this.id = dog.id || uuid.v1();
//   this.name = name;
//   this.breed = dog.breed;
//   this.color = dog.color;
// };

Dog.createDog = function(_dog) {
  debug('createDog');
  try {
    let dog = new Dog(_dog.name, _dog.breed, _dog.color);
    // let dog = new Dog(_dog.name, _dog.breed, _dog.color);
    return storage.createItem('dog', dog);
  } catch (err) {
    return Promise.reject(err);
  }
};

Dog.fetchDog = function(id){
  debug('fetchDog');
  return storage.fetchItem('dog', id);
};

Dog.deleteDog = function(id){
  debug('deleteDog');
  return storage.deleteItem('dog', id);
};

Dog.updateDog = function(_dog){
  console.log('id in dog.js', _dog);
  debug('updateDog');
  let dog = new Dog(_dog.id, _dog.name, _dog.breed, _dog.color);
  return storage.updateItem('dog', dog);
  // return storage.updateItem('dog', id, body);
};
