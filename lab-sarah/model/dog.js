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
  console.log('updated dog name in constructor', this.name);
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

//either something wrong here or in dog-router
Dog.updateDog = function(_dog){
  // THIS IS JUST RECEIVING AN ID, NOT A WHOLE DOG ********************************************************************
  console.log('id in dog-model in Dog.updateDog WHAT IS THE DOGS NAMEEEEEEEEEEEEEEEEEE', _dog);
  debug('updateDog');
  //maybe it's not fetching it?
  //and fetch item is expecting just an id
  return storage.fetchItem('dog', _dog.id)
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
